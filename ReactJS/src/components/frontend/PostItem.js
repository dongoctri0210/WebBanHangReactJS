import { Link } from "react-router-dom";
import { urlImage } from "../../config";
import "../../index.css";
function PostItem(props) {
  return (
    <div className="col-md-3">
      <div className="post-item border my-2" style={{ height: 400 }}>
        <div className="post-image">
          <Link to={"/chi-tiet-bai-viet/" + props.post.slug}>
            <img
              src={urlImage + "post/" + props.post.image}
              className="img-fluid"
              alt="bai-viet"
              style={{ width: 400, height: 250 }}
            />
          </Link>

          <div className="post-nam p-2">
            <h3 className="text-center text-danger fs-6">
              <Link className="ha" to={"/chi-tiet-bai-viet/" + props.post.slug}>
                {props.post.title}
              </Link>
            </h3>
          </div>
          <div className="post-detail p-2">
            <div className="row">
              <div className="">
                <p className="">{props.post.detail}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostItem;
