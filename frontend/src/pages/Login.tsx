import { useState, useContext } from "react";
import { login } from "../api/userApi";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await login(form);
      localStorage.setItem("token", data.token);
      setUser(data);
      navigate("/");
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Invalid credentials";
      setError(msg);
    }
  };

  return (
    <div className="h-[677px] flex items-center justify-center bg-linear-to-br from-blue-50 to-blue-200">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Welcome Back 👋
        </h2>

        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Email
          </label>
          <input
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">
            Password
          </label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          />
        </div>

        <button className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition active:scale-95">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

