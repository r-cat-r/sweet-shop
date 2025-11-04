import { useEffect, useState } from "react";

import axios from "axios";

export default function Dashboard({ token }) {
  const [sweets, setSweets] = useState([]);

  function logout() {
    window.location.reload(); // simplest logout
  }

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/sweets/")
      .then(res => setSweets(res.data));
  }, []);

  async function buySweet(id) {
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/sweets/${id}/buy/`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSweets(sweets.map(s => 
        s.id === id ? { ...s, quantity: s.quantity - 1 } : s
      ));

      alert("Sweet purchased!");
    } catch {
      alert("Failed to buy sweet");
    }
  }

  return (
    <div>
      <button onClick={logout}>Logout</button>

      <h2>Sweets Available</h2>
      {token.isAdmin && (
  <>
      <h3>Admin Controls</h3>
      <button>Add Sweet</button>
      <button>Restock Sweet</button>
      <br /><br />
  </>
)}

      {sweets.map((s) => (
        <p key={s.id}>
          {s.name} | Qty: {s.quantity}
          <button onClick={() => buySweet(s.id)}>Buy</button>
        </p>
      ))}
    </div>
  );
}
