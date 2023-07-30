import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenuService from "../../services/MenuService";

function MenuItem(props) {
  const rowmenu = props.menu;
  const [menus, setMenus] = useState([]);
  useEffect(function () {
    (async function () {
      await MenuService.getByParentID("mainmenu", rowmenu.id).then(function (
        result
      ) {
        setMenus(result.data.menus);
      });
    })();
  }, []);
  if (menus == null) {
    return (
      <li className="nav-item">
        <Link to={rowmenu.link} className="nav-link text-white">
          {rowmenu.name}
        </Link>
      </li>
    );
  } else {
    return (
      <li className="nav-item dropdown">
        <Link
          className="nav-link dropdown-toggle text-white"
          to={rowmenu.link}
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {rowmenu.name}
        </Link>
        <ul className="dropdown-menu">
          {menus.map(function (menu1, index) {
            return (
              <li key={index}>
                <Link className="dropdown-item" to={menu1.link}>
                  {menu1.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </li>
    );
  }
}

export default MenuItem;
