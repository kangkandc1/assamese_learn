import React, { useState, useRef } from "react";
import { FiPlay, FiSquare, FiLoader } from "react-icons/fi";

/**
 * Converts a Google Drive share link to a direct download URL suitable for
 * the HTML Audio API.  If the link is not a Drive link it is returned as-is.
 */
function toDirectAudioUrl(url) {
  if (!url) return null;
  // Match both /file/d/<id>/view and /open?id=<id> patterns
  const match = url.match(/\/file\/d\/([^/]+)/) || url.match(/id=([^&]+)/);
  if (match) {
    return `https://drive.google.com/uc?export=download&id=${match[1]}`;
  }
  return url;
}

export default function AudioButton({ url }) {
  const [status, setStatus] = useState("idle"); // idle | loading | playing | error
  const audioRef = useRef(null);

  if (!url) return null;

  const directUrl = toDirectAudioUrl(url);

  const handleClick = () => {
    if (status === "playing") {
      audioRef.current?.pause();
      if (audioRef.current) audioRef.current.currentTime = 0;
      setStatus("idle");
      return;
    }

    setStatus("loading");

    const audio = new Audio(directUrl);
    audioRef.current = audio;

    audio.addEventListener("canplaythrough", () => {
      setStatus("playing");
      audio.play().catch(() => setStatus("error"));
    });

    audio.addEventListener("ended", () => setStatus("idle"));
    audio.addEventListener("error", () => setStatus("error"));

    audio.load();
  };

  const icon = () => {
    if (status === "loading") return <FiLoader className="spin" size={14} />;
    if (status === "playing") return <FiSquare size={14} />;
    return <FiPlay size={14} />;
  };

  return (
    <button
      className={`audio-btn audio-btn--${status}`}
      onClick={handleClick}
      title={status === "playing" ? "Stop" : "Abspielen"}
      aria-label="Audio abspielen"
    >
      {icon()}
    </button>
  );
}
