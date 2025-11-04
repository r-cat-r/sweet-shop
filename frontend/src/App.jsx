import { useState } from "react";
import Login from "./Login.jsx";
import Dashboard from "./Dashboard.jsx";

function App() {
  const [token, setToken] = useState(null);

  // ✅ Logout handler
  function handleLogout() {
    setToken(null);
  }

  return (
    <>
      {/* If no token, show login page */}
      {!token ? (
        <Login onLogin={(tok) => setToken(tok)} />
      ) : (
        <Dashboard token={token} onLogout={handleLogout} />
      )}
    </>
  );
}

export default App;
