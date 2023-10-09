// import Swiper core and required modules
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import titleHome from '../assets/title-home.jpg'

import SwiperCore from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "../css/SubSlide.css";
const SubSlide = () => {
  SwiperCore.use([Autoplay]);
  return (
    <>
      <div className="content-sub-slide">
        <Swiper
          spaceBetween={10}
          slidesPerView={"auto"}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
        >
          <SwiperSlide>
            <div className="content-sub one">
              <div className="icon">
                <i className="fa-solid fa-phone-volume"></i>
              </div>
              <div className="sub-text">
                <p>
                  ¡Conversa con uno de <br /> nuestros especialistas!
                </p>
                <strong>
                  Fonocompras <br />
                  (01) 200 2870 <br /> Opcion1
                </strong>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="content-sub two">
              <div className="icon">
                <i className="fa-brands fa-whatsapp"></i>
              </div>
              <div className="sub-text">
                <strong>
                  ¡Contactanos a <br />
                  nuestro WhatsApp!
                </strong>
                <br />
                <strong>+51 999 999 999</strong>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="content-sub three">
              <div className="icon">
                <i className="fa-solid fa-truck-fast"></i>
              </div>
              <div className="sub-text">
                <strong>
                  ¡Estado de tu <br /> pedido
                </strong>
                <p>Siguelo aqui</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="content-sub four">
              <div className="icon">
                <i className="fa-solid fa-screwdriver-wrench"></i>
              </div>
              <div className="sub-text">
                <strong>¡Despreocupate!</strong>
                <p>
                  Conoce nuestros <br />
                  servicios y garantias
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="title-content-home">
        <h1>Conoce nuestros ultimos productos</h1>
        <img src={titleHome}/>
      </div>
    </>
  );
};

export default SubSlide;
