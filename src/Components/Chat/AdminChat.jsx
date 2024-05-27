import { useEffect, useState, useRef } from "react";
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
    const [newMessages, setNewMessages] = useState({}); // Track new messages for each user
    const chatContainerRef = useRef(null); // Create a ref for the chat container

    useEffect(() => {
        // Fetch initial messages from API
        const fetchMessages = async () => {
            try {
                const response = await fetch(`${API_BASE_URL[import.meta.env.MODE]}/message/admin?Day=2`, {
                    headers: {
                        'X-CSRF-TOKEN': localStorage.getItem('CSRF'),
                    },
                    credentials: 'include'
                });
                const data = await response.json();

                // Transform data
                const formattedMessages = data.reduce((acc, { username, listMess }) => {
                    acc[username] = listMess.map(mess =>
                        mess.from === 'user' ? <OthersText message={mess.content} /> : <SelfText message={mess.content} />);
                    return acc;
                }, {});
                setMessages(formattedMessages);
                setUsers(data.map(({ username }) => username));
            } catch (error) {
                toast.error("Failed to load initial messages");
            }
        };

        fetchMessages();

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
                    setUsers(prev => [...new Set([...prev, username])]); // Ensures unique users
                    setNewMessages(prev => ({ ...prev, [username]: true })); // Mark new message for the user
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
    }, [messages, currentChat]);

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

    const handleUserClick = (user) => {
        setCurrentChat(user);
        setNewMessages(prev => ({ ...prev, [user]: false })); // Clear new message notification for the user
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
                    {users.map((user, index) => (
                        <div
                            key={index}
                            onClick={() => handleUserClick(user)}
                            className="flex-shrink-0 cursor-pointer text-blue-600 hover:text-blue-800 p-2 relative"
                        >
                            {user}
                            {newMessages[user] && (
                                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                    !
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                {currentChat ? (
                    <div>
                        <h2 className="text-2xl mb-4">Chat with {currentChat}</h2>
                        <div
                            className="chat-text h-40 overflow-y-auto p-2 mb-2 border border-gray-300 rounded"
                            ref={chatContainerRef} // Attach the ref to the chat container
                        >
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
