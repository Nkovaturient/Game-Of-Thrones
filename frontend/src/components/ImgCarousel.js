'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { EffectCards, Navigation } from 'swiper/modules';
import Image from 'next/image';

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
          <div className="relative w-full h-full">
            <Image
              src={src}
              alt={`Slide ${index}`}
              fill
              className="object-cover rounded-md"
              priority={index === 0}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
