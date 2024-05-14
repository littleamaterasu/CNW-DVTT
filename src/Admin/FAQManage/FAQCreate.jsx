import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FAQCreateForm({ FAQList, setFormVisible }) {
    const [faqName, setFaqName] = useState('');
    const [faqContent, setFaqContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const faqExists = FAQList.some(faq => faq.name.toLowerCase() === faqName.toLowerCase());
        if (faqExists) {
            toast.error('FAQ with this name already exists.');
            return;
        }

        const newFAQ = {
            name: faqName,
            content: faqContent
        };

        try {
            const response = await fetch('/api/faqs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                },
                body: JSON.stringify(newFAQ)
            });

            if (!response.ok) {
                throw new Error('Failed to submit FAQ');
            }

            toast.success('FAQ submitted successfully!');

            setFaqName('');
            setFaqContent('');
            setFormVisible(false);
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className='FAQ-create'>
            <ToastContainer />
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="faqName">FAQ Name</label>
                    <input
                        type="text"
                        id="faqName"
                        value={faqName}
                        onChange={(e) => setFaqName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="faqContent">FAQ Content</label>
                    <textarea
                        id="faqContent"
                        value={faqContent}
                        onChange={(e) => setFaqContent(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>
            <button onClick={() => setFormVisible(false)}>X</button>
        </div>
    );
}

export default FAQCreateForm;
