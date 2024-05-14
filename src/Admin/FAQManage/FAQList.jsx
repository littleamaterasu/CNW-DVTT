import React, { useState, useEffect } from 'react';
import FAQCreateForm from './FAQCreateForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FAQList() {
    const [faqs, setFaqs] = useState([]);
    const [formVisible, setFormVisible] = useState(false);

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const response = await fetch('/api/faqs');
                if (!response.ok) {
                    throw new Error('Failed to fetch FAQs');
                }
                const data = await response.json();
                setFaqs(data);
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchFaqs();
    }, []);

    const handleFormToggle = () => {
        setFormVisible(true);
    };

    return (
        <div className="FAQ-list">
            <ToastContainer />
            <h1>FAQ List</h1>
            <button onClick={handleFormToggle}>
                Create New FAQ
            </button>
            {formVisible && <FAQCreateForm FAQList={faqs} setFormVisible={setFormVisible} />}
            <ul>
                {faqs.map((faq, index) => (
                    <li key={index}>
                        <h2>{faq.name}</h2>
                        <p>{faq.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FAQList;
