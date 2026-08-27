import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { listAllBlogs, deleteBlog, STATUS } from "../../lib/blogs";
import "./blog.css";

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function BlogDashboard() {
  const { user, logout } = useAuth();
  const [blogs, setBlogs] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    listAllBlogs()
      .then((res) => !cancelled && setBlogs(res.documents))
      .catch((err) => !cancelled && setError(err.message || "Could not load your posts."));
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleDelete(id, title) {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await deleteBlog(id);
      setBlogs((prev) => prev.filter((b) => b.$id !== id));
    } catch (err) {
      setError(err.message || "Could not delete this post.");
    }
  }

  return (
    <section className="blog-page">
      <div className="blog-dashboard">
        <div className="blog-dashboard-header">
          <h1>Your Posts</h1>
          <div style={{ display: "flex", gap: "10px" }}>
            <Link to="/admin/blogs/new" className="blog-btn">+ New Post</Link>
            <button className="blog-btn blog-btn-outline" onClick={logout}>
              Log out {user?.email ? `(${user.email})` : ""}
            </button>
          </div>
        </div>

        {error && <div className="blog-empty">{error}</div>}
        {!error && blogs === null && <div className="blog-status">Loading…</div>}
        {blogs && blogs.length === 0 && <div className="blog-empty">No posts yet. Write your first one!</div>}

        {blogs && blogs.map((post) => (
          <div key={post.$id} className="blog-row">
            <div>
              <div className="blog-row-title">
                {post.title}{" "}
                <span className={`blog-badge ${post.status === STATUS.PUBLISHED ? "blog-badge-published" : "blog-badge-draft"}`}>
                  {post.status}
                </span>
              </div>
              <div className="blog-row-meta">
                {post.status === STATUS.PUBLISHED ? formatDate(post.publishedAt) : `Updated ${formatDate(post.$updatedAt)}`}
                {post.category && ` · ${post.category}`}
              </div>
            </div>
            <div className="blog-row-actions">
              {post.status === STATUS.PUBLISHED && (
                <Link to={`/blogs/${post.slug}`} className="blog-btn blog-btn-outline" target="_blank" rel="noreferrer">
                  View
                </Link>
              )}
              <Link to={`/admin/blogs/edit/${post.$id}`} className="blog-btn">Edit</Link>
              <button className="blog-btn blog-btn-danger" onClick={() => handleDelete(post.$id, post.title)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BlogDashboard;
