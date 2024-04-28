import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Book() {
    const [data, setData] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    if (!data) {
        return <p>Loading...</p>;
    }

    return <p>{data.name}</p>;
}

export default Book;
