import { useAuth } from '../../context/AuthContext';

export default function ConversationsList({ conversations, selectedConversation, onSelectConversation }) {
    const { user } = useAuth();

    const getOtherParticipant = (conversation) => {
        return conversation.participants.find(p => p._id !== user?.userId);
    };

    const formatTime = (date) => {
        const now = new Date();
        const messageDate = new Date(date);
        const diffInHours = (now - messageDate) / (1000 * 60 * 60);

        if (diffInHours < 24) {
            return messageDate.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
        } else if (diffInHours < 168) {
            return messageDate.toLocaleDateString('en-US', { weekday: 'short' });
        } else {
            return messageDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            });
        }
    };

    if (conversations.length === 0) {
        return (
            <div className="h-full flex items-center justify-center p-6">
                <p className="text-sm text-gray-500 font-light text-center">
                    No conversations yet.<br />
                    Apply to projects to start chatting with clients.
                </p>
            </div>
        );
    }

    return (
        <div className="h-full overflow-y-auto">
            {conversations.map((conversation) => {
                const otherUser = getOtherParticipant(conversation);
                const isSelected = selectedConversation?._id === conversation._id;

                return (
                    <div
                        key={conversation._id}
                        onClick={() => onSelectConversation(conversation)}
                        className={`p-4 border-b border-gray-100 transition cursor-pointer ${isSelected
                            ? 'bg-green-50 border-l-2 border-l-green-600'
                            : 'hover:bg-gray-50'
                            }`}
                    >
                        <div className="flex items-start gap-3">
                            {/* Avatar */}
                            {otherUser?.avatar ? (
                                <img
                                    src={otherUser.avatar}
                                    alt={otherUser.name}
                                    className="w-12 h-12 rounded-full object-cover border border-gray-200 flex-shrink-0"
                                />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-light border border-gray-200 flex-shrink-0">
                                    {otherUser?.name?.charAt(0).toUpperCase()}
                                </div>
                            )}

                            <div className="flex-1 min-w-0">
                                <div className=" flex items-start justify-between mb-1">
                                    <h3 className="text-sm font-normal text-gray-800 truncate">
                                        {otherUser?.name}
                                    </h3>
                                    <span className="text-xs text-gray-400 font-light ml-2 flex-shrink-0">
                                        {conversation.lastMessageAt && formatTime(conversation.lastMessageAt)}
                                    </span>
                                </div>

                                <p className=" text-xs text-gray-500 font-light truncate mb-1">
                                    {conversation.projectId?.title}
                                </p>

                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-gray-600 font-light truncate">
                                        {conversation.lastMessage?.content || 'No messages yet'}
                                    </p>
                                    {conversation.unreadCount > 0 && (
                                        <span className="ml-2 px-1.5 py-0.5 bg-green-600 text-white text-xs rounded-full font-light min-w-[20px] text-center flex-shrink-0">
                                            {conversation.unreadCount}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
