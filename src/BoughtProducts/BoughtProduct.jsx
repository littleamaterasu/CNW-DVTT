import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";
import Book from "../Book/Book";
import Header from "../Components/Header/Header";

function BoughtProducts() {
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [comment, setComment] = useState("");
    const [rate, setRate] = useState(0);
    const [likeOrDislike, setLikeOrDislike] = useState(-1);
    const [selectedBookId, setSelectedBookId] = useState(null)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/order/getProductSold?page=${page}`, {
                    headers: {
                        'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                    },
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch product data");
                }
                const data = await response.json();
                setList(data);
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };

        fetchProducts();
    }, [page]);

    const handleRateProduct = async () => {
        try {
            const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/order/rating`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                },
                credentials: 'include',
                body: JSON.stringify({
                    orderId: selectedProduct.orderId,
                    comment,
                    rate,
                    likeOrDislike,
                }),
            });
            if (!response.ok) {
                throw new Error("Failed to rate the product");
            }
            // Clear the form after rating successfully
            setSelectedProduct(null);
            setComment("");
            setRate(0);
            setLikeOrDislike(-1);
            // You may want to reload the list of products after rating
            // Or update the specific product's rating in the list
        } catch (error) {
            console.error("Error rating the product:", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <Header />
            <h2 className="text-2xl font-bold mb-4">Bought Products</h2>
            <Link to="/">
                <button type="button" className="text-blue-500">Home</button>
            </Link>
            {list.length === 0 && <p>No products left</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {list.map(item => (
                    <div key={item.book.id} className="bg-white shadow-md rounded-lg overflow-hidden" onClick={() => setSelectedBookId(item.book.id)}>
                        <img src={item.book.imageUrl} alt={item.book.name} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold">{item.book.name}</h3>
                            <p className="text-gray-600">Price: ${item.book.price}</p>
                            <p className="text-gray-600">Sold Count: {item.book.soldCount}</p>
                            <button
                                onClick={() => setSelectedProduct(item)}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2"
                            >
                                Rate Product
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="px-4 py-2 mx-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-700 disabled:opacity-50"
                >
                    Previous
                </button>
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={list.length === 0}
                    className="px-4 py-2 mx-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            {selectedBookId && <Book onClose={() => setSelectedBookId(null)} id={selectedBookId} />}

            {/* Rating Form */}
            {selectedProduct && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Rate Product: {selectedProduct.book.name}</h2>
                        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">Comment:</label>
                        <textarea
                            id="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                        <label htmlFor="rate" className="block text-sm font-medium text-gray-700 mt-4 mb-1">Rate:</label>
                        <select
                            id="rate"
                            value={rate}
                            onChange={(e) => setRate(parseInt(e.target.value))}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        >
                            <option value={0}>Select rating</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <label htmlFor="likeOrDislike" className="block text-sm font-medium text-gray-700 mt-4 mb-1">Like or Dislike:</label>
                        <select
                            id="likeOrDislike"
                            value={likeOrDislike}
                            onChange={(e) => setLikeOrDislike(parseInt(e.target.value))}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        >
                            <option value={-1}>Select</option>
                            <option value={1}>Like</option>
                            <option value={0}>Dislike</option>
                        </select>
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={handleRateProduct}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Submit Rating
                            </button>
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BoughtProducts;
