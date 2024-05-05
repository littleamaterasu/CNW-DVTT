import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../Components/Header/Header";

function OrderList() {
    const [orderList, setOrderList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_BASE_API_URL + '/...', {  //
                    method: '...',                                                          //
                    headers: {
                        'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                    },
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch orders.");
                }
                const orders = await response.json();
                setOrderList(orders);
            } catch (error) {
                console.error("Error fetching orders:", error);
                toast.error("Failed to fetch orders.");
            }
        };

        fetchOrders();
    }, []);

    const handleOrderClick = (id) => {
        navigate(`/order/info/${id}`);
    };

    return (
        <div>
            <ToastContainer />
            <Header />
            <h2>Order List</h2>
            <ul>
                {orderList.map((order) => (
                    <li key={order.id} onClick={() => handleOrderClick(order.id)}>
                        Order ID: {order.id}, Customer: {order.customer}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default OrderList;
