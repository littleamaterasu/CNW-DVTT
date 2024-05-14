import React, { useState, useEffect } from 'react';
import BookCreate from './BookCreate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BookList() {
    const [books, setBooks] = useState([]);
    const [showBookCreate, setShowBookCreate] = useState(false);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('', {
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

        fetchBooks();
    }, []);

    const handleNewBook = (newBook) => {
        setBooks([...books, newBook]);
        setShowBookCreate(false);
    };

    const handleFormToggle = () => {
        setShowBookCreate(!showBookCreate);
    };

    return (
        <div className="book-list">
            <ToastContainer />
            <h1>Book List</h1>
            <button onClick={handleFormToggle}>
                {showBookCreate ? 'Hide Form' : 'Add Book'}
            </button>
            {showBookCreate && (
                <BookCreate
                    bookList={books}
                    setShowBookCreate={setShowBookCreate}
                    onNewBook={handleNewBook}
                />
            )}
            <ul>
                {books.map((book, index) => (
                    <li key={index}>
                        <h2>{book.name}</h2>
                        <img src={book.cover} alt="img" />
                        <p>Author: {book.author}</p>
                        <p>Genre: {book.genre}</p>
                        <p>Publisher: {book.publisher}</p>
                        <p>Written Year: {book.writtenYear}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BookList;
