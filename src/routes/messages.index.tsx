import { MotionLink } from '@/components/ui/Link';
import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { mockConversations, currentUser } from '@/lib/seed-data';
import { MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarGroup } from '@/components/ui/Avatar';
import { CountBadge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { SearchInput } from '@/components/ui/SearchInput';

export const Route = createFileRoute('/messages/')({
  component: MessagesListComponent,
  beforeLoad: () => {
    document.title = 'Messages - Journeys';
  },
});

function MessagesListComponent() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = mockConversations.filter((conv) =>
    conv.participants.some(
      (p) =>
        p.id !== currentUser.id &&
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="px-6 pt-12 pb-5 border-b border-border">
        <motion.h1
          className="font-serif text-[2.5rem] font-medium leading-none text-text-primary mb-5"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Messages
        </motion.h1>

        {/* Search Bar */}
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search conversations..."
        />
      </header>

      {/* Conversations List */}
      <div className="pb-24">
        {filteredConversations.length > 0 ? (
          <div>
            {filteredConversations.map((conversation, index) => {
              const otherParticipants = conversation.participants.filter(
                (p) => p.id !== currentUser.id
              );
              const isGroup = otherParticipants.length > 1;
              const displayName = isGroup
                ? otherParticipants.map((p) => p.name.split(' ')[0]).join(', ')
                : otherParticipants[0].name;

              return (
                <MotionLink
                  key={conversation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                  to="/messages/$conversationId" params={{ conversationId: conversation.id }}
                  className="block focus-ring px-6 py-4 border-b border-border hover:bg-surface-secondary/50 transition-colors cursor-pointer"
                >
                  <div className="flex gap-3">
                    {/* Avatar(s) */}
                    <div className="relative flex-shrink-0">
                      {isGroup ? (
                        <AvatarGroup size="lg">
                          {otherParticipants.slice(0, 2).map((participant) => (
                            <Avatar
                              key={participant.id}
                              src={participant.avatar}
                              name={participant.name}
                              size="lg"
                              fallback="cyan"
                              bordered
                            />
                          ))}
                        </AvatarGroup>
                      ) : (
                        <Avatar
                          src={otherParticipants[0].avatar}
                          name={otherParticipants[0].name}
                          size="lg"
                          fallback="cyan"
                        />
                      )}
                      {conversation.unreadCount > 0 && (
                        <CountBadge count={conversation.unreadCount} />
                      )}
                    </div>

                    {/* Message Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3
                          className={`font-semibold truncate ${
                            conversation.unreadCount > 0 ? 'text-text-primary' : 'text-text-primary'
                          }`}
                        >
                          {displayName}
                        </h3>
                        <span className="text-xs text-text-secondary whitespace-nowrap ml-2">
                          {conversation.lastMessage &&
                            formatTimestamp(conversation.lastMessage.timestamp)}
                        </span>
                      </div>
                      {conversation.lastMessage && (
                        <p
                          className={`text-sm truncate ${
                            conversation.unreadCount > 0
                              ? 'text-text-primary font-medium'
                              : 'text-text-secondary'
                          }`}
                        >
                          {conversation.lastMessage.senderId === currentUser.id && 'You: '}
                          {conversation.lastMessage.text}
                        </p>
                      )}
                    </div>
                  </div>
                </MotionLink>
              );
            })}
          </div>
        ) : (
          <EmptyState
            icon={<MessageCircle className="h-16 w-16" />}
            title="No conversations"
            description="Start chatting with your travel buddies!"
            className="px-6"
          />
        )}
      </div>
    </div>
  );
}
