import { useEffect, useState } from "react";
import ProductItem from "../../../components/frontend/ProductItem";
import ProductService from "../../../services/ProductService";
import { Link } from "react-router-dom";
function ProductHome(props) {
  const [products, setProduct] = useState([]);
  useEffect(function () {
    (async function () {
      await ProductService.getProductHome(8, props.category.id).then(function (
        result
      ) {
        setProduct(result.data.products);
      });
    })();
  }, []);
  if (products != null) {
    return (
      <div className="container my-3">
        <div className="product-category">
          <h2 className="text-center" id="">
            <span>{props.category.name}</span>
          </h2>
          <div className="row">
            {products.map(function (product, index) {
              return <ProductItem product={product} key={index} />;
            })}
          </div>
        </div>
        <div className="text-center my-3">
          <Link
            to={"san-pham/" + props.category.slug}
            className="btn btn-success"
          >
            Xem thêm
          </Link>
        </div>
      </div>
    );
  }
}

export default ProductHome;
