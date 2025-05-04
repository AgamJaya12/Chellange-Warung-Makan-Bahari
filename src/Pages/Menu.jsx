import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  Card,
  CardBody,
  Select,
  SelectItem
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { AxiosInstance } from "../lib/axios";
import MenuForm from "../components/MenuForm";
import Order from "../components/PopUpPesanan";

const Menu = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [categories] = useState(["Semua", "Makanan", "Minuman"]);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [menus, setMenus] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const loadMenus = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await AxiosInstance.get("/menus");
      if (Array.isArray(response.data)) {
        setMenus(response.data);
        localStorage.setItem("menus", JSON.stringify(response.data));
      } else {
        setMenus([]);
      }
    } catch (error) {
      console.error(error);
      setError("Gagal memuat data menu");
      setMenus([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    try {
      const savedMenus = localStorage.getItem("menus");
      if (savedMenus) {
        setMenus(JSON.parse(savedMenus));
      } else {
        loadMenus();
      }
    } catch (e) {
      console.error("Gagal memparsing data menus dari localStorage", e);
      loadMenus();
    }
  }, []);

  const handleAddMenu = (newMenu) => {
    const updatedMenus = [...menus, newMenu];
    setMenus(updatedMenus);
    localStorage.setItem("menus", JSON.stringify(updatedMenus));
    setIsFormOpen(false);
  };

  const filteredMenus = menus
    .filter((menu) => {
      if (selectedCategory === "Semua") return true;
      return (
        menu.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    })
    .filter((menu) =>
      menu.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Daftar Menu Makanan</h1>
        <p className="text-gray-600 mt-2">Menu khas dari berbagai daerah di Indonesia</p>
      </div>

      <Card className="mb-6">
        <CardBody>
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Cari menu..."
              startContent={<Icon icon="lucide:search" className="text-default-400" />}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex flex-wrap gap-2">
              <Select
                className="w-40 sm:w-48"
                selectedKeys={[selectedCategory]}
                onSelectionChange={(keys) => {
                  const [key] = Array.from(keys);
                  setSelectedCategory(key);
                }}
                startContent={<Icon icon="lucide:filter" />}
              >
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </Select>
              <Button
                color="primary"
                className="ml-auto"
                startContent={<Icon icon="lucide:plus" />}
                onClick={() => setIsFormOpen(true)}
              >
                Tambah Menu
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      {isLoading && <p className="text-center text-gray-500">Memuat data...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="space-y-4 mt-4">
        {filteredMenus.map((menu) => (
            <Card key={menu.id} className="flex flex-row items-center justify-between p-4 bg-gray-50 rounded-xl shadow-sm">
              
              {/* Icon di kiri */}
              <div className="text-3xl text-gray-400 mr-4">
                <Icon icon="lucide:shopping-bag" />
              </div>

              {/* Info tengah */}
              <div className="flex flex-col flex-grow">
                <div className="flex items-baseline gap-2">
                  <h3 className="text-md font-semibold text-gray-800 capitalize">{menu.name}</h3>
                  {menu.category && (
                    <span className="text-sm text-gray-500">({menu.category})</span>
                  )}
                </div>
                <p className="text-sm text-gray-600">Stok: {menu.stock}</p>
              </div>

              {/* Harga dan tombol kanan */}
              <div className="flex flex-col items-end ml-4 gap-1 sm:flex-row sm:items-center sm:gap-4">
                <p className="text-blue-600 font-semibold whitespace-nowrap">
                  Rp {parseInt(menu.price).toLocaleString("id-ID")}
                </p>
                <Button 
                color="warning" 
                size="sm"
                onClick={() => {
                  setSelectedMenu(menu);
                  setIsOrderOpen(true)
                }}
                >
                  Pesan
                </Button>
              </div>
            </Card>
          ))}
      </div>

      {isFormOpen && (
        <MenuForm onClose={() => setIsFormOpen(false)} onSubmit={handleAddMenu} />
      )}

      {isOrderOpen && selectedMenu && (
        <Order
          menu={selectedMenu}
          onClose={() => setIsOrderOpen(false)}
          onOrder={(orderData) => {
            console.log("Pesanan:", orderData);
            // Tambahkan logika simpan pesanan jika perlu
          }}
        />
      )}
    </div>
  );
};

export default Menu;
