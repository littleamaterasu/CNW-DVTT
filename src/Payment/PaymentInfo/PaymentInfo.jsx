import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import Header from "../../Components/Header/Header";

function PaymentInfo() {
    const { paymentId } = useParams();
    console.log(paymentId)
    const navigate = useNavigate();
    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        fetchOrderData(paymentId);
    }, [paymentId]);

    const fetchOrderData = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/payment/get?paymentId=2`, {
                method: 'GET',
                headers: {
                    'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                },
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error("Failed to fetch order data");
            }
            const data = await response.json();
            setOrderList(data);
        } catch (error) {
            console.error("Error fetching order data:", error);
        }
    };

    const handleShowOrder = (orderId) => {
        navigate(`/order/info/${orderId}`);
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />
            <ul className="mt-8">
                {orderList.map((order) => (
                    <li key={order.id} className="border rounded-lg p-4 mb-4">
                        <div>{order.orderNumber}</div>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2" onClick={() => handleShowOrder(order.id)}>Show Details</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PaymentInfo;
