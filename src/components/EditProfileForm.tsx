
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { UserProfile } from "./ProfileCard";

const EditProfileForm = ({ profile, onSave }: { profile: UserProfile, onSave: (profile: UserProfile) => void }) => {
  const [formData, setFormData] = useState({ ...profile });
  const [interestInput, setInterestInput] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [knowledgeInput, setKnowledgeInput] = useState("");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };
  
  const addItem = (e: React.KeyboardEvent<HTMLInputElement>, field: 'interests' | 'skills' | 'knowledge') => {
    if (e.key === "Enter" && e.currentTarget.value.trim()) {
      e.preventDefault();
      const value = e.currentTarget.value.trim();
      
      if (!formData[field].includes(value)) {
        setFormData({
          ...formData,
          [field]: [...formData[field], value]
        });
      }
      
      // Clear the input
      if (field === 'interests') setInterestInput("");
      else if (field === 'skills') setSkillInput("");
      else setKnowledgeInput("");
    }
  };
  
  const removeItem = (field: 'interests' | 'skills' | 'knowledge', index: number) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index)
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    toast.success("Profile updated successfully!");
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to a storage service
      // and get back a URL. Here we just create a local URL.
      const url = URL.createObjectURL(file);
      setFormData({
        ...formData,
        photoUrl: url
      });
    }
  };
  
  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="text-center">
        <h2 className="text-2xl font-bold">Edit Your Profile</h2>
        <p className="text-sm text-muted-foreground">
          Update your academic profile information
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24 border-4 border-background">
              <AvatarImage src={formData.photoUrl} alt={formData.name} />
              <AvatarFallback className="text-lg">{formData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <Label htmlFor="photo" className="cursor-pointer bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
                Change Photo
              </Label>
              <Input 
                id="photo" 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageUpload} 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="institution">University / Institution</Label>
              <Input 
                id="institution" 
                value={formData.institution}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="field">Academic Field</Label>
              <Input 
                id="field" 
                value={formData.field}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                placeholder="City, Country" 
                value={formData.location}
                onChange={handleChange}
                required 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="interests">Academic Interests</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.interests.map((interest, i) => (
                <div key={i} className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm flex items-center gap-1">
                  {interest}
                  <button 
                    type="button" 
                    onClick={() => removeItem('interests', i)}
                    className="text-muted-foreground hover:text-foreground ml-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <Input 
              placeholder="Type interest and press Enter..." 
              value={interestInput}
              onChange={(e) => setInterestInput(e.target.value)}
              onKeyDown={(e) => addItem(e, 'interests')}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="skills">Skills</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.skills.map((skill, i) => (
                <div key={i} className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm flex items-center gap-1">
                  {skill}
                  <button 
                    type="button" 
                    onClick={() => removeItem('skills', i)}
                    className="text-muted-foreground hover:text-foreground ml-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <Input 
              placeholder="Type skill and press Enter..." 
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => addItem(e, 'skills')}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="knowledge">Field Knowledge</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.knowledge.map((item, i) => (
                <div key={i} className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm flex items-center gap-1">
                  {item}
                  <button 
                    type="button" 
                    onClick={() => removeItem('knowledge', i)}
                    className="text-muted-foreground hover:text-foreground ml-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <Input 
              placeholder="Type knowledge field and press Enter..." 
              value={knowledgeInput}
              onChange={(e) => setKnowledgeInput(e.target.value)}
              onKeyDown={(e) => addItem(e, 'knowledge')}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lookingFor">What I'm Looking For</Label>
            <Textarea 
              id="lookingFor" 
              placeholder="Describe what kind of collaborator you're looking for..." 
              value={formData.lookingFor}
              onChange={handleChange}
              className="min-h-24"
            />
          </div>
          
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline">Cancel</Button>
            <Button type="submit" className="bg-scholar-teal hover:bg-scholar-teal/90">Save Changes</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditProfileForm;
