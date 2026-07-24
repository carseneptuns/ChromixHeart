import "../styles/orderSummary.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { checkoutCart } from "../services/transactionService";

function OrderSummary({ cart, subtotal }) {

    const navigate = useNavigate();

    const [address, setAddress] = useState("");

    const handleCheckout = async () => {

        try {

            const user = JSON.parse(localStorage.getItem("user"));

            if (!address.trim()) {

                alert("Silakan masukkan alamat pengiriman.");

                return;

            }

            const res = await checkoutCart({

                user_id: user.id,
                alamat: address

            });

            navigate(`/payment/${res.data.transaction_id}`);

        } catch (err) {

            console.log(err);

            alert(
                err.response?.data?.message ||
                "Checkout gagal."
            );

        }

    };

    return (

        <div className="order-summary">

            <h3>Order Summary</h3>

            <div className="summary-row">
                <span>Items</span>
                <span>{cart.length}</span>
            </div>

            <div className="summary-row">
                <span>Subtotal</span>
                <span>
                    Rp {subtotal.toLocaleString("id-ID")}
                </span>
            </div>

            <div className="summary-row">
                <span>Shipping</span>
                <span>Free</span>
            </div>

            <hr />

            <div className="summary-total">
                <span>Total</span>

                <strong>
                    Rp {subtotal.toLocaleString("id-ID")}
                </strong>
            </div>

            <div className="address-box">

                <label>Shipping Address</label>

                <textarea
                    placeholder="Masukkan alamat lengkap pengiriman..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

            </div>

            <button
                className="checkout-btn"
                onClick={handleCheckout}
            >
                Proceed Payment
            </button>

        </div>

    );

}

export default OrderSummary;