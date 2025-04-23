
import { useState } from "react";
import MatchesList from "@/components/MatchesList";
import Navbar from "@/components/Navbar";
import { UserProfile } from "@/components/ProfileCard";

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

const Matches = () => {
  const [matches] = useState<UserProfile[]>(sampleMatches);
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar user={currentUser} />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <MatchesList matches={matches} />
      </div>
    </div>
  );
};

export default Matches;
