import BrandService from "../../../services/BrandService";
import { useState, useEffect } from "react";
import { urlImage } from "../../../config";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaStepBackward, FaEdit, FaTrash } from "react-icons/fa";
function BrandShow() {
  const navigate = useNavigate();
  const { id } = useParams("id");
  const [brand, setBrand] = useState([]);
  useEffect(function () {
    (async function () {
      await BrandService.getByID(id).then(function (result) {
        setBrand(result.data.brands);
      });
    })();
  }, []);
  function brandDelete(id) {
    BrandService.remove(id).then(function (result) {
      alert(result.data.message);
      navigate("/admin/brand", { replace: true });
    });
  }
  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-6">
            <strong className="text-success">CHI TIẾT THƯƠNG HIỆU</strong>
          </div>
          <div className="col-md-6 text-end">
            <Link
              to={"/admin/brand/update/" + brand.id}
              className="btn btn-sm btn-success me-1"
            >
              <FaEdit />
              Sửa
            </Link>
            <button
              onClick={() => brandDelete(brand.id)}
              className="btn btn-danger me-1"
            >
              <FaTrash />
              Xóa
            </button>
            <Link to="/admin/brand" className="btn btn-sm btn-info">
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
              <td>{brand.id}</td>
            </tr>
            <tr>
              <th>Tên thương hiệu</th>
              <td>{brand.name}</td>
            </tr>
            <tr>
              <th>Slug</th>
              <td>{brand.slug}</td>
            </tr>
            <tr>
              <th>Sắp xếp</th>
              <td>{brand.sortorder}</td>
            </tr>
            <tr>
              <th>Trạng thái</th>
              <td>{brand.status}</td>
            </tr>
            <tr>
              <th>Hình ảnh</th>
              <td>
                <img
                  src={urlImage + "brand/" + brand.image}
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

export default BrandShow;
