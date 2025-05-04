import React, { useState } from "react";
import { AxiosInstance } from "../lib/axios";

const MenuForm = ({ onSubmit, onClose }) => {
  const [dataMenu, setDataMenu] = useState({
    name: "",
    stock: "",
    price: "",
    category: "", 
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const { category, ...sendData } = dataMenu;
      const response = await AxiosInstance.post("/menus", sendData);
      console.log(sendData);
      onSubmit?.({ ...response.data, category }); 
      onClose?.();
    } catch (error) {
      setError("Gagal menyimpan data menu");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-xl w-96 max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Tambah Menu</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Nama</label>
            <input
              type="text"
              value={dataMenu.name}
              onChange={(e) => setDataMenu({ ...dataMenu, name: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Stock</label>
            <input
              type="number"
              value={dataMenu.stock}
              onChange={(e) => setDataMenu({ ...dataMenu, stock: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Harga</label>
            <input
              type="number"
              value={dataMenu.price}
              onChange={(e) => setDataMenu({ ...dataMenu, price: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Kategori</label>
            <select
              value={dataMenu.category}
              onChange={(e) => setDataMenu({ ...dataMenu, category: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="" disabled hidden>Pilih Kategori</option>
              <option value="Makanan">Makanan</option>
              <option value="Minuman">Minuman</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
            >
              Tutup
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {isLoading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuForm;