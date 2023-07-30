import { Link, useNavigate, useParams } from "react-router-dom";
import { FaSave, FaStepBackward } from "react-icons/fa";
import SliderService from "../../../services/SliderService";
import { useState } from "react";
import { useEffect } from "react";
function SliderUpdate() {
  const navigate = useNavigate();
  const { id } = useParams("id");
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [sort_order, setSortOrder] = useState(0);
  const [status, setStatus] = useState(1);
  //Chi tiết mẫu tin có id
  useEffect(function () {
    (async function () {
      await SliderService.getByID(id).then(function (result) {
        const tmp = result.data.sliders;
        setName(tmp.name);
        setPosition(tmp.position);
        setSortOrder(tmp.sort_order);
        //setName(tmp.image);
        setStatus(tmp.status);
      });
    })();
  }, []);
  const [sliders, setSliders] = useState([]);
  useEffect(function () {
    (async function () {
      await SliderService.getAll().then(function (result) {
        setSliders(result.data.sliders);
      });
    })();
  }, []);
  async function sliderUpdate(event) {
    event.preventDefault();
    const image = document.querySelector("#image");
    var slider = new FormData();
    slider.append("name", name);
    slider.append("position", position);
    slider.append("sort_order", sort_order);
    slider.append("status", status);
    if (image.files.length === 0) {
      slider.append("image", "");
    } else {
      slider.append("image", image.files[0]);
    }
    await SliderService.update(slider, id).then(function (res) {
      alert(res.data.message);
      navigate("/admin/slider", { replace: true });
    });
  }
  return (
    <form onSubmit={sliderUpdate} method="post">
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-md-6">
              <strong className="text-success">THÊM SLIDER</strong>
            </div>
            <div className="col-md-6 text-end">
              <button type="submit" className="btn btn-sm btn-success me-2">
                <FaSave />
                Lưu
              </button>
              <Link to="/admin/slider" className="btn btn-sm btn-info">
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
                <label htmlFor="name">Tên slider</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="metakey">Vị trí</label>
                <input
                  name="position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="sort_order">Sắp xếp</label>
                <select
                  name="sort_order"
                  value={sort_order}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="form-control"
                >
                  <option value="0">None</option>
                  {sliders.map(function (sli, index) {
                    return (
                      <option value={sli.sort_order + 1}>
                        Sau :{sli.name}
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
              <div className="mb-3">
                <label htmlFor="image">Hình ảnh</label>
                <input type="file" id="image" className="form-control" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default SliderUpdate;
