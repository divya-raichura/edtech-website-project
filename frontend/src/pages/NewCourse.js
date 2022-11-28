import NewCourse from "../components/courses/NewCourse";
import axios from "axios";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const url = "/api/courses/";

export default function NewCoursePage() {
  const navigate = useNavigate();
  const user = AuthService.getUser();

  async function handlePost(data) {
    try {
      console.log("user on post", user, user.token);
      const res = await axios.post(url, data, {
        headers: { Authorization: `Bearer ${user.token}` },
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
