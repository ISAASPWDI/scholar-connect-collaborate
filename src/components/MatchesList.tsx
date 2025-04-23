
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserProfile } from "./ProfileCard";

const MatchesList = ({ matches }: { matches: UserProfile[] }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Matches</h1>
      
      {matches.length === 0 ? (
        <Card className="w-full p-8 text-center">
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                <circle cx="9" cy="9" r="5"></circle>
                <path d="M15 6h5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-3"></path>
                <path d="M17 17v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3"></path>
              </svg>
            </div>
            <h2 className="text-xl font-medium">No matches yet</h2>
            <p className="text-muted-foreground">Keep swiping to find your perfect academic match.</p>
            <Button className="mt-2 bg-scholar-blue hover:bg-scholar-blue/90">
              <Link to="/matching">Find Collaborators</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {matches.map((match) => (
            <Card key={match.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="p-4 pb-2 flex justify-between items-start">
                <div className="flex gap-3 items-center">
                  <Avatar>
                    <AvatarImage src={match.photoUrl} alt={match.name} />
                    <AvatarFallback>{match.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{match.name}</h3>
                    <p className="text-xs text-muted-foreground">{match.field}</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-4 pt-2">
                <div className="mb-3">
                  <p className="text-xs text-muted-foreground mb-1">Common Interests:</p>
                  <div className="flex flex-wrap gap-1">
                    {match.interests.slice(0, 3).map((interest, i) => (
                      <Badge variant="secondary" key={i} className="text-xs rounded-full">{interest}</Badge>
                    ))}
                    {match.interests.length > 3 && (
                      <Badge variant="secondary" className="text-xs rounded-full">+{match.interests.length - 3}</Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">View Profile</Button>
                  <Button size="sm" className="flex-1 bg-scholar-blue hover:bg-scholar-blue/90">
                    <Link to={`/chat/${match.id}`}>Message</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MatchesList;
