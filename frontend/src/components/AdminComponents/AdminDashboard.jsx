import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { BiBrush } from "react-icons/bi";
import { HiOutlineCube } from "react-icons/hi";
import { FiShoppingBag } from "react-icons/fi";
const AdminDashboard = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="p-5 shadow-md">
        <p>Admin Dashboard</p>
      </div>
      <div className="flex-1 flex ">
        <aside className=" w-[250px] p-4">
          <nav className="space-y-4">
            <NavLink
              to="banner"
              className={({ isActive }) =>
                `flex items-center gap-2   px-4 py-2 font-bold transition-all duration-200 rounded hover:text-[#7da827] ${
                  isActive ? "bg-[#ECFAE5] text-[#7da827]" : "text-[#333]"
                } rounded-xl`
              }
            >
              <HiOutlineCube size={22} />
              <span>Banner</span>
            </NavLink>
            <NavLink
              to="product-List"
              className={({ isActive }) =>
                `flex items-center gap-2   px-4 py-2 font-bold transition-all duration-200 rounded hover:text-[#7da827] ${
                  isActive ? "bg-[#ECFAE5] text-[#7da827]" : "text-[#333]"
                } rounded-xl`
              }
            >
              <FiShoppingBag size={22} />
              <span>Products</span>
            </NavLink>
          </nav>
        </aside>
        <main className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
