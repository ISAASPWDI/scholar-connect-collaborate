
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserProfile } from "./ProfileCard";

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
}

const ChatInterface = ({ 
  match, 
  currentUserId,
  messages: initialMessages = []
}: { 
  match: UserProfile;
  currentUserId: string;
  messages?: Message[];
}) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // In a real app, this would send the message to a backend service
    const newMessage = {
      id: Date.now().toString(),
      senderId: currentUserId,
      text: message.trim(),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessage("");
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="flex flex-col h-full border rounded-lg overflow-hidden">
      <div className="p-4 border-b bg-muted/30 flex items-center gap-3">
        <Avatar>
          <AvatarImage src={match.photoUrl} alt={match.name} />
          <AvatarFallback>{match.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{match.name}</h3>
          <p className="text-xs text-muted-foreground">{match.field}</p>
        </div>
      </div>
      
      <ScrollArea ref={scrollAreaRef} className="flex-grow p-4">
        <div className="space-y-4">
          {messages.map((msg) => {
            const isSender = msg.senderId === currentUserId;
            
            return (
              <div 
                key={msg.id} 
                className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    isSender 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  <p>{msg.text}</p>
                  <p className={`text-xs ${isSender ? 'text-primary-foreground/80' : 'text-muted-foreground'} text-right mt-1`}>
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            );
          })}
          
          {messages.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No messages yet. Start the conversation!</p>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
        <Input 
          placeholder="Type a message..." 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow"
        />
        <Button 
          type="submit" 
          className="bg-scholar-blue hover:bg-scholar-blue/90"
          disabled={!message.trim()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
          Send
        </Button>
      </form>
    </div>
  );
};

export default ChatInterface;
