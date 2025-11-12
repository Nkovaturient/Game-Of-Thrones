'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { EffectCards, Navigation } from 'swiper/modules';
import Image from 'next/image';

export default function ImgCarousel({ images, imageOptions = {} }) {
  return (
    <Swiper
      modules={[Navigation, EffectCards]}
      effect={'cards'}
        grabCursor={true}
      navigation
      spaceBetween={30}
      slidesPerView={1}
      autoplay={{ delay: 2000 }}
      className="w-full h-[350px] md:h-[500px] object-fit"
    >
      {images.map((src, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full h-full">
            <Image
              src={src}
              alt={`Slide ${index}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 600px"
              className="object-cover rounded-md"
              priority={imageOptions.priority ?? index === 0}
              {...imageOptions}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
