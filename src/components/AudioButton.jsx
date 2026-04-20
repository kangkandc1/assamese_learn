import { useState, useRef } from "react";
import { FiPlay, FiSquare, FiLoader } from "react-icons/fi";

export default function AudioButton({ url }) {
  const [status, setStatus] = useState("idle"); // idle | loading | playing | error
  const audioRef = useRef(null);

  if (!url) return null;

  const handleClick = () => {
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
