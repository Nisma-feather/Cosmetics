import { useState } from "react";
import { RiUploadCloud2Line } from "react-icons/ri";
import api from "../../customApi";
export const AddBanner = () => {
  const [newBanner,setNewBanner]=useState({
    title:"",
    description:"",
    imageUrl:"",
  });
console.log(newBanner);
const postBanner=async(e)=>{
    e.preventDefault();
    try{
        const res=await api.post()

    }
    catch(e){

    }

}
  return (
    <div>
      <h2 className='text-2xl font-bold mb-5 ml-5'>Add new Banner</h2>
    <div className='flex flex-col bg-white shadow-md rounded-lg p-6 h-full'>
      
        
      
      <form className='flex flex-col'>
        <div className='flex  flex-row gap-10'>
          <div className='flex flex-col  flex-1/2 gap-3'>
            <h3 className='text-xl font-bold mb-[20px]'>Basic Information</h3>
            <label htmlFor='title' className='font-bold'>Title</label>
            <input type='text' id="title" className='border p-[3px] border-[#999] rounded-[4px]' value={newBanner.title} onChange={(e)=>setNewBanner({...newBanner,title:e.target.value})}/>
            <label htmlFor='description' className='font-bold'>Description</label>
            <input type='text' id="description" className='border p-[3px] border-[#999] rounded-[4px]' value={newBanner.description} onChange={(e)=>setNewBanner({...newBanner,description:e.target.value})}/>
          </div>
          <div className='flex flex-col flex-1/2'>
             <h3 className='text-xl font-bold mb-[20px]'>Banner Image</h3>
            <div className='border-2 border-dashed border-gray-400 rounded-lg h-48 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer'>
           
              <label htmlFor='imageUpload' className='text-gray-500 font-medium cursor-pointer flex flex-col items-center'>
                <RiUploadCloud2Line size={27}/>
                Click or drag file to upload
                
              </label>
              <input type='file' id='imageUpload' className='hidden' onChange={(e)=>{
                if(e.target.files && e.target.files[0]){
                    setNewBanner({...newBanner,imageUrl:e.target.files[0]})
                }
              }}/>
            </div>
          </div>
        </div>
        <button type='submit' className='mt-20 bg-[#7da827] text-white font-bold p-1.5 px-5 rounded-[5px]' style={{ alignSelf: "center" }}>Save</button>
      </form>


    </div>
    </div>
  )
}