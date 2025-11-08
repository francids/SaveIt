import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "./AuthProvider";

export default function AuthPage() {
  const { login, register, isAuthenticated } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await isAuthenticated();
      if (isAuth) {
        navigate("/app");
      }
    };
    checkAuth();
  }, [isAuthenticated, navigate]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (isLogin) {
      await login(email, password);
    } else {
      await register(name, email, password);
    }
    navigate("/app");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card bg-base-100 w-96 shadow-sm">
        <form className="card-body" onSubmit={handleSubmit}>
          <h2 className="card-title">{isLogin ? "Login" : "Register"}</h2>
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input w-full"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input w-full"
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input w-full"
          />
          <button className="btn btn-primary" type="submit">
            {isLogin ? "Login" : "Register"}
          </button>
          <p className="mt-3">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <a className="link" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Register" : "Login"}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
