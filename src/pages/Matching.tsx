
import { useState } from "react";
import MatchCard from "@/components/MatchCard";
import Navbar from "@/components/Navbar";
import { UserProfile } from "@/components/ProfileCard";

// Sample data for matching
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
  },
  {
    id: "4",
    name: "Priya Patel",
    institution: "Harvard University",
    field: "Cognitive Science",
    location: "Cambridge, MA",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&auto=format&fit=crop&q=80",
    interests: ["Decision Making", "Cognitive Psychology", "AI"],
    skills: ["Experimental Design", "Data Analysis", "JavaScript", "fMRI"],
    knowledge: ["Behavioral Economics", "Cognitive Biases", "Neural Networks"],
    lookingFor: "Interested in interdisciplinary research on how AI can model human cognitive biases and decision-making processes."
  }
];

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

const Matching = () => {
  const [potentialMatches, setPotentialMatches] = useState<UserProfile[]>(sampleMatches);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [matches, setMatches] = useState<UserProfile[]>([]);
  
  const handleLike = () => {
    if (currentMatchIndex < potentialMatches.length) {
      const likedProfile = potentialMatches[currentMatchIndex];
      setMatches([...matches, likedProfile]);
      handleNext();
    }
  };
  
  const handleDislike = () => {
    handleNext();
  };
  
  const handleNext = () => {
    if (currentMatchIndex < potentialMatches.length - 1) {
      setCurrentMatchIndex(currentMatchIndex + 1);
    } else {
      // Reset or handle end of potential matches
      setCurrentMatchIndex(0);
    }
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar user={currentUser} />
      
      <div className="container mx-auto px-4 py-8 flex-grow flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-6">Find Collaborators</h1>
        
        {potentialMatches.length > 0 ? (
          <div className="w-full max-w-md">
            <MatchCard 
              profile={potentialMatches[currentMatchIndex]}
              onLike={handleLike}
              onDislike={handleDislike}
            />
            
            <div className="text-center mt-6 text-sm text-muted-foreground">
              <p>Swipe right to connect, swipe left to pass</p>
            </div>
          </div>
        ) : (
          <div className="text-center p-8">
            <h2 className="text-xl font-medium mb-2">No more potential matches</h2>
            <p className="text-muted-foreground mb-4">Check back later for new academic collaborators.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Matching;
