
import React from 'react';
import { Button } from '@/components/ui/button';
import { MicOff } from 'lucide-react';

interface SpeechFallbackProps {
  className?: string;
}

export function SpeechFallback({ className }: SpeechFallbackProps) {
  return (
    <Button 
      variant="outline" 
      disabled
      className={`${className} bg-[#1F222E] hover:bg-[#1F222E] text-[#C3C8D3]/60`}
    >
      <MicOff size={20} className="mr-2" />
      Voice input not available
    </Button>
  );
}
