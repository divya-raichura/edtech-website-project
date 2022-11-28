import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "../ui/Card";
import classes from "./CourseItem.module.css";
import axios from "axios";
import AuthService from "../../services/auth.service";

const url = "/api/courses/";

// if we don't use this and use directly fav = false in useState then after
// after add to fav, localstorage is saved and fav = true
// but after refresh fav = false but we still have in localstorage
// in this way func was breaking
const getLocalStorage = (id) => {
  let fav = false;
  if (localStorage.getItem(id)) {
    fav = true;
  }
  return fav;
};

export default function SingleCourse({
  _id,
  name,
  image,
  creator,
  description,
  price,
}) {
  const navigate = useNavigate();
  const [fav, setFav] = useState(getLocalStorage(_id));
  const user = AuthService.getUser();

  useEffect(() => {
    if (!user) {
      navigate("/register");
    }
  });

  const addToFav = async (id) => {
    if (!fav) {
      console.log(url + "favorites");
      try {
        const res = await axios.post(
          url + "favorites",
          { _id: id },
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        console.log("add to fav", res);
        localStorage.setItem(id, id);
        setFav(!fav);
      } catch (error) {
        console.log(error);
      }
    } else {
      // /api/courses/favorites/:id
      try {
        const res = await axios.delete(url + `favorites/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        localStorage.removeItem(id);
        console.log("remove fav", res);
        setFav(!fav);
      } catch (error) {
        console.log(error);
      }
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
      await axios.delete(url + `${_id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      navigate(-1); // use navigate with url + "anywherer" cause it does not proxy
      alert("deleted the course");
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
        <h3>{creator}</h3>
        {/* desc and price should be shown when user clicks view */}
        <p style={{ color: "pink", fontSize: "20px" }}>{description}</p>
        <h3 style={{ color: "orange", fontSize: "50px" }}>${price}</h3>
      </div>
      <div className={classes.actions}>
        <button className={classes.viewBtn} onClick={() => navigate(-1)}>
          Back
        </button>
        {/* IF USER NOT LOGGED IN THEN THESE BUTTONS WILL NOT BE SHOWN AND IF LOGGEDIN THEN ONLY SHOW IF USER CREATED THE POST */}
        <button
          className={fav ? classes.favBtnOnClick : classes.favBtn}
          onClick={() => addToFav(_id)}
        >
          add to favorites
        </button>
        {user.user.name === creator && (
          <button className={classes.deleteBtn} onClick={handleDelete}>
            Delete
          </button>
        )}
      </div>
    </Card>
  );
}
