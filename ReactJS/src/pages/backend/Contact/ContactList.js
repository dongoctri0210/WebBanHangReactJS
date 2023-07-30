import { Link } from "react-router-dom";
import { FaRegEye, FaEdit, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import ContactService from "../../../services/ContactService";
function ContactList() {
  const [statusdel, setStatusDel] = useState(0);
  const [contacts, setContacts] = useState([]);
  useEffect(
    function () {
      (async function () {
        await ContactService.getAll().then(function (result) {
          setContacts(result.data.contacts);
        });
      })();
    },
    [statusdel]
  );
  function contactDelete(id) {
    ContactService.remove(id).then(function (result) {
      alert(result.data.message);
      setStatusDel(result.data.id);
    });
  }
  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-6">
            <strong className="text-success"> LIÊN HỆ</strong>
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
              <th style={{ width: 150 }} className="text-center">
                User ID
              </th>
              <th style={{ width: 250 }} className="text-center">
                Họ tên
              </th>
              <th style={{ width: 350 }} className="text-center">
                Email
              </th>
              <th style={{ width: 500 }} className="text-center">
                Nội dung góp ý
              </th>
              <th className="text-center">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(function (contact, index) {
              return (
                <tr key={index}>
                  <td style={{ width: 50 }}>
                    <input type="checkbox" className="text-center" />
                  </td>
                  <td style={{ width: 50 }} className="text-center">
                    {contact.id}
                  </td>
                  <td style={{ width: 150 }} className="text-center">
                    {contact.user_id}
                  </td>
                  <td style={{ width: 250 }}>{contact.name}</td>
                  <td style={{ width: 350 }}>{contact.email}</td>
                  <td style={{ width: 500 }}>{contact.content}</td>
                  <td style={{ width: 150 }}>
                    <Link
                      className="btn btn-sm btn-info me-2"
                      to={"/admin/contact/show/" + contact.id}
                    >
                      <FaRegEye />
                    </Link>
                    <Link
                      className="btn btn-sm btn-primary me-2"
                      to={"/admin/contact/update/" + contact.id}
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => contactDelete(contact.id)}
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

export default ContactList;
