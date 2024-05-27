import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StarRating from '../Components/StarRating';

function Book({ id, onClose }) {
    const [data, setData] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/product/getOne?id=${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/order/getAllComment?productId=${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch comments');
                }
                const commentData = await response.json();
                setComments(commentData.filter(comment => comment.rate !== null)); // Filter out comments with null rates
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchComments();
    }, [id]);

    const addToCart = async (productId, price) => {
        try {
            const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/order/post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                },
                body: JSON.stringify({ productId, price }),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to add to cart');
            }

            await response.json();
            toast.success('Added to cart successfully!');
        } catch (error) {
            toast.error('Error adding to cart');
            console.error("Error adding to cart:", error);
        }
    };

    if (!data) {
        return (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
                <p className="text-white">Loading...</p>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 overflow-auto z-50">
            <ToastContainer />
            <div className="relative w-full max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                    &times;
                </button>
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3">
                        <img src={data.imageUrl} alt={data.name} className="w-full h-auto object-cover rounded" />
                    </div>
                    <div className="md:w-2/3 md:ml-6 mt-4 md:mt-0">
                        <h1 className="text-2xl font-bold mb-2">{data.name}</h1>
                        <p className="text-xl font-semibold text-gray-700 mb-2">{Math.floor(data.price / (1 - data.discount / 100.0))}VND <span className="text-sm text-red-500">{data.discount ? `(Discount: ${data.discount}%)` : ''}</span></p>
                        <p className="text-gray-600 mb-2">Sold: {data.soldCount}</p>
                        <p className="text-gray-600 mb-2">In Stock: {data.remainedCount}</p>
                        <p className="text-gray-600 mb-2">Year: {data.year}</p>
                        <p className="text-gray-600 mb-2">Authors: {data.author}</p>
                        <p className="text-gray-600 mb-2">Categories: {data.category.join(', ')}</p>
                        <p className="text-gray-600 mb-2">Provider: {data.provider}</p>
                        <p className="text-gray-600 mb-2">Pages: {data.page}</p>
                        <p className="text-gray-600 mb-2">Cover: {data.cover}</p>
                        <p className="text-gray-600 mb-2">Weight: {data.weight}g</p>
                        <p className="text-gray-600 mb-2">Info: {data.info}</p>
                        <div className="flex space-x-4 mt-4">
                            <button onClick={() => addToCart(data.id, data.price)} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">Add to Cart</button>
                        </div>
                    </div>
                </div>
                <h2 className="text-xl font-bold mb-4">Comments</h2>
                <div className="mt-6 h-40 overflow-y-auto">
                    <div className="space-y-4">
                        {comments.map((comment, index) => (
                            <div key={index} className="border p-4 rounded-lg">
                                <div className="font-semibold">User: {comment.userName}</div>
                                <div className="flex items-center mt-2">
                                    <StarRating rating={comment.rate} />
                                </div>
                                <p className="mt-2">{comment.comment}</p>
                                <p className="text-gray-500 text-sm mt-1">{comment.createdTime}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Book;
