import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import Header from "../../Components/Header/Header";
import OrderInfo from "../../Order/OrderInfo/OrderInfo";
import { ToastContainer, toast } from "react-toastify";

function PaymentInfo() {
    const { paymentId } = useParams();
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [paymentData, setPaymentData] = useState(null);
    const [orderList, setOrderList] = useState([]);
    const status = ['Removed', 'Awaiting payment', 'On delivering', 'Delivered'];

    useEffect(() => {
        fetchPaymentData(paymentId);

        // Add event listener for visibility change
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                fetchPaymentData(paymentId);
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Clean up event listener
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [paymentId]);

    const fetchPaymentData = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/payment/get?paymentId=${id}`, {
                headers: {
                    'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                },
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error("Failed to fetch payment data");
            }
            const data = await response.json();
            setPaymentData(data);
            setOrderList(data.listOrder);
        } catch (error) {
            console.error("Error fetching payment data:", error);
        }
    };

    const handleShowOrder = (order) => {
        setSelectedOrder(order);
    };

    const handleCheckout = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/payment/vnpay/pay?paymentId=${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                },
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                window.open(data.content, '_blank');
            } else {
                toast.error('Failed to process payment:', response.statusText);
            }
        } catch (error) {
            toast.error('Error during checkout:', error);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />
            <ToastContainer />
            {paymentData && (
                <div className="m-10 p-10 bg-white rounded-lg shadow-md flex">
                    <div className="w-1/2 pr-4">
                        <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                        <div className="divide-y divide-gray-400 space-y-4">
                            <p><strong>User ID:</strong> {paymentData.userId}</p>
                            <p><strong>Address:</strong> {paymentData.address}</p>
                            <p><strong>Phone:</strong> {paymentData.phone}</p>
                            <p><strong>Note:</strong> {paymentData.note}</p>
                            <p><strong>Total Pay:</strong> {paymentData.pay}</p>
                            <p><strong>Status:</strong> {paymentData.status}</p>
                            {paymentData.couponDTO && (
                                <div>
                                    <p><strong>Coupon Name:</strong> {paymentData.couponDTO.name}</p>
                                    <p><strong>Discount Percent:</strong> {paymentData.couponDTO.discountPercent}%</p>
                                    <p><strong>Discount Value:</strong> {paymentData.couponDTO.discountValue}</p>
                                    <p><strong>Max Discount:</strong> {paymentData.couponDTO.maxDiscount}</p>
                                    <p><strong>Minimum Price:</strong> {paymentData.couponDTO.minPrice}</p>
                                    <p><strong>Information:</strong> {paymentData.couponDTO.info}</p>
                                </div>
                            )}
                            <p><strong>Pay Status:</strong> {status[parseInt(paymentData.payStatus) + 1]}</p>
                        </div>
                    </div>
                    <div className="w-1/2 pl-4">
                        <h2 className="text-xl font-semibold mb-4">Ordered Books</h2>
                        <ul className="divide-y divide-gray-400 space-y-4">
                            {orderList && orderList.map((order) => (
                                <li onClick={() => handleShowOrder(order)} key={order.orderId} className="border rounded-lg p-4 bg-white shadow-md">
                                    <div>
                                        <p><strong>Book Name:</strong> {order.book.name}</p>
                                        <p><strong>Book Price:</strong> {order.book.price}</p>
                                        <img src={order.book.imageUrl} alt={order.book.name} />
                                    </div>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2" onClick={() => handleShowOrder(order.orderId)}>Show Details</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
            {selectedOrder && <OrderInfo onclose={() => handleShowOrder(null)} order={selectedOrder} />}
            {paymentData && paymentData.payStatus === "0" && (
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2" onClick={() => handleCheckout(paymentId)}>
                    Pay
                </button>
            )}
        </div>
    );
}

export default PaymentInfo;
