import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const Row = ({ title, images }) => {
  return (
    <div className="row">
      <h3 className="row__title">{title}</h3>
      <Swiper slidesPerView={5} speed={750} loop={true} spaceBetween={15}>
        {images.map((image, index) => (
          <SwiperSlide>
            <img key={index} src={image} alt={`image ${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Row;
