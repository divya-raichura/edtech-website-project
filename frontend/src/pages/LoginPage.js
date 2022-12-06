import { Link } from "react-router-dom";
import Login from "../components/auth/Login";
import AuthService from "../services/auth.service";

export default function LoginPage() {
  const user = AuthService.getUser();
  console.log(user);
  if (!user) {
    return (
      <section style={{ textAlign: "center" }}>
        <h1>Login</h1>
        <Login></Login>
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
