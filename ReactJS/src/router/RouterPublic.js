import Home from "../pages/frontend/Home";
import Product from "../pages/frontend/Product";
import ContactCreate from "../pages/frontend/Contact";
import Post from "../pages/frontend/Post";
import ProductDetail from "../pages/frontend/Product/ProductDetail";
import PostDetail from "../pages/frontend/Post/PostDetail";
import ProductCategory from "../pages/frontend/ProductCategory";
import ProductBrand from "../pages/frontend/ProductBrand";
import GioiThieu from "../pages/frontend/GioiThieu";
const RouterPublic = [
  { path: "/", component: Home },
  { path: "/san-pham", component: Product },
  { path: "/chi-tiet-san-pham/:slug", component: ProductDetail },
  { path: "/chi-tiet-bai-viet/:slug", component: PostDetail },
  { path: "/san-pham/:slug", component: ProductCategory },
  { path: "/thuong-hieu/:slug", component: ProductBrand },
  { path: "/lien-he/store", component: ContactCreate },
  { path: "/gioi-thieu", component: GioiThieu },
  { path: "/bai-viet", component: Post },
];
export default RouterPublic;
