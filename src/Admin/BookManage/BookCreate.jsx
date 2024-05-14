import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GenreSelect from './GenreSelect';
import AuthorSelect from './AuthorSelect';

function BookCreate({ bookList, setShowBookCreate, onNewBook }) {
    const [name, setName] = useState('');
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [authorList, setAuthorList] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genreList, setGenreList] = useState([]);
    const [cover, setCover] = useState('');
    const [weight, setWeight] = useState('');
    const [publisher, setPublisher] = useState('');
    const [writtenYear, setWrittenYear] = useState('');

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await fetch('', {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch authors');
                }
                const data = await response.json();
                setAuthorList(data);
            } catch (error) {
                toast.error(error.message);
            }
        };

        const fetchGenres = async () => {
            try {
                const response = await fetch('', {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch genres');
                }
                const data = await response.json();
                setGenreList(data);
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchAuthors();
        fetchGenres();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newBook = {
            name,
            authors: selectedAuthors,
            genres: selectedGenres,
            cover,
            weight,
            publisher,
            writtenYear
        };

        try {
            const response = await fetch('', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                },
                body: JSON.stringify(newBook)
            });

            if (!response.ok) {
                throw new Error('Failed to submit book');
            }

            const createdBook = await response.json();
            toast.success('Book submitted successfully!');

            onNewBook(createdBook);

            setName('');
            setSelectedAuthors([]);
            setSelectedGenres([]);
            setCover('');
            setWeight('');
            setPublisher('');
            setWrittenYear('');
            setShowBookCreate(false);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleCloseForm = () => {
        setShowBookCreate(false);
    };

    return (
        <div className='book-create'>
            <ToastContainer />
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Book Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="authors">Authors</label>
                    <AuthorSelect
                        selectedAuthors={selectedAuthors}
                        setSelectedAuthors={setSelectedAuthors}
                        authorList={authorList}
                        onNewAuthor={(newAuthor) => setAuthorList([...authorList, newAuthor])}
                    />
                </div>
                <div>
                    <label htmlFor="genres">Genres</label>
                    <GenreSelect
                        selectedGenres={selectedGenres}
                        setSelectedGenres={setSelectedGenres}
                        genreList={genreList}
                        onNewGenre={(newGenre) => setGenreList([...genreList, newGenre])}
                    />
                </div>
                <div>
                    <label htmlFor="cover">Cover URL</label>
                    <input
                        type="text"
                        id="cover"
                        value={cover}
                        onChange={(e) => setCover(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="weight">Weight</label>
                    <input
                        type="text"
                        id="weight"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="publisher">Publisher</label>
                    <input
                        type="text"
                        id="publisher"
                        value={publisher}
                        onChange={(e) => setPublisher(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="writtenYear">Written Year</label>
                    <input
                        type="text"
                        id="writtenYear"
                        value={writtenYear}
                        onChange={(e) => setWrittenYear(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
                <button type="button" onClick={handleCloseForm}>X</button>
            </form>
        </div>
    );
}

export default BookCreate;
