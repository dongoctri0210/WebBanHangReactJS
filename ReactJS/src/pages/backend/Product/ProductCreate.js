import { Link, useNavigate } from "react-router-dom";
import { FaSave, FaStepBackward } from "react-icons/fa";
import BrandService from "../../../services/BrandService";
import CategoryService from "../../../services/CategoryService";
import ProductService from "../../../services/ProductService";
import { useState } from "react";
import { useEffect } from "react";
function ProductCreate() {
  const navigate = useNavigate();
  const [categorys, setCategorys] = useState([]);
  useEffect(function () {
    (async function () {
      await CategoryService.getAll().then(function (result) {
        setCategorys(result.data.categorys);
      });
    })();
  }, []);
  const [brands, setBrands] = useState([]);
  useEffect(function () {
    (async function () {
      await BrandService.getAll().then(function (result) {
        setBrands(result.data.brands);
      });
    })();
  }, []);
  const [name, setName] = useState("");
  const [metakey, setMetakey] = useState("");
  const [metadesc, setMetadesc] = useState("");
  const [detail, setDetail] = useState("");
  const [category_id, setCategoryid] = useState(0);
  const [brand_id, setBrandid] = useState(0);
  const [status, setStatus] = useState(1);
  const [price, setPrice] = useState("");
  const [price_sale, setPriceSale] = useState("");
  const [qty, setQty] = useState(1);
  async function productStore(event) {
    event.preventDefault();
    const image = document.querySelector("#image");
    var product = new FormData();
    product.append("name", name);
    product.append("metakey", metakey);
    product.append("metadesc", metadesc);
    product.append("category_id", category_id);
    product.append("brand_id", brand_id);
    product.append("price", price);
    product.append("price_sale", price_sale);
    product.append("qty", qty);
    product.append("detail", detail);
    product.append("status", status);
    product.append("image", image.files[0]);
    await ProductService.create(product).then(function (res) {
      alert(res.data.message);
      navigate("/admin/product", { replace: true });
    });
  }
  return (
    <form onSubmit={productStore} method="post">
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-md-6">
              <strong className="text-success">THÊM SẢN PHẨM</strong>
            </div>
            <div className="col-md-6 text-end">
              <button type="submit" className="btn btn-sm btn-success me-2">
                <FaSave />
                Lưu
              </button>
              <Link to="/admin/product" className="btn btn-sm btn-info">
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
                <label htmlFor="name">Tên sản phẩm</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="price">Giá gốc</label>
                <input
                  type="text"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="price_sale">Giá sale</label>
                <input
                  type="text"
                  name="price_sale"
                  value={price_sale}
                  onChange={(e) => setPriceSale(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="qty">QTY</label>
                <input
                  type="text"
                  name="qty"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="detail">Chi tiết</label>
                <textarea
                  type="text"
                  name="detail"
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                  className="form-control"
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="metakey">Từ khóa</label>
                <textarea
                  name="metakey"
                  value={metakey}
                  onChange={(e) => setMetakey(e.target.value)}
                  className="form-control"
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="metadesc">Mô tả</label>
                <textarea
                  name="metadesc"
                  value={metadesc}
                  onChange={(e) => setMetadesc(e.target.value)}
                  className="form-control"
                ></textarea>
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="brand_id">Thương hiệu</label>
                <select
                  name="parent_id"
                  value={brand_id}
                  onChange={(e) => setBrandid(e.target.value)}
                  className="form-control"
                >
                  <option value="0">Chọn thương hiệu</option>
                  {brands.map(function (bra, index) {
                    return (
                      <option value={bra.id} key={index}>
                        {bra.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="category_id">Loại sản phẩm</label>
                <select
                  name="category_id"
                  value={category_id}
                  onChange={(e) => setCategoryid(e.target.value)}
                  className="form-control"
                >
                  <option value="0">Chọn loại sản phẩm</option>
                  {categorys.map(function (cat, index) {
                    return (
                      <option value={cat.id} key={index}>
                        {cat.name}
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

export default ProductCreate;
