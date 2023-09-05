import Header from "./Header";
import Navigation from "./Navigation";
import { Outlet } from "react-router-dom";

export default function Layout(props) {
  return (
    <div>
      <Header title="Marine Mammals MongoDB Blog" />
      <Navigation {...props} />
      <Outlet />
    </div>
  );
}
