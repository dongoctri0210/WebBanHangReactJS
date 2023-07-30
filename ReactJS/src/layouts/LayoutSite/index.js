import { Outlet } from "react-router-dom";
import Menu from "./Menu";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function LayoutSite() {
  return (
    <>
      <Menu />
      <Outlet />
      <Footer />
    </>
  );
}

export default LayoutSite;
