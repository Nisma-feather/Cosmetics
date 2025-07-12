import React, { useState } from 'react';
import { MdOutlineModeEdit, MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import api from '../../customApi';
import { useNavigate } from 'react-router-dom';


const AdminBanner = () => {
  const navigate = useNavigate()
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
  const fetchBanners = async () => {
    try {
      const res = await api.get("/banners");
      console.log(res)
      setBanner(res.data);

    }
    catch (e) {
      console.log("Error in d=fetching the banners", e)

    }
  }

  return (
    <div className="flex flex-col bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-xl">All Sliders</h2>
        <button onClick={() => navigate("/add_banner")} className="bg-[#7da827] text-white px-4 py-2 font-medium rounded hover:opacity-80 transition">
          + Add a slider
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="text- bg-gray-100">
            <tr>
              <th className="px-6 py-3">Slider</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {banner.map((slider, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center  gap-4">
                    <img
                      src={slider.imageUrl}
                      alt={slider.title}
                      className="w-12 h-12 object-cover object-center rounded-full shadow"
                    />
                    <span className="font-semibold">{slider.title}</span>
                  </div>
                </td>
                <td className='px-6 py-3'>
                  <div className='flex space-x-1'>
                    <div className='border p-2'>
                      <MdOutlineModeEdit />
                    </div>
                    <div className='border p-2'>
                      <MdOutlineRemoveRedEye />

                    </div>
                    <div className='border p-2'>
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
};

export default AdminBanner;

