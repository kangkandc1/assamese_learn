import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import exercises from "../data/exercises";
import { FiEdit3, FiEye, FiEyeOff } from "react-icons/fi";

function parseHighlight(text) {
  if (!text) return null;
  return text.split(/\*([^*]+)\*/).map((part, i) =>
    i % 2 === 1 ? <span key={i} style={{ color: "#e07b39" }}>{part}</span> : part
  );
}

function ExerciseCard({ item, index }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="exercise-card">
      <div className="exercise-card-header">
        <span className="exercise-index">{index + 1}</span>
        <button
          className={`exercise-reveal-btn ${revealed ? "exercise-reveal-btn--active" : ""}`}
          onClick={() => setRevealed((r) => !r)}
          title={revealed ? "Antwort verbergen" : "Antwort zeigen"}
        >
          {revealed ? <FiEyeOff size={14} /> : <FiEye size={14} />}
          {revealed ? "Verbergen" : "Antwort"}
        </button>
      </div>

      <div className="exercise-body">
        <div className="exercise-row">
          <span className="exercise-label">Deutsch</span>
          <span className="exercise-deutsch">{item.deutsch}</span>
        </div>
        <div className="exercise-row">
          <span className="exercise-label">Assamesisch</span>
          <span className="exercise-assamese">{item.assamese}</span>
        </div>
        {revealed && (
          <div className="exercise-row exercise-answer-row">
            <span className="exercise-label">Antwort</span>
            <span className="exercise-answer">
              {parseHighlight(item.answer)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ExercisePage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setData(null);
    setError(null);
    const exercise = exercises.find((e) => e.id === id);
    if (!exercise) {
      setError("Übung nicht gefunden.");
      return;
    }
    exercise
      .file()
      .then((mod) => setData(mod.default ?? mod))
      .catch(() => setError("Fehler beim Laden der Übung."));
  }, [id]);

  if (error) return <div className="lesson-error">{error}</div>;
  if (!data) return <div className="lesson-loading">Lädt…</div>;

  return (
    <div className="lesson-page">
      <h1 className="lesson-title">
        <FiEdit3 style={{ marginRight: 12, color: "var(--accent)" }} />
        {data.title}
      </h1>

      {data.vocab?.length > 0 && (
        <section className="lesson-section">
          <div className="exercise-list">
            {data.vocab.map((item, i) => (
              <ExerciseCard key={i} item={item} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
