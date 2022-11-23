import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleCourse from "../components/courses/SingleCourse";
import axios from "axios";
const url = "/api/courses/course/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzdiZDcwNmNlMzFiZTViNWYwOGQyMjgiLCJuYW1lIjoiZGl2eWE5IiwiaWF0IjoxNjY5MjE3NzU4fQ.rO83khtHBfYk92jEfM64we2Fkb70cPO6brP6YCPQGC0";

export default function SingleCoursePage() {
  const { courseId } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [isErr, setErr] = useState(false);

  useEffect(() => {
    const getDataFromDb = async () => {
      try {
        const res = await axios.get(url + `${courseId}`, {
          headers: { Authorization: "Bearer " + token },
        });
        setLoading(false);
        setData(res.data.course);
      } catch (error) {
        console.log(error);
        setErr(true);
        setLoading(false);
      }
    };
    getDataFromDb();
  }, [courseId]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isErr) {
    return <h1>Error... Something went wrong!</h1>;
  }

  return <SingleCourse {...data}></SingleCourse>;
}
