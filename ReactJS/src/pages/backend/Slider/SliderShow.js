import SliderService from "../../../services/SliderService";
import { useState, useEffect } from "react";
import { urlImage } from "../../../config";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaStepBackward, FaEdit, FaTrash } from "react-icons/fa";
function SliderShow() {
  const navigate = useNavigate();
  const { id } = useParams("id");
  const [slider, setSlider] = useState([]);
  useEffect(function () {
    (async function () {
      await SliderService.getByID(id).then(function (result) {
        setSlider(result.data.sliders);
      });
    })();
  }, []);
  function sliderDelete(id) {
    SliderService.remove(id).then(function (result) {
      alert(result.data.message);
      navigate("/admin/slider", { replace: true });
    });
  }
  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-6">
            <strong className="text-success">CHI TIẾT SLIDER</strong>
          </div>
          <div className="col-md-6 text-end">
            <Link
              to={"/admin/slider/update/" + slider.id}
              className="btn btn-sm btn-success me-1"
            >
              <FaEdit />
              Sửa
            </Link>
            <button
              onClick={() => sliderDelete(slider.id)}
              className="btn btn-danger me-1"
            >
              <FaTrash />
              Xóa
            </button>
            <Link to="/admin/slider" className="btn btn-sm btn-info">
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
              <td>{slider.id}</td>
            </tr>
            <tr>
              <th>Tên slider</th>
              <td>{slider.name}</td>
            </tr>
            <tr>
              <th>Vị trí</th>
              <td>{slider.position}</td>
            </tr>
            <tr>
              <th>Sắp xếp</th>
              <td>{slider.sortorder}</td>
            </tr>
            <tr>
              <th>Trạng thái</th>
              <td>{slider.status}</td>
            </tr>
            <tr>
              <th>Hình ảnh</th>
              <td>
                <img
                  src={urlImage + "slider/" + slider.image}
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

export default SliderShow;
