import NewCourse from "../components/courses/NewCourse";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const url = "/api/courses/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzdiZDcwNmNlMzFiZTViNWYwOGQyMjgiLCJuYW1lIjoiZGl2eWE5IiwiaWF0IjoxNjY5MjE3NzU4fQ.rO83khtHBfYk92jEfM64we2Fkb70cPO6brP6YCPQGC0";

export default function NewCoursePage() {
  const navigate = useNavigate();
  async function handlePost(data) {
    try {
      const res = await axios.post(url, data, {
        headers: { Authorization: "Bearer " + token },
      });
      console.log(res);
      alert("new course created!");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section>
      <h1 style={{ textAlign: "center" }}>New Course</h1>
      <NewCourse onPost={handlePost}></NewCourse>
    </section>
  );
}
