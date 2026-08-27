import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RichTextEditor from "./RichTextEditor";
import { useAuth } from "../../context/AuthContext";
import { createBlog, updateBlog, getBlogById, uploadBlogImage, slugify, STATUS } from "../../lib/blogs";
import "./blog.css";

// Table actions offered by the toolbar's "Table" dropdown. Values map to
// methods on Quill 2's built-in table module (Quill 1.x, which the older
// react-quill pinned, had no table support at all).
const TABLE_ACTIONS = [
  "insert",
  "row-above",
  "row-below",
  "col-left",
  "col-right",
  "del-row",
  "del-col",
  "del-table",
];

const EMPTY_POST = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImageUrl: "",
  category: "",
  tags: "",
  status: STATUS.DRAFT,
  metaDescription: "",
};

function BlogEditor() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const { user } = useAuth();
  const navigate = useNavigate();
  const quillRef = useRef(null);

  const [form, setForm] = useState(EMPTY_POST);
  const [existing, setExisting] = useState(null);
  const [slugTouched, setSlugTouched] = useState(isEditing);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEditing) return;
    let cancelled = false;
    getBlogById(id)
      .then((doc) => {
        if (cancelled) return;
        setExisting(doc);
        setForm({
          title: doc.title,
          slug: doc.slug,
          excerpt: doc.excerpt || "",
          content: doc.content || "",
          coverImageUrl: doc.coverImageUrl || "",
          category: doc.category || "",
          tags: (doc.tags || []).join(", "),
          status: doc.status,
          metaDescription: doc.metaDescription || "",
        });
      })
      .catch((err) => !cancelled && setError(err.message || "Could not load this post."))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [id, isEditing]);

  function handleTitleChange(value) {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: slugTouched ? prev.slug : slugify(value),
    }));
  }

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;
      try {
        const url = await uploadBlogImage(file);
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection(true);
        editor.insertEmbed(range.index, "image", url);
        editor.setSelection(range.index + 1);
      } catch (err) {
        setError(err.message || "Image upload failed.");
      }
    };
  }, []);

  const tableHandler = useCallback((value) => {
    const editor = quillRef.current?.getEditor();
    const table = editor?.getModule("table");
    if (!table) return;
    // Row/column ops need the caret inside a table cell; the click on the
    // toolbar takes focus away, so restore it before acting.
    editor.focus();
    switch (value) {
      case "insert": table.insertTable(3, 3); break;
      case "row-above": table.insertRowAbove(); break;
      case "row-below": table.insertRowBelow(); break;
      case "col-left": table.insertColumnLeft(); break;
      case "col-right": table.insertColumnRight(); break;
      case "del-row": table.deleteRow(); break;
      case "del-col": table.deleteColumn(); break;
      case "del-table": table.deleteTable(); break;
      default: break;
    }
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["blockquote", "link", "image"],
          [{ table: TABLE_ACTIONS }],
          ["clean"],
        ],
        handlers: { image: imageHandler, table: tableHandler },
      },
      table: true,
    }),
    [imageHandler, tableHandler]
  );

  async function handleCoverUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingCover(true);
    setError("");
    try {
      const url = await uploadBlogImage(file);
      setForm((prev) => ({ ...prev, coverImageUrl: url }));
    } catch (err) {
      setError(err.message || "Cover image upload failed.");
    } finally {
      setUploadingCover(false);
    }
  }

  async function handleSubmit(e, statusOverride) {
    e.preventDefault();
    setError("");

    if (!form.title.trim() || !form.slug.trim() || !form.content.trim()) {
      setError("Title, slug and content are required.");
      return;
    }

    const payload = {
      ...form,
      status: statusOverride || form.status,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };

    setSaving(true);
    try {
      if (isEditing) {
        await updateBlog(id, payload, existing);
      } else {
        await createBlog(payload, user);
      }
      navigate("/admin/blogs");
      // No setSaving(false) here: navigate() unmounts this component.
    } catch (err) {
      setError(err.message || "Could not save this post.");
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="blog-status">Loading…</div>;
  }

  return (
    <section className="blog-page">
      <form className="blog-editor" onSubmit={(e) => handleSubmit(e)}>
        <h1>{isEditing ? "Edit Post" : "New Post"}</h1>

        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={form.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          required
        />

        <label htmlFor="slug">Slug (URL)</label>
        <input
          id="slug"
          type="text"
          value={form.slug}
          onChange={(e) => {
            setSlugTouched(true);
            setForm((prev) => ({ ...prev, slug: slugify(e.target.value) }));
          }}
          required
        />

        <div className="blog-editor-row">
          <div>
            <label htmlFor="category">Category</label>
            <input
              id="category"
              type="text"
              value={form.category}
              onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
            />
          </div>
          <div>
            <label htmlFor="tags">Tags (comma separated)</label>
            <input
              id="tags"
              type="text"
              value={form.tags}
              onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))}
            />
          </div>
        </div>

        <label htmlFor="excerpt">Excerpt</label>
        <textarea
          id="excerpt"
          rows={2}
          value={form.excerpt}
          onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
        />

        <label htmlFor="metaDescription">Meta description (for SEO)</label>
        <textarea
          id="metaDescription"
          rows={2}
          value={form.metaDescription}
          onChange={(e) => setForm((prev) => ({ ...prev, metaDescription: e.target.value }))}
        />

        <label htmlFor="cover">Cover image</label>
        <input id="cover" type="file" accept="image/*" onChange={handleCoverUpload} />
        {uploadingCover && <p>Uploading…</p>}
        {form.coverImageUrl && <img src={form.coverImageUrl} alt="Cover preview" className="blog-cover-preview" />}

        <label>Content</label>
        <RichTextEditor
          ref={quillRef}
          value={form.content}
          onChange={(value) => setForm((prev) => ({ ...prev, content: value }))}
          modules={modules}
        />

        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={form.status}
          onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
        >
          <option value={STATUS.DRAFT}>Draft</option>
          <option value={STATUS.PUBLISHED}>Published</option>
        </select>

        {error && <p className="blog-editor-error">{error}</p>}

        <div className="blog-editor-actions">
          <button type="submit" className="blog-btn" disabled={saving}>
            {saving ? "Saving…" : "Save"}
          </button>
          <button
            type="button"
            className="blog-btn blog-btn-outline"
            disabled={saving}
            onClick={(e) => handleSubmit(e, STATUS.PUBLISHED)}
          >
            Save & Publish
          </button>
        </div>
      </form>
    </section>
  );
}

export default BlogEditor;
