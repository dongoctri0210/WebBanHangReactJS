import { Link } from "react-router-dom";
import { urlImage } from "../../config";
import "../../index.css";
function ProductItem(props) {
  return (
    <div className="col-md-3">
      <div className="product-item border my-2">
        <div className="product-image">
          <Link to={"/chi-tiet-san-pham/" + props.product.slug}>
            <img
              src={urlImage + "product/" + props.product.image}
              className="img-fluid"
              alt="san-pham"
              style={{ width: 400, height: 250 }}
            />
          </Link>

          <div className="product-nam p-2">
            <h3 className="text-center">
              <Link
                className="ha"
                to={"/chi-tiet-san-pham/" + props.product.slug}
              >
                {props.product.name}
              </Link>
            </h3>
          </div>
          <div className="product-price p-2">
            <div className="row">
              <div className="col-6">
                <strong className="text-danger fs-3">
                  {props.product.price_sale}
                  <sup>đ</sup>
                </strong>
              </div>
              <div className="col-6 text-end">
                <div className="fs-5">
                  <del>{props.product.price}</del>
                  <sup>đ</sup>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
