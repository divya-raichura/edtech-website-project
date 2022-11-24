import FavItem from "./FavItem";
import classes from "./CourseList.module.css";

export default function FavList(props) {
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
