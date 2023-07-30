import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MenuService from "../../../services/MenuService";
import { FaEdit, FaStepBackward, FaTrash } from "react-icons/fa";

function MenuShow() {
  const navigate = useNavigate();
  const { id } = useParams("id");
  const [menu, setMenu] = useState([]);
  useEffect(function () {
    (async function () {
      await MenuService.getByID(id).then(function (result) {
        setMenu(result.data.menus);
      });
    })();
  }, []);
  function menuDelete(id) {
    MenuService.remove(id).then(function (result) {
      alert(result.data.message);
      navigate("/admin/menu", { replace: true });
    });
  }
  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-6">
            <strong className="text-success">CHI TIẾT MENU</strong>
          </div>
          <div className="col-md-6 text-end">
            <Link
              to={"/admin/menu/update/" + menu.id}
              className="btn btn-sm btn-success me-1"
            >
              <FaEdit />
              Sửa
            </Link>
            <button
              onClick={() => menuDelete(menu.id)}
              className="btn btn-danger me-1"
            >
              <FaTrash />
              Xóa
            </button>
            <Link to="/admin/menu" className="btn btn-sm btn-info">
              <FaStepBackward />
              Về danh sách
            </Link>
          </div>
        </div>
      </div>
      <div className="card-body">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th style={{ width: 200 }}>Tên trường</th>
              <th>Giá trị</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>ID</th>
              <td>{menu.id}</td>
            </tr>
            <tr>
              <th>Tên menu</th>
              <td>{menu.name}</td>
            </tr>
            <tr>
              <th>Kiểu</th>
              <td>{menu.type}</td>
            </tr>
            <tr>
              <th>Vị trí</th>
              <td>{menu.position}</td>
            </tr>
            <tr>
              <th>Cấp</th>
              <td>{menu.level}</td>
            </tr>
            <tr>
              <th>Danh mục cha</th>
              <td>{menu.parent_id}</td>
            </tr>
            <tr>
              <th>Sắp xếp</th>
              <td>{menu.sortorder}</td>
            </tr>
            <tr>
              <th>Trạng thái</th>
              <td>{menu.status}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MenuShow;
