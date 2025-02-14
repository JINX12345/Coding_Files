import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogin = async () => {
    const response = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);
    setToken(response.data.token);
    console.log("Congratulations you have succesfully loged in");
  };

  return (
    <Router>
      <div>
        <h1>Aviation Training Platform</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/bookings">Bookings</Link>
        </nav>
        <Routes>
          <Route path="/" element={
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleLogin}>Login</button>
            </div>
          } />
          <Route path="/bookings" element={<Bookings token={token} />} />
        </Routes>
      </div>
    </Router>
  );
}

function Bookings({ token }) {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const response = await axios.get("http://localhost:5000/api/students/1/bookings", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setBookings(response.data);
  };

  return (
    <div>
      <h2>Bookings and or references </h2>
      <button onClick={fetchBookings}>Load Bookings</button>
      <ul>
        {bookings.map((booking) => (
          <li key={booking._id}>
            {booking.date_time} with {booking.instructor_id.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;