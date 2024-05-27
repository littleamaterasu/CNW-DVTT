import { useEffect, useState, useRef } from "react";
import { Client } from "@stomp/stompjs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE_URL } from "../../config";
import { OthersText, SelfText } from "./ChatText/ChatText";

function Chat({ setShowChat }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [client, setClient] = useState(null);
    const chatContainerRef = useRef(null); // Create a ref for the chat container

    useEffect(() => {
        // Fetch initial messages from API
        const fetchMessages = async () => {
            try {
                const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/message/user`, {
                    headers: {
                        'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                    },
                    credentials: 'include'
                });
                const data = await response.json();

                // Transform data into the required format
                const formattedMessages = data.map(message =>
                    message.from === 'user'
                        ? <SelfText key={message.id} message={message.content} />
                        : <OthersText key={message.id} message={message.content} />
                );
                setMessages(formattedMessages);
            } catch (error) {
                toast.error("Failed to load initial messages");
            }
        };

        fetchMessages();

        const newClient = new Client({
            brokerURL: `ws://localhost:8081/hello`,
            connectHeaders: {
                username: localStorage.getItem('username'),
            },
            onConnect: () => {
                newClient.subscribe('/user/queue/reply', message => {
                    const parsedMessage = JSON.parse(message.body);
                    setMessages(prev => [...prev, <OthersText key={parsedMessage.id} message={parsedMessage.content} />]);
                });
            },
        });

        newClient.activate();
        setClient(newClient);

        return () => {
            newClient.deactivate();
        };
    }, []);

    useEffect(() => {
        // Scroll to bottom whenever messages are updated
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = () => {
        if (input.trim() && client) {
            const newMessage = {
                from: 'user',
                content: input,
                username: localStorage.getItem('username')
            };

            client.publish({
                destination: '/app/hello',
                body: JSON.stringify(newMessage)
            });

            setMessages(prev => [...prev, <SelfText key={Date.now()} message={input} />]);
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
                <h2 className="text-2xl mb-4">Chat with admin</h2>
                <div
                    className="chat-text h-40 overflow-y-auto p-2 mb-2 border border-gray-300 rounded"
                    ref={chatContainerRef} // Attach the ref to the chat container
                >
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
