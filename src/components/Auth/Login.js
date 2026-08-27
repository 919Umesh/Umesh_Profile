import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

function Login() {
  const { user, isBlogger, loading, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  if (!loading && user && isBlogger) {
    const redirectTo = location.state?.from?.pathname || "/admin/blogs";
    return <Navigate to={redirectTo} replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
      navigate("/admin/blogs", { replace: true });
      // No setSubmitting(false) here: navigate() unmounts this component.
    } catch (err) {
      setError(err.message || "Login failed. Check your email and password.");
      setSubmitting(false);
    }
  }

  return (
    <section className="login-section">
      <div className="login-card">
        <h1>Blog Login</h1>
        <p className="login-subtitle">Sign in with your Sajha Swayamsewak account to write posts.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="login-btn" disabled={submitting}>
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
