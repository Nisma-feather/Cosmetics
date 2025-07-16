import React, { useEffect, useState } from 'react';
import { MdOutlineModeEdit, MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import api from '../../customApi';
import { useNavigate } from 'react-router-dom';
import { RiUploadCloud2Line } from "react-icons/ri";

const AdminBanner = () => {
  const navigate = useNavigate();
  const [deletionMode,setDeletionMode]=useState(false);
  const [deleteId,setDeleteId]=useState(null);
  const [updateBanner,setUpdateBanner]=useState({
  })
  const [updateMode,setUpdateMode]=useState(false)
  const [updateId,setUpdateId]=useState(null);
  const [banner, setBanner] = useState([
    {
      title: 'slider1',
      description: 'description 1',
      imageUrl:
        'https://media.istockphoto.com/id/1300459022/photo/natural-organic-spa-cosmetic-products-set-with-eucalyptus-leaves-top-view-herbal-skincare.jpg?s=612x612&w=0&k=20&c=_xkB2_OnFqzJKVdDCeNCPeMp4jwLTsSQy2VvRloiPgk=',
    },
    {
      title: 'slider2',
      description: 'descriprion 2',
      imageUrl:
        'https://media.istockphoto.com/id/1134972515/photo/styled-beauty-composition-skin-creams-makeup-bottle-rose-and-pebble-stones-on-wooden-tray.jpg?s=612x612&w=0&k=20&c=A7XO7o54Na5HcG2woJuKj7KUqcdLG2rnWKal5fBPK2I=',
    },
  ]);
  const [bannerError,setBannerError]=useState({});
  
    const validate=()=>{
      let valid=true;
      let error={};
      if(!updateBanner.title.trim()){
        error.title="Title is Required"
        valid=false
      }
      if(!updateBanner.description.trim()){
        error.description="Slug is Required"
        valid = false;
      }
      if(!updateBanner.imageUrl){
        error.image="Please Choose an image"
        valid = false;
      }
      setBannerError(error);
      return valid
      
  
    }
  const fetchBanners = async () => {
    try {
      const res = await api.get(`/banner`);
      console.log(res)
      setBanner(res.data.banner);

    }
    catch (e) {
      console.log("Error in fetching the banners", e)

    }
  }
  const handleUpdate=async(e)=>{
    e.preventDefault();
    try{
      if(!validate()){
        return
      }
      const formData=new FormData();
      formData.append("title",updateBanner.title);
      formData.append("description",updateBanner.description);
      formData.append("image",updateBanner.imageUrl);
       console.log(formData)
        const res = await api.put(`/banner/${updateId}`,formData)
        alert("Banner updated successfully");
        fetchBanners();
        setUpdateMode(false);
        setUpdateId(null);



    }
    catch(e){
      console.log(e)
    }

  }
  console.log("updateBanner",updateBanner);
//Handle Delete

const handleDelete=async(e)=>{
  e.preventDefault();
  try{
    const res=await api.delete(`/banner/${deleteId}`);
    alert("Banner deleted Sucsessfully");
    setDeleteId(null);
    setDeletionMode(false);
    fetchBanners();

  }
  catch(e){
   console.log(e);
  }
}

 useEffect(()=>{
  fetchBanners();
  },[])

  return (
    <div className="flex flex-col bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-xl">All Sliders</h2>
        <button
          onClick={() => navigate("/add_banner")}
          className="bg-[#7da827] text-white px-4 py-2 font-medium rounded hover:opacity-80 transition"
        >
          + Add a slider
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3">Slider</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {banner.map((slider, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={slider.imageUrl}
                      alt={slider.name}
                      className="w-12 h-12 object-cover object-center rounded-full shadow"
                    />
                    <span className="font-semibold">{slider.title}</span>
                  </div>
                </td>
                <td className="px-6 py-3">
                  <div className="flex space-x-1">
                    <div
                      className="border p-2"
                      onClick={() => {
                        setUpdateMode(true);
                        setUpdateId(slider._id);
                        setUpdateBanner(slider)
                      }}
                    >
                      <MdOutlineModeEdit />
                    </div>
                    <div className="border p-2">
                      <MdOutlineRemoveRedEye />
                    </div>
                    <div
                      className="border p-2"
                      onClick={() => {
                        setDeletionMode(true);
                        setDeleteId(slider._id);
                      }}
                    >
                      <RiDeleteBin6Line />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deletionMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6 animate-fade-in">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this banner?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setDeletionMode(false);
                  setDeleteId(null);
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {updateMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg  p-6 animate-fade-in">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
               Update Banner
            </h3>
             <form className='flex flex-col' onSubmit={handleUpdate}>
                    <div className='flex  flex-row gap-10'>
                      <div className='flex flex-col  flex-1/2 gap-3'>
                        <h3 className='text-xl font-bold mb-[20px]'>Basic Information</h3>
                        <label htmlFor='title' className='font-bold'>Title</label>
                        <input type='text' id="title" className='border p-[3px] border-[#999] rounded-[4px]' value={updateBanner.title} onChange={(e)=>setUpdateBanner({...updateBanner,title:e.target.value})}/>
                        <label htmlFor='description' className='font-bold'>Slug</label>
                        <input type='text' id="description" className='border p-[3px] border-[#999] rounded-[4px]' value={updateBanner.description} onChange={(e)=>setUpdateBanner({...updateBanner,description:e.target.value})}/>
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
                                setUpdateBanner({...updateBanner,imageUrl:e.target.files[0]})
                            }
                          }}/>
                        </div>
                      </div>
                    </div>
                    <button type='submit' className='mt-20 bg-[#7da827] text-white font-bold p-1.5 px-5 rounded-[5px]' style={{ alignSelf: "center" }}>Save</button>
                  </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBanner;

