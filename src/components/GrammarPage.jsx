import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import grammar from "../data/grammar";
import AudioButton from "./AudioButton";
import { FiBookOpen, FiMessageSquare, FiInfo } from "react-icons/fi";

function parseHighlight(text) {
  if (!text) return null;
  return text.split(/\*([^*]+)\*/).map((part, i) =>
    i % 2 === 1 ? <span key={i} style={{ color: "#e07b39" }}>{part}</span> : part
  );
}

export default function GrammarPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setData(null);
    setError(null);
    const lesson = grammar.find((l) => l.id === id);
    if (!lesson) {
      setError("Lektion nicht gefunden.");
      return;
    }
    lesson
      .file()
      .then((mod) => setData(mod.default ?? mod))
      .catch(() => setError("Fehler beim Laden der Lektion."));
  }, [id]);

  if (error) return <div className="lesson-error">{error}</div>;
  if (!data) return <div className="lesson-loading">Lädt…</div>;

  return (
    <div className="lesson-page">
      <h1 className="lesson-title">{data.title}</h1>

      {/* ── GRAMMATIK ─────────────────────────────────────── */}
            {data.introduction?.length > 0 && (
              <section className="lesson-section">
                <h2 className="section-heading">
                  <FiInfo /> Einsteig
                </h2>
                <div className="grammatik-list">
                  {data.introduction.map((item, i) => (
                    <div key={i} className="grammatik-item">
                      <span className="grammatik-index">{i + 1}</span>
                      <p>{parseHighlight(item["erklärung"])}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

      {/* ── VOKABULAR ─────────────────────────────────────── */}
      {data.vocab?.length > 0 && (
        <section className="lesson-section">
          <h2 className="section-heading">
            <FiBookOpen /> Grammatik
          </h2>
          <div className="table-wrapper">
            <table className="lesson-table">
              <thead>
                <tr>
                  <th>Deutsch</th>
                  <th>Assamesisch</th>
                  <th>Audio</th>
                </tr>
              </thead>
              <tbody>
                {data.vocab.map((item, i) => (
                  <tr key={i}>
                    <td className="cell-deutsch">{item.deutsch}</td>
                    <td className="cell-assamese">{item.assamese}</td>
                    <td className="cell-audio">
                      <AudioButton url={item["link to audio"]} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ── BEISPIELE ─────────────────────────────────────── */}
            {data.examples?.length > 0 && (
              <section className="lesson-section">
                <h2 className="section-heading">
                  <FiMessageSquare /> Beispiele
                </h2>
                <div className="table-wrapper">
                  <table className="lesson-table examples-table">
                    <thead>
                      <tr>
                        <th>Assamesisch</th>
                        <th>Deutsch</th>
                        <th>Wort für Wort</th>
                        <th>Audio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.examples.map((item, i) => (
                        <tr key={i}>
                          <td className="cell-assamese">{item.assamese}</td>
                          <td className="cell-deutsch">{item.deutsch}</td>
                          <td className="cell-wortfuerwort">{item["wort für wort"]}</td>
                          <td className="cell-audio">
                            <AudioButton url={item.link} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

      

      
    </div>
  );
}
