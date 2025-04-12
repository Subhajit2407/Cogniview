import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Mic, MicOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpeechFallback } from "./SpeechFallback";

interface VoiceInputProps {
  onResult: (text: string) => void;
  className?: string;
  disabled?: boolean;
}

export function VoiceInput({ onResult, className, disabled = false }: VoiceInputProps) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();
  
  const [currentTranscript, setCurrentTranscript] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    // Update the current transcript as the user speaks
    if (transcript) {
      setCurrentTranscript(transcript);
    }
  }, [transcript]);

  useEffect(() => {
    // When recording stops, show confirmation option
    if (!listening && currentTranscript) {
      setShowConfirmation(true);
    }
  }, [listening, currentTranscript]);

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      setShowConfirmation(false);
      resetTranscript();
      setCurrentTranscript("");
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  const confirmTranscript = () => {
    if (currentTranscript.trim()) {
      // First pass the result to the parent component
      onResult(currentTranscript);
      
      // Clear everything immediately to avoid UI overlap
      resetTranscript();
      setCurrentTranscript("");
      setShowConfirmation(false);
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <SpeechFallback className={className} />;
  }

  if (isMicrophoneAvailable === false) {
    return <SpeechFallback className={className} />;
  }

  return (
    <div className={`flex flex-col ${className}`}>
      {/* Show transcript in real-time if listening */}
      {listening && currentTranscript && (
        <div className="mb-2 p-3 bg-[#161B22] border border-[#21262D] rounded-md text-sm text-[#C3C8D3] w-full max-w-full">
          <div 
            className="max-h-48 overflow-y-auto overflow-x-hidden whitespace-normal break-words w-full"
            style={{ 
              wordBreak: "break-word", 
              overflowWrap: "break-word", 
              whiteSpace: "pre-wrap",
              width: "100%"
            }}
          >
            {currentTranscript}
          </div>
        </div>
      )}
      
      {/* Show confirmation UI when finished recording */}
      {showConfirmation && currentTranscript && (
        <div className="mb-2 flex flex-col space-y-2 w-full">
          <div className="p-3 bg-[#161B22] border border-[#21262D] rounded-md text-sm text-[#C3C8D3] w-full">
            <div 
              className="max-h-48 overflow-y-auto overflow-x-hidden whitespace-normal break-words w-full"
              style={{ 
                wordBreak: "break-word", 
                overflowWrap: "break-word", 
                whiteSpace: "pre-wrap",
                width: "100%"
              }}
            >
              {currentTranscript}
            </div>
          </div>
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              className="bg-[#00FFE0] hover:bg-[#00FFE0]/80 text-[#0F111A]"
              onClick={confirmTranscript}
            >
              Use This Answer <ArrowRight size={14} className="ml-1" />
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="border-[#21262D] text-[#C3C8D3]"
              onClick={toggleListening}
            >
              Record Again
            </Button>
          </div>
        </div>
      )}
      
      {/* Simplified voice recording button */}
      <div className="flex items-center justify-center">
        <Button
          onClick={toggleListening}
          variant="outline"
          className={`p-2 ${
            listening 
              ? 'bg-[#FF0070]/20 text-[#FF0070] border-[#FF0070] animate-pulse' 
              : 'bg-transparent text-[#C3C8D3] border-[#1F222E] hover:bg-[#1F222E]/50'
          }`}
          disabled={disabled}
        >
          {listening ? <Mic size={20} /> : <MicOff size={20} />}
          <span className="ml-2">{listening ? "Recording..." : "Record Voice"}</span>
        </Button>
        {listening && (
          <span className="ml-2 text-sm text-[#FF0070] animate-pulse flex items-center">
            <span className="flex space-x-1">
              <span className="inline-block w-1 h-1 rounded-full bg-[#FF0070] animate-[ping_1s_ease-in-out_infinite]"></span>
              <span className="inline-block w-1 h-1 rounded-full bg-[#FF0070] animate-[ping_1s_ease-in-out_infinite_0.2s]"></span>
              <span className="inline-block w-1 h-1 rounded-full bg-[#FF0070] animate-[ping_1s_ease-in-out_infinite_0.4s]"></span>
            </span>
          </span>
        )}
      </div>
    </div>
  );
}
