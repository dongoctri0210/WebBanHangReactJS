import { Link } from "react-router-dom";
import { FaPlus, FaRegEye, FaEdit, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import SliderService from "../../../services/SliderService";
import { urlImage } from "../../../config";
function SliderList() {
  const [statusdel, setStatusDel] = useState(0);
  const [sliders, setSliders] = useState([]);
  useEffect(
    function () {
      (async function () {
        await SliderService.getAll().then(function (result) {
          setSliders(result.data.sliders);
        });
      })();
    },
    [statusdel]
  );
  function sliderDelete(id) {
    SliderService.remove(id).then(function (result) {
      alert(result.data.message);
      setStatusDel(result.data.id);
    });
  }
  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-6">
            <strong className="text-success">DANH SÁCH SLIDER</strong>
          </div>
          <div className="col-6 text-end">
            <Link className="btn btn-sm btn-success" to="/admin/slider/create">
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
              <th style={{ width: 450 }} className="text-center">
                Hình ảnh
              </th>
              <th style={{ width: 500 }} className="text-center">
                Tên slider
              </th>
              <th style={{ width: 250 }} className="text-center">
                Ngày tạo
              </th>
              <th className="text-center">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {sliders.map(function (slider, index) {
              return (
                <tr key={index}>
                  <td style={{ width: 50 }}>
                    <input type="checkbox" className="text-center" />
                  </td>
                  <td style={{ width: 50 }} className="text-center">
                    {slider.id}
                  </td>
                  <td style={{ width: 250 }}>
                    <img
                      src={urlImage + "slider/" + slider.image}
                      alt="hinh.png"
                      className="img-fluid text-center"
                    />
                  </td>
                  <td style={{ width: 500 }} className="text-center">
                    {slider.name}
                  </td>
                  <td style={{ width: 450 }} className="text-center">
                    {slider.created_at}
                  </td>
                  <td style={{ width: 150 }}>
                    <Link
                      className="btn btn-sm btn-info me-2"
                      to={"/admin/slider/show/" + slider.id}
                    >
                      <FaRegEye />
                    </Link>
                    <Link
                      className="btn btn-sm btn-primary me-2"
                      to={"/admin/slider/update/" + slider.id}
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => sliderDelete(slider.id)}
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

export default SliderList;
