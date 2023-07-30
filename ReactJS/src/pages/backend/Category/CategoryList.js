import { Link } from "react-router-dom";
import { FaPlus, FaRegEye, FaEdit, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import CategoryService from "../../../services/CategoryService";
import { urlImage } from "../../../config";
function CategoryList() {
  const [statusdel, setStatusDel] = useState(0);
  const [categorys, setCategorys] = useState([]);
  useEffect(
    function () {
      (async function () {
        await CategoryService.getAll().then(function (result) {
          setCategorys(result.data.categorys);
        });
      })();
    },
    [statusdel]
  );
  function categoryDelete(id) {
    CategoryService.remove(id).then(function (result) {
      alert(result.data.message);
      setStatusDel(result.data.id);
    });
  }
  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-6">
            <strong className="text-success">DANH MỤC SẢN PHẨM</strong>
          </div>
          <div className="col-6 text-end">
            <Link
              className="btn btn-sm btn-success"
              to="/admin/category/create"
            >
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
                Loại sản phẩm
              </th>
              <th className="text-center">Slug</th>
              <th style={{ width: 250 }} className="text-center">
                Ngày tạo
              </th>
              <th className="text-center">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {categorys.map(function (category, index) {
              return (
                <tr key={index}>
                  <td style={{ width: 50 }}>
                    <input type="checkbox" className="text-center" />
                  </td>
                  <td style={{ width: 50 }} className="text-center">
                    {category.id}
                  </td>
                  <td style={{ width: 250 }}>
                    <img
                      src={urlImage + "category/" + category.image}
                      alt="hinh.png"
                      className="img-fluid text-center"
                    />
                  </td>
                  <td style={{ width: 500 }}>{category.name}</td>
                  <td>{category.slug}</td>
                  <td style={{ width: 250 }} className="text-center">
                    {category.created_at}
                  </td>
                  <td style={{ width: 150 }}>
                    <Link
                      className="btn btn-sm btn-info me-2"
                      to={"/admin/category/show/" + category.id}
                    >
                      <FaRegEye />
                    </Link>
                    <Link
                      className="btn btn-sm btn-primary me-2"
                      to={"/admin/category/update/" + category.id}
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => categoryDelete(category.id)}
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

export default CategoryList;
