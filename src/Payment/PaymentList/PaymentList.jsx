import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import { toast } from "react-toastify";
import Header from "../../Components/Header/Header";
import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons/faHourglassHalf";
import { faTruck } from "@fortawesome/free-solid-svg-icons/faTruck";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

function PaymentList() {
    const [paymentList, setPaymentList] = useState([]);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPaymentData();
    }, []);

    const renderStatusIcon = (payStatus) => {
        switch (payStatus) {
            case 0:
                return <><FontAwesomeIcon icon={faHourglassHalf} /> Awaiting payment</>;
            case 1:
                return <><FontAwesomeIcon icon={faTruck} /> On delivering</>;
            case 2:
                return <><FontAwesomeIcon icon={faCheck} /> Delivered</>;
            case -1:
                return <><FontAwesomeIcon icon={faTimes} /> Removed</>;
            default:
                console.log(payStatus)
                return null;
        }
    };

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
        <div className="bg-gray-900 min-h-screen">
            <Header />
            <div className="mx-auto max-w-4xl px-4 py-8">
                <h2 className="text-3xl text-white font-semibold mb-4"><FontAwesomeIcon icon={faList} /> Payment List</h2>
                <ul>
                    {paymentList.map((payment) => (
                        <li key={payment.id} className="bg-gray-100 rounded-md p-4 mb-4">
                            <div className="flex justify-between items-center">
                                <div className="font-semibold">Payment Id: {payment.id}</div>
                                <div>Cost: {payment.pay} VND</div>
                            </div>
                            <div>{renderStatusIcon(parseInt(payment.status))}</div>
                            <div className="font-semibold">List Items: {payment.listNameProduct}</div>
                            <button onClick={() => handleShowPayment(payment.id)} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2">Show Payment Info</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default PaymentList;
