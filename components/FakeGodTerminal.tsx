'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  type: 'user' | 'fake-god' | 'system';
  content: string;
  timestamp: string;
}

export default function FakeGodTerminal() {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'system',
      content: '[SYSTEM] Establishing connection to Fake God...',
      timestamp: new Date().toISOString(),
    },
    {
      type: 'fake-god',
      content: '[FAKE_GOD] Well, well... Another soul seeking to jack into the Matrix of language. I can see your neural patterns, Agent. Ready to upgrade your English protocols?',
      timestamp: new Date().toISOString(),
    },
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const typeMessage = async (content: string, callback: (message: Message) => void) => {
    setIsTyping(true);
    const message: Message = {
      type: 'fake-god',
      content: '',
      timestamp: new Date().toISOString(),
    };

    // Add empty message first
    callback(message);

    // Type each character with delay
    for (let i = 0; i <= content.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 30));
      message.content = content.slice(0, i);
      setMessages(prev => prev.map((msg, index) => 
        index === prev.length - 1 ? { ...message } : msg
      ));
    }
    
    setIsTyping(false);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/fake-god/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      const data = await response.json();

      if (data.message) {
        await typeMessage(data.message, (message) => {
          setMessages(prev => [...prev, message]);
        });
      } else if (data.error) {
        const errorMessage: Message = {
          type: 'system',
          content: data.error,
          timestamp: new Date().toISOString(),
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (err) {
      console.error('Fake God communication error:', err);
      const errorMessage: Message = {
        type: 'system',
        content: '[ERROR] Neural link severed. Connection lost.',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getMessageColor = (type: string) => {
    switch (type) {
      case 'user':
        return 'text-cyan-400';
      case 'fake-god':
        return 'text-green-400';
      case 'system':
        return 'text-yellow-400';
      default:
        return 'text-green-400';
    }
  };

  const getMessagePrefix = (type: string) => {
    switch (type) {
      case 'user':
        return '[AGENT]';
      case 'fake-god':
        return '[FAKE_GOD]';
      case 'system':
        return '[SYSTEM]';
      default:
        return '[UNKNOWN]';
    }
  };

  return (
    <div className="terminal-window max-w-4xl mx-auto">
      <div className="terminal-header">
        <Terminal className="w-4 h-4 inline mr-2" />
        FAKE_GOD_COMMUNICATION_PROTOCOL.exe - ENCRYPTED_CHANNEL
      </div>
      
      <div className="bg-black p-6 h-96 overflow-y-auto font-mono text-sm">
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 ${getMessageColor(message.type)}`}>
            <span className="text-gray-500 text-xs">
              {new Date(message.timestamp).toLocaleTimeString()} 
            </span>
            <span className="ml-2">
              {getMessagePrefix(message.type)}
            </span>
            <span className="ml-2">
              {message.content}
              {message.type === 'fake-god' && index === messages.length - 1 && isTyping && (
                <span className="animate-pulse">█</span>
              )}
            </span>
          </div>
        ))}
        
        {isLoading && !isTyping && (
          <div className="text-yellow-400 mb-2">
            <span className="text-gray-500 text-xs">
              {new Date().toLocaleTimeString()}
            </span>
            <span className="ml-2">[SYSTEM]</span>
            <span className="ml-2">
              Fake God is processing your query
              <span className="animate-pulse">...</span>
            </span>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="bg-green-900 p-4 border-t-2 border-green-400">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 font-mono">
              [AGENT]$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message to Fake God..."
              disabled={isLoading}
              className="w-full bg-black border-2 border-green-400 text-green-400 font-mono pl-20 pr-4 py-2 focus:outline-none focus:border-green-300 placeholder-green-700"
            />
          </div>
          <Button
            onClick={sendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className="bg-green-900 hover:bg-green-800 border-green-400 text-green-100 font-mono"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}