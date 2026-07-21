import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from '../productmanagement/ProductDetail'; 
import ProductCreate from '../productmanagement/CreateProduct';
import ProductEdit from '../productmanagement/EditProduct';

export default function AdminProducts() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
 
  // state kontrol modal
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  // URL endpoint API backend menuju controller (tbl_produk)
  const API_URL = "http://chromixheart-production-6072.up.railway.app/api/products";

  // 1. mengambil data awal dari database
  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      setItems(response.data);
    } catch (error) {
      console.error("Gagal mengambil data produk dari database:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 2. menghandler simpan data baru (Create)
  const handleCreate = async (newItem) => {
    try {
      await axios.post(API_URL, newItem);
      fetchProducts();
      setShowCreate(false);
    } catch (error) {
      console.error("Gagal menambahkan produk baru:", error);
    }
  };

  // 3. menghandler edit data dan ganti gambar (update)
  const handleUpdate = async (updatedItem) => {
    try {
      await axios.put(`${API_URL}/${updatedItem.id}`, updatedItem);
      fetchProducts();
      setShowEdit(false);
    } catch (error) {
      console.error("Gagal mengubah data produk:", error);
    }
  };

  // 4. menghandler hapus data yang dipanggil dari dalam komponen Editproduct
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchProducts(); // meyegarkan tabel setelah menghapus data
      setShowEdit(false); // menutup modal edit setelah data dihapus
    } catch (error) {
      console.error("Gagal menghapus produk:", error);
    }
  };

  return (
    <div className="admin-products-page p-3">
      {/* 1. komponen utama tabel list produk */}
      <ProductList 
        items={items} 
        onOpenAdd={() => setShowCreate(true)} 
        onOpenEdit={(item) => { setSelectedItem(item); setShowEdit(true); }}
        // tombol hapus di tabel langsung membuka form edit dulu, atau bisa dikosongkan jika tombol hapus di tabel dihilangkan
        onOpenDelete={(id) => { 
          const item = items.find(i => i.id === id);
          setSelectedItem(item);
          setShowEdit(true);
        }}
      />

      {/* 2. modal popup tambah data */}
      {showCreate && (
        <ProductCreate onClose={() => setShowCreate(false)} onSave={handleCreate} />
      )}

      {/* 3. modal popup edit data + fitur hapus */}
      {showEdit && (
        <ProductEdit 
          currentItem={selectedItem} 
          onClose={() => setShowEdit(false)} 
          onUpdate={handleUpdate}
          onDelete={handleDelete} // mengirimkan fungsi hapus ke dalam file EditProduct
        />
      )}
    </div>
  );
}
