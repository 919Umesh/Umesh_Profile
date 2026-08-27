import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { FaRegClock, FaRegUser, FaGithub, FaTwitter, FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import {
  getBlogBySlug,
  getRelatedBlogs,
  slugify,
  formatBlogDate,
  estimateReadTime,
} from "../../lib/blogs";
import "./blog.css";

// Prepares sanitized post HTML for display:
//  - gives every h2/h3 an id so the "In this article" sidebar can jump to it
//  - ensures each table sits in a horizontally scrollable wrapper
// Returns the rewritten HTML plus the (id, text) pairs for the sidebar.
function prepareContent(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");

  const toc = Array.from(doc.querySelectorAll("h2, h3")).map((h, i) => {
    const id = `s-${i}-${slugify(h.textContent).slice(0, 40)}`;
    h.id = id;
    return { id, text: h.textContent, level: h.tagName };
  });

  doc.querySelectorAll("table").forEach((table) => {
    const parent = table.parentElement;
    // Tolerate content that already carries its own scroll wrapper (e.g.
    // pasted in) rather than nesting a second one.
    if (parent && parent.classList.contains("quill-better-table-wrapper")) {
      parent.classList.add("blog-table-wrap");
      return;
    }
    const wrap = doc.createElement("div");
    wrap.className = "blog-table-wrap";
    table.replaceWith(wrap);
    wrap.appendChild(table);
  });

  return { html: doc.body.innerHTML, toc };
}

function RelatedCard({ post }) {
  return (
    <Link to={`/blogs/${post.slug}`} className="related-card">
      {post.coverImageUrl ? (
        <img src={post.coverImageUrl} alt={post.title} className="related-card-img" />
      ) : (
        <span className="related-card-img" />
      )}
      <div>
        {post.category && <span className="related-card-category">{post.category}</span>}
        <div className="related-card-title">{post.title}</div>
        {post.excerpt && <div className="related-card-excerpt">{post.excerpt}</div>}
      </div>
    </Link>
  );
}

function Shell({ children }) {
  return (
    <section className="blog-page">
      <div className="blog-detail-layout">
        <article className="blog-main">{children}</article>
      </div>
    </section>
  );
}

function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(undefined);
  const [related, setRelated] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setPost(undefined);
    window.scrollTo(0, 0);
    getBlogBySlug(slug)
      .then((doc) => {
        if (cancelled) return;
        setPost(doc);
        if (doc) getRelatedBlogs(doc.$id).then((docs) => !cancelled && setRelated(docs));
      })
      .catch((err) => !cancelled && setError(err.message || "Could not load this post."));
    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    if (post) document.title = `${post.title} — Umesh Shahi Thakuri`;
    return () => {
      document.title = "Umesh Shahi Thakuri";
    };
  }, [post]);

  const { html: contentHtml, toc } = useMemo(() => {
    if (!post) return { html: "", toc: [] };
    return prepareContent(DOMPurify.sanitize(post.content));
  }, [post]);

  const readTime = useMemo(() => (post ? estimateReadTime(post.content) : 0), [post]);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  function jumpTo(e, id) {
    e.preventDefault(); // a bare #id href would hijack HashRouter's own route hash
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (error) {
    return (
      <Shell>
        <Link to="/blogs" className="blog-detail-back">← Back to blog</Link>
        <div className="blog-empty">{error}</div>
      </Shell>
    );
  }

  if (post === undefined) return <div className="blog-status">Loading…</div>;

  if (post === null) {
    return (
      <Shell>
        <Link to="/blogs" className="blog-detail-back">← Back to blog</Link>
        <div className="blog-empty">Post not found.</div>
      </Shell>
    );
  }

  const shareLinks = [
    ["Facebook", `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`],
    ["LinkedIn", `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`],
    ["X", `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`],
    ["Email", `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(shareUrl)}`],
  ];

  return (
    <section className="blog-page">
      <nav className="blog-breadcrumb">
        <Link to="/blogs">Blogs</Link>
        <span className="sep">/</span>
        <span className="current">{post.title}</span>
      </nav>

      <div className="blog-detail-layout">
        {toc.length > 0 && (
          <aside className="blog-toc">
            <div className="blog-toc-label">In this article</div>
            <ul>
              {toc.map((item) => (
                <li key={item.id} className={item.level === "H3" ? "toc-sub" : ""}>
                  <a href={`#${item.id}`} onClick={(e) => jumpTo(e, item.id)}>{item.text}</a>
                </li>
              ))}
            </ul>
          </aside>
        )}

        <article className="blog-main">
          {post.coverImageUrl && (
            <img src={post.coverImageUrl} alt={post.title} className="blog-detail-cover" />
          )}

          <div className="blog-detail-topline">
            {post.category && <span className="blog-category-pill">{post.category}</span>}
            <span className="blog-read-time"><FaRegClock size={13} /> {readTime} min read</span>
          </div>

          <h1>{post.title}</h1>
          {post.excerpt && <p className="blog-detail-excerpt">{post.excerpt}</p>}

          <div className="blog-detail-byline">
            <div className="blog-author">
              <span className="blog-avatar"><FaRegUser size={17} /></span>
              <div>
                <div className="blog-author-name">{post.author}</div>
                <div className="blog-author-date">{formatBlogDate(post.publishedAt)}</div>
              </div>
            </div>
            <div className="blog-share">
              <span>Share this article:</span>
              {shareLinks.map(([label, href], i) => (
                <React.Fragment key={label}>
                  <a href={href} target="_blank" rel="noreferrer">{label}</a>
                  {i < shareLinks.length - 1 && <span className="divider">|</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="blog-detail-tags">
              {post.tags.map((tag) => (
                <span key={tag} className="blog-tag">{tag}</span>
              ))}
            </div>
          )}

          <div className="blog-detail-content" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </article>

        <aside className="blog-related">
          {related.length > 0 && (
            <>
              <div className="blog-toc-label">Related Articles</div>
              {related.map((r) => (
                <RelatedCard key={r.$id} post={r} />
              ))}
            </>
          )}

          <div className="follow-card">
            <h3>Follow Umesh</h3>
            <p>New write-ups on Flutter, mobile engineering and the things I ship.</p>
            <div className="follow-links">
              <a href="https://github.com/919Umesh" target="_blank" rel="noreferrer" aria-label="GitHub">
                <FaGithub size={17} />
              </a>
              <a href="https://x.com/UmeshSh56100400" target="_blank" rel="noreferrer" aria-label="X">
                <FaTwitter size={17} />
              </a>
              <a href="https://www.linkedin.com/in/umesh-shahi-thakuri" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <FaLinkedinIn size={17} />
              </a>
              <a href="mailto:thakuriumesh919@gmail.com" aria-label="Email">
                <FaEnvelope size={17} />
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default BlogDetail;
