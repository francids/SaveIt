import { useNavigate } from "react-router";
import Logo from "./Logo";

export default function IndexPage() {
  const navigate = useNavigate();

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <Logo className="mb-6 fill-primary" />
          <button className="btn btn-primary" onClick={() => navigate("/auth")}>
            Get started
          </button>
        </div>
      </div>
    </div>
  );
}
