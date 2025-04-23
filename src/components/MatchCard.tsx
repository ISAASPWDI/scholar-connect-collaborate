
import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserProfile } from "./ProfileCard";
import { toast } from "sonner";

const MatchCard = ({ 
  profile, 
  onLike, 
  onDislike 
}: { 
  profile: UserProfile; 
  onLike: () => void; 
  onDislike: () => void; 
}) => {
  const [swipeDirection, setSwipeDirection] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number>(0);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState(0);
  
  const handleSwipe = (direction: string) => {
    setSwipeDirection(direction);
    
    if (direction === "right") {
      onLike();
      toast.success(`You'd like to collaborate with ${profile.name}`);
    } else {
      onDislike();
    }
    
    setTimeout(() => {
      setSwipeDirection(null);
      setOffset(0);
    }, 300);
  };
  
  const handleMouseDown = (e: React.MouseEvent) => {
    startXRef.current = e.clientX;
    setDragging(true);
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    setDragging(true);
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    const currentX = e.clientX;
    const diff = currentX - startXRef.current;
    setOffset(diff);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startXRef.current;
    setOffset(diff);
  };
  
  const handleMouseUp = () => {
    if (!dragging) return;
    setDragging(false);
    
    if (offset > 100) {
      handleSwipe("right");
    } else if (offset < -100) {
      handleSwipe("left");
    } else {
      setOffset(0);
    }
  };
  
  return (
    <div className="relative w-full max-w-md mx-auto h-[550px]">
      <Card 
        ref={cardRef}
        className={`absolute inset-0 overflow-hidden shadow-xl cursor-grab ${swipeDirection === "right" ? "slide-out-right" : swipeDirection === "left" ? "slide-out-left" : ""}`}
        style={{
          transform: `translateX(${offset}px) rotate(${offset * 0.05}deg)`,
          transition: dragging ? 'none' : 'transform 0.3s ease'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        <div className="absolute inset-0">
          <div className="h-1/3 bg-gradient-to-b from-scholar-blue/80 to-transparent" />
        </div>
        
        <CardContent className="relative p-6 h-full flex flex-col">
          <div className="flex flex-col items-center mb-4">
            <Avatar className="h-28 w-28 border-4 border-white my-4">
              <AvatarImage src={profile.photoUrl} alt={profile.name} />
              <AvatarFallback className="text-xl">{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            <div className="flex gap-2 items-center text-sm text-muted-foreground mb-2">
              <span>{profile.field}</span>
              <span>•</span>
              <span>{profile.institution}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>{profile.location}</span>
            </div>
          </div>
          
          <div className="space-y-4 flex-grow overflow-y-auto">
            <div>
              <h3 className="text-sm font-medium mb-2">Academic Interests</h3>
              <div className="flex flex-wrap gap-1">
                {profile.interests.map((interest, i) => (
                  <Badge variant="secondary" key={i} className="rounded-full text-xs">{interest}</Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Skills</h3>
              <div className="flex flex-wrap gap-1">
                {profile.skills.map((skill, i) => (
                  <Badge variant="outline" key={i} className="rounded-full text-xs">{skill}</Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Looking For</h3>
              <p className="text-sm text-muted-foreground">{profile.lookingFor}</p>
            </div>
          </div>
          
          <div className="flex justify-center gap-4 pt-4">
            <Button 
              variant="outline"
              size="icon"
              className="h-14 w-14 rounded-full border-2 bg-white text-destructive hover:bg-destructive hover:text-white hover:border-destructive transition-colors"
              onClick={() => handleSwipe("left")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </Button>
            
            <Button 
              size="icon"
              className="h-14 w-14 rounded-full border-2 bg-white text-scholar-teal hover:bg-scholar-teal hover:text-white hover:border-scholar-teal transition-colors"
              onClick={() => handleSwipe("right")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </Button>
          </div>
          
          {/* Swipe indicators */}
          {offset > 50 && (
            <div className="absolute top-1/3 right-4 bg-green-500 text-white rounded-full p-3 rotate-12 opacity-80">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </div>
          )}
          
          {offset < -50 && (
            <div className="absolute top-1/3 left-4 bg-red-500 text-white rounded-full p-3 -rotate-12 opacity-80">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MatchCard;
