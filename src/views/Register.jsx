import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register as apiRegister } from "../stores/useAuthStore";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await apiRegister(formData);
      alert("Registrasi berhasil! Silakan login.");
      navigate("/login");
    } catch (err) {
      const message =
        err.response?.data?.message || "Registrasi gagal. Coba lagi.";
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-96 border border-gray-100"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Daftar Akun
        </h2>

        <input
          required
          type="text"
          placeholder="Username"
          className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />

        <input
          required
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        <button
          disabled={isLoading}
          className={`w-full text-white p-3 rounded-lg transition-all ${
            isLoading
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isLoading ? "Memproses..." : "Daftar"}
        </button>

        <p className="mt-4 text-center text-gray-600">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-green-600 font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
