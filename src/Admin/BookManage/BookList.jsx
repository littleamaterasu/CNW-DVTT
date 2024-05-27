import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookCreate from './BookCreate';
import BookEdit from './BookEdit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE_URL } from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faSync } from '@fortawesome/free-solid-svg-icons/faSync';

function BookList() {
    const [books, setBooks] = useState([]);
    const [showBookCreate, setShowBookCreate] = useState(false);
    const [showBookEdit, setShowBookEdit] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchBooks();
    }, [page]);

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

    const handleUpdatedBook = (updatedBook) => {
        const updatedBooks = books.map(book => book.id === updatedBook.id ? updatedBook : book);
        setBooks(updatedBooks);
        setShowBookEdit(false);
    };

    const handleFormToggle = () => {
        setShowBookCreate(!showBookCreate);
    };

    const handleEditBook = (bookId) => {
        setSelectedBookId(bookId);
        setShowBookEdit(true);
    };

    const handleNextPage = () => {
        if (books.length > 0) setPage(page + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    return (
        <div className="book-list-container bg-gray-900 min-h-screen bg-cover bg-center p-4" >
            <ToastContainer />
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-white">Book List</h1>
                <Link to="/admin" className="text-white">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                    Back to Admin
                </Link>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleFormToggle}>
                <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add new book
            </button>
            <button onClick={fetchBooks} className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"><FontAwesomeIcon icon={faSync} className="mr-2" /> Reload</button>
            <div className="flex justify-between my-4">
                <button onClick={handlePrevPage} className="text-white font-bold py-2 px-4 rounded" disabled={page === 1}><FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Previous Page</button>
                <button onClick={handleNextPage} className="text-white font-bold py-2 px-4 rounded">Next Page <FontAwesomeIcon icon={faArrowRight} className="ml-2" /></button>
            </div>
            {showBookCreate && (
                <BookCreate
                    bookList={books}
                    setShowBookCreate={setShowBookCreate}
                    onNewBook={handleNewBook}
                />
            )}
            {showBookEdit && selectedBookId && (
                <BookEdit
                    bookId={selectedBookId}
                    setShowBookEdit={setShowBookEdit}
                    onBookUpdated={handleUpdatedBook}
                />
            )}
            <ul className="grid grid-cols-5 gap-4">
                {books.map((book, index) => (
                    <li key={index} className="bg-white shadow-md rounded-lg p-4">
                        <img className="w-full h-48 object-cover mb-4 rounded" src={book.imageUrl} alt="Book cover" />
                        <div>
                            <h2 className="text-lg font-semibold mb-2">{book.name}</h2>
                            <p>Price: {book.price}</p>
                            <p>Sold Count: {book.soldCount}</p>
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2" onClick={() => handleEditBook(book.id)}>Edit</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BookList;
