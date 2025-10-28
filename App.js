import React, { useState } from "react";

function App() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const res = await fetch(`http://localhost:5000/patients/search/${keyword}`);
    const data = await res.json();
    setResults(data);
  };

  return (
    <div style={{ fontFamily: "Poppins, sans-serif", textAlign: "center", padding: "30px" }}>
      <h2>Patient Search — Junry Pacot</h2>
      <input
        type="text"
        placeholder="Search patient name"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        style={{
          padding: "8px",
          borderRadius: "5px",
          border: "1px solid #aaa",
          width: "250px",
          marginRight: "10px"
        }}
      />
      <button
        onClick={handleSearch}
        style={{
          background: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          padding: "8px 12px"
        }}
      >
        Search
      </button>

      <table
        style={{
          borderCollapse: "collapse",
          margin: "30px auto",
          width: "25%",
          border: "1px solid #ddd"
        }}
      >
        <thead style={{ background: "#4CAF50", color: "white" }}>
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {results.map((p) => (
            <tr key={p.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td>{p.firstname}</td>
              <td>{p.lastname}</td>
              <td>{p.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
