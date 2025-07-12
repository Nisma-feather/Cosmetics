import React, { useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import TopHeader, { BottomHeader } from './Header'
import { RxPerson } from "react-icons/rx";
import { FaRegHeart } from "react-icons/fa";
import { IoMenu, IoClose } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi2";

const NavBar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className='w-full'>
      <TopHeader />
      <div className='flex h-[70px] bg-black text-white justify-between items-center md:px-12 px-5'>
        <h1 className='kaushan font-bold text-[24px]'>BluxBox</h1>

        {/* Desktop Nav */}
        <div className='hidden poppins md:flex uppercase text-[14px] gap-10'>
          <p>Home</p>
          <p>About</p>
          <p>Categories</p>
          <p>Contact</p>
        </div>

        {/* Desktop Icons */}
        <div className='hidden md:flex gap-4'>
          <IoIosSearch size={21} />
          <RxPerson size={21} />
          <FaRegHeart size={21} />
          <HiOutlineShoppingBag size={21} />
        </div>

        {/* Mobile Menu Icon */}
        <div className='md:hidden' onClick={() => setOpenMenu(true)}>
          <IoMenu size={22} />
        </div>
      </div>

      <BottomHeader />

      {/* Mobile Nav - Always Rendered, Slides In/Out */}
      <nav
        className={`fixed top-0 right-0 w-full max-w-[350px] h-screen bg-black/90 z-50 md:hidden transform transition-transform duration-400 ${
          openMenu ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close Icon */}
        <div className='flex justify-end p-4'>
          <IoClose size={28} color="white" onClick={() => setOpenMenu(false)} />
        </div>

        {/* Scrollable Content */}
        <div className='flex flex-col justify-between h-[calc(100%-64px)] px-6 pb-20 overflow-y-auto'>
          <div className='poppins flex flex-col uppercase items-center text-[14px] gap-8 text-white mt-6'>
            <p>Home</p>
            <p>About</p>
            <p>Categories</p>
            <p>Contact</p>
            <p>Products</p>
            <p>Offers</p>
            <p>FAQ</p>
            <p>Terms</p>
          </div>
        </div>

        {/* Sticky Bottom Icons */}
        <div className='absolute bottom-0 w-full bg-black py-4 border-t border-gray-700 flex justify-center gap-10'>
          <IoIosSearch size={22} color='#fff' />
          <RxPerson size={22} color='#fff' />
          <FaRegHeart size={22} color='#fff' />
          <HiOutlineShoppingBag size={22} color='#fff' />
        </div>
      </nav>
    </header>
  )
}

export default NavBar
