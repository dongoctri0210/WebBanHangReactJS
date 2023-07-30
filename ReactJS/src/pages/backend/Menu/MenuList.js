import { Link } from "react-router-dom";
import { FaPlus, FaRegEye, FaEdit, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import MenuService from "../../../services/MenuService";
function MenuList() {
  const [statusdel, setStatusDel] = useState(0);
  const [menus, setMenus] = useState([]);
  useEffect(
    function () {
      (async function () {
        await MenuService.getAll().then(function (result) {
          setMenus(result.data.menus);
        });
      })();
    },
    [statusdel]
  );
  function menuDelete(id) {
    MenuService.remove(id).then(function (result) {
      alert(result.data.message);
      setStatusDel(result.data.id);
    });
  }
  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-6">
            <strong className="text-success">DANH MỤC MENU</strong>
          </div>
          <div className="col-6 text-end">
            <Link className="btn btn-sm btn-success" to="/admin/menu/create">
              <FaPlus />
              Thêm
            </Link>
          </div>
        </div>
      </div>
      <div className="card-body">
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th style={{ width: 50 }} className="text-center">
                #
              </th>
              <th style={{ width: 50 }} className="text-center">
                ID
              </th>
              <th style={{ width: 500 }} className="text-center">
                Tên menu
              </th>
              <th className="text-center">Vị trí</th>
              <th className="text-center">Cấp</th>
              <th style={{ width: 250 }} className="text-center">
                Ngày tạo
              </th>
              <th className="text-center">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {menus.map(function (menu, index) {
              return (
                <tr key={index}>
                  <td style={{ width: 50 }}>
                    <input type="checkbox" className="text-center" />
                  </td>
                  <td style={{ width: 50 }} className="text-center">
                    {menu.id}
                  </td>
                  <td style={{ width: 500 }}>{menu.name}</td>
                  <td>{menu.position}</td>
                  <td>{menu.level}</td>
                  <td style={{ width: 250 }} className="text-center">
                    {menu.created_at}
                  </td>
                  <td style={{ width: 150 }}>
                    <Link
                      className="btn btn-sm btn-info me-2"
                      to={"/admin/menu/show/" + menu.id}
                    >
                      <FaRegEye />
                    </Link>
                    <Link
                      className="btn btn-sm btn-primary me-2"
                      to={"/admin/menu/update/" + menu.id}
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => menuDelete(menu.id)}
                      className="btn btn-sm btn-danger"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MenuList;
