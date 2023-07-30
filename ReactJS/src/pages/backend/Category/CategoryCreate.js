import { Link, useNavigate } from "react-router-dom";
import { FaSave, FaStepBackward } from "react-icons/fa";
import CategoryService from "../../../services/CategoryService";
import { useState } from "react";
import { useEffect } from "react";
function CategoryCreate() {
  const navigate = useNavigate();
  const [categorys, setCategorys] = useState([]);
  useEffect(function () {
    (async function () {
      await CategoryService.getAll().then(function (result) {
        setCategorys(result.data.categorys);
      });
    })();
  }, []);
  const [name, setName] = useState("");
  const [metakey, setMetakey] = useState("");
  const [metadesc, setMetadesc] = useState("");
  const [parent_id, setParentid] = useState(0);
  const [sort_order, setSortOrder] = useState(0);
  const [status, setStatus] = useState(1);
  async function categoryStore(event) {
    event.preventDefault();
    const image = document.querySelector("#image");
    var category = new FormData();
    category.append("name", name);
    category.append("metakey", metakey);
    category.append("metadesc", metadesc);
    category.append("parent_id", parent_id);
    category.append("sort_order", sort_order);
    category.append("status", status);
    if (image.files.length === 0) {
      category.append("image", "");
    } else {
      category.append("image", image.files[0]);
    }
    await CategoryService.create(category).then(function (res) {
      alert(res.data.message);
      navigate("/admin/category", { replace: true });
    });
  }
  return (
    <form onSubmit={categoryStore} method="post">
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-md-6">
              <strong className="text-success">THÊM DANH MỤC</strong>
            </div>
            <div className="col-md-6 text-end">
              <button type="submit" className="btn btn-sm btn-success me-2">
                <FaSave />
                Lưu
              </button>
              <Link to="/admin/category" className="btn btn-sm btn-info">
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
                <label htmlFor="name">Tên danh mục</label>
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
                <label htmlFor="parent_id">Danh mục cha</label>
                <select
                  name="parent_id"
                  value={parent_id}
                  onChange={(e) => setParentid(e.target.value)}
                  className="form-control"
                >
                  <option value="0">Danh mục cha</option>
                  {categorys.map(function (cat, index) {
                    return <option value={cat.id}>{cat.name}</option>;
                  })}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="sort_order">Sắp xếp</label>
                <select
                  name="sort_order"
                  value={sort_order}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="form-control"
                >
                  <option value="0">None</option>
                  {categorys.map(function (cat, index) {
                    return (
                      <option value={cat.sort_order + 1}>
                        Sau :{cat.name}
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

export default CategoryCreate;
