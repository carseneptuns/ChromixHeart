import "../styles/orderSummary.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function OrderSummary({ cart, subtotal }) {

     const navigate = useNavigate();

    const handleCheckout = async () => {

    try {

        console.log("Checkout diklik");

        const user = JSON.parse(localStorage.getItem("user"));

        //endpoint check out
        const res = await axios.post(
            "http://localhost:5000/api/transactions/checkout",
            {
                user_id: user.id
            }
        );

        console.log(res.data);
        
        //mengalihkan halaman penggona ke pembayaran spesifik
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