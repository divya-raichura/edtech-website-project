import CourseList from "../components/courses/CourseList";
import { useState, useEffect } from "react";
import UserService from "../services/user.service";

export default function AllCoursesPage() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isErr, setErr] = useState(false);

  const getData = async () => {
    try {
      const res = await UserService.getCourses();
      setLoading(false);
      setData(res.courses);
    } catch (error) {
      setErr(true);
      console.log(error);
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
      <h1 style={{ textAlign: "center" }}>courses</h1>
      <CourseList data={data} />
    </section>
  );
}
