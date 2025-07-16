import React, { useState,useEffect } from 'react'
import { MdOutlineModeEdit, MdOutlineRemoveRedEye } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RiUploadCloud2Line } from "react-icons/ri";
import { Navigate, useNavigate } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import api from '../../customApi'
const AdminProducts = () => {
  const navigate=useNavigate();
  const [products, setProducts] = useState([]);
  const [loading,setLoading]=useState(false);
  const [search,setSearch]=useState("");

 const fetchProducts=async()=>{
   try{
    const res =await api.get("/product");
    setProducts(res.data.products)
    console.log(res.data.products)
   }
   catch(e){
     console.log(e)
   }
 }
 useEffect(()=>{
   fetchProducts();
 },[])

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-4 ml-3">
        <h2>All Products</h2>
        <button
          className="bg-[#7da827] text-white px-4 py-2 font-medium rounded hover:opacity-80 transition"
          onClick={() => navigate("/addProduct")}
        >
          Add new Product
        </button>
      </div>
      <div className="overflow-x-auto p-6 bg-white shadow-md rounded">
        <div className="relative mb-[45px]">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search"
            className="absolute border border-[#f9f9f9] rounded-[5px]  w-[200px]"
          />
          <IoSearch className="absolute top-[5px] left-[175px]"/>
        </div>

        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Stock</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, idx) => {
              return (
                <tr key={idx} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-12 h-12 object-cover object-center
                      rounded-full shadow"
                      />
                      <span className="font-semibold">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{item?.category?.name}</td>
                  <td className="px-6 py-4">{item.price}</td>
                  <td className="px-6 py-4">
                    <div
                      className={`${
                        item?.inStock ? "bg-green-500" : "bg-red-500"
                      } px-[10px] py-[5px] rounded-[5px] text-center`}
                    >
                      <p className="text-white font-bold">
                        {item?.inStock ? "In Stock" : "Stock Out"}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex space-x-1">
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
              );
            })}
          </tbody>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminProducts