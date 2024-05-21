import React, { useState, useEffect } from 'react';
import GenreCreate from './GenreCreate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE_URL } from '../../config';

function GenreList() {
    const [genres, setGenres] = useState([]);
    const [showGenreCreate, setShowGenreCreate] = useState(false);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/category/get`);
                if (!response.ok) {
                    throw new Error('Failed to fetch genres');
                }
                const data = await response.json();
                setGenres(data);
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchGenres();
    }, []);

    const handleNewGenre = (newGenre) => {
        setGenres([...genres, newGenre]);
        setShowGenreCreate(false);
    };

    const handleFormToggle = () => {
        setShowGenreCreate(!showGenreCreate);
    };

    return (
        <div className="genre-list">
            <ToastContainer />
            <h1>Genre List</h1>
            <button onClick={handleFormToggle}>
                {showGenreCreate ? 'Hide Form' : 'Add Genre'}
            </button>
            {showGenreCreate && (
                <GenreCreate
                    genreList={genres}
                    setShowGenreCreate={setShowGenreCreate}
                    onNewGenre={handleNewGenre}
                />
            )}
            <ul>
                {genres.map((genre, index) => (
                    <li key={index}>
                        <h2>{genre.name}</h2>
                        <h2>{genre.info}</h2>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default GenreList;
