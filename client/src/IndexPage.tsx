import { useNavigate } from "react-router";

export default function IndexPage() {
  const navigate = useNavigate();

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold pb-6">Welcome to Stash</h1>
          <button className="btn btn-primary" onClick={() => navigate("/auth")}>
            Get started
          </button>
        </div>
      </div>
    </div>
  );
}
