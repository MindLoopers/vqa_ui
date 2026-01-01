import React from "react";
import { Mic, MicOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVoiceRecording } from "@/hooks/useVoiceRecording";

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  disabled?: boolean;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onTranscript, disabled }) => {
  const { isRecording, isTranscribing, toggleRecording } =
    useVoiceRecording(onTranscript);

  const isActive = isRecording || isTranscribing;

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`relative h-10 w-10 z-10 transition-all duration-300 ${
        isActive ? "text-primary" : "text-foreground"
      } hover:text-primary hover:bg-primary/10`}
      onClick={toggleRecording}
      disabled={disabled || isTranscribing}
      title={
        isTranscribing
          ? "Transcribing..."
          : isRecording
          ? "Stop recording"
          : "Start voice input"
      }
    >
      {/* Animated pulse rings when recording */}
      {isRecording && (
        <>
          <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping"></span>
          <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-50 animate-pulse"></span>
        </>
      )}

      {/* Mic icon or loading spinner */}
      <div className="relative z-10">
        {isTranscribing ? (
          <Loader2 className="w-8 h-8 animate-spin" />
        ) : isRecording ? (
          <MicOff className="w-8 h-8 animate-pulse" />
        ) : (
          <Mic className="w-8 h-8" />
        )}
      </div>

      {/* Recording indicator dot */}
      {isRecording && (
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
        </span>
      )}
    </Button>
  );
};

export default VoiceInput;
