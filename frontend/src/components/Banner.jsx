import React from 'react'
import {Swiper,SwiperSlide} from 'swiper/react';
import {Navigation,EffectFade,Autoplay} from 'swiper/modules'
import 'swiper/css/navigation'; 
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const Banner = () => {
    const slides=[
        {
            title:"banner1",
            description:"banner 1 desxcriptions",
            imageUrl:"https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg"
        },
        {
            title:"banner2",
            description:"banner 2 desxcriptions",
            imageUrl:"https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b3JnYW5pY3xlbnwwfHwwfHx8MA%3D%3D"
        },
        {
            title:"banner3",
            description:"banner 3 desxcriptions",
            imageUrl:"https://plus.unsplash.com/premium_photo-1664640733636-f7598cc7ce8d?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b3JnYW5pY3xlbnwwfHwwfHx8MA%3D%3D"
            
        },


    ]
  return (
    <Swiper
  modules={[Navigation,EffectFade, Autoplay]}
  effect="fade"
  navigation={true}
  autoplay={{ delay: 3000 }}
  loop={true}
  className="w-full h-[500px]"
>
  {slides.map((slide, index) => (
    <SwiperSlide key={index} className="fade-in">
      <div
        className="w-full h-full flex flex-col justify-center items-center bg-center bg-cover bg-no-repeat space-y-7"
        style={{ backgroundImage: `url(${slide.imageUrl})` }}
      >


        {/* Slide content */}
        
          <h2 className="uppercase font-[400] poppins text-3xl">{slide.title}</h2>
          <p className="text-2xl poppins font-bold">{slide.description}</p>
          <button className="bg-[#82ab2b] text-white  px-7 py-2 rounded hover:opacity-90 transition">
            Shop Now
          </button>
        </div>
   
    </SwiperSlide>
  ))}
</Swiper>

  )
}

export default Banner
