import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PaymentList() {
    const [paymentList, setPaymentList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPaymentData();
    }, []);

    const fetchPaymentData = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_BASE_API_URL + '/...', { //API
                headers: {
                    'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                },
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error("Failed to fetch payment data");
            }
            const data = await response.json();
            setPaymentList(data);
        } catch (error) {
            console.error("Error fetching payment data:", error);
        }
    };

    const handleShowPayment = (paymentId) => {
        navigate(`/payment/info/${paymentId}`);
    };

    return (
        <div>
            <h2>Payment List</h2>
            <ul>
                {paymentList.map((payment) => (
                    <li key={payment.id}>
                        <div>{payment.name}</div>
                        <button onClick={() => handleShowPayment(payment.id)}>Show Payment Info</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PaymentList;
