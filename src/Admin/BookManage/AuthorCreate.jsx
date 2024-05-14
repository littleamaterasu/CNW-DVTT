import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AuthorCreate({ authorList, setShowAuthorCreate, onNewAuthor }) {
    const [authorName, setAuthorName] = useState('');
    const [authorDescription, setAuthorDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const authorExists = authorList.some(author => author.name.toLowerCase() === authorName.toLowerCase());
        if (authorExists) {
            toast.error('Author with this name already exists.');
            return;
        }

        const newAuthor = {
            name: authorName,
            description: authorDescription
        };

        try {
            const response = await fetch('', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                },
                body: JSON.stringify(newAuthor)
            });

            if (!response.ok) {
                throw new Error('Failed to submit author');
            }

            const createdAuthor = await response.json();
            toast.success('Author submitted successfully!');

            onNewAuthor(createdAuthor)

            setAuthorName('');
            setAuthorDescription('');
            setShowAuthorCreate(false);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleCloseForm = () => {
        setShowAuthorCreate(false);
    };

    return (
        <div className='Author-create'>
            <ToastContainer />
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="authorName">Author Name</label>
                    <input
                        type="text"
                        id="authorName"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="authorDescription">Author Description</label>
                    <textarea
                        id="authorDescription"
                        value={authorDescription}
                        onChange={(e) => setAuthorDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit">Submit</button>
                <button type="button" onClick={handleCloseForm}>X</button>
            </form>
        </div>
    );
}

export default AuthorCreate;
