import { Link } from "react-router-dom";
import { FaPlus, FaRegEye, FaEdit, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { urlImage } from "../../../config";
import ProductService from "../../../services/ProductService";
function ProductList() {
  const [statusdel, setStatusDel] = useState(0);
  const [products, setProducts] = useState([]);
  useEffect(
    function () {
      (async function () {
        await ProductService.getAll().then(function (result) {
          setProducts(result.data.products);
        });
      })();
    },
    [statusdel]
  );
  function productDelete(id) {
    ProductService.remove(id).then(function (result) {
      alert(result.data.message);
      setStatusDel(result.data.id);
    });
  }
  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-6">
            <strong className="text-success">TẤT CẢ SẢN PHẨM</strong>
          </div>
          <div className="col-6 text-end">
            <Link className="btn btn-sm btn-success" to="/admin/product/create">
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
                Tên sản phẩm
              </th>
              <th className="text-center">Giá gốc</th>
              <th className="text-center">Giá sale</th>
              <th style={{ width: 250 }} className="text-center">
                Ngày tạo
              </th>
              <th className="text-center">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {products.map(function (product, index) {
              return (
                <tr key={index}>
                  <td style={{ width: 50 }}>
                    <input type="checkbox" className="text-center" />
                  </td>
                  <td style={{ width: 50 }} className="text-center">
                    {product.id}
                  </td>
                  <td style={{ width: 250 }}>
                    <img
                      src={urlImage + "product/" + product.image}
                      alt="hinh.png"
                      className="img-fluid text-center"
                    />
                  </td>
                  <td style={{ width: 500 }}>{product.name}</td>
                  <td className="text-center">{product.price}</td>
                  <td className="text-center">{product.price_sale}</td>
                  <td style={{ width: 250 }} className="text-center">
                    {product.created_at}
                  </td>
                  <td style={{ width: 150 }}>
                    <Link
                      className="btn btn-sm btn-info me-2"
                      to={"/admin/product/show/"+product.id}
                    >
                      <FaRegEye />
                    </Link>
                    <Link
                      className="btn btn-sm btn-primary me-2"
                      to={"/admin/product/update/" + product.id}
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => productDelete(product.id)}
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

export default ProductList;
