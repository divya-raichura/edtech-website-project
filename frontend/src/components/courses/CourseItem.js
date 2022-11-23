import classes from "./CourseItem.module.css";
import Card from "../ui/Card";
import { useNavigate } from "react-router-dom";

export default function CourseItem(props) {
  const { _id, name, image, price, createdBy } = props.data;

  const navigate = useNavigate();

  const showDetails = (_id) => {
    navigate(`/courses/${_id}`, { state: props });
  };

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={image} alt="" />
        </div>
        <div className={classes.content}>
          <h2>{name}</h2>
          <p style={{ color: "white" }}>{createdBy}</p>
          <h3 style={{ color: "orange" }}>${price}</h3>
        </div>
        <div className={classes.actions}>
          <button className={classes.viewBtn} onClick={() => showDetails(_id)}>
            view
          </button>
        </div>
      </Card>
    </li>
  );
}
