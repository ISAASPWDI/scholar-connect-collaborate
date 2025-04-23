
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ChatInterface from "@/components/ChatInterface";
import Navbar from "@/components/Navbar";
import { UserProfile } from "@/components/ProfileCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Sample current user data
const currentUser: UserProfile = {
  id: "1",
  name: "Alex Johnson",
  institution: "Stanford University",
  field: "Computer Science",
  location: "Stanford, CA",
  photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&auto=format&fit=crop&q=80",
  interests: ["Machine Learning", "AI Ethics", "Data Visualization", "NLP"],
  skills: ["Python", "TensorFlow", "Research Design", "Data Analysis"],
  knowledge: ["Deep Learning", "Computer Vision", "Statistical Methods"],
  lookingFor: "Looking for collaborators on AI research projects, especially those focused on ethical implications and social good applications."
};

// Sample matches data
const sampleMatches: UserProfile[] = [
  {
    id: "2",
    name: "Sofia Rodriguez",
    institution: "MIT",
    field: "Data Science",
    location: "Cambridge, MA",
    photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&auto=format&fit=crop&q=80",
    interests: ["Big Data", "Machine Learning", "Statistical Analysis"],
    skills: ["Python", "R", "SQL", "Data Visualization"],
    knowledge: ["Predictive Modeling", "NLP", "Time Series Analysis"],
    lookingFor: "Seeking partners for a research project on using ML to analyze climate data and predict environmental changes."
  },
  {
    id: "3",
    name: "Marcus Chen",
    institution: "UC Berkeley",
    field: "Computational Biology",
    location: "Berkeley, CA",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&auto=format&fit=crop&q=80",
    interests: ["Genomics", "Machine Learning", "Bioinformatics"],
    skills: ["Python", "R", "Statistical Analysis", "Molecular Biology"],
    knowledge: ["DNA Sequencing", "Genome Analysis", "Neural Networks"],
    lookingFor: "Looking to collaborate on computational approaches to analyzing genomic data for rare diseases."
  }
];

// Sample messages data
const sampleMessages = {
  "2": [
    {
      id: "1",
      senderId: "2",
      text: "Hi Alex! I saw we matched and noticed you're working on AI ethics. I've been exploring similar areas in my data science work.",
      timestamp: new Date(Date.now() - 86400000) // 1 day ago
    },
    {
      id: "2",
      senderId: "1",
      text: "Hey Sofia! Yes, I'm particularly interested in bias in ML models. What specific aspects are you working on?",
      timestamp: new Date(Date.now() - 82800000) // 23 hours ago
    },
    {
      id: "3",
      senderId: "2",
      text: "I'm focusing on fairness metrics in predictive models, especially when applied to social systems. Would love to discuss more!",
      timestamp: new Date(Date.now() - 79200000) // 22 hours ago
    },
  ],
  "3": []
};

const Chat = () => {
  const { matchId } = useParams<{ matchId?: string }>();
  const [selectedMatch, setSelectedMatch] = useState<UserProfile | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  
  useEffect(() => {
    if (matchId) {
      const match = sampleMatches.find(m => m.id === matchId);
      if (match) {
        setSelectedMatch(match);
        setMessages(sampleMessages[matchId as keyof typeof sampleMessages] || []);
      }
    } else if (sampleMatches.length > 0) {
      setSelectedMatch(sampleMatches[0]);
      setMessages(sampleMessages[sampleMatches[0].id as keyof typeof sampleMessages] || []);
    }
  }, [matchId]);
  
  const handleSelectMatch = (match: UserProfile) => {
    setSelectedMatch(match);
    setMessages(sampleMessages[match.id as keyof typeof sampleMessages] || []);
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar user={currentUser} />
      
      <div className="container mx-auto px-4 py-8 flex-grow flex">
        <div className="w-full h-[calc(100vh-12rem)] bg-white rounded-lg shadow overflow-hidden flex">
          {/* Sidebar with matches list */}
          <div className="w-80 bg-muted/30 border-r overflow-auto hidden md:block">
            <div className="p-4 border-b">
              <h2 className="font-medium">Messages</h2>
            </div>
            
            <div className="divide-y">
              {sampleMatches.map(match => (
                <div 
                  key={match.id} 
                  className={`p-4 flex items-center gap-3 cursor-pointer transition-colors ${
                    selectedMatch?.id === match.id ? 'bg-secondary' : 'hover:bg-muted/50'
                  }`}
                  onClick={() => handleSelectMatch(match)}
                >
                  <Avatar>
                    <AvatarImage src={match.photoUrl} alt={match.name} />
                    <AvatarFallback>{match.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{match.name}</h3>
                    <p className="text-xs text-muted-foreground truncate">{match.field}</p>
                  </div>
                </div>
              ))}
              
              {sampleMatches.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  <p>No matches yet</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Chat area */}
          <div className="flex-grow">
            {selectedMatch ? (
              <ChatInterface 
                match={selectedMatch} 
                currentUserId={currentUser.id}
                messages={messages}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <p>Select a match to start chatting</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
