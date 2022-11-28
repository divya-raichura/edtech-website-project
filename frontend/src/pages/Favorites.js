import FavList from "../components/courses/FavList";
import axios from "axios";
import { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
const url = "/api/courses/favorites";

export default function FavoritesPage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isErr, setErr] = useState(false);
  const user = AuthService.getUser();

  const getData = async () => {
    try {
      const courses = await axios.get(url, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setLoading(false);
      console.log("fav", courses);
      setData(courses.data.favs);
    } catch (err) {
      setErr(true);
      setLoading(false);
      console.log("fav", err);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/register");
    }
    getData();
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isErr) {
    return <h1>Error! Something went wrong...</h1>;
  }

  return (
    <section>
      <h1 style={{ textAlign: "center" }}>Favorites</h1>
      <FavList data={data} />
    </section>
  );
}
