import FavList from "../components/courses/FavList";
import axios from "axios";
import { useState, useEffect } from "react";
const url = "/api/courses/favorites";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzdiZDcwNmNlMzFiZTViNWYwOGQyMjgiLCJuYW1lIjoiZGl2eWE5IiwiaWF0IjoxNjY5MjE3NzU4fQ.rO83khtHBfYk92jEfM64we2Fkb70cPO6brP6YCPQGC0";

export default function FavoritesPage() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isErr, setErr] = useState(false);

  const getData = async () => {
    try {
      const courses = await axios.get(url, {
        headers: { Authorization: "Bearer " + token },
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
