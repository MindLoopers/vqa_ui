import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  disabled?: boolean;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onTranscript, disabled }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Check if browser supports Speech Recognition
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      console.warn("Speech Recognition API is not supported in this browser");
      console.log("Browser:", navigator.userAgent);
      return;
    }

    setIsSupported(true);
    console.log("Speech Recognition API is supported");
    console.log("Protocol:", window.location.protocol);
    console.log("Host:", window.location.host);

    // Initialize Speech Recognition
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognition.maxAlternatives = 1;

    console.log("Speech Recognition initialized with lang:", recognition.lang);

    // Event handlers
    recognition.onstart = () => {
      setIsListening(true);
      console.log("Voice recognition started");
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      console.log("Transcript:", transcript);
      onTranscript(transcript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error);
      console.error("Error details:", event);
      setIsListening(false);

      // Handle specific errors
      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        alert("Microphone access denied. Please allow microphone access to use voice input.");
      } else if (event.error === "no-speech") {
        console.log("No speech detected");
        // Don't alert for no-speech, just log it
      } else if (event.error === "audio-capture") {
        alert("No microphone was found. Please connect a microphone.");
      } else if (event.error === "network") {
        console.error("Network error - This might be due to:");
        console.error("1. Browser trying to connect to Google's speech servers");
        console.error("2. Firewall/antivirus blocking the connection");
        console.error("3. Internet connection issues");
        alert(
          "Network error: Cannot connect to speech recognition service.\n\n" +
          "This happens because Web Speech API needs to connect to cloud servers.\n\n" +
          "Try:\n" +
          "• Use Chrome or Edge (better localhost support)\n" +
          "• Check browser console (F12) for more details\n" +
          "• Check if firewall/antivirus is blocking connections"
        );
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      console.log("Voice recognition ended");
    };

    recognitionRef.current = recognition;

    // Cleanup
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [onTranscript]);

  const toggleListening = () => {
    if (!isSupported) {
      // Detect if Firefox
      const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
      
      if (isFirefox) {
        alert(
          "Firefox requires enabling Web Speech API manually:\n\n" +
          "1. Type 'about:config' in the address bar\n" +
          "2. Accept the warning\n" +
          "3. Search for 'media.webspeech.recognition.enable'\n" +
          "4. Set it to 'true'\n" +
          "5. Reload this page\n\n" +
          "Alternatively, use Chrome or Edge for instant voice input."
        );
      } else {
        alert("Speech Recognition is not supported in your browser. Please use Chrome, Edge, or Safari.");
      }
      return;
    }

    if (!recognitionRef.current) return;

    if (isListening) {
      // Stop listening
      recognitionRef.current.stop();
    } else {
      // Start listening
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error("Error starting speech recognition:", error);
        setIsListening(false);
        alert("Failed to start voice recognition. Please check your microphone permissions.");
      }
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`relative h-10 w-10 z-10 transition-all duration-300 ${
        isListening ? "text-destructive" : "text-foreground"
      } ${!isSupported ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={toggleListening}
      disabled={disabled}
      title={
        !isSupported
          ? "Voice input not supported in this browser"
          : isListening
          ? "Stop recording"
          : "Start voice input"
      }
    >
      {/* Animated pulse rings when listening */}
      {isListening && (
        <>
          <span className="absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75 animate-ping"></span>
          <span className="absolute inline-flex h-full w-full rounded-full bg-destructive opacity-50 animate-pulse"></span>
        </>
      )}

      {/* Mic icon */}
      <div className="relative z-10">
        {isListening ? (
          <MicOff className="w-6 h-6 animate-pulse" />
        ) : (
          <Mic className="w-6 h-6" />
        )}
      </div>

      {/* Recording indicator dot */}
      {isListening && (
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive"></span>
        </span>
      )}
    </Button>
  );
};

export default VoiceInput;
