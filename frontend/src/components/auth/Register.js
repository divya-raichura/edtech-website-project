import Card from "../ui/Card";
import classes from "../courses/NewCourse.module.css";
import { useState } from "react";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
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
  };

  return (
    <Card>
      <form onSubmit={submitHandler} className={classes.form}>
        <div className={classes.control}>
          <input
            type="text"
            required
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="Name"
          />
        </div>
        <div className={classes.control}>
          <input
            required
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Name"
            type="Email"
            id="email"
          />
        </div>

        <div className={classes.control}>
          <input
            name="password"
            value={data.password}
            onChange={handleChange}
            required
            type="password"
            placeholder="Password"
            id="password"
          />
        </div>
        <div className={classes.actions} style={{ textAlign: "center" }}>
          <button>Register</button>
        </div>
      </form>
    </Card>
  );
}
