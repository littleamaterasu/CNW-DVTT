import React, { useEffect, useState } from "react";
import Header from "../Components/Header/Header";

function FAQ() {
    const [FAQlist, setFAQlist] = useState([]);
    const [showOthersInput, setShowOthersInput] = useState(false);
    const [othersInputValue, setOthersInputValue] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // API nháp
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await response.json();
            setFAQlist(data);
        } catch (error) {
            console.error("Error fetching FAQ list:", error);
        }
    };

    const handleOthersInputChange = (e) => {
        setOthersInputValue(e.target.value);
    };

    const handleSubmit = () => {
        // API
    };

    return (
        <div>
            <Header />
            <h2>FAQs</h2>
            <ul>
                {FAQlist.map((item, index) => (
                    <li key={index}>
                        <label>
                            <input type="radio" value={item.id} />
                            {item.name}
                        </label>
                    </li>
                ))}
                {
                    FAQlist.length > 0 &&
                    <li>
                        <label>
                            <input
                                type="radio"
                                value="others"
                                onChange={() => setShowOthersInput(!showOthersInput)}
                            />
                            Others
                        </label>
                        {FAQlist.length > 0 && showOthersInput && (
                            <input
                                type="text"
                                value={othersInputValue}
                                onChange={handleOthersInputChange}
                                placeholder="Enter other question"
                            />
                        )}
                    </li>
                }
            </ul>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default FAQ;
