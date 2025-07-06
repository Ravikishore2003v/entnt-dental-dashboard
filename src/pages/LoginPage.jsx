import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../App"; // Get login function from context

const LoginPage = () => {
    const { login } = useAuth(); // 👈 this is the correct login function
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (login(email, password)) {
        const user = JSON.parse(localStorage.getItem("user"));
        navigate(user.role === "Admin" ? "/admin" : "/patient");
      } else {
        alert("Invalid credentials");
      }
    };
  
    return (
      <div className="p-4 max-w-md mx-auto">
        <h1 className="text-xl font-bold mb-4">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
            Login
          </button>
        </form>
      </div>
    );
  };
  
  export default LoginPage;
  
