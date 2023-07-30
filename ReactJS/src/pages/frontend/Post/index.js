import { useEffect, useState } from "react";
import PostItem from "../../../components/frontend/PostItem";
import PostService from "../../../services/PostService";
function Post() {
  const [posts, setPosts] = useState([]);
  useEffect(function () {
    (async function () {
      await PostService.getPostAll(8, 1).then(function (result) {
        setPosts(result.data.posts);
      });
    })();
  }, []);
  return (
    <section className="maincontent my-3">
      <div className="container">
        <h3 className="text-danger text-center">TẤT CẢ BÀI VIẾT</h3>
      </div>
      <div className="row">
        {posts.map(function (post, index) {
          return <PostItem post={post} key={index} />;
        })}
      </div>
    </section>
  );
}

export default Post;
