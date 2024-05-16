import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";

function Chat() {
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
        <div>
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
    );
}

export default Chat;
