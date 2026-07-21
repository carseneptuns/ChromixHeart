import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct } from "../../services/productService";
import { createTransaction } from "../../services/transactionService";
import LocationPicker from "../../components/LocationPicker";

import "../../styles/checkout.css";

function Checkout() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [position, setPosition] = useState(null);

    const [address, setAddress] = useState("");

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {

        try {

            const res = await getProduct(id);

            setProduct(res.data.data);

        } catch (err) {

            console.log(err);

        }

    };

    if (!product) {
        return <h2 className="loading">Loading...</h2>;
    }

    const subtotal = Number(product.harga) * quantity;

    const handleOrder = async () => {

        try {

            const user = JSON.parse(
                localStorage.getItem("user")
            );

            if (!user) {
                alert("Silakan login terlebih dahulu.");
                return;
            }

            const res = await createTransaction({

                user_id: user.id,
                produk_id: product.id,
                quantity: quantity,

                alamat: address,
                latitude: position ? position[0] : null,
                longitude: position ? position[1] : null
            });

            alert("Order berhasil dibuat!");

            navigate(
                `/payment/${res.data.transaction_id}`
            );

        } catch (err) {

            console.log(err);

            alert(
                err.response?.data?.message ||
                "Transaksi gagal"
            );

        }

    };

    return (

        <div className="checkout-page">

            <div className="checkout-card">

                <div className="checkout-image">

                    <img
                        src={`http://chromixheart-production-6072.up.railway.app/uploads/products/${product.gambar}`}
                        alt={product.nama_produk}
                    />

                </div>

                <div className="checkout-content">

                    <h2>Order Summary</h2>

                    <h3>{product.nama_produk}</h3>

                    <p>
                        Category :
                        <span> {product.kategori}</span>
                    </p>

                    <p>
                        Price :
                        <span>
                            Rp {Number(product.harga).toLocaleString("id-ID")}
                        </span>
                    </p>

                    <div className="quantity-box">

                        <button
                            onClick={() =>
                                quantity > 1 &&
                                setQuantity(quantity - 1)
                            }
                        >
                            -
                        </button>

                        <span>{quantity}</span>

                        <button
                            onClick={() =>
                                setQuantity(quantity + 1)
                            }
                        >
                            +
                        </button>

                    </div>

                    <div className="subtotal">

                        <h4>Subtotal</h4>

                        <h3>
                            Rp {subtotal.toLocaleString("id-ID")}
                        </h3>

                    </div>

                    <LocationPicker

                        position={position}
                        setPosition={setPosition}

                        address={address}
                        setAddress={setAddress}

                    />

                    <button
                        className="place-order"
                        onClick={handleOrder}
                    >
                        Place Order
                    </button>

                </div>

            </div>

        </div>

    );

}

export default Checkout;
