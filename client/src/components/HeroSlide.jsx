import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from "swiper";
import { Navigation, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import "../css/HeroSlide.css"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import imagen1 from '../assets/imagen1.jpg'
import imagen2 from '../assets/imagen2.jpg'
import imagen3 from '../assets/imagen3.jpg'
import imagen4 from '../assets/imagen4.jpg'
import imagen5 from '../assets/imagen5.jpg'

const dataHeroSlide = [imagen1,imagen2,imagen3,imagen4,imagen5]



const HeroSlide = () => {
  SwiperCore.use([Autoplay]);

  return (
    <div className="content-slide">
      <Swiper
        modules={[Navigation, Scrollbar, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        scrollbar={{ draggable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
      >
        {dataHeroSlide.map((el, index) => (

          <SwiperSlide key={index}>
            <div className="hero-background">
              <img src={el} alt="" />
            </div>

          </SwiperSlide>

        ))}


      </Swiper>
    </div>
  )
}

export default HeroSlide