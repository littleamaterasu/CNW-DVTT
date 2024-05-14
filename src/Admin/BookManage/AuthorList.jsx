import React, { useState, useEffect } from 'react';
import AuthorCreate from './AuthorCreate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AuthorList() {
    const [authors, setAuthors] = useState([]);
    const [showAuthorCreate, setShowAuthorCreate] = useState(false);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await fetch('', {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                    }
                }
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch authors');
                }
                const data = await response.json();
                setAuthors(data);
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchAuthors();
    }, []);

    const handleNewAuthor = (newAuthor) => {
        setAuthors([...authors, newAuthor]);
        setShowAuthorCreate(false);
    };

    const handleFormToggle = () => {
        setShowAuthorCreate(!showAuthorCreate);
    };

    return (
        <div className="author-list">
            <ToastContainer />
            <h1>Author List</h1>
            <button onClick={handleFormToggle}>
                {showAuthorCreate ? 'Hide Form' : 'Add Author'}
            </button>
            {showAuthorCreate && <AuthorCreate authorList={authors} setShowAuthorCreate={setShowAuthorCreate} onNewAuthor={handleNewAuthor} />}
            <ul>
                {authors.map((author, index) => (
                    <li key={index}>
                        <h2>{author.name}</h2>
                        <p>{author.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AuthorList;
