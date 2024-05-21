import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookCreate from './BookCreate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE_URL } from '../../config';

function BookList() {
    const [books, setBooks] = useState([]);
    const [showBookCreate, setShowBookCreate] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null); // State mới để lưu trữ thông tin của cuốn sách được chọn để chỉnh sửa
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchBooks();
    }, [page]); // Trigger fetchBooks whenever the page changes

    const fetchBooks = async () => {
        try {
            const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/product/getAll?page=${page}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleNewBook = (newBook) => {
        setBooks([...books, newBook]);
        setShowBookCreate(false);
    };

    const handleFormToggle = () => {
        setShowBookCreate(!showBookCreate);
    };

    const handleEditBook = (book) => {
        setSelectedBook(book); // Cập nhật state mới với thông tin của cuốn sách được chọn để chỉnh sửa
    };

    const handleNextPage = () => {
        if (books.length() > 0) setPage(page + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    return (
        <div className="book-list p-4">
            <ToastContainer />
            <h4 className="text-lg font-medium mb-4">
                <Link to="/admin">Admin homepage</Link> / Book List
            </h4>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleFormToggle}>
                {showBookCreate ? 'Hide Form' : 'Add Book'}
            </button>
            <button onClick={fetchBooks} className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Reload</button>
            {showBookCreate && (
                <BookCreate
                    bookList={books}
                    setShowBookCreate={setShowBookCreate}
                    onNewBook={handleNewBook}
                />
            )}
            <ul className="mt-4">
                {books.map((book, index) => (
                    <li key={index} className="border-b border-gray-300 py-4 flex items-start">
                        <img className="w-auto max-h-48 object-cover rounded" src={book.imageUrl} alt="img" />
                        <div className="ml-4">
                            <h2 className="text-xl font-semibold mb-2">{book.name}</h2>
                            <p>Price: {book.price}</p>
                            <p>Sold Count: {book.soldCount}</p>
                            <button onClick={() => handleEditBook(book)}>Edit</button> {/* Button để chỉnh sửa cuốn sách */}
                        </div>
                    </li>
                ))}
            </ul>

            <div className="flex justify-between mt-4">
                <button onClick={handlePrevPage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={page === 1}>Previous Page</button>
                <button onClick={handleNextPage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Next Page</button>
            </div>
        </div>
    );
}

export default BookList;

