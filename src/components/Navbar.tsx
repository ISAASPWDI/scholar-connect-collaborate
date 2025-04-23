
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = ({ user, onLogout }: { user?: { name: string; photoUrl: string; }; onLogout?: () => void; }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
              <span className="font-bold text-lg text-scholar-blue">ScholarConnect</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          {user && (
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/matching"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/matching') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Find Collaborators
              </Link>
              <Link
                to="/matches"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/matches') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Matches
              </Link>
              <Link
                to="/chat"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/chat') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Messages
              </Link>
              <Link to="/profile">
                <Avatar className="h-9 w-9 cursor-pointer">
                  <AvatarImage src={user.photoUrl} alt={user.name} />
                  <AvatarFallback>{user.name?.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
              </Link>
            </nav>
          )}
          
          {!user && (
            <div className="hidden md:flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link to="/">Login</Link>
              </Button>
              <Button className="bg-scholar-blue hover:bg-scholar-blue/90" asChild>
                <Link to="/?register=true">Sign Up</Link>
              </Button>
            </div>
          )}
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="12" x2="20" y2="12"></line>
                <line x1="4" y1="6" x2="20" y2="6"></line>
                <line x1="4" y1="18" x2="20" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            {user ? (
              <nav className="flex flex-col space-y-4">
                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoUrl} alt={user.name} />
                    <AvatarFallback>{user.name?.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <span>{user.name}</span>
                </Link>
                <Link
                  to="/matching"
                  className="px-4 py-2 rounded-md hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Find Collaborators
                </Link>
                <Link
                  to="/matches"
                  className="px-4 py-2 rounded-md hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Matches
                </Link>
                <Link
                  to="/chat"
                  className="px-4 py-2 rounded-md hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Messages
                </Link>
                {onLogout && (
                  <Button 
                    variant="ghost" 
                    className="justify-start px-4 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => {
                      onLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                )}
              </nav>
            ) : (
              <div className="flex flex-col space-y-2 px-4">
                <Button variant="ghost" asChild onClick={() => setMobileMenuOpen(false)}>
                  <Link to="/">Login</Link>
                </Button>
                <Button className="bg-scholar-blue hover:bg-scholar-blue/90" asChild onClick={() => setMobileMenuOpen(false)}>
                  <Link to="/?register=true">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
