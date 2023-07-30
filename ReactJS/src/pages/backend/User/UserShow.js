import UserService from "../../../services/UserService";
import { useState, useEffect } from "react";
import { urlImage } from "../../../config";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaStepBackward, FaEdit, FaTrash } from "react-icons/fa";
function UserShow() {
  const navigate = useNavigate();
  const { id } = useParams("id");
  const [user, setUser] = useState([]);
  useEffect(function () {
    (async function () {
      await UserService.getByID(id).then(function (result) {
        setUser(result.data.users);
      });
    })();
  }, []);
  function userDelete(id) {
    UserService.remove(id).then(function (result) {
      alert(result.data.message);
      navigate("/admin/user", { replace: true });
    });
  }
  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-6">
            <strong className="text-success">CHI TIẾT NGƯỜI DÙNG</strong>
          </div>
          <div className="col-md-6 text-end">
            <Link
              to={"/admin/user/update/" + user.id}
              className="btn btn-sm btn-success me-1"
            >
              <FaEdit />
              Sửa
            </Link>
            <button
              onClick={() => userDelete(user.id)}
              className="btn btn-danger me-1"
            >
              <FaTrash />
              Xóa
            </button>
            <Link to="/admin/user" className="btn btn-sm btn-info">
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
              <td>{user.id}</td>
            </tr>
            <tr>
              <th>Tên người dùng</th>
              <td>{user.name}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{user.email}</td>
            </tr>
            <tr>
              <th>Số điện thoại</th>
              <td>{user.phone}</td>
            </tr>
            <tr>
              <th>Tài khoản</th>
              <td>{user.username}</td>
            </tr>
            <tr>
              <th>Mật khẩu</th>
              <td>{user.password}</td>
            </tr>
            <tr>
              <th>Địa chỉ</th>
              <td>{user.address}</td>
            </tr>
            <tr>
              <th>Chức vụ</th>
              <td>{user.roles}</td>
            </tr>
            <tr>
              <th>Trạng thái</th>
              <td>{user.status}</td>
            </tr>
            <tr>
              <th>Hình ảnh</th>
              <td>
                <img
                  src={urlImage + "user/" + user.image}
                  alt="hinh"
                  className="img-fluid"
                  style={{ maxWidth: 200 }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserShow;
