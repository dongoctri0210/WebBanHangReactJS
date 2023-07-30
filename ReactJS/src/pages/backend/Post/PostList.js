import { Link } from "react-router-dom";
import { FaPlus, FaRegEye, FaEdit, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import PostService from "../../../services/PostService";
import { urlImage } from "../../../config";
function PostList() {
  const [statusdel, setStatusDel] = useState(0);
  const [posts, setPosts] = useState([]);
  useEffect(
    function () {
      (async function () {
        await PostService.getAll().then(function (result) {
          setPosts(result.data.posts);
        });
      })();
    },
    [statusdel]
  );
  function postDelete(id) {
    PostService.remove(id).then(function (result) {
      alert(result.data.message);
      setStatusDel(result.data.id);
    });
  }
  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-6">
            <strong className="text-success">DANH SÁCH BÀI VIẾT</strong>
          </div>
          <div className="col-6 text-end">
            <Link className="btn btn-sm btn-success" to="/admin/post/create">
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
              <th style={{ width: 250 }} className="text-center">
                Tên bài viết
              </th>
              <th style={{ width: 500 }} className="text-center">
                Nội dung
              </th>
              <th style={{ width: 250 }} className="text-center">
                Ngày tạo
              </th>
              <th className="text-center">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(function (post, index) {
              return (
                <tr key={index}>
                  <td style={{ width: 50 }}>
                    <input type="checkbox" className="text-center" />
                  </td>
                  <td style={{ width: 50 }} className="text-center">
                    {post.id}
                  </td>
                  <td style={{ width: 250 }}>
                    <img
                      src={urlImage + "post/" + post.image}
                      alt="hinh.png"
                      className="img-fluid text-center"
                    />
                  </td>
                  <td style={{ width: 250 }}>{post.title}</td>
                  <td style={{ width: 500 }}>{post.detail}</td>
                  <td style={{ width: 450 }} className="text-center">
                    {post.created_at}
                  </td>
                  <td style={{ width: 150 }}>
                    <Link
                      className="btn btn-sm btn-info me-2"
                      to={"/admin/post/show/" + post.id}
                    >
                      <FaRegEye />
                    </Link>
                    <Link
                      className="btn btn-sm btn-primary me-2"
                      to={"/admin/post/update/" + post.id}
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => postDelete(post.id)}
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

export default PostList;
