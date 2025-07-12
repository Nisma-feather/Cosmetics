import React from 'react'
import { FiPhone } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
const TopHeader = () => {
  return (
    <div className='bg-white h-[40px] hidden md:block'>
        <div className='roboto flex h-[100%] gap-2 items-center p-[15px]'>
            <FiPhone size={18}/>
            <p className='text-[13px]'>+91 233455767</p>
            <HiOutlineMail size={18} className='ml-6'/>
            <p className='text-[13px]'>+91 233455767</p>
            
        </div>
        
    </div>
  )
}

export default TopHeader

export const BottomHeader=()=>{
  return(
    <div className='bg-[#81ab27] py-[12px] text-center text-white poppins text-[14px] uppercase font-[500]'>
      <p>get special offers every week</p>

    </div>
  );
}