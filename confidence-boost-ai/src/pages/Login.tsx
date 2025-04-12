import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LogIn, User, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Squares } from '@/components/ui/squares-background';
import { useAuth } from '@/hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/');
    }
  };
  
  return (
    <div className="min-h-screen relative bg-[#0F111A] text-[#C3C8D3] overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <Squares 
          direction="diagonal"
          speed={0.5}
          squareSize={40}
          borderColor="#00FFE0"
          hoverFillColor="#00FFE0"
        />
      </div>
      
      <div className="relative z-10 p-6 h-screen flex flex-col items-center justify-center">
        <div className="max-w-md w-full border border-[#1F222E] rounded-lg p-6 bg-[#141622]/90 backdrop-blur">
          <div className="flex justify-between items-center mb-6">
            <Button 
              variant="ghost" 
              className="text-[#C3C8D3] hover:text-[#00FFE0]"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="mr-1" size={16} />
              Back
            </Button>
            
            <div className="flex items-center">
              <img 
                src="/cogniview.png.png" 
                alt="Cogniview Logo" 
                className="h-8 w-8 mr-2" 
              />
              <span className="text-lg font-bold text-[#00FFE0]">Cogniview</span>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-center text-[#00FFE0] mb-6">Login to Your Account</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#C3C8D3] mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 bg-[#0D0F18] border border-[#1F222E] rounded-md text-[#C3C8D3] focus:outline-none focus:ring-1 focus:ring-[#00FFE0]"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#C3C8D3] mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 bg-[#0D0F18] border border-[#1F222E] rounded-md text-[#C3C8D3] focus:outline-none focus:ring-1 focus:ring-[#00FFE0]"
                placeholder="••••••••"
              />
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-[#00FFE0] hover:bg-[#00FFE0]/80 text-[#0F111A] font-bold"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <span className="mr-2 animate-spin">⟳</span> Logging in...
                </span>
              ) : (
                <span className="flex items-center">
                  <LogIn className="mr-2" size={16} /> Login
                </span>
              )}
            </Button>
            
            <div className="text-center mt-4 text-sm">
              <span className="text-[#C3C8D3]">Don't have an account? </span>
              <Link to="/register" className="text-[#00FFE0] hover:underline">
                Register here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
