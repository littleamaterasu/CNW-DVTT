import React, { useState, useEffect } from 'react';
import BookCreate from './BookCreate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE_URL } from '../../config';

function BookList() {
    const [books, setBooks] = useState([]);
    const [showBookCreate, setShowBookCreate] = useState(false);
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

    const handleNextPage = () => {
        setPage(page + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    return (
        <div className="book-list p-4">
            <ToastContainer />
            <h1 className="text-2xl font-bold mb-4">Book List</h1>
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
                    <li key={index} className="border-b border-gray-300 py-4">
                        <h2 className="text-xl font-semibold mb-2">{book.name}</h2>
                        <img className="w-48 h-48 object-cover rounded" src={book.cover} alt="img" />
                        <p className="text-gray-700">Author: {book.author}</p>
                        <p className="text-gray-700">Genre: {book.genre}</p>
                        <p className="text-gray-700">Publisher: {book.publisher}</p>
                        <p className="text-gray-700">Written Year: {book.writtenYear}</p>
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
