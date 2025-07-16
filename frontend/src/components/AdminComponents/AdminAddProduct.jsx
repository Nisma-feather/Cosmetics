import React, { useEffect, useState } from "react";
import { RiUploadCloud2Line } from "react-icons/ri";
import api from "../../customApi";

const AdminAddProduct = () => {
  const [newproduct, setNewProduct] = useState({
    name: "",
    shortDescription: "",
    details: "",
    price: "",
    category: "",
    offer: 0,
    inStock: true,
  });

  const [errors, setErrors] = useState({});
  const [images, setImages] = useState([]);
  const [previewUrl, setPreviewUrl] = useState([]);
  const [category, setCategory] = useState([]);

  // ✅ Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await api.get("/category");
      setCategory(res.data.categories || []);
    } catch (e) {
      console.error("Category fetch failed", e);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ Validation
  const validate = () => {
    let tempErrors = {};
    let valid = true;

    if (!newproduct.name.trim()) {
      tempErrors.name = "Product name is required";
      valid = false;
    }
    if (!newproduct.shortDescription.trim()) {
      tempErrors.shortDescription = "Short description is required";
      valid = false;
    }
    if (!newproduct.details.trim()) {
      tempErrors.details = "Product details are required";
      valid = false;
    }
    if (!newproduct.price || Number(newproduct.price) <= 0) {
      tempErrors.price = "Enter a valid price";
      valid = false;
    }
    if (!newproduct.category) {
      tempErrors.category = "Select a category";
      valid = false;
    }
    if (images.length === 0) {
      tempErrors.images = "Upload at least 1 product image";
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  // ✅ Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle image selection
  const handleImageChange = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages(files);

      const previews = files.map((file) => URL.createObjectURL(file));
      setPreviewUrl(previews);
    }
  };

  // ✅ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      console.log("Validation failed");
      return;
    }

    try {
      const formData = new FormData();

      // ✅ Add product fields
      Object.entries(newproduct).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // ✅ Add images
      images.forEach((image) => formData.append("images", image));

      const res = await api.post("/product", formData); // Axios auto sets headers
      alert(res.data.messages || "Product created!");

      // ✅ Reset form after success
      setNewProduct({
        name: "",
        shortDescription: "",
        details: "",
        price: "",
        category: "",
        offer: 0,
        inStock: true,
      });
      setImages([]);
      setPreviewUrl([]);
      setErrors({});
    } catch (err) {
      console.error(err);
      alert("Failed to create product");
    }
  };

  return (
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
              value={newproduct.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}

            {/* SHORT DESCRIPTION */}
            <label className="font-bold">Product Description:</label>
            <input
              type="text"
              className="border p-2 border-gray-400 rounded"
              name="shortDescription"
              value={newproduct.shortDescription}
              onChange={handleChange}
            />
            {errors.shortDescription && (
              <p className="text-red-500 text-sm">{errors.shortDescription}</p>
            )}

            {/* DETAILS */}
            <label className="font-bold">Product Details:</label>
            <textarea
              className="border p-2 border-gray-400 rounded"
              name="details"
              value={newproduct.details}
              onChange={handleChange}
            />
            {errors.details && (
              <p className="text-red-500 text-sm">{errors.details}</p>
            )}

            {/* PRICE */}
            <label className="font-bold">Product Price:</label>
            <input
              type="number"
              className="border p-2 border-gray-400 rounded"
              name="price"
              value={newproduct.price}
              onChange={handleChange}
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price}</p>
            )}

            {/* CATEGORY */}
            <label className="font-bold">Select Category:</label>
            <select
              name="category"
              className="border p-2 border-gray-400 rounded"
              value={newproduct.category}
              onChange={handleChange}
            >
              <option value="">Choose Category</option>
              {category.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category}</p>
            )}

            {/* OFFER */}
            <label className="font-bold">Offer:</label>
            <input
              type="number"
              className="border p-2 border-gray-400 rounded"
              name="offer"
              value={newproduct.offer}
              onChange={handleChange}
            />
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="font-bold">In Stock:</span>
              <div
                className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                  newproduct.inStock ? "bg-blue-500" : "bg-gray-400"
                }`}
                onClick={() =>
                  setNewProduct((prev) => ({ ...prev, inStock: !prev.inStock }))
                }
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                    newproduct.inStock ? "translate-x-6" : "translate-x-0"
                  }`}
                ></div>
              </div>
              <span className="text-sm text-gray-600">
                {newproduct.inStock ? "Available" : "Out of Stock"}
              </span>
            </label>
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
              <input
                type="file"
                id="imageUpload"
                multiple
                className="hidden"
                onChange={handleImageChange}
              />
            </div>

            {/* PREVIEW SELECTED IMAGES */}
            {previewUrl.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mt-3">
                {previewUrl.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded"
                  />
                ))}
              </div>
            )}
            {errors.images && (
              <p className="text-red-500 text-sm">{errors.images}</p>
            )}
          </div>
        </form>

        {/* ✅ BUTTON OUTSIDE FLEX TO ALIGN */}
        <div className="mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-[#7da827] text-white font-bold py-2 px-6 rounded hover:opacity-90"
          >
            Save Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAddProduct;
