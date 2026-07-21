import "../styles/orderSummary.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LocationPicker from "./LocationPicker";
import { checkoutCart } from "../services/transactionService";

function OrderSummary({ cart, subtotal }) {

     const navigate = useNavigate();

     const [position, setPosition] = useState(null);

    const [address, setAddress] = useState("");
const handleCheckout = async () => {

    try {

        const user = JSON.parse(localStorage.getItem("user"));

        if (!address) {

            alert("Silakan pilih alamat pengiriman terlebih dahulu.");

            return;

        }

        console.log("Checkout diklik");

        const res = await checkoutCart({

            user_id: user.id,
            alamat: address,
            latitude: position[0],
            longitude: position[1] 

        });

        console.log(res.data);

        navigate(`/payment/${res.data.transaction_id}`);

    } catch (err) {

        console.log(err.response);
        console.log(err);

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

            <LocationPicker

                position={position}
                setPosition={setPosition}

                address={address}
                setAddress={setAddress}

            />
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