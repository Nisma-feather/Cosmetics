import React, { useState } from 'react'

const AdminProducts = () => {
  const [products,setProducts]=useState([]);
  const [loading,setLoading]=useState(false)
  return (
    <div className="flex flex-col bg-white shadow-md rounded p-6">
      <div className="flex justify-between items-center mb-4">
        <h2>All Products</h2>
        <button className="bg-[#7da827] text-white px-4 py-2 font-medium rounded hover:opacity-80 transition">
          Add new Product
        </button>
      </div>
      <div className="overflow-x-auto">
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
                    <div>
                      <img src={item.imageUrl}
                      alt={item.name}
                      className="w-12 h-12 object-cover object-center
                      rounded-full shadow" />
                      <span className="font-semibold">{item.name}</span>
                    </div>
                  </td>
                  <td>{item.category}</td>
                  <td>{item.price}</td>
                  <td>{item.stock}</td>
                  <td className="px-6 py-3">
                                    <div className="flex space-x-1">
                                      <div
                                        className="border p-2"
                                      >
                                        <MdOutlineModeEdit />
                                      </div>
                                      <div className="border p-2">
                                        <MdOutlineRemoveRedEye />
                                      </div>
                                      <div
                                        className="border p-2">
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