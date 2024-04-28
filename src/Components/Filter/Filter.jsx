import React, { useState, useEffect } from 'react';

function Filter({ type }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // API + type
            const response = await fetch();
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <h2>{type} Filter</h2>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>
                        <label>
                            <input type="checkbox" value={item.value} />
                            {item.label}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Filter;
