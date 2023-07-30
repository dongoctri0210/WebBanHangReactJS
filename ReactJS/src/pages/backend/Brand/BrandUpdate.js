import { Link, useNavigate, useParams } from "react-router-dom";
import { FaSave, FaStepBackward } from "react-icons/fa";
import BrandService from "../../../services/BrandService";
import { useState } from "react";
import { useEffect } from "react";
function BrandUpdate() {
  const navigate = useNavigate();
  const { id } = useParams("id");
  const [name, setName] = useState("");
  const [metakey, setMetakey] = useState("");
  const [metadesc, setMetadesc] = useState("");
  const [sort_order, setSortOrder] = useState(0);
  const [status, setStatus] = useState(1);
  //Chi tiết mẫu tin có id
  useEffect(function () {
    (async function () {
      await BrandService.getByID(id).then(function (result) {
        const tmp = result.data.brands;
        setName(tmp.name);
        setMetakey(tmp.metakey);
        setMetadesc(tmp.metadesc);
        setSortOrder(tmp.sort_order);
        setStatus(tmp.status);
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
  async function brandUpdate(event) {
    event.preventDefault();
    const image = document.querySelector("#image");
    var brand = new FormData();
    brand.append("name", name);
    brand.append("metakey", metakey);
    brand.append("metadesc", metadesc);
    brand.append("sort_order", sort_order);
    brand.append("status", status);
    if (image.files.length === 0) {
      brand.append("image", "");
    } else {
      brand.append("image", image.files[0]);
    }
    await BrandService.update(brand, id).then(function (res) {
      alert(res.data.message);
      navigate("/admin/brand", { replace: true });
    });
  }
  return (
    <form onSubmit={brandUpdate} method="post">
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-md-6">
              <strong className="text-success">CẬP NHẬT THƯƠNG HIỆU</strong>
            </div>
            <div className="col-md-6 text-end">
              <button type="submit" className="btn btn-sm btn-success me-2">
                <FaSave /> Lưu
              </button>
              <Link to="/admin/brand" className="btn btn-sm btn-info">
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
                <label htmlFor="name">Tên thương hiệu</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                />
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
                <label htmlFor="sort_order">Sắp xếp</label>
                <select
                  name="sort_order"
                  value={sort_order}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="form-control"
                >
                  <option value="0">None</option>
                  {brands.map(function (bra, index) {
                    return (
                      <option value={bra.sort_order + 1} key={index}>
                        Sau :{bra.name}
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

export default BrandUpdate;
