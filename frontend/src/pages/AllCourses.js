import CourseList from "../components/courses/CourseList";
import axios from "axios";
import { useState, useEffect } from "react";
const url = "/api/courses";

export default function AllCoursesPage() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isErr, setErr] = useState(false);

  const getData = async () => {
    try {
      const courses = await axios.get(url);
      setLoading(false);
      console.log(courses);
      setData(courses.data.courses);
    } catch (err) {
      setErr(true);
      setLoading(false);
      console.log(err);
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
      <h1 style={{textAlign:"center"}}>courses</h1>
      <CourseList data={data} />
    </section>
  );
}
