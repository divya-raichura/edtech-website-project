import Card from "../ui/Card";
import classes from "./NewCourse.module.css";
import { useState } from "react";

export default function NewCourse(props) {
  const [data, setData] = useState({
    name: "",
    image: "",
    description: "",
    price: "",
  });

  const handleChange = (e) => {
    // setData((prevState) => {
    //   return {
    //     ...prevState,
    //     [e.target.name]: e.target.value,
    //   };
    // });
    const key = e.target.name;
    const val = e.target.value;
    setData({ ...data, [key]: val });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = {
      ...data,
    };

    setData({
      name: "",
      image: "",
      description: "",
      price: "",
    });

    props.onPost(formData);
  };

  return (
    <Card>
      <form onSubmit={submitHandler} className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="name">Course Name</label>
          <input
            type="text"
            required
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Image Url</label>
          <input
            required
            name="image"
            value={data.image}
            onChange={handleChange}
            type="text"
            id="image"
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            value={data.description}
            onChange={handleChange}
            required
            id="description"
            rows="3"
          ></textarea>
        </div>
        <div className={classes.control}>
          <label htmlFor="price">Price</label>
          <input
            name="price"
            value={data.price}
            onChange={handleChange}
            required
            type="text"
            id="price"
          />
        </div>
        <div className={classes.actions}>
          <button>Create</button>
        </div>
      </form>
    </Card>
  );
}
