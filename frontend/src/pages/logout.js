import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    AuthService.logout();
    navigate("/");
  });

  return <></>;
}
