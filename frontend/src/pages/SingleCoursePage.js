import { useLocation, useParams } from "react-router-dom";
import SingleCourse from "../components/courses/SingleCourse";

export default function SingleCoursePage() {
  const { state } = useLocation();
  const params = useParams();
  console.log(params);
  return state ? (
    <SingleCourse {...state.data}></SingleCourse>
  ) : (
    <h1>Need to fetch data, currently can't navigate using directly url</h1>
  );
}
