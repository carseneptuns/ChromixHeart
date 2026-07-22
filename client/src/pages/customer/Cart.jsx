import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/cart.css";
import CartItem from "../../components/CartItem";
import OrderSummary from "../../components/OrderSummary";

import {
    getCart,
    updateCart,
    deleteCart
} from "../../services/cartService";

function Cart() {

    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {

        try {

            const user = JSON.parse(
                localStorage.getItem("user")
            );

            const res = await getCart(user.id);

            setCartItems(res.data.data);

        } catch (err) {

            console.log(err);

        }

    };

    // =========================
    // Quantity +
    // =========================
    const increaseQuantity = async (id) => {

        const item = cartItems.find(
            (item) => item.id === id
        );

        const newQuantity = item.quantity + 1;

        try {

            await updateCart(id, newQuantity);

            fetchCart();

        } catch (err) {

            console.log(err);

        }

    };

    // =========================
    // Quantity -
    // =========================
    const decreaseQuantity = async (id) => {

        const item = cartItems.find(
            (item) => item.id === id
        );

        if (item.quantity <= 1) return;

        const newQuantity = item.quantity - 1;

        try {

            await updateCart(id, newQuantity);

            fetchCart();

        } catch (err) {

            console.log(err);

        }

    };

    // =========================
    // Delete Item
    // =========================
    const removeItem = async (id) => {

        try {

            await deleteCart(id);

            fetchCart();

        } catch (err) {

            console.log(err);

        }

    };

    // =========================
    // Hitung subtotal
    // =========================
    const subtotal = cartItems.reduce(
        (total, item) =>
            total + Number(item.harga) * item.quantity,
        0
    );

    return (

        <div className="cart-page">

            <div className="cart-container">

                <h1 className="cart-title">
                    My Cart
                </h1>
                <button
                    className="back-btn"
                    onClick={() => navigate("/shop")}
                >
                    ← Back
                </button>

                <div className="cart-layout">

                    {/* LEFT */}
                    <div className="cart-list">

                        {cartItems.map((item) => (

                            <CartItem
                                key={item.id}
                                image={`https://chromixheart-copy-production.up.railway.app/uploads/products/${item.gambar}`}
                                title={item.nama_produk}
                                category={item.kategori}
                                price={item.harga}
                                quantity={item.quantity}

                                onIncrease={() =>
                                    increaseQuantity(item.id)
                                }

                                onDecrease={() =>
                                    decreaseQuantity(item.id)
                                }

                                onDelete={() =>
                                    removeItem(item.id)
                                }
                            />

                        ))}

                    </div>

                    {/* RIGHT */}
                    <OrderSummary
                        cart={cartItems}
                        subtotal={subtotal}
                    />

                </div>

            </div>

        </div>

    );

}

export default Cart;
