import CategoryService from "../../../services/CategoryService";
import { useState, useEffect } from "react";
import { urlImage } from "../../../config";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaStepBackward, FaEdit, FaTrash } from "react-icons/fa";
function CategoryShow() {
  const navigate = useNavigate();
  const { id } = useParams("id");
  const [category, setCategory] = useState([]);
  useEffect(function () {
    (async function () {
      await CategoryService.getByID(id).then(function (result) {
        setCategory(result.data.categorys);
      });
    })();
  }, []);
  function categoryDelete(id) {
    CategoryService.remove(id).then(function (result) {
      alert(result.data.message);
      navigate("/admin/category", { replace: true });
    });
  }
  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-6">
            <strong className="text-success">CHI TIẾT DANH MỤC</strong>
          </div>
          <div className="col-md-6 text-end">
            <Link
              to={"/admin/category/update/" + category.id}
              className="btn btn-sm btn-success me-1"
            >
              <FaEdit />
              Sửa
            </Link>
            <button
              onClick={() => categoryDelete(category.id)}
              className="btn btn-danger me-1"
            >
              <FaTrash />
              Xóa
            </button>
            <Link to="/admin/category" className="btn btn-sm btn-info">
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
              <td>{category.id}</td>
            </tr>
            <tr>
              <th>Tên danh mục</th>
              <td>{category.name}</td>
            </tr>
            <tr>
              <th>Slug</th>
              <td>{category.slug}</td>
            </tr>
            <tr>
              <th>Mô tả</th>
              <td>{category.metadesc}</td>
            </tr>
            <tr>
              <th>Từ khóa</th>
              <td>{category.metakey}</td>
            </tr>
            <tr>
              <th>Danh mục cha</th>
              <td>{category.parent_id}</td>
            </tr>
            <tr>
              <th>Sắp xếp</th>
              <td>{category.sortorder}</td>
            </tr>
            <tr>
              <th>Trạng thái</th>
              <td>{category.status}</td>
            </tr>
            <tr>
              <th>Hình ảnh</th>
              <td>
                <img
                  src={urlImage + "category/" + category.image}
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

export default CategoryShow;
