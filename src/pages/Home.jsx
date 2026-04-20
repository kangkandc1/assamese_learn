import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import lessons from "../data/lessons";

export default function Home() {
  return (
    <div className="home-page">
      <div className="home-hero">
        <h1>Willkommen</h1>
        <p className="home-subtitle">
          Lerne Assamesisch — eine der ältesten Sprachen Nordostindiens.
          Wähle eine Lektion aus der Seitenleiste oder beginne direkt hier.
        </p>
      </div>

      <div className="home-grid">
        {lessons.map((lesson) => (
          <Link key={lesson.id} to={`/lesson/${lesson.id}`} className="home-card">
            <span className="home-card-title">{lesson.title}</span>
            <FiArrowRight size={16} />
          </Link>
        ))}
      </div>
    </div>
  );
}
