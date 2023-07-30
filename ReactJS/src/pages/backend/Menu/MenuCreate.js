import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuService from "../../../services/MenuService";
import { FaSave, FaStepBackward } from "react-icons/fa";

function MenuCreate() {
  const navigate = useNavigate();
  const [menus, setMenus] = useState([]);
  useEffect(function () {
    (async function () {
      await MenuService.getAll().then(function (result) {
        setMenus(result.data.menus);
      });
    })();
  }, []);
  const [name, setName] = useState("");
  const [link, setLink] = useState("/");
  const [type, setType] = useState("");
  const [level, setLevel] = useState(1);
  const [parent_id, setParentid] = useState(0);
  const [position, setPosition] = useState("");
  const [table_id, setTableID] = useState(1);
  const [sort_order, setSortOrder] = useState(0);
  const [status, setStatus] = useState(1);
  async function menuStore(event) {
    event.preventDefault();
    var menu = new FormData();
    menu.append("name", name);
    menu.append("link", link);
    menu.append("type", type);
    menu.append("level", level);
    menu.append("parent_id", parent_id);
    menu.append("position", position);
    menu.append("table_id", table_id);
    menu.append("sort_order", sort_order);
    menu.append("status", status);
    await MenuService.create(menu).then(function (res) {
      alert(res.data.message);
      navigate("/admin/menu", { replace: true });
    });
  }
  return (
    <form onSubmit={menuStore} method="post">
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-md-6">
              <strong className="text-success">THÊM MENU</strong>
            </div>
            <div className="col-md-6 text-end">
              <button type="submit" className="btn btn-sm btn-success me-2">
                <FaSave />
                Lưu
              </button>
              <Link to="/admin/menu" className="btn btn-sm btn-info">
                <FaStepBackward />
                Về danh sách
              </Link>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-9">
              <div className="mb-3">
                <label htmlFor="name">Tên menu</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="type">Kiểu</label>
                <input
                  type="text"
                  name="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="position">Vị trí</label>
                <input
                  type="text"
                  name="position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="link">Link</label>
                <textarea
                  name="link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="form-control"
                ></textarea>
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="table_id">ID Bảng</label>
                <input
                  type="text"
                  name="table_id"
                  value={table_id}
                  onChange={(e) => setTableID(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="level">Cấp</label>
                <input
                  type="text"
                  name="level"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="parent_id">Danh mục cha</label>
                <select
                  name="parent_id"
                  value={parent_id}
                  onChange={(e) => setParentid(e.target.value)}
                  className="form-control"
                >
                  <option value="0">Danh mục cha</option>
                  {menus.map(function (menu, index) {
                    return <option value={menu.id}>{menu.name}</option>;
                  })}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="sort_order">Sắp xếp</label>
                <select
                  name="sort_order"
                  value={sort_order}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="form-control"
                >
                  <option value="0">None</option>
                  {menus.map(function (menu, index) {
                    return (
                      <option value={menu.sort_order + 1}>
                        Sau :{menu.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="status">Trạng thái</label>
                <select
                  name="status"
                  className="form-control"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="1">Xuất bản</option>
                  <option value="2">Chưa xuất bản</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default MenuCreate;
