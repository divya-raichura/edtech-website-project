import FavItem from "./FavItem";
import classes from "./CourseList.module.css";
import AuthService from "../../services/auth.service";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function FavList(props) {
  const navigate = useNavigate();
  // const user = AuthService.getUser();

  // useEffect(() => {
  //   if (!user) { 
  //     navigate("/register");
  //   }
  // });

  console.log("favlist", props);
  return (
    <ul className={classes.list}>
      {props.data.map((obj) => {
        // note that we are passing single objs which are inside of the array in the course item as data ie, props:{data:{}}
        return <FavItem key={obj._id} data={obj} />;
      })}
    </ul>
  );
}
