import { useState } from "react";
import { Link } from "react-router-dom";

import classes from "./MainNav.module.css";

export default function MainNav() {
  const [theme, setTheme] = useState("dark");
  const toggle = () => {
    if (theme === "dark") {
      document.body.className = classes.light;
      setTheme("light");
    } else {
      document.body.className = classes.dark;
      setTheme("dark");
    }
  };
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to="/">🔥</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Courses</Link>
          </li>
          <li>
            <Link to="/new-course">New</Link>
          </li>
          <li>
            <Link to="/favorites">Favorites</Link>
          </li>
          <button className={classes.toggleBtn} onClick={toggle}>
            {theme === "dark" ? <>light</> : <>dark</>}
          </button>
        </ul>
      </nav>
    </header>
  );
}
