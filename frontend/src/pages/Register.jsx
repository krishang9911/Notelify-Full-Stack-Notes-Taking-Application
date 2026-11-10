import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axiosInstance";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/user/register", { name, email, password });
      if (res.data) {
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-1 bg-gradient-to-br from-sky-100 via-blue-50/70 to-sky-50 lg:grid-cols-12">
      <section className="flex min-h-[360px] flex-col justify-center px-6 py-12 sm:px-10 lg:col-span-7 lg:min-h-screen lg:pl-12">
        <div className="mx-auto w-full max-w-2xl">
          <div className="mb-10 flex items-center gap-3">
            <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" className="h-9 w-9 text-sky-600">
              <rect x="3" y="3" width="26" height="26" rx="8" fill="currentColor" />
              <path d="M10 10h12v2.5h-9.5V15h8v2.5h-8v2H22V22H10V10Z" fill="white" />
            </svg>
            <span className="text-lg font-bold tracking-tight text-slate-900">Notelify</span>
          </div>
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-sky-600">A CLEARER SPACE TO THINK</p>
          <h1 className="max-w-xl text-4xl font-black tracking-tight text-slate-900 lg:text-5xl">
            Your Ideas, <span className="text-sky-600">Simplified.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base font-semibold leading-7 text-slate-700 sm:text-lg sm:leading-8">
            Capture thoughts, manage tasks, and organize your daily workflow seamlessly.
          </p>
        </div>
      </section>

      <section className="flex items-center justify-center px-4 py-12 sm:px-8 lg:col-span-5 lg:px-10">
        <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-200/80 bg-white p-8 shadow-xl sm:p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-blue-950">Create Account</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">Start building a calmer, more organized workflow.</p>
          </div>

          {error && (
            <div className="mb-5 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-sky-500 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Registering..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-sky-600 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Register;