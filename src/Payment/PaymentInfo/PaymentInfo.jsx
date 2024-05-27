import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import Header from "../../Components/Header/Header";
import OrderInfo from "../../Order/OrderInfo/OrderInfo";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMapMarkerAlt, faPhone, faStickyNote, faDollarSign, faTag, faPercentage, faTimes, faTruck, faHourglassHalf, faCheck, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard } from "@fortawesome/free-solid-svg-icons/faCreditCard";

function PaymentInfo() {
    const { paymentId } = useParams();
    const navigate = useNavigate();
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [paymentData, setPaymentData] = useState(null);
    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        fetchPaymentData(paymentId);

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                fetchPaymentData(paymentId);
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

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

    const renderStatusIcon = (payStatus) => {
        switch (payStatus) {
            case "0":
                return <><FontAwesomeIcon icon={faHourglassHalf} /> Awaiting payment</>;
            case "1":
                return <><FontAwesomeIcon icon={faTruck} /> On delivering</>;
            case "2":
                return <><FontAwesomeIcon icon={faCheck} /> Delivered</>;
            case "-1":
                return <><FontAwesomeIcon icon={faTimes} /> Removed</>;
            default:
                return null;
        }
    };

    return (
        <div>
            <Header />
            <div className="bg-gray-900 min-h-screen pt-1 pb-10">

                <ToastContainer />
                <div className="m-10 p-10 bg-white rounded-lg shadow-md flex flex-col space-y-6">
                    <button
                        className="self-start bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
                        onClick={() => navigate('/payment/list')}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
                        Payment List
                    </button>
                    {paymentData && (
                        <div className="flex">
                            <div className="w-1/2 pr-4">
                                <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                                <div className="divide-y divide-gray-400 space-y-4">
                                    <p><FontAwesomeIcon icon={faUser} /> <strong>User ID:</strong> {paymentData.userId}</p>
                                    <p><FontAwesomeIcon icon={faMapMarkerAlt} /> <strong>Address:</strong> {paymentData.address}</p>
                                    <p><FontAwesomeIcon icon={faPhone} /> <strong>Phone:</strong> {paymentData.phone}</p>
                                    <p><FontAwesomeIcon icon={faStickyNote} /> <strong>Note:</strong> {paymentData.note}</p>
                                    <p><FontAwesomeIcon icon={faDollarSign} /> <strong>Total Pay:</strong> {paymentData.pay}</p>
                                    <p><strong>Status:</strong> {renderStatusIcon(paymentData.payStatus)}</p>
                                    {paymentData.couponDTO && (
                                        <div>
                                            <p><FontAwesomeIcon icon={faTag} /> <strong>Coupon Name:</strong> {paymentData.couponDTO.name}</p>
                                            <p><FontAwesomeIcon icon={faPercentage} /> <strong>Discount Percent:</strong> {paymentData.couponDTO.discountPercent}%</p>
                                            <p><strong>Discount Value:</strong> {paymentData.couponDTO.discountValue}</p>
                                            <p><strong>Max Discount:</strong> {paymentData.couponDTO.maxDiscount}</p>
                                            <p><strong>Minimum Price:</strong> {paymentData.couponDTO.minPrice}</p>
                                            <p><strong>Information:</strong> {paymentData.couponDTO.info}</p>
                                        </div>
                                    )}
                                    {paymentData.payStatus === "0" && (
                                        <button className="self-end bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleCheckout(paymentId)}>
                                            <FontAwesomeIcon icon={faCreditCard} />Pay
                                        </button>
                                    )}
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
                </div>
                {selectedOrder && <OrderInfo onclose={() => handleShowOrder(null)} order={selectedOrder} />}
            </div>
        </div>
    );
}

export default PaymentInfo;
