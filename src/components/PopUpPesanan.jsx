// components/OrderModal.jsx
import React, { useState } from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

const Order = ({ menu, onClose, onOrder }) => {
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");

  const total = quantity * menu.price;

  const handleOrder = () => {
    const orderData = {
      menuId: menu.id,
      name: menu.name,
      price: menu.price,
      quantity,
      note,
      total,
    };
    onOrder(orderData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <Icon icon="lucide:x" className="text-xl" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Tambah Pesanan</h2>

        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold capitalize">{menu.name}</h3>
            <p className="text-gray-600">
              Rp {parseInt(menu.price).toLocaleString("id-ID")}
            </p>
          </div>
          <Icon icon="lucide:shopping-bag" className="text-3xl text-gray-400" />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600">Jumlah</label>
          <div className="flex items-center gap-2 mt-1">
            <Button
              size="sm"
              variant="bordered"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              -
            </Button>
            <span className="w-6 text-center">{quantity}</span>
            <Button
              size="sm"
              variant="bordered"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </Button>
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600">Catatan (Opsional)</label>
          <textarea
            className="w-full mt-1 p-2 border rounded-md text-sm"
            placeholder="Mis: Tidak pedas, tanpa sayur, dll"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <div className="flex justify-between items-center font-semibold text-lg mb-4">
          <span>Total</span>
          <span>Rp {total.toLocaleString("id-ID")}</span>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="bordered" onClick={onClose}>Batal</Button>
          <Button color="success" onClick={handleOrder}>Tambah Pesanan</Button>
        </div>
      </div>
    </div>
  );
};

export default Order;
