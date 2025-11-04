import { useState } from "react";
import axios from "axios";

export default function Login({ onLogin }) {
  const [mode, setMode] = useState("login"); // login or signup
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // ✅ LOGIN function
  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        username,
        password,
      });

      console.log("LOGIN RESPONSE:", response.data);
      console.log("TOKEN RECEIVED:", response.data.access);

      const accessToken = response.data.access;

      if (!accessToken) {
        alert("Login failed: No token received");
        return;
      }

      onLogin(accessToken);
    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data || err);
      alert("Invalid username or password");
    }
  }

  // ✅ SIGNUP function
  async function handleSignup(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register/", {
        username,
        password,
      });

      alert(response.data.message);

      if (response.data.message.includes("success")) {
        setMode("login"); // Switch back to login form
      }
    } catch (err) {
      console.log("REGISTER ERROR:", err.response?.data || err);
      alert("User already exists or invalid info");
    }
  }

  return (
    <div style={{ margin: "40px" }}>
      {/* ✅ LOGIN FORM */}
      {mode === "login" && (
        <form onSubmit={handleLogin}>
          <h2>Login</h2>

          <input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            style={{ margin: "5px", display: "block" }}
          />

          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            style={{ margin: "5px", display: "block" }}
          />

          <button type="submit">Login</button>

          <button
            type="button"
            onClick={() => setMode("signup")}
            style={{ marginLeft: "10px" }}
          >
            Create New Account
          </button>
        </form>
      )}

      {/* ✅ SIGNUP FORM */}
      {mode === "signup" && (
        <form onSubmit={handleSignup}>
          <h2>Register</h2>

          <input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            style={{ margin: "5px", display: "block" }}
          />

          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            style={{ margin: "5px", display: "block" }}
          />

          <button type="submit">Register</button>

          <button
            type="button"
            onClick={() => setMode("login")}
            style={{ marginLeft: "10px" }}
          >
            Back to Login
          </button>
        </form>
      )}
    </div>
  );
}
