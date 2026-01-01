import { useState, useRef } from "react";
import { AssemblyAI } from "assemblyai";

export const useVoiceRecording = (onTranscript: (text: string) => void) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const API_KEY = import.meta.env.VITE_ASSEMBLYAI_API_KEY;

  const startRecording = async () => {
    try {
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
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        console.log("Recording stopped, audio size:", audioBlob.size);

        stream.getTracks().forEach((track) => track.stop());
        await transcribeAudio(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
      console.log("Recording started...");
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert(
        "Microphone access denied. Please allow microphone access to use voice input."
      );
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
    if (!API_KEY || API_KEY === "your_api_key_here") {
      alert("AssemblyAI API key not configured!");
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

  return {
    isRecording,
    isTranscribing,
    toggleRecording,
  };
};
