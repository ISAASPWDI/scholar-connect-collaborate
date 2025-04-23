
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion } from "framer-motion";

const Index = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>(searchParams.get("register") ? "register" : "login");

  useEffect(() => {
    setActiveTab(searchParams.get("register") ? "register" : "login");
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section (Branding/Hero) */}
      <div className="bg-scholar-blue md:w-1/2 p-8 flex flex-col justify-center items-center text-white">
        <div className="max-w-md mx-auto text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
            <h1 className="text-2xl font-bold">ScholarConnect</h1>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Find Your Perfect Academic Collaboration
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Connect with fellow researchers, students and academics who share your interests and goals.
          </p>
          
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">1000+</div>
              <div className="text-sm opacity-80">Academic Matches</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">50+</div>
              <div className="text-sm opacity-80">Universities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">24</div>
              <div className="text-sm opacity-80">Research Fields</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">200+</div>
              <div className="text-sm opacity-80">Projects Started</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Section (Form) */}
      <div className="md:w-1/2 p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Create Account</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <LoginForm />
              </motion.div>
            </TabsContent>
            <TabsContent value="register">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <RegisterForm />
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Index;
