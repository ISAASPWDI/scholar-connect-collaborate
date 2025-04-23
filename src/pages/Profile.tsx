
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileCard from "@/components/ProfileCard";
import EditProfileForm from "@/components/EditProfileForm";
import Navbar from "@/components/Navbar";
import { UserProfile } from "@/components/ProfileCard";

// Sample data
const sampleProfile: UserProfile = {
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

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile>(sampleProfile);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  
  const handleUpdateProfile = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
    setIsEditing(false);
  };
  
  const handleLogout = () => {
    // In a real app, this would clear authentication
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar user={profile} onLogout={handleLogout} />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        {isEditing ? (
          <div className="max-w-3xl mx-auto">
            <button 
              onClick={() => setIsEditing(false)}
              className="mb-4 flex items-center text-muted-foreground hover:text-foreground"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <path d="m12 19-7-7 7-7"></path>
                <path d="M19 12H5"></path>
              </svg>
              Back to Profile
            </button>
            <EditProfileForm profile={profile} onSave={handleUpdateProfile} />
          </div>
        ) : (
          <div className="max-w-xl mx-auto">
            <ProfileCard profile={profile} />
            
            <div className="mt-6 flex justify-center">
              <button 
                onClick={() => setIsEditing(true)}
                className="flex items-center text-muted-foreground hover:text-foreground"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
