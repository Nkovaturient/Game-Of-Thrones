// app/tribute/components/CarouselWithText.jsx
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper/modules';

export default function Carousel() {
  const images = [
    '/e4.jpg',
    '/drag.jpg',
    '/art.jpg',
    '/e8.jpg',
    '/d2.jpg',
    '/all.jpg',
    '/ap.jpg',
    '/e2.jpg',
  ];

  return (
    <div className="w-full min-h-screen  text-white flex flex-col items-center">
      {/* Carousel */}
      <Swiper
        modules={[EffectCoverflow ,Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={'auto'}
        navigation
        centeredSlides={true}
        effect={'coverflow'}
        coverflowEffect={{
            rotate: 50,
            stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        className="w-full h-[70vh] md:h-[80vh]"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="relative flex justify-center items-center w-full h-full">
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                width={384}
                height={512}
                className="object-cover w-96 h-auto max-h-[90%] rounded-md"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="max-w-4xl px-4 py-8 text-center space-y-4">
        <h2 className="text-3xl font-bold mb-4 hero-text">Daenerys Targaryen: The Mother of Dragons</h2>
        <p className="text-lg text-gray-300">
          Emilia Clarke is renowned for her role as Daenerys Targaryen in Game of Thrones. Her portrayal of the Mother of Dragons has left an indelible mark on television history, captivating audiences with her commanding presence and emotional depth.
        </p>
        <p className="text-lg text-gray-300">
          {"Oh, Daenerys Targaryen. With her platinum hair, unyielding determination, and a killer catchphrase (Dracarys!), Emilia Clarke soared to iconic status as the Dragon Queen. Her arc—from an exiled princess to a revolutionary conqueror—is a masterclass in character evolution. Every dragon ride and empowering monologue cements her as a fire-breathing symbol of justice, vengeance, and occasionally, fiery destruction."}
        </p>
        <p className="text-lg text-gray-300">
          {"Fun fact: Emilia delivered all her High Valyrian (fake language alert!) lines with such conviction, you’d think she grew up in dragon school."}
        </p>
      </div>
    </div>
  );
}
