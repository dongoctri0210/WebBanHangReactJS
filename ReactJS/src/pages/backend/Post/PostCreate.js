import { Link, useNavigate } from "react-router-dom";
import { FaSave, FaStepBackward } from "react-icons/fa";
import PostService from "../../../services/PostService";
import { useState } from "react";
function PostCreate() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [type, setType] = useState("");
  const [metakey, setMetakey] = useState("");
  const [metadesc, setMetadesc] = useState("");
  const [status, setStatus] = useState(1);
  const [topic_id, setTopicid] = useState(0);
  async function postStore(event) {
    event.preventDefault();
    const image = document.querySelector("#image");
    var post = new FormData();
    post.append("title", title);
    post.append("detail", detail);
    post.append("status", status);
    post.append("type", type);
    post.append("topic_id", topic_id);
    post.append("metakey", metakey);
    post.append("metadesc", metadesc);
    if (image.files.length === 0) {
      post.append("image", "");
    } else {
      post.append("image", image.files[0]);
    }
    await PostService.create(post).then(function (res) {
      alert(res.data.message);
      navigate("/admin/post", { replace: true });
    });
  }
  return (
    <form onSubmit={postStore} method="post">
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-md-6">
              <strong className="text-success">THÊM BÀI VIẾT</strong>
            </div>
            <div className="col-md-6 text-end">
              <button type="submit" className="btn btn-sm btn-success me-2">
                <FaSave /> Lưu
              </button>
              <Link to="/admin/post" className="btn btn-sm btn-info">
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
                <label htmlFor="title">Chủ đề bài viết</label>
                <input
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="type">Kiểu bài viết</label>
                <input
                  name="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="md-3">
                <label htmlFor="detail">Nội dung bài viết</label>
                <textarea
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
                <label htmlFor="topic_id">ID chủ đề</label>
                <select
                  name="topic_id"
                  value={topic_id}
                  onChange={(e) => setTopicid(e.target.value)}
                  className="form-control"
                >
                  <option value="0">None</option>
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

export default PostCreate;
