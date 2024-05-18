import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Chat({ setShowChat }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [client, setClient] = useState(null);

    useEffect(() => {
        const newClient = new Client({
            brokerURL: 'ws://10.133.124.103:8081/hello',
            onConnect: () => {
                newClient.subscribe('/user/queue/reply', message => {
                    setMessages(prev => [...prev, message.body]);
                });

                newClient.publish({
                    destination: '/app/hello',
                    body: 'React User'
                });
            },
            debug: str => console.log(str),
        });

        newClient.activate();
        setClient(newClient);

        return () => {
            newClient.deactivate();
        };
    }, []);

    const handleSend = () => {
        if (input.trim() && client) {
            client.publish({
                destination: '/app/hello',
                body: input
            });
            setInput("");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
            <ToastContainer />
            <div className="bg-white p-8 rounded shadow-lg relative w-full max-w-md mx-auto">
                <button
                    className="absolute top-2 right-2 text-gray-600"
                    onClick={() => setShowChat(false)}
                >
                    &times;
                </button>
                <h2 className="text-2xl mb-4">Chat</h2>
                <div className="chat-text h-40 overflow-y-auto p-2 mb-2 border border-gray-300 rounded">
                    {messages.map((message, index) => (
                        <div key={index}>{message}</div>
                    ))}
                </div>
                <div className="chat-form flex">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-grow p-2 border border-gray-300 rounded-l"
                    />
                    <button
                        onClick={handleSend}
                        className="p-2 bg-blue-500 text-white rounded-r"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chat;
