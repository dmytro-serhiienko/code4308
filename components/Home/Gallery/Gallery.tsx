"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

// LightGallery
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import lgThumbnail from "lightgallery/plugins/thumbnail";

// Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import css from "./Gallery.module.css";

export function Gallery() {
  const images = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  return (
    <section className={css.gallerySection} data-anim="scale-in">
      <LightGallery
        speed={500}
        plugins={[lgZoom, lgThumbnail]}
        selector={`.${css.galleryItem}`}
      >
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={10}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true, // ОСЬ ЦЕЙ ПАРАМЕТР ЗУПИНЯЄ СВАЙПЕР ПРИ ХОВЕРІ
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            1000: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          className={css.mySwiper}
        >
          {images.map((num) => {
            const src = `/image/gallery/${num}.jpg`;
            return (
              <SwiperSlide key={num}>
                <a href={src} className={css.galleryItem} data-src={src}>
                  <div className={css.imageWrapper}>
                    <Image
                      src={src}
                      alt="CODE4308"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={css.image}
                    />
                    <div className={css.overlay}>
                      <span>Збільшити</span>
                    </div>
                  </div>
                </a>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </LightGallery>
    </section>
  );
}
