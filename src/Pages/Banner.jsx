import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion } from "framer-motion";

const slides = [
  {
    id: 1,
    image: "https://i.ibb.co.com/VprSjWH5/farmer12.jpg",
    title: "Growing Together With the Land",
    text: "From the hands of hardworking farmers to your home  — supporting sustainable agriculture and real livelihoods.",
  },
  {
    id: 2,
    image: "https://i.ibb.co.com/zTWFsp29/farmer-13.jpg",
    title: "The Heart of Farming Lives Here",
    text: "Every harvest tells a story of dedication, patience, and the bond between people and the earth.",
  },
  {
    id: 3,
    image: "https://i.ibb.co.com/cSvZjP30/farmer-14.jpg",
    title: "Sustainable Farming for a Better Tomorrow",
    text: "Together we cultivate healthier communities, greener fields, and a stronger agricultural future",
  },
];

const Banner = () => {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      slidesPerView={1}
      loop
      className="w-full"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="relative w-full flex justify-center overflow-hidden rounded-xl">
            {/* Background Image with subtle motion */}
            <motion.img
              key={slide.image}
              src={slide.image}
              alt={slide.title}
              className="w-full h-[500px] object-cover rounded-xl"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 4, ease: "easeInOut" }}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50 rounded-xl"></div>

            {/* Animated Text */}
            <motion.div
              key={slide.title}
              className="absolute left-10 top-1/3 text-white text-left"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <h2 className="text-5xl  font-extrabold font-sans mb-3 drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="text-lg font-light font-serif opacity-90">
                {slide.text}
              </p>

              {/* Call to Action Button */}
              {/* <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="mt-5 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold text-white shadow-md"
              >
                Play Now
              </motion.button> */}
            </motion.div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
