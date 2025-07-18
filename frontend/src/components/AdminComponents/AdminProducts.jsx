import React, { useState, useEffect } from "react";
import { MdOutlineModeEdit, MdOutlineRemoveRedEye } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import api from "../../customApi";


const AdminProducts = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState("3");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const sortOptions = [
    { name: "Low To High Price", value: "lowToHigh" },
    { name: "High To Low Price", value: "highToLow" },
    { name: "A to Z", value: "az" },
    { name: "Z to A", value: "za" },
  ];

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get(
        `/product?search=${search}&category=${category}&page=${currentPage}&sort=${sort}&limit=${limit}`
      );
      setProducts(res.data.products || []);
      setTotalPages(res.data?.pagination?.totalPages || 1);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("category");
      setCategoryList(res.data.categories);
    } catch (e) {
      console.log(e);
    }
  };

  // Load categories once
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch products whenever filters or page changes
  useEffect(() => {
    fetchProducts();
  }, [sort, limit, category, currentPage]);

  const handleSearchKey = (e) => {
    if (e.key === "Enter") {
      setCurrentPage(1);
      fetchProducts(); // Fetch immediately when pressing Enter
    }
  };

  // Pagination component for reuse (top & bottom)
  const PaginationControls = () => (
    <div className="flex justify-between items-center py-3">
      {/* Items Per Page */}
      <div className="flex items-center gap-2">
        <label className="font-medium">Items Per Page:</label>
        <select
          value={limit}
          onChange={(e) => {
            setLimit(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded px-2 py-1"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="5">5</option>
        </select>
      </div>

      {/* Prev / Page Numbers / Next */}
      <div className="flex items-center gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className={`px-3 py-1 rounded border ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
        >
          Prev
        </button>

        {/* Render page numbers */}
        {Array.from({ length: totalPages }, (_, idx) => {
          const pageNum = idx + 1;
          return (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`px-3 py-1 rounded border ${
                currentPage === pageNum
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className={`px-3 py-1 rounded border ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 ml-3">
        <h2 className="text-xl font-bold">All Products</h2>
        <button
          className="bg-[#7da827] text-white px-4 py-2 font-medium rounded hover:opacity-80 transition"
          onClick={() => navigate("/addProduct")}
        >
          + Add New Product
        </button>
      </div>

      <div className="overflow-x-auto p-6 bg-white shadow-md rounded">
        {/* Filter Row */}
        <div className="flex justify-between mb-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="border rounded-[5px] px-2 py-1 w-[200px]"
              onKeyDown={handleSearchKey}
            />
            <IoSearch className="absolute top-2 right-2 text-gray-400" />
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="border rounded px-2 py-1"
            >
              <option value="">All Categories</option>
              {categoryList.map((cat, idx) => (
                <option key={idx} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="">Sort By</option>
              {sortOptions.map((option, idx) => (
                <option key={idx} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ✅ Top Pagination Controls */}
      

        {/* Products Table */}
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
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-6">
                  Loading products...
                </td>
              </tr>
            ) : products.length > 0 ? (
              products.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded shadow"
                      />
                      <span className="font-semibold">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{item?.category?.name}</td>
                  <td className="px-6 py-4">₹{item.price}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded text-white ${
                        item?.inStock ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {item?.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex space-x-2">
                      <button className="border p-2 rounded hover:bg-gray-100">
                        <MdOutlineModeEdit />
                      </button>
                      <button className="border p-2 rounded hover:bg-gray-100">
                        <MdOutlineRemoveRedEye />
                      </button>
                      <button className="border p-2 rounded hover:bg-gray-100">
                        <RiDeleteBin6Line />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* ✅ Bottom Pagination Controls */}
        <PaginationControls />
      </div>
    </div>
  );
};

export default AdminProducts;
