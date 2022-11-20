import { Link } from "react-router-dom";

import classes from "./MainNav.module.css";

export default function MainNav() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to="/">🔥</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">All Courses</Link>
          </li>
          <li>
            <Link to="/new-course">Add New Course</Link>
          </li>
          <li>
            <Link to="/favorites">My Favorites</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
