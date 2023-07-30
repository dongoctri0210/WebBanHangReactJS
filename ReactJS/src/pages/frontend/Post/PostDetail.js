import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostService from "../../../services/PostService";
import { urlImage } from "../../../config";

function PostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState([]);
  useEffect(
    function () {
      (async function () {
        await PostService.getPostBySlug(slug).then(function (result) {
          if (result.data.success === true) {
            setPost(result.data.post);
          }
        });
      })();
    },
    [slug]
  );
  return (
    <section className="maincontent">
      <div className="container my-4">
        <div className="row">
          <div className="col-md-6">
            <img
              src={urlImage + "post/" + post.image}
              alt="hinh"
              className="img-fluid w-100"
            />
          </div>
          <div className="col-md-6">
            <h3>Chủ đề bài viết</h3>
            <p>{post.title}</p>
            <h3>Chi tiết bài viết</h3>
            <p>{post.detail}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PostDetail;
