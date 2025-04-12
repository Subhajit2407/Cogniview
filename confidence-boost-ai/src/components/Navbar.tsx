import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Github, Search, Command } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from '@/hooks/useAuth';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  
  return (
    <header className="w-full border-b border-[#121327] bg-[#0A0B14]/95 backdrop-blur-md py-3 px-6 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/">
            <img 
              src="/cogniview.png.png" 
              alt="Cogniview Logo" 
              className="h-11 w-11 mr-2" 
            />
          </Link>
          <Link to="/">
            <span className="text-2xl font-bold font-['Urbanist'] text-[#FFE066]">Cogniview</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-[#E2E4ED] hover:text-[#FFE066] transition-colors font-['Urbanist'] font-medium text-sm">Home</Link>
          <Link to="/simulate" className="text-[#E2E4ED] hover:text-[#FFE066] transition-colors font-['Urbanist'] font-medium text-sm">Practice</Link>
          <Link to="/feedback" className="text-[#E2E4ED] hover:text-[#FFE066] transition-colors font-['Urbanist'] font-medium text-sm">Feedback</Link>
          <Link to="/progress" className="text-[#E2E4ED] hover:text-[#FFE066] transition-colors font-['Urbanist'] font-medium text-sm">Progress</Link>
          <Link to="/about" className="text-[#E2E4ED] hover:text-[#FFE066] transition-colors font-['Urbanist'] font-medium text-sm">About</Link>
          <Link to="/contact" className="text-[#E2E4ED] hover:text-[#FFE066] transition-colors font-['Urbanist'] font-medium text-sm">Contact</Link>
          <a href="https://github.com/Cogniview-ai" target="_blank" rel="noopener noreferrer" 
            className="text-[#E2E4ED] hover:text-[#FFE066] transition-colors">
            <Github size={18} />
          </a>
        </nav>
        
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center space-x-3">
              <div className="flex items-center bg-[#121327] border border-[#252641] rounded-full p-1 pr-3">
                <Avatar className="h-7 w-7 mr-2">
                  <AvatarImage src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=121327&color=FFE066`} />
                  <AvatarFallback className="bg-[#121327] text-[#FFE066]">{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium font-['Urbanist'] text-[#E2E4ED]">{user?.name}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-[#E2E4ED] hover:text-[#FFE066] hover:bg-[#121327] font-['Urbanist']"
                onClick={logout}
              >
                <LogOut size={16} />
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-[#E2E4ED] hover:bg-[#121327] font-['Urbanist']"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button 
                size="sm" 
                className="bg-[#FFE066] hover:bg-[#FFE066]/80 text-[#0A0B14] font-['Urbanist'] font-medium"
                onClick={() => navigate('/register')}
              >
                Register
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar; 