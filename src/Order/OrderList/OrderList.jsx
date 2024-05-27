import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../Components/Header/Header";
import { API_BASE_URL } from "../../config";
import OrderInfo from "../OrderInfo/OrderInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons/faList";

function OrderList() {
    const [orderList, setOrderList] = useState([]);
    const [order, setOrder] = useState(null)
    const status = ['Removed', 'Awaiting payment', 'On delivering', 'Delivered']

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/order/getStatus`, {
                    method: 'GET',
                    headers: {
                        'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                    },
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch orders.");
                }
                const orders = await response.json();
                console.log(orders)
                setOrderList(orders);
            } catch (error) {
                console.error("Error fetching orders:", error);
                toast.error("Failed to fetch orders.");
            }
        };

        fetchOrders();
    }, []);

    const navigate = useNavigate();

    const handleShowOrderInfo = (orderId) => {
        navigate(`/order/info/${orderId}`);
    };

    return (
        <div className="bg-gray-900 min-h-screen pb-10">
            <ToastContainer />
            <Header />
            <div className="mx-auto max-w-4xl px-4 py-8">
                <h2 className="text-3xl text-white font-bold m-4 "><FontAwesomeIcon icon={faList} /> Order List</h2>
                <ul>
                    {orderList.map((order) => (
                        <li key={order.orderId} onClick={() => setOrder(order)} className="bg-gray-100 rounded-md p-4 mb-4 cursor-pointer hover:bg-gray-200">
                            <div className="flex justify-between items-center">
                                <div className="flex flex-col">
                                    <div className="text-lg font-bold">Order ID: {order.orderId}</div>
                                    <div>Book: {order.book.name}</div>
                                </div>
                                <div className="text-lg font-bold">{status[order.status]}</div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {order && <OrderInfo order={order} onclose={() => setOrder(null)} />}
        </div>
    );
}

export default OrderList;
