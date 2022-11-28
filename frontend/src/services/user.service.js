import axios from "axios";

const API_URL = "/api/courses/";

const getCourses = async () => {
  try {
    const courses = await axios.get(API_URL);
    // in get we send {courselen, courses arr, msg}
    // got this obj data from axios as follow
    // then in all courses I did  setData(courses arr) and passed it in courseList
    return courses.data;
  } catch (err) {
    console.log(err);
  }
};

const UserService = {
  getCourses,
};

export default UserService;
