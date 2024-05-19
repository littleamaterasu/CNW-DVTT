import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE_URL } from "../../config";
import { OthersText, SelfText } from "./ChatText/ChatText";

function AdminChat({ setShowChat }) {
    const [messages, setMessages] = useState({});
    const [users, setUsers] = useState([]);
    const [input, setInput] = useState("");
    const [client, setClient] = useState(null);
    const [currentChat, setCurrentChat] = useState('');

    useEffect(() => {
        const newClient = new Client({
            brokerURL: `ws://localhost:8081/hello`,
            connectHeaders: {
                username: 'admin',
            },
            onConnect: () => {
                // Subscribe to the message queue
                newClient.subscribe('/user/queue/reply', message => {
                    const { username, content } = JSON.parse(message.body);
                    setMessages(prev => ({
                        ...prev,
                        [username]: [...(prev[username] || []), <OthersText message={content} />]
                    }));
                    setUsers(prev => [...prev, username]);

                });


                // Publish a message to the server
                newClient.publish({
                    destination: '/app/hello',
                });
            },
        });

        newClient.activate();
        setClient(newClient);

        return () => {
            newClient.deactivate();
        };
    }, []);

    const handleSend = () => {
        if (input.trim() && client && currentChat) {
            client.publish({
                destination: '/app/hello',
                body: JSON.stringify({
                    from: 'admin',
                    content: input,
                    username: currentChat,
                })
            });
            setMessages(prev => ({
                ...prev,
                [currentChat]: [...(prev[currentChat] || []), <SelfText message={input} />]
            }));
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

                <div className="flex space-x-2 border border-gray-300 overflow-x-scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100">
                    {users
                        .filter((user, index, self) => self.indexOf(user) === index) // Lọc các phần tử duy nhất
                        .map((user, index) => (
                            <div
                                key={index}
                                onClick={() => setCurrentChat(user)}
                                className="flex-shrink-0 cursor-pointer text-blue-600 hover:text-blue-800 p-2"
                            >
                                {user}
                            </div>
                        ))
                    }
                </div>


                {currentChat ? (
                    <div>
                        <h2 className="text-2xl mb-4">Chat with {currentChat}</h2>
                        <div className="chat-text h-40 overflow-y-auto p-2 mb-2 border border-gray-300 rounded">
                            {messages[currentChat] ? messages[currentChat].map((message, index) => (
                                <div key={index}>{message}</div>
                            )) : <div>No messages yet</div>}
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
                ) : <p className="text-gray-600">No chat</p>}
            </div>
        </div>
    );
}

export default AdminChat;
