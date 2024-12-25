'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const[loading, setLoading]=useState(false);

    const handleBot=async()=>{

    if(input){
      const userMessage = { user: input, ai: " " };
    setMessages([...messages, userMessage]);
    } else{
      setLoading(true)
    }

    try {
      setLoading(true)
      const response = await fetch("http://localhost:5200/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMsg: input }),
      });
      setInput("");
      const data = await response.json();
      setLoading(false)
      if (data.success) {
        
        setMessages((prev) => {
          const updatedMessages = [...prev];
          updatedMessages[updatedMessages.length - 1].ai = data.aiResponse;
          return updatedMessages;
        });
      }
      
    } catch (err) {
      setLoading(false)
      console.log("Error fetching AI response:", err.message);
    }
  }

  const handleClearHist=()=>{
    setMessages("");
    setIsOpen(false);
  }

  return (
    <motion.div
      className="fixed bottom-4 right-4"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="bg-yellow-400 p-3 rounded-full shadow-lg cursor-pointer"
      >
        { isOpen ? '🔻' : '🤖' }
      </div>

      {isOpen && (
        <motion.div
          className="absolute right-4 bottom-20 w-96 bg-black border-indigo text-white bot-text p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className='flex space-x-2 justify-between'>
          <h2 className="text-lg font-bold mb-4">GOTbot</h2>
          <button
              onClick={handleClearHist}
              className="bg-chatbotYellow text-chatbotBlue p-2 rounded-md hover:bg-black"
            >
              ❌
            </button>
          </div>
          <div className="space-y-4 mb-4 max-h-64 overflow-y-auto bot-text">
            { messages.length > 0 && messages.map((msg, index) => (
              <div key={index} className="p-2">
                <p>
                  <strong>You:</strong> {msg.user}
                </p>
                <p>
                  <strong>AI:</strong> {msg.ai || "dracarys🔥...loading.."}
                </p>
              </div>
            ))}
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              className="flex-grow p-2 text-black rounded-md border border-gray-300 focus:outline-none"
              required
            />
            <button
              onClick={handleBot}
              disabled={ loading && true}
              className="bg-chatbotYellow text-chatbotBlue px-4 py-2 rounded-md hover:bg-black"
            >
              Send
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
