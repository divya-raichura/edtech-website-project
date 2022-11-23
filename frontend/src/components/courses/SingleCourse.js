import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Card from "../ui/Card";
import classes from "./CourseItem.module.css";
import axios from "axios";
const url = "/api/courses/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzdiZDcwNmNlMzFiZTViNWYwOGQyMjgiLCJuYW1lIjoiZGl2eWE5IiwiaWF0IjoxNjY5MjE3NzU4fQ.rO83khtHBfYk92jEfM64we2Fkb70cPO6brP6YCPQGC0";

// if we don't use this and use directly fav = false in useState then after
// after add to fav, localstorage is saved and fav = true
// but after refresh fav = false but we still have in localstorage
// in this way func was breaking
const getLocalStorage = (id) => {
  let fav = false;
  if (localStorage.getItem(id)) {
    fav = true;
    console.log(fav);
  }
  return fav;
};

export default function SingleCourse({
  _id,
  name,
  image,
  createdBy,
  description,
  price,
}) {
  const navigate = useNavigate();
  const [fav, setFav] = useState(getLocalStorage(_id));

  const addToFav = (id) => {
    // add to fav page

    // change button color
    if (fav) {
      localStorage.removeItem(id);
      setFav(!fav);
    } else {
      localStorage.setItem(id, id);
      setFav(!fav);
    }
    // if (localStorage.getItem(`${id}`)) {
    //   localStorage.removeItem(`${id}`);
    //   setFav(false);
    //   return;
    // } else {
    //   localStorage.setItem(`${id}`, true);
    //   setFav(true);
    // }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(url + `${_id}`, {
        headers: { Authorization: "Bearer " + token },
      });
      console.log(res);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <div className={classes.image}>
        <img src={image} alt="" />
      </div>
      <div className={classes.content}>
        <h1>{name}</h1>
        <h3>{createdBy}</h3>
        {/* desc and price should be shown when user clicks view */}
        <p style={{ color: "pink", fontSize: "20px" }}>{description}</p>
        <h3 style={{ color: "white", fontSize: "50px" }}>${price}</h3>
      </div>
      <div className={classes.actions}>
        <button className={classes.viewBtn} onClick={() => navigate("/")}>
          Back
        </button>
        <button
          className={fav ? classes.favBtnOnClick : classes.favBtn}
          onClick={() => addToFav(_id)}
        >
          add to favorites
        </button>
        <button className={classes.deleteBtn} onClick={handleDelete}>
          Delete
        </button>
      </div>
    </Card>
  );
}
