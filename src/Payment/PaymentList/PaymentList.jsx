import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import { toast } from "react-toastify";
import Header from "../../Components/Header/Header";

function PaymentList() {
    const [paymentList, setPaymentList] = useState([]);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPaymentData();
    }, []);

    const fetchPaymentData = async () => {
        try {
            const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/payment/getAllPayment?page=${page}`, {
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
            toast.error("Error fetching payment data:", error);
        }
    };

    const handleShowPayment = (paymentId) => {
        navigate(`/payment/info/${paymentId}`);
    };

    return (
        <div>
            <Header />
            <div className="mx-auto max-w-4xl px-4 py-8">
                <h2 className="text-3xl font-semibold mb-4">Payment List</h2>
                <ul>
                    {paymentList.map((payment) => (
                        <li key={payment.id} className="bg-gray-100 rounded-md p-4 mb-4">
                            <div className="flex justify-between items-center">
                                <div className="font-semibold">Payment Id: {payment.id}</div>
                                <div>Cost: {payment.pay} VND</div>
                            </div>
                            <button onClick={() => handleShowPayment(payment.id)} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2">Show Payment Info</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default PaymentList;
