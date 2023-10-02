import React, { useContext } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from "swiper";
import { Navigation, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import UserContext from '../../context/UserContext';
import "../../css/HeroSlide.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const HeroSlide = () => {
  const { getDataProducts } = useContext(UserContext);
  console.log(getDataProducts);
  SwiperCore.use([Autoplay]);
  return (
    <div className="content-slide">
      <Swiper
        modules={[Navigation, Scrollbar, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
      
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        autoplay={{ delay: 4000 }}
      >
        {getDataProducts.map((el, index) => (

          <SwiperSlide key={index}>
            <div className="hero-background" style={{ backgroundImage: `url(data:image/png;base64,${el.imagen})` }}>
              <p>asdsad</p>

            </div>

          </SwiperSlide>

        ))}


      </Swiper>

      <div className="a"></div>
    </div>
  )
}

export default HeroSlide