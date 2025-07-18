import { useEffect, useState } from "react"
import { MdOutlineModeEdit, MdOutlineRemoveRedEye } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import api from "../../customApi";
const Categories=()=>{
    const [categories,setCategories]=useState([]);
    const [search,setSearch]=useState("");

    const fetchCategory=async()=>{
      try{
        const res=await api.get(`/category?search=${search}`);
        setCategories(res.data.categories);
        console.log(res.data.categories);

      }
      catch(e){
      console.log(e)
      }
    }
    
    useEffect(()=>{
       fetchCategory();
    },[search]);

    console.log(search)
    return (
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-4 ml-3">
          <h2 className="text-xl font-bold">Categories</h2>
          <button className="bg-[#7da827] text-white px-4 py-2 font-medium hover:opacity-80 transition">
            + Add New Category
          </button>
        </div>

        <div className="bg-white p-6 shadow-md rounded">
          <div className="flex justify-between mb-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="border rounded-[5px] px-2 py-1 w-[200px]"
              />
              <IoSearch className="absolute top-2 right-2 text-gray-400" />
            </div>
          </div>
          <table className="min-w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3">Category Name</th>
                <th className="px-6 py-3">Product Count</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((item, idx) => (
                <tr key={idx} className="px-6 py-3">
                  <td>
                    <div className="flex items-center gap-4">
                      <img
                        src={item.icon}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded shadow"
                      />
                      <span className="font-semibold">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3">45</td>
                  <td className="px-6 py-3">
                    <div className="flex space-x-2">
                      <div className="border p-2">
                        <MdOutlineModeEdit />
                      </div>
                      <div className="border p-2">
                        <MdOutlineRemoveRedEye />
                      </div>
                      <div className="border p-2">
                        <RiDeleteBin6Line />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default Categories