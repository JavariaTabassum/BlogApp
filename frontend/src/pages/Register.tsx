// import { useState, useContext } from "react";
// import { register } from "../api/userApi";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const [form, setForm] = useState({ username: "", email: "", password: "" });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { setUser } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setError(""); 
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
    
//     try {
//       const { data } = await register(form);
//       localStorage.setItem("token", data.token);
//       setUser(data);
//       navigate("/");
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Registration failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow"
//     >
//       <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           {error}
//         </div>
//       )}
//       <input
//         name="username"
//         placeholder="Username"
//         onChange={handleChange}
//         value={form.username}
//         required
//         className="w-full border p-2 mb-3 rounded"
//       />
//       <input
//         name="email"
//         type="email"
//         placeholder="Email"
//         onChange={handleChange}
//         value={form.email}
//         required
//         className="w-full border p-2 mb-3 rounded"
//       />
//       <input
//         name="password"
//         type="password"
//         placeholder="Password"
//         onChange={handleChange}
//         value={form.password}
//         required
//         minLength={6}
//         className="w-full border p-2 mb-3 rounded"
//       />
//       <button
//         type="submit"
//         disabled={loading}
//         className={`w-full py-2 rounded text-white ${
//           loading 
//             ? 'bg-blue-400 cursor-not-allowed' 
//             : 'bg-blue-600 hover:bg-blue-700'
//         }`}
//       >
//         {loading ? 'Registering...' : 'Register'}
//       </button>
//     </form>
//   );
// };

// export default Register;

import { useState, useContext } from "react";
import { register } from "../api/userApi";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await register(form);
      localStorage.setItem("token", data.token);
      setUser(data);
      navigate("/");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[677px] w-full flex items-center justify-center bg-linear-to-br from-blue-50 to-blue-200 overflow-hidden">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
      >
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Create Account ✨
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Join us and start your journey today
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Username</label>
          <input
            name="username"
            placeholder="Enter username"
            onChange={handleChange}
            value={form.username}
            required
            className="w-full p-3 border border-gray-300 rounded-lg 
            focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter email"
            onChange={handleChange}
            value={form.email}
            required
            className="w-full p-3 border border-gray-300 rounded-lg 
            focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter password"
            onChange={handleChange}
            value={form.password}
            required
            minLength={6}
            className="w-full p-3 border border-gray-300 rounded-lg 
            focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition 
          ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 active:scale-95"}
        `}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
