import MainNav from "./MainNav.js";
import classes from "./Layout.module.css";

export default function Layout(props) {
  return (
    <div>
      <MainNav />
      <main className={classes.main}>
        {/* the layout part in that appjs will be rendered here by using props.children */}
        {props.children}
      </main>
    </div>
  );
}
