import { useEffect, useState } from "react";
import ProductItem from "../../../components/frontend/ProductItem";
import ProductService from "../../../services/ProductService";
import "../../../index.css";
function Product() {
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(8);
  useEffect(
    function () {
      (async function () {
        await ProductService.getProductAll(limit, 1).then(function (result) {
          setProducts(result.data.products);
        });
      })();
    },
    [limit]
  );
  return (
    <section className="maincontent my-3">
      <div className="container">
        <h2 className="text-danger text-center">
          <span>TẤT CẢ SẢN PHẨM</span>
        </h2>
      </div>
      <div className="row">
        {products.map(function (product, index) {
          return <ProductItem product={product} key={index} />;
        })}
      </div>
      <div className="row">
        <div className="col-12 text-center my-2">
          <button
            className="btn btn-success"
            onClick={() => setLimit(limit + 8)}
          >
            Xem thêm
          </button>
        </div>
      </div>
    </section>
  );
}

export default Product;
