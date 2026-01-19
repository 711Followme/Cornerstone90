import { supabase, ChatMessage } from '@/lib/supabase';

export const chatService = {
  // Get all messages with user profiles
  async getMessages(): Promise<ChatMessage[]> {
    const { data, error } = await supabase
      .from('chat_messages')
      .select(`
        *,
        profiles (
          id,
          name,
          email
        )
      `)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }

    return data || [];
  },

  // Send a new message
  async sendMessage(userId: string, message: string): Promise<ChatMessage> {
    const { data, error } = await supabase
      .from('chat_messages')
      .insert({
        user_id: userId,
        message: message.trim(),
      })
      .select(`
        *,
        profiles (
          id,
          name,
          email
        )
      `)
      .single();

    if (error) {
      console.error('Error sending message:', error);
      throw error;
    }

    return data;
  },

  // Subscribe to real-time message updates
  subscribeToMessages(callback: (message: ChatMessage) => void) {
    console.log('Subscribing to chat messages...');
    
    const channel = supabase
      .channel('chat_messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
        },
        async (payload) => {
          console.log('New message received:', payload);
          
          // Fetch the full message with profile data
          const { data } = await supabase
            .from('chat_messages')
            .select(`
              *,
              profiles (
                id,
                name,
                email
              )
            `)
            .eq('id', payload.new.id)
            .single();

          if (data) {
            callback(data);
          }
        }
      )
      .subscribe((status) => {
        console.log('Subscription status:', status);
      });

    return () => {
      console.log('Unsubscribing from chat messages...');
      supabase.removeChannel(channel);
    };
  },
};
