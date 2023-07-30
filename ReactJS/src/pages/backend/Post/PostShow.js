import PostService from "../../../services/PostService";
import { useState, useEffect } from "react";
import { urlImage } from "../../../config";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaStepBackward, FaEdit, FaTrash } from "react-icons/fa";
function PostShow() {
  const navigate = useNavigate();
  const { id } = useParams("id");
  const [post, setPost] = useState([]);
  useEffect(function () {
    (async function () {
      await PostService.getByID(id).then(function (result) {
        setPost(result.data.posts);
      });
    })();
  }, []);
  function postDelete(id) {
    PostService.remove(id).then(function (result) {
      alert(result.data.message);
      navigate("/admin/post", { replace: true });
    });
  }
  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-6">
            <strong className="text-success">CHI TIẾT BÀI VIẾT</strong>
          </div>
          <div className="col-md-6 text-end">
            <Link
              to={"/admin/post/update/" + post.id}
              className="btn btn-sm btn-success me-1"
            >
              <FaEdit />
              Sửa
            </Link>
            <button
              onClick={() => postDelete(post.id)}
              className="btn btn-danger me-1"
            >
              <FaTrash />
              Xóa
            </button>
            <Link to="/admin/post" className="btn btn-sm btn-info">
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
              <td>{post.id}</td>
            </tr>
            <tr>
              <th>Chủ đề</th>
              <td>{post.title}</td>
            </tr>
            <tr>
              <th>Slug</th>
              <td>{post.slug}</td>
            </tr>
            <tr>
              <th>Chi tiết</th>
              <td>{post.detail}</td>
            </tr>
            <tr>
              <th>Kiểu bài viết</th>
              <td>{post.type}</td>
            </tr>
            <tr>
              <th>Mô tả</th>
              <td>{post.metadesc}</td>
            </tr>
            <tr>
              <th>Từ khóa</th>
              <td>{post.metakey}</td>
            </tr>
            <tr>
              <th>Trạng thái</th>
              <td>{post.status}</td>
            </tr>
            <tr>
              <th>Hình ảnh</th>
              <td>
                <img
                  src={urlImage + "post/" + post.image}
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

export default PostShow;
