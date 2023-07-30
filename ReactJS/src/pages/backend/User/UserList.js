import { Link } from "react-router-dom";
import { FaPlus, FaRegEye, FaEdit, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import UserService from "../../../services/UserService";
import { urlImage } from "../../../config";
function UserList() {
  const [statusdel, setStatusDel] = useState(0);
  const [users, setUsers] = useState([]);
  useEffect(
    function () {
      (async function () {
        await UserService.getAll().then(function (result) {
          setUsers(result.data.users);
        });
      })();
    },
    [statusdel]
  );
  function userDelete(id) {
    UserService.remove(id).then(function (result) {
      alert(result.data.message);
      setStatusDel(result.data.id);
    });
  }
  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-6">
            <strong className="text-success">DANH MỤC NGƯỜI DÙNG</strong>
          </div>
          <div className="col-6 text-end">
            <Link className="btn btn-sm btn-success" to="/admin/user/create">
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
              <th style={{ width: 250 }} className="text-center">
                Hình ảnh
              </th>
              <th style={{ width: 250 }} className="text-center">
                Họ tên User
              </th>
              <th style={{ width: 500 }} className="text-center">
                Email
              </th>
              <th style={{ width: 250 }} className="text-center">
                Số điện thoại
              </th>
              <th style={{ width: 250 }} className="text-center">
                Địa chỉ
              </th>
              <th className="text-center">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {users.map(function (user, index) {
              return (
                <tr key={index}>
                  <td style={{ width: 50 }}>
                    <input type="checkbox" className="text-center" />
                  </td>
                  <td style={{ width: 50 }} className="text-center">
                    {user.id}
                  </td>
                  <td style={{ width: 250 }}>
                    <img
                      src={urlImage + "user/" + user.image}
                      alt="hinh.png"
                      className="img-fluid text-center"
                    />
                  </td>
                  <td style={{ width: 250 }}>{user.name}</td>
                  <td style={{ width: 500 }}>{user.email}</td>
                  <td style={{ width: 250 }} className="text-center">
                    {user.phone}
                  </td>
                  <td style={{ width: 250 }} className="text-center">
                    {user.address}
                  </td>
                  <td style={{ width: 150 }}>
                    <Link
                      className="btn btn-sm btn-info me-2"
                      to={"/admin/user/show/" + user.id}
                    >
                      <FaRegEye />
                    </Link>
                    <Link
                      className="btn btn-sm btn-primary me-2"
                      to={"/admin/user/update/" + user.id}
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => userDelete(user.id)}
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

export default UserList;
