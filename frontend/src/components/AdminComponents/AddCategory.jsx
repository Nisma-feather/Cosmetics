import { useState } from "react"


export default AddCategory=()=>{
    const [category,setCategory]=useState({
        name:'',
        icon:''
    })
    const [previewurl,setPreviewUrl]=useState("")
    return(
      <>
      <div>
            <h2 className="text-2xl mb-5 ml-5 font-bold">Add Product</h2>
      
            <div className="bg-white rounded-lg shadow-md p-6">
              <form onSubmit={handleSubmit} className="flex gap-10">
                {/* LEFT SIDE: PRODUCT DETAILS */}
                <div className="flex flex-col basis-1/2 gap-3">
                  {/* PRODUCT NAME */}
                  <label className="font-bold">Product Name:</label>
                  <input
                    type="text"
                    className="border p-2 border-gray-400 rounded"
                    name="name"
                    value={icon.name}
                    onChange={(e)=>{setCategory({...category,name:e.target.files[0]})
                     const url=URL.createObjectURL(e.target.files[0])
                     setPreviewUrl(url)}}
                  />
                  {
                    previewurl 
                  }
                  
                </div>
      
                {/* RIGHT SIDE: IMAGE UPLOAD */}
                <div className="flex flex-col basis-1/2 gap-3">
                  <h3 className="text-xl font-bold">Product Images</h3>
      
                  <div className="border-2 border-dashed border-gray-400 rounded-lg h-48 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
                    <label
                      htmlFor="imageUpload"
                      className="text-gray-500 font-medium cursor-pointer flex flex-col items-center"
                    >
                      <RiUploadCloud2Line size={27} />
                      Click or drag files to upload
                    </label>
                    <input type="file" value={category.icon} onChange={(e)=>{
                        if(e.target.files[0]){
                          setCategory({...category,icon:e.target.files[0]})
                        }
                    }}/>
                   
                  </div>
      
                  
                </div>
              </form>
      
              {/* ✅ BUTTON OUTSIDE FLEX TO ALIGN */}
              <div className="mt-5">
                <button
                  type="submit"
                
                  className="bg-[#7da827] text-white font-bold py-2 px-6 rounded hover:opacity-90"
                >
                  Save Slider
                </button>
              </div>
            </div>
          </div>

      </>
    )
}

