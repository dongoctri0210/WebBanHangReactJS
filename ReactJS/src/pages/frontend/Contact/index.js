import { useNavigate } from "react-router-dom";
import Checkpoint from "../../../assets/images/checkpoint.png";
import Logo from "../../../assets/images/logotrang.png";
import ContactService from "../../../services/ContactService";
import { FaFacebookF, FaMailBulk, FaPhoneAlt } from "react-icons/fa";
import { useState } from "react";
function Contact() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState(1);
  async function contactStore(event) {
    event.preventDefault();
    var contact = new FormData();
    contact.append("name", name);
    contact.append("email", email);
    contact.append("phone", phone);
    contact.append("address", address);
    contact.append("content", content);
    contact.append("status", status);
    await ContactService.create(contact).then(function (res) {
      alert(res.data.message);
      navigate("/", { replace: true });
    });
  }
  return (
    <section className="container">
      <h2 className="text-center">
        <span>Liên hệ</span>
      </h2>
      <div className="row">
        <div className="col-md-6">
          <img
            style={{ width: 200 }}
            className="rounded-pill"
            src={Logo}
            alt="logo"
          />
          <table>
            <tr>
              <td>
                <img src={Checkpoint} alt="" width="23" height="23" />
                <em> 123 Street, HaNoi, ABC City</em>
              </td>
            </tr>
            <tr>
              <td>
                <FaPhoneAlt />
                <em> Phone : 0123456789</em>
              </td>
            </tr>
            <tr>
              <td>
                <FaMailBulk />
                <em> Email : abc123@gmail.com</em>
              </td>
            </tr>
            <tr>
              <td>
                <FaFacebookF />
                <em> Facebook : T-Smart</em>
              </td>
            </tr>
          </table>
          <div className="col-5">
            {" "}
            <div className="goolemap">
              <iframe
                id="map"
                className="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31351.447944597792!2d106.76370870910648!3d10.816592963324657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752701a34a5d5f%3A0x30056b2fdf668565!2sHo%20Chi%20Minh%20City%20College%20of%20Industry%20and%20Trade!5e0!3m2!1sen!2s!4v1684841846289!5m2!1sen!2s"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <h5>
            Nếu bạn có thắc mắc gì,mời bạn điền thông tin để gửi yêu cầu cho
            chúng tôi, và chúng tôi sẽ liên lạc lại với bạn sớm nhất có thể .
          </h5>
          <form onSubmit={contactStore} method="post">
            <div className="row">
              <div className="form-group">
                <label>Họ và tên</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  placeholder="Nhập họ và tên đệm"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Gmail</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Nhập gmail"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Số điện thoại</label>
                <input
                  type="text"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-control"
                  placeholder="Nhập số điện thoại"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Tỉnh/Thành phố</label>
                <input
                  type="text"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="form-control"
                  placeholder="Nhập tỉnh/thành phố"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <p>Bình luận / Đánh giá</p>
                <textarea
                  type="text"
                  name="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows="4"
                  cols="85"
                ></textarea>
              </div>
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
            <input
              type="submit"
              className="btn btn-sm btn-success"
              value="Gửi bình luận"
            />
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
