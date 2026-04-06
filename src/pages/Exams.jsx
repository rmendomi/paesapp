import { useState } from 'react';
import { ArrowRight, X, BookOpen, Zap, Trophy } from 'lucide-react';
import { exams, progressStats, studentProfile, skillsConfig, getSkillQuestions, getAllQuestions, shuffle } from '../data/mockData';

export default function Exams({ onNavigate }) {
  const [modal, setModal] = useState(null); // { examId } or null

  const openModal = (examId) => setModal({ examId });
  const closeModal = () => setModal(null);

  const startPractice = (examId, mode, skillId = null) => {
    const exam = exams.find(e => e.id === examId);
    let questions;
    let skillName = null;

    if (mode === 'practice') {
      // 10 random questions from all skills
      const all = getAllQuestions(examId);
      questions = shuffle(all).slice(0, 10);
    } else if (mode === 'skill' && skillId) {
      const skill = skillsConfig[examId].find(s => s.id === skillId);
      skillName = `${exam.name} · ${skill.name}`;
      questions = shuffle(getSkillQuestions(examId, skillId)).slice(0, 20);
    } else if (mode === 'global') {
      const all = getAllQuestions(examId);
      questions = shuffle(all);
    }

    closeModal();
    onNavigate('practice', { examId, questions, mode: mode === 'practice' ? 'practice' : 'exam', skillName });
  };

  return (
    <div className="px-8 py-8 space-y-8">
      <div className="fade-up delay-1">
        <h1 className="font-display text-3xl font-light" style={{ color: '#0c1f3d' }}>
          Pruebas <em>PAES disponibles</em>
        </h1>
        <p className="text-sm mt-1" style={{ color: 'rgba(12,31,61,0.45)' }}>
          Selecciona una prueba para comenzar a practicar
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 fade-up delay-2">
        {exams.map((exam) => {
          const stats  = progressStats[exam.id];
          const target = studentProfile.targets[exam.id];
          const diff   = stats.lastScore - target;
          const pct    = Math.round((stats.correct / stats.attempted) * 100);

          return (
            <div key={exam.id} className="p-6 rounded-3xl card-lift flex flex-col"
              style={{ background: 'white', boxShadow: '0 2px 20px rgba(12,31,61,0.06)' }}>
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: exam.bg }}>
                  {exam.icon}
                </div>
                <span className="badge"
                  style={{
                    background: diff >= 0 ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.08)',
                    color: diff >= 0 ? '#065f46' : '#991b1b',
                    border: diff >= 0 ? '1px solid rgba(16,185,129,0.2)' : '1px solid rgba(239,68,68,0.2)',
                  }}>
                  {diff >= 0 ? `+${diff}` : diff} pts meta
                </span>
              </div>

              <h3 className="font-display text-xl font-semibold mb-1" style={{ color: '#0c1f3d' }}>{exam.name}</h3>
              <p className="text-xs mb-4" style={{ color: 'rgba(12,31,61,0.45)' }}>{exam.totalQ} preguntas · 100 minutos</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: 'Último puntaje', value: `${stats.lastScore}`, color: exam.color },
                  { label: 'Meta',           value: `${target}`,          color: 'rgba(12,31,61,0.6)' },
                  { label: '% Acierto',      value: `${pct}%`,            color: diff >= 0 ? '#10b981' : '#ef4444' },
                ].map(({ label, value, color }) => (
                  <div key={label} className="text-center py-2 rounded-xl" style={{ background: '#f8faff' }}>
                    <p className="font-semibold text-sm" style={{ color }}>{value}</p>
                    <p className="text-xs" style={{ color: 'rgba(12,31,61,0.4)' }}>{label}</p>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1.5" style={{ color: 'rgba(12,31,61,0.4)' }}>
                  <span>Progreso hacia la meta</span>
                  <span>{Math.min(100, Math.round((stats.lastScore / target) * 100))}%</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: '#eff6ff' }}>
                  <div className="h-1.5 rounded-full progress-bar"
                    style={{ width: `${Math.min(100, Math.round((stats.lastScore / target) * 100))}%`, background: exam.color }} />
                </div>
              </div>

              {/* Skills chips */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {skillsConfig[exam.id].map(skill => (
                  <span key={skill.id} className="text-xs px-2 py-0.5 rounded-lg font-medium"
                    style={{ background: `${skill.color}15`, color: skill.color, border: `1px solid ${skill.color}25` }}>
                    {skill.icon} {skill.name}
                  </span>
                ))}
              </div>

              <div className="mt-auto">
                <button
                  onClick={() => openModal(exam.id)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:scale-[1.02]"
                  style={{ background: `linear-gradient(135deg, ${exam.color}dd, ${exam.color})` }}>
                  Seleccionar modo
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tip card */}
      <div className="p-6 rounded-3xl fade-up delay-3"
        style={{ background: 'linear-gradient(135deg, #0c1f3d, #1d4ed8)' }}>
        <div className="flex items-start gap-4">
          <span className="text-2xl">💡</span>
          <div>
            <h3 className="font-semibold text-white mb-1">Consejo de práctica</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Usa los sub-ensayos por habilidad para reforzar áreas específicas. El ensayo global simula las condiciones reales de la PAES con todos los temas del temario.
            </p>
          </div>
        </div>
      </div>

      {/* Mode selection modal */}
      {modal && (() => {
        const exam = exams.find(e => e.id === modal.examId);
        const skills = skillsConfig[modal.examId];
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(12,31,61,0.55)', backdropFilter: 'blur(4px)' }}
            onClick={closeModal}>
            <div className="w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
              style={{ background: 'white' }}
              onClick={e => e.stopPropagation()}>

              {/* Modal header */}
              <div className="p-6 pb-4"
                style={{ background: `linear-gradient(135deg, ${exam.color}18, ${exam.color}08)`, borderBottom: '1px solid rgba(12,31,61,0.06)' }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl"
                      style={{ background: exam.bg }}>
                      {exam.icon}
                    </div>
                    <div>
                      <h3 className="font-display font-semibold" style={{ color: '#0c1f3d' }}>{exam.name}</h3>
                      <p className="text-xs" style={{ color: 'rgba(12,31,61,0.45)' }}>Elige cómo quieres practicar</p>
                    </div>
                  </div>
                  <button onClick={closeModal} className="p-1.5 rounded-xl hover:bg-black/5 transition-colors">
                    <X size={16} style={{ color: 'rgba(12,31,61,0.4)' }} />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-3">
                {/* Practice mode */}
                <button
                  onClick={() => startPractice(modal.examId, 'practice')}
                  className="w-full flex items-start gap-4 p-4 rounded-2xl text-left transition-all hover:scale-[1.01]"
                  style={{ background: '#f8faff', border: '1.5px solid rgba(12,31,61,0.08)' }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(29,78,216,0.1)' }}>
                    <Zap size={16} style={{ color: '#1d4ed8' }} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm mb-0.5" style={{ color: '#0c1f3d' }}>Práctica libre</p>
                    <p className="text-xs" style={{ color: 'rgba(12,31,61,0.5)' }}>
                      10 preguntas aleatorias · Retroalimentación inmediata
                    </p>
                  </div>
                  <ArrowRight size={14} style={{ color: 'rgba(12,31,61,0.3)', marginTop: 3, flexShrink: 0 }} />
                </button>

                {/* Global essay */}
                <button
                  onClick={() => startPractice(modal.examId, 'global')}
                  className="w-full flex items-start gap-4 p-4 rounded-2xl text-left transition-all hover:scale-[1.01]"
                  style={{ background: `${exam.color}08`, border: `1.5px solid ${exam.color}25` }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${exam.color}18` }}>
                    <Trophy size={16} style={{ color: exam.color }} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm mb-0.5" style={{ color: '#0c1f3d' }}>Ensayo global</p>
                    <p className="text-xs" style={{ color: 'rgba(12,31,61,0.5)' }}>
                      Todas las habilidades · Modo examen · Errores al final
                    </p>
                  </div>
                  <ArrowRight size={14} style={{ color: 'rgba(12,31,61,0.3)', marginTop: 3, flexShrink: 0 }} />
                </button>

                {/* Sub-essays by skill */}
                <div>
                  <p className="text-xs font-semibold mb-2 px-1" style={{ color: 'rgba(12,31,61,0.45)' }}>
                    Sub-ensayo por habilidad (20 preguntas · Modo examen)
                  </p>
                  <div className="space-y-2">
                    {skills.map(skill => (
                      <button key={skill.id}
                        onClick={() => startPractice(modal.examId, 'skill', skill.id)}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all hover:scale-[1.01]"
                        style={{ background: `${skill.color}08`, border: `1px solid ${skill.color}20` }}>
                        <span className="text-base">{skill.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate" style={{ color: '#0c1f3d' }}>{skill.name}</p>
                          <p className="text-xs truncate" style={{ color: 'rgba(12,31,61,0.45)' }}>{skill.description}</p>
                        </div>
                        <ArrowRight size={13} style={{ color: `${skill.color}80`, flexShrink: 0 }} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
