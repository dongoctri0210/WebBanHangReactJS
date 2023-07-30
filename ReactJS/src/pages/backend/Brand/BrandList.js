import { Link } from "react-router-dom";
import { FaPlus, FaRegEye, FaEdit, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { urlImage } from "../../../config";
import BrandService from "../../../services/BrandService";
function BrandList() {
  const [statusdel, setStatusDel] = useState(0);
  const [brands, setBrands] = useState([]);
  useEffect(
    function () {
      (async function () {
        await BrandService.getAll().then(function (result) {
          setBrands(result.data.brands);
        });
      })();
    },
    [statusdel]
  );
  function brandDelete(id) {
    BrandService.remove(id).then(function (result) {
      alert(result.data.message);
      setStatusDel(result.data.id);
    });
  }
  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-6">
            <strong className="text-success">DANH SÁCH THƯƠNG HIỆU</strong>
          </div>
          <div className="col-6 text-end">
            <Link className="btn btn-sm btn-success" to="/admin/brand/create">
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
              <th style={{ width: 500 }} className="text-center">
                Tên thương hiệu
              </th>
              <th className="text-center">Slug</th>
              <th style={{ width: 250 }} className="text-center">
                Ngày tạo
              </th>
              <th className="text-center">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {brands.map(function (brand, index) {
              return (
                <tr key={index}>
                  <td style={{ width: 50 }}>
                    <input type="checkbox" className="text-center" />
                  </td>
                  <td style={{ width: 50 }} className="text-center">
                    {brand.id}
                  </td>
                  <td style={{ width: 250 }}>
                    <img
                      src={urlImage + "brand/" + brand.image}
                      alt="hinh.png"
                      className="img-fluid text-center"
                    />
                  </td>
                  <td style={{ width: 500 }}>{brand.name}</td>
                  <td>{brand.slug}</td>
                  <td style={{ width: 250 }} className="text-center">
                    {brand.created_at}
                  </td>
                  <td style={{ width: 150 }}>
                    <Link
                      className="btn btn-sm btn-info me-2"
                      to={"/admin/brand/show/" + brand.id}
                    >
                      <FaRegEye />
                    </Link>
                    <Link
                      className="btn btn-sm btn-primary me-2"
                      to={"/admin/brand/update/" + brand.id}
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => brandDelete(brand.id)}
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

export default BrandList;
