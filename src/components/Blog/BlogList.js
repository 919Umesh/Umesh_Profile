import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegClock, FaRegUser, FaArrowRight } from "react-icons/fa";
import { listPublishedBlogs, formatBlogDate, estimateReadTime } from "../../lib/blogs";
import "./blog.css";

function FeaturedPost({ post }) {
  return (
    <Link to={`/blogs/${post.slug}`} className="blog-featured">
      <div className="blog-featured-media">
        {post.coverImageUrl && <img src={post.coverImageUrl} alt={post.title} />}
        <span className="blog-badge-latest">Latest</span>
      </div>
      <div className="blog-featured-body">
        {post.category && <span className="blog-eyebrow">{post.category}</span>}
        <h2>{post.title}</h2>
        {post.excerpt && <p>{post.excerpt}</p>}
        <div className="blog-meta-row" style={{ marginBottom: "22px" }}>
          <span><FaRegUser size={13} /> {post.author}</span>
          <span><FaRegClock size={13} /> {estimateReadTime(post.content)} min read</span>
        </div>
        <span className="blog-arrow-link">
          Read article <FaArrowRight size={12} />
        </span>
      </div>
    </Link>
  );
}

function PostCard({ post }) {
  return (
    <Link to={`/blogs/${post.slug}`} className="blog-card">
      <div className="blog-card-media">
        {post.coverImageUrl && <img src={post.coverImageUrl} alt={post.title} />}
      </div>
      <div className="blog-card-body">
        {post.category && <span className="blog-eyebrow">{post.category}</span>}
        <h3 className="blog-card-title">{post.title}</h3>
        {post.excerpt && <p className="blog-card-excerpt">{post.excerpt}</p>}
        <div className="blog-meta-row">
          <span><FaRegUser size={12} /> {post.author}</span>
          <span>{formatBlogDate(post.publishedAt)}</span>
        </div>
      </div>
    </Link>
  );
}

function BlogList() {
  const [blogs, setBlogs] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    listPublishedBlogs()
      .then((res) => !cancelled && setBlogs(res.documents))
      .catch((err) => !cancelled && setError(err.message || "Could not load blog posts."));
    return () => {
      cancelled = true;
    };
  }, []);

  const [featured, ...rest] = blogs || [];

  return (
    <section className="blog-page">
      <div className="blog-shell">
        <div className="blog-list-header">
          <h1>Guides, Notes &amp; Engineering Write-ups</h1>
          <p>Things I'm building, lessons from shipping mobile apps, and the occasional deep dive.</p>
        </div>

        {error && <div className="blog-empty">{error}</div>}
        {!error && blogs === null && <div className="blog-empty">Loading posts…</div>}
        {blogs && blogs.length === 0 && <div className="blog-empty">No posts yet — check back soon.</div>}

        {featured && <FeaturedPost post={featured} />}

        {rest.length > 0 && (
          <>
            <div className="blog-section-head">
              <h2>More Articles</h2>
            </div>
            <div className="blog-grid">
              {rest.map((post) => (
                <PostCard key={post.$id} post={post} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default BlogList;
