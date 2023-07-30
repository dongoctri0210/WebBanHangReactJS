import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import MenuService from "../../services/MenuService";
import MenuItem from "../../components/frontend/MenuItem";
import Logo from "../../assets/images/logotrang.png";
import "../../index.css";
function Menu() {
  const [menus, setMenus] = useState([]);
  useEffect(function () {
    (async function () {
      await MenuService.getByParentID("mainmenu", 0).then(function (result) {
        setMenus(result.data.menus);
      });
    })();
  }, []);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand text-white d-md-none d-sm-block" to="/">
          T-Smart
        </Link>
        <img
          src={Logo}
          alt="logo"
          style={{ width: 60, marginLeft: 30 }}
          className="rounded-pill"
        />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {menus.map(function (menu, index) {
              return <MenuItem key={index} menu={menu} />;
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Menu;
