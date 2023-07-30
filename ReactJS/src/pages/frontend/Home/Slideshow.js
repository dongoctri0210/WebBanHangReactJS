import { useEffect, useState } from "react";
import SliderService from "../../../services/SliderService";
import { urlImage } from "../../../config";
function Slideshow() {
  const [sliders, setSliders] = useState([]);
  useEffect(function () {
    (async function () {
      await SliderService.getByPosition("slidershow").then(function (result) {
        setSliders(result.data.sliders);
      });
    })();
  }, []);
  return (
    <div id="carouselExample" className="carousel slide">
      <div className="carousel-inner">
        {sliders.map(function (slider, index) {
          if (index === 0) {
            return (
              <div className="carousel-item active" key={index}>
                <img
                  src={urlImage + "slider/" + slider.image}
                  className="d-block w-100"
                  alt={slider.name} 
                />
              </div>
            );
          } else {
            return (
              <div className="carousel-item" key={index}>
                <img
                  src={urlImage + "slider/" + slider.image}
                  className="d-block w-100"
                  alt={slider.name}
                />
              </div>
            );
          }
        })}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Slideshow;
