import { useState } from "react";
import axios from "axios";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        username: username,
        password: password
      });

      const accessToken = response.data.access;

      if (!accessToken) {
        alert("Login failed: no token received");
        return;
      }

      onLogin(accessToken);  // send token to App.jsx
    } catch (err) {
      console.log(err);
      alert("Invalid login. Please check username/password.");
    }
  }

  return (
    <div style={{ margin: "40px" }}>
      <h2>Sweet Shop Login</h2>
      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        style={{ margin: "5px" }}
      /><br />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        style={{ margin: "5px" }}
      /><br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
