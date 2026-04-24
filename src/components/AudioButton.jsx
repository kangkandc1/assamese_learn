import { useState, useRef } from "react";
import { FiPlay, FiSquare, FiLoader, FiMic, FiMicOff } from "react-icons/fi";

const RECORDING_ENABLED = process.env.REACT_APP_AUDIO_RECORDING === "true";
const RECORD_SERVER = "http://localhost:3001";

export default function AudioButton({ url }) {
  const [status, setStatus] = useState("idle"); // idle | loading | playing | error
  const [recStatus, setRecStatus] = useState("idle"); // idle | recording | saving | saved | error
  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  if (!url) return null;

  // --- Playback ---

  const handlePlay = () => {
    if (status === "playing") {
      audioRef.current?.pause();
      if (audioRef.current) audioRef.current.currentTime = 0;
      setStatus("idle");
      return;
    }

    setStatus("loading");
    const resolvedUrl = url.startsWith("/") ? process.env.PUBLIC_URL + url : url;
    console.log("Audio URL:", resolvedUrl);
    const audio = new Audio(resolvedUrl);
    audioRef.current = audio;

    audio.addEventListener("ended", () => setStatus("idle"));
    audio.addEventListener("error", (e) => {
      console.error("Audio error:", e, audio.error);
      setStatus("error");
    });

    audio.play()
      .then(() => setStatus("playing"))
      .catch((e) => {
        console.error("Audio play() rejected:", e);
        setStatus("error");
      });
  };

  // --- Recording ---

  const handleRecord = async () => {
    if (recStatus === "recording") {
      mediaRecorderRef.current?.stop();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Prefer mp4 (Safari/macOS) so the file is a real m4a-compatible format
      const mimeType = MediaRecorder.isTypeSupported("audio/mp4")
        ? "audio/mp4"
        : "audio/webm";

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, { type: mimeType });
        setRecStatus("saving");

        try {
          const resp = await fetch(
            `${RECORD_SERVER}/save-audio?path=${encodeURIComponent(url)}`,
            {
              method: "POST",
              body: blob,
              headers: { "Content-Type": mimeType },
            }
          );
          if (!resp.ok) throw new Error(`Server responded ${resp.status}`);
          setRecStatus("saved");
          setTimeout(() => setRecStatus("idle"), 2000);
        } catch (e) {
          console.error("Save failed:", e);
          setRecStatus("error");
          setTimeout(() => setRecStatus("idle"), 3000);
        }
      };

      mediaRecorder.start();
      setRecStatus("recording");
    } catch (e) {
      console.error("Mic access failed:", e);
      setRecStatus("error");
      setTimeout(() => setRecStatus("idle"), 3000);
    }
  };

  // --- Icons ---

  const playIcon = () => {
    if (status === "loading") return <FiLoader className="spin" size={14} />;
    if (status === "playing") return <FiSquare size={14} />;
    return <FiPlay size={14} />;
  };

  const recIcon = () => {
    if (recStatus === "recording") return <FiMicOff size={14} />;
    if (recStatus === "saving") return <FiLoader className="spin" size={14} />;
    return <FiMic size={14} />;
  };

  const recTitle = () => {
    if (recStatus === "recording") return "Stop recording";
    if (recStatus === "saving") return "Saving…";
    if (recStatus === "saved") return "Saved!";
    if (recStatus === "error") return "Error — try again";
    return `Record audio for ${url}`;
  };

  return (
    <span className="audio-btn-group">
      <button
        className={`audio-btn audio-btn--${status}`}
        onClick={handlePlay}
        title={status === "playing" ? "Stop" : "Abspielen"}
        aria-label="Audio abspielen"
      >
        {playIcon()}
      </button>

      {RECORDING_ENABLED && (
        <button
          className={`audio-btn audio-btn--rec audio-btn--rec-${recStatus}`}
          onClick={handleRecord}
          title={recTitle()}
          aria-label="Record audio"
          disabled={recStatus === "saving"}
        >
          {recIcon()}
        </button>
      )}
    </span>
  );
}
