import { useEffect, useState } from "react";
import ProductService from "../../../services/ProductService";
import CategoryService from "../../../services/CategoryService";
import ProductItem from "../../../components/frontend/ProductItem";
import { useParams } from "react-router-dom";
import "../../../index.css"
function ProductCategory() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  useEffect(
    function () {
      (async function () {
        try {
          const infocategory = await CategoryService.getCategoryBySlug(slug);
          const catid = infocategory.data.categorys.id;
          console.log(infocategory.data);
          const infoproduct = await ProductService.getProductByCategoryID(
            catid,
            100
          );
          setProducts(infoproduct.data.products);
        } catch (error) {
          console.error(error);
        }
      })();
    },
    [slug]
  );
  return (
    <section className="maincontent my-3">
      <div className="container">
        <h2 className="text-danger text-center">
          <span>SẢN PHẨM</span>
        </h2>
      </div>
      <div className="row">
        {products.map(function (product, index) {
          return <ProductItem product={product} key={index} />;
        })}
      </div>
    </section>
  );
}

export default ProductCategory;
