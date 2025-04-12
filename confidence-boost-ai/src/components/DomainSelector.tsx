import React from 'react';
import { 
  Code, PenTool, Globe, GraduationCap, 
  LayoutDashboard, Users, BrainCircuit,
  Figma
} from 'lucide-react';

interface Domain {
  id: string;
  name: string;
  icon: React.FC<any>;
  description: string;
}

export const domains: Domain[] = [
  {
    id: 'software-development',
    name: 'Software Development',
    icon: Code,
    description: 'Technical interviews for software engineering roles'
  },
  {
    id: 'ai-engineering',
    name: 'AI Engineering',
    icon: BrainCircuit,
    description: 'Specialized interviews for AI and machine learning positions'
  },
  {
    id: 'graphic-design',
    name: 'Graphic Design',
    icon: PenTool,
    description: 'Portfolio reviews and design thinking interviews'
  },
  {
    id: 'ux-design',
    name: 'UX Design',
    icon: Figma,
    description: 'User experience design and usability testing interviews'
  },
  {
    id: 'freelancing',
    name: 'Freelancing',
    icon: Globe,
    description: 'Client acquisition and project management questions'
  },
  {
    id: 'teaching',
    name: 'Teaching',
    icon: GraduationCap,
    description: 'Educational technology and teaching methodology interviews'
  },
  {
    id: 'product-management',
    name: 'Product Management',
    icon: LayoutDashboard,
    description: 'Product strategy and roadmap discussions'
  },
  {
    id: 'team-leadership',
    name: 'Team Leadership',
    icon: Users,
    description: 'Leadership scenarios and people management questions'
  }
];

interface DomainSelectorProps {
  selectedDomain: string;
  onSelectDomain: (domain: string) => void;
}

export function DomainSelector({ selectedDomain, onSelectDomain }: DomainSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {domains.map((domain) => {
        const Icon = domain.icon;
        const isSelected = domain.id === selectedDomain;
        
        return (
          <div
            key={domain.id}
            className={`
              border p-4 rounded-lg cursor-pointer transition-all duration-300
              ${isSelected 
                ? 'border-[#00FFE0] bg-[#00FFE0]/10 text-white' 
                : 'border-[#1F222E] bg-[#141622] text-[#C3C8D3] hover:border-[#00FFE0]/30'}
            `}
            onClick={() => onSelectDomain(domain.id)}
          >
            <div className="flex items-center mb-2">
              <div className={`${isSelected ? 'text-[#00FFE0]' : 'text-[#C3C8D3]'} mr-2`}>
                <Icon size={20} />
              </div>
              <h3 className="font-['Urbanist'] text-lg font-semibold">{domain.name}</h3>
            </div>
            <p className="text-sm opacity-80 font-['Urbanist']">{domain.description}</p>
          </div>
        );
      })}
    </div>
  );
}
