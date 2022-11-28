import { Link } from "react-router-dom";
import Register from "../components/auth/Register";
import AuthService from "../services/auth.service";

export default function RegisterPage() {
  const user = AuthService.getUser();
  console.log(user);
  if (!user) {
    return (
      <section style={{ textAlign: "center" }}>
        <h1>Register</h1>
        <Register></Register>
      </section>
    );
  }

  return (
    <section>
      <h1>Hi {user.user.name}</h1>
      <Link to="/logout">Logout</Link>
    </section>
  );
}
