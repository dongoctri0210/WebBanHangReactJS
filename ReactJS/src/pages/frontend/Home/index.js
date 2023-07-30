import Slideshow from "./Slideshow";
import Hotline from "../../../assets/images/hotline.png";
import Trunk from "../../../assets/images/giaohang.jpg";
import Money from "../../../assets/images/money.jpg";
import Doitra from "../../../assets/images/doi.png";
import CategoryService from "../../../services/CategoryService";
import { useEffect, useState } from "react";
import ProductHome from "./ProductHome";
import "../../../index.css";
function Home() {
  const [categorys, setCategorys] = useState([]);
  useEffect(function () {
    (async function () {
      await CategoryService.getCategoryByParentID(0).then(function (result) {
        setCategorys(result.data.categorys);
      });
    })();
  }, []);
  return (
    <section className="maincontent">
      <div className="slider">
        <Slideshow />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <img src={Trunk} alt="" width="50" height="50" />
            GIAO HÀNG TOÀN QUỐC
          </div>
          <div className="col-md-3">
            <img src={Money} alt="" width="50" height="50" />
            THANH TOÁN KHI NHẬN HÀNG
          </div>
          <div className="col-md-3">
            <img src={Doitra} alt="" width="50" height="50" />
            ĐỔI TRẢ TRONG 3 NGÀY
          </div>
          <div className="col-md-3">
            <img src={Hotline} alt="" width="50" height="50" />
            HOTLINE : 099999999
          </div>
        </div>
      </div>
      {categorys.map(function (category, index) {
        return <ProductHome key={index} category={category} />;
      })}
    </section>
  );
}

export default Home;
