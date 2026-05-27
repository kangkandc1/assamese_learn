import { useState } from "react";
import { NavLink } from "react-router-dom";
import lessons from "../data/lessons";
import exercises from "../data/exercises";
import grammar from "../data/grammar";
import conjugationtables from "../data/conjugationtables";
import { FiBook, FiMenu, FiX, FiEdit3, FiGrid, FiChevronDown, FiChevronRight } from "react-icons/fi";

const sections = [
  { key: "lektionen", label: "Lektionen", icon: <FiBook size={14} />, items: lessons, basePath: "lesson" },
  { key: "grammatik", label: "Grammatik", icon: <FiEdit3 size={14} />, items: grammar, basePath: "grammar" },
  { key: "konjugation", label: "Konjugation", icon: <FiGrid size={14} />, items: conjugationtables, basePath: "conjugation" },
  { key: "uebungen", label: "Übungen", icon: <FiEdit3 size={14} />, items: exercises, basePath: "exercise" },
];

export default function Sidebar({ collapsed, onToggle, onNavigate }) {
  const [openSections, setOpenSections] = useState({ lektionen: true });

  const toggle = (key) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <aside className={`sidebar ${collapsed ? "sidebar--collapsed" : ""}`}>
      <div className="sidebar-header">
        {!collapsed && (
          <div className="sidebar-brand">
            <FiBook size={18} />
            <span>Assamesisch</span>
          </div>
        )}
        <button className="sidebar-toggle" onClick={onToggle} title="Seitenleiste umschalten">
          {collapsed ? <FiMenu size={18} /> : <FiX size={18} />}
        </button>
      </div>

      {!collapsed && (
        <nav className="sidebar-nav">
          {sections.map(({ key, label, icon, items, basePath }) => (
            <div key={key} className="sidebar-section">
              <button
                className="sidebar-section-toggle"
                onClick={() => toggle(key)}
              >
                <span className="sidebar-section-toggle-left">
                  {icon}
                  <span>{label}</span>
                </span>
                {openSections[key] ? <FiChevronDown size={13} /> : <FiChevronRight size={13} />}
              </button>

              {openSections[key] && (
                <div className="sidebar-section-items">
                  {items.map((item) => (
                    <NavLink
                      key={item.id}
                      to={`/${basePath}/${item.id}`}
                      className={({ isActive }) =>
                        `sidebar-link ${isActive ? "sidebar-link--active" : ""}`
                      }
                      onClick={() => onNavigate && onNavigate()}
                    >
                      {item.title}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      )}
    </aside>
  );
}
