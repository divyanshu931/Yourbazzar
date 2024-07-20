import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../apis/axiosInstance";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post("/api/auth/login", {
        email,
        password,
      });

      if (response.data.token) {
        const token = response.data.token;
        const expirationTime = new Date().getTime() + 3600 * 1000; // 1 hour from now in milliseconds
        localStorage.setItem("token", token);
        localStorage.setItem("expirationTime", expirationTime);
        setTimeout(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("expirationTime");
        }, 3600 * 1000); // Remove token and expiration time after 1 hour

        navigate("/dashboard/admin");
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
      console.error(err);
    }
  };

  return (
    <>
      {/* Header */}
      <div
        style={{
          padding: "2rem",
          boxShadow: "0 .5rem 1rem rgba(0,0,0,.1)",
          backgroundColor: "#ffc107",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          textAlign: "center",
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#343a40",
        }}
      >
        Sign In to YourBajaar Admin
      </div>

      {/* Body */}
      <div style={{ padding: "2rem" }}>
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label className="form-label text-muted small mb-1">Your Email</label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: ".5rem",
                backgroundColor: "#fff",
                boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)",
                borderRadius: ".25rem",
                overflow: "hidden",
              }}
            >
              <span className="input-group-text bg-white">
                <i className="bi bi-envelope-open text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="yourbajaar@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ border: "none", padding: ".5rem 1rem", flex: 1 }}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="form-label text-muted small mb-1">Password</label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: ".5rem",
                backgroundColor: "#fff",
                boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)",
                borderRadius: ".25rem",
                overflow: "hidden",
              }}
            >
              <span className="input-group-text bg-white">
                <i className="bi bi-lock text-muted"></i>
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="***********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ border: "none", padding: ".5rem 1rem", flex: 1 }}
              />
            </div>
          </div>
          {error && <p className="text-danger" style={{ color: "black" }}>{error}</p>}
          <button
            type="submit"
            className="btn btn-success btn-lg w-100 shadow-sm"
            style={{
              marginTop: "1rem",
              backgroundColor: "#28a745",
              borderColor: "#28a745",
              fontWeight: "bold",
              letterSpacing: "1px",
              borderRadius: ".25rem",
              padding: ".75rem 1.5rem",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
          >
            SIGN IN
          </button>
        </form>
      </div>

      {/* Footer */}
     
      
    </>
  );
}

export default SignIn;
