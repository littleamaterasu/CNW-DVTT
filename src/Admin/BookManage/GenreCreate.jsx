import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function GenreCreate({ genreList, setShowGenreCreate, onNewGenre }) {
    const [genreName, setGenreName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const genreExists = genreList.some(genre => genre.name.toLowerCase() === genreName.toLowerCase());
        if (genreExists) {
            toast.error('Genre with this name already exists.');
            return;
        }

        const newGenre = {
            name: genreName,
        };

        try {
            const response = await fetch('', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                },
                body: JSON.stringify(newGenre)
            });

            if (!response.ok) {
                throw new Error('Failed to submit genre');
            }

            const createdGenre = await response.json();
            toast.success('Genre submitted successfully!');

            onNewGenre(createdGenre);

            setGenreName('');
            setShowGenreCreate(false);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleCloseForm = () => {
        setShowGenreCreate(false);
    };

    return (
        <div className='genre-create'>
            <ToastContainer />
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="genreName">Genre Name</label>
                    <input
                        type="text"
                        id="genreName"
                        value={genreName}
                        onChange={(e) => setGenreName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
                <button type="button" onClick={handleCloseForm}>X</button>
            </form>
        </div>
    );
}

export default GenreCreate;
