import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function PaymentInfo() {
    const { paymentId } = useParams();
    const navigate = useNavigate();
    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        fetchOrderData(id);
    }, [id]);

    const fetchOrderData = async (id) => {
        try {
            const response = await fetch(import.meta.env.VITE_BASE_API_URL + '/...', {  // API
                method: '...',                                                          //
                headers: {
                    'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                },
                credentials: 'include',
                body: {
                    paymentId, userId
                }
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
        <div>
            <h2>Payment Information</h2>
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
