'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { EffectCards, Navigation } from 'swiper/modules';

export default function ImgCarousel({ images }) {
  return (
    <Swiper
      modules={[Navigation, EffectCards]}
      effect={'cards'}
        grabCursor={true}
      navigation
      spaceBetween={30}
      slidesPerView={1}
      autoplay={{ delay: 2000 }}
      className="w-full h-[300px] md:h-[500px] object-fit"
    >
      {images.map((src, index) => (
        <SwiperSlide key={index}>
          <img
            src={src}
            alt={`Slide ${index}`}
            // className="w-full h-full object-cover rounded-lg"
            className="object-cover w-full h-full rounded-md"
                srcSet={`${src}?w=480 480w, ${src}?w=768 768w, ${src}?w=1200 1200w`}
  sizes="(max-width: 768px) 480px, (max-width: 1200px) 768px, 1200px"
  loading='lazy'
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
