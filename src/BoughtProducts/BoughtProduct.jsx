import { useEffect, useState } from "react";

function BoughtProducts() {
    const [list, setList] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_BASE_API_URL + '/...', { //API
                    headers: {
                        'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                    },
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch payment data");
                }
                const data = await response.json();
                setPaymentList(data);
            } catch (error) {
                console.error("Error fetching payment data:", error);
            }
        }
    })
}