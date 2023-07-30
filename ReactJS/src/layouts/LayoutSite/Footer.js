import Checkpoint from "../../assets/images/checkpoint.png";
import Logo from "../../assets/images/logotrang.png";
import {
  FaFacebookF,
  FaMailBulk,
  FaPhoneAlt,
  FaRegCheckCircle,
} from "react-icons/fa";
import "../../index.css";
function Footer() {
  return (
    <footer>
      <section className="footer">
        <div className="row">
          <div className="col-md-4">
            <img
              src={Logo}
              alt=""
              style={{ width: 250, marginLeft: 100 }}
              className="rounded-pill my-3"
            />
          </div>
          <div className="col-md-4">
            <h1 className="aaa">Thông tin</h1>
            <div className="haha">
              <FaRegCheckCircle />
              <em> Dịch vụ chăm sóc khách hàng</em>
            </div>
            <div className="haha">
              <FaRegCheckCircle />
              <em> Giới thiệu</em>
            </div>
            <div className="haha">
              <FaRegCheckCircle />
              <em> Các điều khoản</em>
            </div>
            <div className="haha">
              <FaRegCheckCircle />
              <em> Chính sách bảo mật</em>
            </div>
            <div className="haha">
              <FaRegCheckCircle />
              <em> Thông tin giao hàng</em>
            </div>
          </div>
          <div className="col-md-4">
            <h1>Liên hệ</h1>
            <table>
              <tr>
                <td className="haha">
                  <img src={Checkpoint} alt="" width="23" height="23" />
                  <em> 123 Street, HaNoi, ABC City</em>
                </td>
              </tr>
              <tr>
                <td className="haha">
                  <FaPhoneAlt />
                  <em> Phone : 0123456789</em>
                </td>
              </tr>
              <tr>
                <td className="haha">
                  <FaMailBulk />
                  <em> Email : abc123@gmail.com</em>
                </td>
              </tr>
              <tr>
                <td className="haha">
                  <FaFacebookF />
                  <em> Facebook : T-Smart</em>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <h5 className="text-center">
          Thiết kế bởi : Đỗ Ngọc Trí - Mã sinh viên : 2118110321
        </h5>
      </section>
    </footer>
  );
}

export default Footer;
