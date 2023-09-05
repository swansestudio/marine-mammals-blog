import { Link } from "react-router-dom";
import "../styles/navigation.css";

export default function Navigation(props) {
  const { fillInDB } = props;


  return (
    <ul className="navbar">
        <li className="btn fill-btn" onClick={fillInDB}>
          Fill In
        </li>
        <li className="btn new-btn">
          <Link to="/create">Add New Post</Link>
        </li>
    </ul>
  );
}
