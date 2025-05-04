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
import { Soup } from 'lucide-react';

const Menu = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [categories] = useState(["Semua", "Makanan", "Minuman"]);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [menus, setMenus] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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

      <div className="space-y-4">
        {filteredMenus.map((menu) => (
          <Card key={menu.id} className="overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              <div className="relative w-full sm:w-64 h-48 bg-gray-200 flex items-center justify-center">
              <Soup size={48} strokeWidth={1.25} />
                <div className="absolute bottom-0 left-0 bg-black/60 text-white px-3 py-1 text-sm">
                  {menu.category || "Tidak ada kategori"}
                </div>
              </div>
              <CardBody className="flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold">
                      {menu.name}
                      <span className="text-sm text-gray-400 ml-2">
                        ({menu.category})
                      </span>
                    </h3>
                    <p className="text-primary-600 font-bold">Rp {Number(menu.price).toLocaleString("id-ID")}</p>
                  </div>
                  <p className="text-default-500 mt-1">Stok: {menu.stock}</p>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button color="success" className="ml-auto">Pesan</Button>
                </div>
              </CardBody>
            </div>
          </Card>
        ))}
      </div>

      {isFormOpen && (
        <MenuForm onClose={() => setIsFormOpen(false)} onSubmit={handleAddMenu} />
      )}
    </div>
  );
};

export default Menu;
