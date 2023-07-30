import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductService from "../../../services/ProductService";
import { urlImage } from "../../../config";
import ProductItem from "../../../components/frontend/ProductItem";
import "../../../index.css";
function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState([]);
  const [product_other, setProductOther] = useState([]);
  useEffect(
    function () {
      (async function () {
        await ProductService.getProductBySlug(slug).then(function (result) {
          if (result.data.success === true) {
            setProduct(result.data.product);
            setProductOther(result.data.product_other);
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
              src={urlImage + "product/" + product.image}
              alt="hinh"
              className="img-fluid w-100"
            />
          </div>
          <div className="col-md-6">
            <h3>Tên sản phẩm</h3>
            <p>{product.name}</p>
            <h3>Giá gốc</h3>
            <p>
              <del>{product.price}</del>
              <sup>đ</sup>
            </p>
            <h3>Giá khuyến mãi</h3>
            <p>
              {product.price_sale}
              <sup>đ</sup>
            </p>
            <h3>Giới thiệu về sản phẩm</h3>
            <p>{product.detail}</p>
          </div>
        </div>
        <h2 className="text-center my-2">
          <span>Sản phẩm cùng loại</span>
        </h2>
        <div className="row">
          {product_other.map(function (product, index) {
            return <ProductItem key={index} product={product} />;
          })}
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
