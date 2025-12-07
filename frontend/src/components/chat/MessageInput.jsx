import { useState, useRef } from 'react';
import { HiOutlinePaperAirplane } from 'react-icons/hi';
import socketService from '../../services/socketService';

export default function MessageInput({ conversationId }) {
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);
    const typingTimeoutRef = useRef(null);

    const handleTyping = (value) => {
        setMessage(value);

        // Emit typing indicator
        socketService.emitTyping(conversationId, true);

        // Clear previous timeout
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        // Stop typing after 1 second of inactivity
        typingTimeoutRef.current = setTimeout(() => {
            socketService.emitTyping(conversationId, false);
        }, 1000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!message.trim() || sending) return;

        setSending(true);
        socketService.emitTyping(conversationId, false);

        try {
            socketService.sendMessage(conversationId, message.trim());
            setMessage('');
        } catch (err) {
            console.error('Error sending message:', err);
        } finally {
            setSending(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="border-t border-gray-100 px-6 py-4 flex-shrink-0">
            <div className="flex items-end gap-3">
                <div className="flex-1">
                    <textarea
                        value={message}
                        onChange={(e) => handleTyping(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message..."
                        className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:border-green-600 focus:outline-none font-light resize-none"
                        rows={1}
                        style={{
                            minHeight: '42px',
                            maxHeight: '120px',
                            height: 'auto',
                            overflow: message.split('\n').length > 2 ? 'auto' : 'hidden'
                        }}
                        onInput={(e) => {
                            e.target.style.height = 'auto';
                            e.target.style.height = e.target.scrollHeight + 'px';
                        }}
                    />
                </div>
                <button
                    type="submit"
                    disabled={!message.trim() || sending}
                    className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
                    title="Send message"
                >
                    <HiOutlinePaperAirplane size={18} />
                </button>
            </div>
        </form>
    );
}
