import CourseItem from "./CourseItem";
import classes from "./CourseList.module.css";

export default function CourseList(props) {
  // props is obj inside which we have data array of objects
  // ie, props:{data:[{}, {}]}
  return (
    <ul className={classes.list}>
      {props.data.map((obj) => {
        // note that we are passing single objs which are inside of the array in the course item as data ie, props:{data:{}}
        return <CourseItem key={obj._id} data={obj} />;
      })}
    </ul>
  );
}
