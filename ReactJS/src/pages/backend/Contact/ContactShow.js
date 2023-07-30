import ContactService from "../../../services/ContactService";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaStepBackward, FaEdit, FaTrash } from "react-icons/fa";
function ContactShow() {
  const navigate = useNavigate();
  const { id } = useParams("id");
  const [contact, setContact] = useState([]);
  useEffect(function () {
    (async function () {
      await ContactService.getByID(id).then(function (result) {
        setContact(result.data.contacts);
      });
    })();
  }, []);
  function contactDelete(id) {
    ContactService.remove(id).then(function (result) {
      alert(result.data.message);
      navigate("/admin/contact", { replace: true });
    });
  }
  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-6">
            <strong className="text-success">CHI TIẾT LIÊN HỆ</strong>
          </div>
          <div className="col-md-6 text-end">
            <Link
              to={"/admin/contact/update/" + contact.id}
              className="btn btn-sm btn-success me-1"
            >
              <FaEdit />
              Sửa
            </Link>
            <button
              onClick={() => contactDelete(contact.id)}
              className="btn btn-danger me-1"
            >
              <FaTrash />
              Xóa
            </button>
            <Link to="/admin/contact" className="btn btn-sm btn-info">
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
              <td>{contact.id}</td>
            </tr>
            <tr>
              <th>ID Người dùng</th>
              <td>{contact.user_id}</td>
            </tr>
            <tr>
              <th>Tên người dùng</th>
              <td>{contact.name}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{contact.email}</td>
            </tr>
            <tr>
              <th>Số điện thoại</th>
              <td>{contact.phone}</td>
            </tr>
            <tr>
              <th>Chủ đề</th>
              <td>{contact.title}</td>
            </tr>
            <tr>
              <th>Nội dung</th>
              <td>{contact.content}</td>
            </tr>
            <tr>
              <th>Trả lời</th>
              <td>{contact.replay_id}</td>
            </tr>
            <tr>
              <th>Trạng thái</th>
              <td>{contact.status}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ContactShow;
