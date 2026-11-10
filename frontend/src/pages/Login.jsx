import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axiosInstance";

const Login = ({ setUser, setUserId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/user/login", { email, password });

      if (res.data.token) {
        // Store the token and ID so API requests and note ownership checks use this account.
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userID", res.data.userID);
        setUserId(res.data.userID);
             
        // Use the returned name when available, otherwise show the email prefix.
        const nameToSave = res.data.user?.name || res.data.name || email.split("@")[0];
        localStorage.setItem("userName", nameToSave);
        setUser(nameToSave);

        navigate("/");
      } else {
        setError(res.data.msg || "Invalid credentials");
      }
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-2 lg:items-center">
      <section className="flex flex-col justify-center gap-10 px-6 py-12 sm:px-10 lg:min-h-screen lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-xl">
          <div className="mb-8 inline-flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-sm font-bold text-white">
              N
            </span>
            <span className="text-lg font-semibold tracking-tight text-slate-900">Notelify</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">Your Ideas, Simplified.</h1>
          <p className="mt-4 max-w-lg text-base leading-7 text-slate-500">
            A clean, distraction-free space to capture thoughts and manage your daily notes.
          </p>
        </div>

        <div className="mx-auto grid w-full max-w-xl grid-cols-12 items-start gap-3.5">
          <div className="group col-span-7 aspect-[16/10] overflow-hidden rounded-xl border border-slate-200/80 bg-white p-3 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md sm:p-5">
            <img
              src="https://genio.co/hubfs/NOTES%20FEATURES%20ICONS_ai%20outline.png"
              alt="Minimal outline illustration for note-taking"
              className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </div>
          <div className="group col-span-5 aspect-[4/3] overflow-hidden rounded-xl border border-slate-200/80 bg-white p-3 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md sm:p-4">
            <img
              src="https://genio.co/hubfs/NOTES%20FEATURES%20ICONS_captions.png"
              alt="Note-taking captions illustration"
              className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </div>

          <div className="group col-span-5 aspect-[4/3] overflow-hidden rounded-xl border border-slate-200/80 bg-white p-2 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md sm:p-3">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS37DBjTLvxgavNbw4VxZUpwyenINuBAwgxMiIZNDFjWg&s=10"
              alt="Colorful handwritten revision notes"
              className="h-full w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </div>
          <div className="group col-span-7 aspect-[16/10] overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFl1UG8GQIwfOFCsZIFOJtzx2tb21YJiO4G4cn9DJNhA&s=10"
              alt="Aesthetic workspace with an open notebook"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </div>
        </div>
      </section>

      <section className="flex items-center justify-center px-6 py-12 sm:px-10 lg:min-h-screen">
        <div className="w-full max-w-md rounded-2xl border border-slate-200/80 bg-white p-8 shadow-lg shadow-slate-200/50 md:p-10">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Welcome Back</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">Sign in to your Notelify account.</p>
          </div>

          {error && (
            <div className="mb-5 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="login-email" className="mb-1.5 block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div>
              <div className="mb-1.5">
                <label htmlFor="login-password" className="block text-sm font-medium text-slate-700">
                  Password
                </label>
              </div>
              <input
                id="login-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="font-medium text-blue-600 transition hover:text-blue-700">
              Sign up
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;