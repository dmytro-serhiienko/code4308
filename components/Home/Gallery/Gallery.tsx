"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import css from "./Gallery.module.css";

export function Gallery() {
  const images = [11, 12, 13, 14, 15, 16, 17, 18, 19];

  return (
    <section className={css.gallerySection} data-anim="scale-in">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        breakpoints={{
          1000: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        className={css.mySwiper}
      >
        {images.map((num) => (
          <SwiperSlide key={num}>
            <div className={css.imageWrapper}>
              <Image
                src={`/image/gallery/${num}.png`}
                alt={`Gallery image ${num}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={css.image}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
