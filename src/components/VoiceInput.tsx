import React, { useState, useRef } from "react";
import { Mic, MicOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AssemblyAI } from "assemblyai";

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  disabled?: boolean;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onTranscript, disabled }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Get API key from environment variable
  const API_KEY = import.meta.env.VITE_ASSEMBLYAI_API_KEY;

  const startRecording = async () => {
    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        console.log("Recording stopped, audio size:", audioBlob.size);
        
        // Stop all tracks
        stream.getTracks().forEach((track) => track.stop());
        
        // Transcribe the audio
        await transcribeAudio(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
      console.log("Recording started...");
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Microphone access denied. Please allow microphone access to use voice input.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      console.log("Stopping recording...");
    }
  };

  const transcribeAudio = async (audioBlob: Blob) => {
    // Check if API key is configured
    if (!API_KEY || API_KEY === "your_api_key_here") {
      alert(
        "AssemblyAI API key not configured!"
      );
      return;
    }

    setIsTranscribing(true);

    try {
      console.log("Initializing AssemblyAI client...");
      const client = new AssemblyAI({
        apiKey: API_KEY,
      });

      console.log("Uploading audio file...");
      const uploadUrl = await client.files.upload(audioBlob);
      console.log("Audio uploaded:", uploadUrl);

      console.log("Starting transcription...");
      const transcript = await client.transcripts.transcribe({
        audio_url: uploadUrl,
      });

      if (transcript.status === "error") {
        console.error("Transcription error:", transcript.error);
        alert("Transcription failed. Please try again.");
        setIsTranscribing(false);
        return;
      }

      console.log("Transcription completed:", transcript.text);

      if (transcript.text) {
        onTranscript(transcript.text);
      } else {
        alert("No speech detected. Please try again.");
      }
    } catch (error) {
      console.error("Error during transcription:", error);
      alert(
        "Transcription failed. Please check:\n" +
        "• Your API key is valid\n" +
        "• You have internet connection\n" 
      );
    } finally {
      setIsTranscribing(false);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const isActive = isRecording || isTranscribing;

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`relative h-10 w-10 z-10 transition-all duration-300 ${
        isActive ? "text-destructive" : "text-foreground"
      }`}
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
          <span className="absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75 animate-ping"></span>
          <span className="absolute inline-flex h-full w-full rounded-full bg-destructive opacity-50 animate-pulse"></span>
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
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
          <span className="relative inline-flex rounded-full h-30 w-3 bg-destructive"></span>
        </span>
      )}
    </Button>
  );
};

export default VoiceInput;
