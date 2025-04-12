import React from 'react';
import { Star, Award, Trophy } from 'lucide-react';

interface LevelSelectorProps {
  selectedLevel: string;
  onSelectLevel: (level: string) => void;
}

export const LevelSelector: React.FC<LevelSelectorProps> = ({ 
  selectedLevel, 
  onSelectLevel 
}) => {
  const levels = [
    { id: 'beginner', name: 'Beginner', icon: Star, color: '#00FFE0' },
    { id: 'intermediate', name: 'Intermediate', icon: Award, color: '#FFD700' },
    { id: 'expert', name: 'Expert', icon: Trophy, color: '#FF0070' }
  ];

  return (
    <div className="space-y-3">
      <label className="text-[#00FFE0] font-['Urbanist'] flex items-center">
        <Star size={16} className="mr-2" />
        Select Difficulty Level
      </label>
      
      <div className="grid grid-cols-3 gap-3">
        {levels.map((level) => {
          const Icon = level.icon;
          const isSelected = selectedLevel === level.id;
          
          return (
            <button
              key={level.id}
              onClick={() => onSelectLevel(level.id)}
              className={`
                flex flex-col items-center justify-center p-4 rounded-md border transition-all
                ${isSelected 
                  ? `bg-opacity-20 bg-[${level.color}]/10 border-[${level.color}]` 
                  : 'bg-[#1F222E] border-[#1F222E] hover:border-[#C3C8D3]/30'}
              `}
            >
              <Icon 
                size={24} 
                className={`mb-2 ${isSelected ? `text-[${level.color}]` : 'text-[#C3C8D3]/60'}`} 
              />
              <span className={`text-sm font-['Urbanist'] ${isSelected ? 'text-white' : 'text-[#C3C8D3]/80'}`}>
                {level.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
