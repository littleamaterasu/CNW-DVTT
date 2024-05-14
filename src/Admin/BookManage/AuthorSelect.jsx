import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthorCreate from './AuthorCreate';

function AuthorSelect({ selectedAuthors, setSelectedAuthors, authorList, onNewAuthor }) {
    const [filteredAuthors, setFilteredAuthors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAuthorCreate, setShowAuthorCreate] = useState(false);

    useEffect(() => {
        setFilteredAuthors(authorList);
    }, [authorList]);

    useEffect(() => {
        if (searchTerm) {
            setFilteredAuthors(
                authorList.filter(author => author.name.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        } else {
            setFilteredAuthors(authorList);
        }
    }, [searchTerm, authorList]);

    const handleSelectAuthor = (author) => {
        if (!selectedAuthors.includes(author.name)) {
            setSelectedAuthors([...selectedAuthors, author.name]);
        }
    };

    const handleRemoveAuthor = (authorName) => {
        setSelectedAuthors(selectedAuthors.filter(name => name !== authorName));
    };

    const handleCreateNewAuthor = (newAuthor) => {
        onNewAuthor(newAuthor);
        setShowAuthorCreate(false);
        setSearchTerm(newAuthor.name);
    };

    return (
        <div className="author-select">
            <ToastContainer />
            <div>
                {selectedAuthors.map((author, index) => (
                    <span key={index} onClick={() => handleRemoveAuthor(author)}>
                        {author} &times;
                    </span>
                ))}
            </div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search or create author"
            />
            <ul>
                {filteredAuthors.map((author) => (
                    <li key={author.id} onClick={() => handleSelectAuthor(author)}>
                        {author.name}
                    </li>
                ))}
            </ul>
            {searchTerm && !filteredAuthors.some(author => author.name.toLowerCase() === searchTerm.toLowerCase()) && (
                <button onClick={() => setShowAuthorCreate(true)}>Create new author "{searchTerm}"</button>
            )}
            {showAuthorCreate && (
                <AuthorCreate
                    authorList={authorList}
                    setShowAuthorCreate={setShowAuthorCreate}
                    onNewAuthor={handleCreateNewAuthor}
                />
            )}
        </div>
    );
}

export default AuthorSelect;
