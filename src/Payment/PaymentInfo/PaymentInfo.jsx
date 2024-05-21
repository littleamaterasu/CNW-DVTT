import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import Header from "../../Components/Header/Header";

function PaymentInfo() {
    const { paymentId } = useParams();
    const navigate = useNavigate();
    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        fetchOrderData(paymentId);
    }, [paymentId]);

    const fetchOrderData = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/payment/get?paymentId=${id}`, {
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
            console.log(data)
            setOrderList(data);
        } catch (error) {
            console.error("Error fetching order data:", error);
        }
    };

    const handleShowOrder = (orderId) => {
        navigate(`/order/info/${orderId}`);
    };

    return (
        <div>
            <Header />
            <ul>
                {orderList.map((order) => (
                    <li key={order.id}>
                        <div>{order.orderNumber}</div>
                        <button onClick={() => handleShowOrder(order.id)}>Show Details</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PaymentInfo;
