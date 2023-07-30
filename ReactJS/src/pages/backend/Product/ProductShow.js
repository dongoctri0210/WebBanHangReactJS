import ProductService from "../../../services/ProductService";
import { useState, useEffect } from "react";
import { urlImage } from "../../../config";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaStepBackward, FaEdit, FaTrash } from "react-icons/fa";
function ProductShow() {
  const navigate = useNavigate();
  const { id } = useParams("id");
  const [product, setProduct] = useState([]);
  useEffect(function () {
    (async function () {
      await ProductService.getByID(id).then(function (result) {
        setProduct(result.data.products);
      });
    })();
  }, []);
  function productDelete(id) {
    ProductService.remove(id).then(function (result) {
      alert(result.data.message);
      navigate("/admin/product", { replace: true });
    });
  }
  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-6">
            <strong className="text-success">CHI TIẾT SẢN PHẨM</strong>
          </div>
          <div className="col-md-6 text-end">
            <Link
              to={"/admin/product/update/" + product.id}
              className="btn btn-sm btn-success me-1"
            >
              <FaEdit />
              Sửa
            </Link>
            <button
              onClick={() => productDelete(product.id)}
              className="btn btn-danger me-1"
            >
              <FaTrash />
              Xóa
            </button>
            <Link to="/admin/product" className="btn btn-sm btn-info">
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
              <td>{product.id}</td>
            </tr>
            <tr>
              <th>Tên danh mục</th>
              <td>{product.name}</td>
            </tr>
            <tr>
              <th>Giá gốc</th>
              <td>{product.price}</td>
            </tr>
            <tr>
              <th>Giá sale</th>
              <td>{product.price_sale}</td>
            </tr>
            <tr>
              <th>Slug</th>
              <td>{product.slug}</td>
            </tr>
            <tr>
              <th>Mô tả</th>
              <td>{product.metadesc}</td>
            </tr>
            <tr>
              <th>Từ khóa</th>
              <td>{product.metakey}</td>
            </tr>
            <tr>
              <th>Thương hiệu</th>
              <td>{product.brand_id}</td>
            </tr>
            <tr>
              <th>Loại sản phẩm</th>
              <td>{product.category_id}</td>
            </tr>
            <tr>
              <th>Trạng thái</th>
              <td>{product.status}</td>
            </tr>
            <tr>
              <th>Hình ảnh</th>
              <td>
                <img
                  src={urlImage + "product/" + product.image}
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

export default ProductShow;
