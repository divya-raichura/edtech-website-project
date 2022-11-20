import classes from "./CourseItem.module.css";
import Card from "../ui/Card";

export default function CourseItem(props) {
  const { title, image, address, description } = props.data;
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={image} alt="" />
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
          <address>{address}</address>
          <p>{description}</p>
        </div>
        <div className={classes.actions}>
          <button>to favorites</button>
        </div>
      </Card>
    </li>
  );
}
