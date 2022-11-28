import { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate, useParams } from "react-router-dom";
import SingleCourse from "../components/courses/SingleCourse";
import axios from "axios";
const url = "/api/courses/course/";

export default function SingleCoursePage() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const user = AuthService.getUser();
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [isErr, setErr] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/register");
    }
    const getDataFromDb = async () => {
      try {
        console.log(user);
        const res = await axios.get(url + `${courseId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
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
