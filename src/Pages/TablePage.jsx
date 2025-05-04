import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../lib/axios";
import { Input } from "@heroui/input";
import { addToast,Button, Spinner } from "@heroui/react";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { Plus } from "lucide-react";
import { useApiErrorHandler } from "../hooks/useApiHandler";
import { UpdateTableStatusPopUp } from "../components/PopUp";
const TablePage = () => {
    useApiErrorHandler();
    const [tables, setTables] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newTableNumber, setNewTableNumber] = useState("");

    // Fetch tables data
    const fetchTables = async () => {
        setIsLoading(true);
        try {
            const res = await AxiosInstance.get("/tables");
            setTables(res.data);
        } catch (error) {
            console.error("Failed to fetch tables", error);
            adnpdToast({
                title: "Error",
                description: "Failed to fetch tables.",
                type: "error", // Tipe notifikasi (error, success, info, dll.)
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Add new table
    const addTable = async () => {
        const tableNumber = parseInt(newTableNumber, 10);

        // Validasi jika input kosong
        if (!newTableNumber.trim()) {
            addToast({
                title: "Error",
                description: "Nomor meja tidak boleh kosong.",
                type: "error", // Tipe notifikasi (error, success, info, dll.)
            });
            return;
        }

        // Validasi jika nomor meja duplikat
        const isDuplicate = tables.some((table) => table.number === tableNumber);
        if (isDuplicate) {
            addToast({
                title: "Error",
                description: "Nomor meja sudah ada. Silakan masukkan nomor lain.",
                type: "error",
            })
            return;
        }

        try {
            await AxiosInstance.post(
                "/tables",
                { number: tableNumber, status: "available" }
            );
            setNewTableNumber("");
            fetchTables();
            addToast({
                title: "Success",
                description: "Meja berhasil ditambahkan.",
                type: "success",
            });
        } catch (error) {
            console.error("Failed to add table", error);
            addToast({
                title: "Error",
                description: "Gagal menambahkan meja. Silakan coba lagi.",
                type: "error",
            });
        }
    };

    useEffect(() => {
        fetchTables();
    }, []);

    return (
        <div className="flex justify-center items-center h-full mt-2">
            <div className="flex justify-center flex-col gap-2 w-[84rem]">
                {isLoading ? (
                    <div className="flex justify-center items-center min-h-screen">
                        <Spinner size="lg" label="Loading tables..." />
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between">
                            <div className="flex gap-2">
                                <Input
                                    className="w-[15rem]"
                                    placeholder="Nomor Meja Baru"
                                    value={newTableNumber}
                                    onChange={(e) =>
                                        setNewTableNumber(e.target.value)
                                    }
                                />
                                <Button
                                    startContent={<Plus />}
                                    onPress={addTable}
                                    disabled={!newTableNumber.trim()} 
                                >
                                    Tambah Meja
                                </Button>
                            </div>
                            <UpdateTableStatusPopUp fetchTables={fetchTables} />
                        </div>
                        <Table
                            isStriped
                            isHeaderSticky
                            aria-label="table management"
                            classNames={{
                                base: "max-h-[37rem] overflow-scroll",
                                table: "min-h-[7rem]",
                            }}
                        >
                            <TableHeader>
                                <TableColumn>ID</TableColumn>
                                <TableColumn>Nomor Meja</TableColumn>
                                <TableColumn>Status</TableColumn>
                            </TableHeader>
                            <TableBody items={tables}>
                                {(table) => (
                                    <TableRow key={table.id}>
                                        <TableCell>{table.id}</TableCell>
                                        <TableCell>{table.number}</TableCell>
                                        <TableCell>{table.status}</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </>
                )}
            </div>
        </div>
    );
};

export default TablePage;
