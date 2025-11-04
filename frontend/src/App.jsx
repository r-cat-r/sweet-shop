import { useState } from "react";
import Login from "./Login.jsx";
import Dashboard from "./Dashboard.jsx";

function App() {
  const [token, setToken] = useState(null);

  return (
    <>
      {!token ? (
        <Login onLogin={setToken} />
      ) : (
        <Dashboard token={token} />
      )}
    </>
  );
}

export default App;
