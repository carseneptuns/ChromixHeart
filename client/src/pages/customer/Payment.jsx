import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "../../styles/payment.css";
import paymentBanner from "../../assets/payment-banner.png";

import {
    getTransaction,
    confirmPayment
} from "../../services/transactionService";

function Payment() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [transaction, setTransaction] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("");

    useEffect(() => {

        fetchTransaction();

    }, []);

    const fetchTransaction = async () => {

        try {

            const res = await getTransaction(id);

            console.log(res.data.data);


            setTransaction(res.data.data);

        } catch (err) {

            console.log(err);

        }

    };

    const handlePayment = async () => {

        if (!paymentMethod) {

            alert("Pilih metode pembayaran!");

            return;

        }

        try {

            await confirmPayment(
                id,
                paymentMethod
            );

            alert("Payment Success");

            navigate("/my-orders");

        } catch (err) {

            console.log(err);

            alert(

                err.response?.data?.message ||

                "Payment Failed"

            );

        }

    };

    if (!transaction) {

        return <h2>Loading...</h2>;

    }
    console.log({
    harga: transaction.harga,
    subtotal: transaction.subtotal,
    total: transaction.total,
    quantity: transaction.quantity,
    produk: transaction.nama_produk
});

    return (

        <div className="payment-page">

            <div className="payment-wrapper">

                {/* LEFT */}

                <div className="payment-left">

                    <h1 className="payment-logo">
                        ChromixHeart
                    </h1>

                    <img
                        className="payment-banner"
                        src={paymentBanner}
                        alt="banner"
                    />

                </div>

                {/* RIGHT */}

                <div className="payment-right">

                    <h2>Payment</h2>

                    <div className="payment-divider"></div>

                    <h4>Order Summary</h4>

                    <div className="payment-order-list">

    {transaction.items.map((item) => (

        <div
            className="payment-order-item"
            key={item.produk_id}
        >

            <div>

                <p>{item.nama_produk}</p>

                <small>
                    Qty : {item.quantity}
                </small>

            </div>

            <span>
                Rp {Number(item.subtotal).toLocaleString("id-ID")}
            </span>

        </div>

    ))}

</div>

                    <div className="payment-total">

                        <span>Total</span>

                        <strong>
                            Rp {Number(transaction.total).toLocaleString("id-ID")}
                        </strong>

                    </div>

                    <h4>Payment Method</h4>

                    <div className="payment-method-box">

                        <label>

                            <input
                                type="radio"
                                value="Bank Transfer"
                                checked={paymentMethod === "Bank Transfer"}
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                }
                            />

                            Bank Transfer

                        </label>

                        <label>

                            <input
                                type="radio"
                                value="QRIS"
                                checked={paymentMethod === "QRIS"}
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                }
                            />

                            QRIS

                        </label>

                        <label>

                            <input
                                type="radio"
                                value="Cash On Delivery"
                                checked={paymentMethod === "Cash On Delivery"}
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                }
                            />

                            Cash On Delivery

                        </label>

                    </div>

                    <button
                        className="confirm-payment"
                        onClick={handlePayment}
                    >

                        Confirm Payment

                    </button>

                </div>

            </div>

        </div>

    );

}

export default Payment;