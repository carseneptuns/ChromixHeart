import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "../../services/productService";

import "../../styles/product.css";

function ProductManagement() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {

    try {

      const res = await getProducts();

      setProducts(res.data.data);

    } catch (err) {

      console.log(err);

    }

  };

  const handleDelete = async (id) => {

    if (!window.confirm("Hapus produk?")) return;

    await deleteProduct(id);

    fetchProducts();

  };

  return (

    <div className="product-page">

      <div className="product-header">

        <h2>Product Management</h2>

        <Link
          to="/admin/products/create"
          className="btn btn-success"
        >
          + Tambah Produk
        </Link>

      </div>

      <table className="table table-hover">

        <thead>

          <tr>

            <th>ID</th>
            <th>Kode</th>
            <th>Nama Produk</th>
            <th>Kategori</th>
            <th>Harga</th>
            <th>Stok</th>
            <th>Gambar</th>
            <th>Aksi</th>

          </tr>

        </thead>

        <tbody>

          {products.map((item) => (

            <tr key={item.id}>

              <td>{item.id}</td>

              <td>{item.kode_produk}</td>

              <td>{item.nama_produk}</td>

              <td>{item.kategori}</td>

              <td>
                Rp {Number(item.harga).toLocaleString("id-ID")}
              </td>

              <td>{item.stok}</td>

              <td>

                <img
                  src={`https://chromixheart-production-6072.up.railway.app/uploads/products/${item.gambar}`}
                  width="70"
                />

              </td>

              <td>

                <Link
                  to={`/admin/products/${item.id}`}
                  className="btn btn-info btn-sm"
                >
                  Detail
                </Link>

                {" "}

                <Link
                  to={`/admin/products/edit/${item.id}`}
                  className="btn btn-warning btn-sm"
                >
                  Edit
                </Link>

                {" "}

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default ProductManagement;
