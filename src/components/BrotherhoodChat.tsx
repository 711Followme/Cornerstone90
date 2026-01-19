import React, { useState, useEffect, useRef } from 'react';
import { Send, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { chatService } from '@/services/chatService';
import { ChatMessage } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

const BrotherhoodChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { userId, profile } = useAuth();

  // Load initial messages
  useEffect(() => {
    loadMessages();
  }, []);

  // Subscribe to real-time updates
  useEffect(() => {
    console.log('Setting up real-time subscription...');
    const unsubscribe = chatService.subscribeToMessages((message) => {
      console.log('New message in component:', message);
      setMessages((prev) => [...prev, message]);
      
      // Show notification if message is from someone else
      if (message.user_id !== userId) {
        setUnreadCount((prev) => prev + 1);
        const senderName = message.profiles?.name || 'A brother';
        toast({
          title: `${senderName} sent a message`,
          description: message.message.substring(0, 50) + (message.message.length > 50 ? '...' : ''),
        });
        
        // Play notification sound (optional)
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZUQ4PVqzn77BdGAg+ltryxnYpBSuBzvLaizsIGGS57OihUBANTKXh8bllHAU2jdXzxnwrBSh+zPDckj4MFmS37OmiUhENTKXh8bllHAU2jdXzxnwrBSh+zPDckj4MFmS37OmiUhENTKXh8bllHAU2jdXzxnwrBSh+zPDckj4MFmS37OmiUhENTKXh8bllHAU2jdXzxnwrBSh+zPDckj4MFmS37OmiUhENTKXh8bllHAU2jdXzxnwrBSh+zPDckj4MFmS37OmiUhENTKXh8bllHAU2jdXzxnwrBSh+zPDckj4MFmS37OmiUhENTKXh8bllHAU2jdXzxnwrBSh+zPDckj4M');
        audio.volume = 0.3;
        audio.play().catch(() => {});
      }
    });

    return () => {
      unsubscribe();
    };
  }, [userId, toast]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const loadMessages = async () => {
    try {
      console.log('Loading messages...');
      const data = await chatService.getMessages();
      console.log('Messages loaded:', data);
      setMessages(data);
    } catch (error) {
      console.error('Failed to load messages:', error);
      toast({
        title: 'Error',
        description: 'Failed to load messages. Please refresh.',
        variant: 'destructive',
      });
    }
  };

  const handleSend = async () => {
    if (!newMessage.trim() || !userId) return;

    if (!profile) {
      toast({
        title: 'Profile Required',
        description: 'Please complete your profile before sending messages.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      console.log('Sending message:', newMessage);
      await chatService.sendMessage(userId, newMessage);
      setNewMessage('');
      setUnreadCount(0);
    } catch (error) {
      console.error('Failed to send message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }
  };

  const groupMessagesByDate = () => {
    const groups: { [key: string]: ChatMessage[] } = {};
    messages.forEach((message) => {
      const dateKey = formatDate(message.created_at);
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(message);
    });
    return groups;
  };

  const messageGroups = groupMessagesByDate();

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <h2 className="text-xl font-bold text-gray-800">Brotherhood Chat</h2>
        {unreadCount > 0 && (
          <div className="flex items-center gap-2 bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
            <Bell size={16} />
            <span className="text-sm font-semibold">{unreadCount} new</span>
          </div>
        )}
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        {Object.entries(messageGroups).map(([date, msgs]) => (
          <div key={date} className="mb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gray-200 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">
                {date}
              </div>
            </div>
            {msgs.map((message) => {
              const isOwnMessage = message.user_id === userId;
              const senderName = message.profiles?.name || 'Anonymous';

              return (
                <div
                  key={message.id}
                  className={`mb-4 flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] ${isOwnMessage ? 'items-end' : 'items-start'} flex flex-col`}>
                    {!isOwnMessage && (
                      <span className="text-xs font-semibold text-gray-600 mb-1 px-2">
                        {senderName}
                      </span>
                    )}
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        isOwnMessage
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap break-words">{message.message}</p>
                      <span
                        className={`text-xs mt-1 block ${
                          isOwnMessage ? 'text-blue-100' : 'text-gray-500'
                        }`}
                      >
                        {formatTime(message.created_at)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </ScrollArea>

      <div className="p-4 border-t bg-white">
        {!profile ? (
          <div className="text-center text-sm text-gray-600 p-2 bg-yellow-50 rounded-lg">
            Complete your profile to send messages
          </div>
        ) : (
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              onClick={handleSend}
              disabled={isLoading || !newMessage.trim()}
              size="icon"
            >
              <Send size={20} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrotherhoodChat;
