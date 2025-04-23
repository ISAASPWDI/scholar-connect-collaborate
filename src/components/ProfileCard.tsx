
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export type UserProfile = {
  id: string;
  name: string;
  institution: string;
  field: string;
  location: string;
  photoUrl: string;
  interests: string[];
  skills: string[];
  knowledge: string[];
  lookingFor: string;
};

const ProfileCard = ({ profile, isPreview = false }: { profile: UserProfile; isPreview?: boolean }) => {
  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden shadow-lg transition-all hover:shadow-xl">
      <CardHeader className="relative pb-0">
        <div className="absolute top-4 right-4 z-10">
          {!isPreview && (
            <Link to="/profile/edit">
              <Button variant="outline" size="icon" className="rounded-full bg-white/80 backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </Button>
            </Link>
          )}
        </div>
        <div className="flex flex-col items-center gap-4">
          <Avatar className="h-24 w-24 border-4 border-background">
            <AvatarImage src={profile.photoUrl} alt={profile.name} />
            <AvatarFallback className="text-lg">{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold">{profile.name}</h2>
            <p className="text-muted-foreground">{profile.field}</p>
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
              <span>{profile.institution}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Academic Interests</h3>
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((interest, i) => (
              <Badge variant="secondary" key={i} className="rounded-full">{interest}</Badge>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, i) => (
              <Badge variant="outline" key={i} className="rounded-full">{skill}</Badge>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">Field Knowledge</h3>
          <div className="flex flex-wrap gap-2">
            {profile.knowledge.map((knowledge, i) => (
              <Badge variant="outline" key={i} className="rounded-full bg-background">{knowledge}</Badge>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">Looking For</h3>
          <p className="text-sm text-muted-foreground">{profile.lookingFor}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        {!isPreview && (
          <Button className="bg-scholar-blue hover:bg-scholar-blue/90">View Full Profile</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
