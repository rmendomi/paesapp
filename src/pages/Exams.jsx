import { useState } from 'react';
import { ArrowRight, X, BookOpen, Zap, Trophy, Sparkles } from 'lucide-react';
import { exams, progressStats, studentProfile, skillsConfig, getSkillQuestions, getAllQuestions, shuffle } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { api, IS_DEMO_BACKEND } from '../api';

export default function Exams({ onNavigate }) {
  const { user } = useAuth();
  const [modal,        setModal]        = useState(null);  // { examId } | null
  const [aiLoading,    setAiLoading]    = useState(false);
  const [freeLoading,  setFreeLoading]  = useState(false);

  const openModal  = (examId) => setModal({ examId });
  const closeModal = () => setModal(null);

  const startAIPractice = async (examId, skillId = null) => {
    if (IS_DEMO_BACKEND) {
      alert('La generación con IA requiere el backend configurado (VITE_GAS_URL). En modo demo usa las preguntas estáticas.');
      return;
    }
    closeModal();
    setAiLoading(true);
    try {
      const result = await api.generateQuestions({
        examId,
        skillId,
        count: 10,
        userEmail: user?.email,
      });
      const exam = exams.find(e => e.id === examId);
      let skillName = `${exam.name} ✨ IA`;
      if (skillId) {
        const skill = skillsConfig[examId].find(s => s.id === skillId);
        skillName = `${exam.name} · ${skill.name} ✨ IA`;
      }
      onNavigate('practice', { examId, questions: result.questions, mode: 'practice', skillName });
    } catch (err) {
      alert('Error generando preguntas con IA: ' + err.message);
    } finally {
      setAiLoading(false);
    }
  };

  const startPractice = async (examId, mode, skillId = null) => {
    const exam = exams.find(e => e.id === examId);
    let skillName = null;
    let count;

    if (mode === 'practice')       count = 10;
    else if (mode === 'skill')     count = 20;
    else /* global */              count = null; // toda la base

    closeModal();
    setFreeLoading(true);

    try {
      // 1. Buscar en banco_ia (preguntas no vistas por el usuario)
      let bancoQs = [];
      if (user?.email && !IS_DEMO_BACKEND) {
        bancoQs = await api.getBancoQuestions(examId, skillId || null, user.email, count || 999);
      }

      // 2. Completar con mockData si el banco no alcanza
      let staticQs;
      if (mode === 'skill' && skillId) {
        const skill = skillsConfig[examId].find(s => s.id === skillId);
        skillName = `${exam.name} · ${skill.name}`;
        staticQs = getSkillQuestions(examId, skillId);
      } else {
        staticQs = getAllQuestions(examId);
      }

      // Filtrar duplicados (banco ya tiene esas preguntas)
      const bancoIds = new Set(bancoQs.map(q => q.id));
      const filtered = staticQs.filter(q => !bancoIds.has(q.id));

      // Mezclar banco primero, luego estáticas, cortar al límite
      const combined = [...bancoQs, ...shuffle(filtered)];
      const questions = count ? combined.slice(0, count) : combined;

      // 3. Marcar como vistas las del banco que vamos a mostrar
      if (user?.email && bancoQs.length > 0) {
        api.markQuestionsAsSeen(user.email, bancoQs, examId).catch(() => {});
      }

      onNavigate('practice', {
        examId,
        questions,
        mode: mode === 'practice' ? 'practice' : 'exam',
        skillName,
      });
    } finally {
      setFreeLoading(false);
    }
  };

  return (
    <div className="px-8 py-8 space-y-8">

      {/* Loading overlay — generación IA */}
      {aiLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4"
          style={{ background: 'rgba(12,31,61,0.75)', backdropFilter: 'blur(8px)' }}>
          <div className="w-14 h-14 rounded-full border-4 border-white/20 border-t-white animate-spin" />
          <p className="font-semibold text-white text-lg">Generando preguntas con IA...</p>
          <p className="text-white/50 text-sm">Buscando en banco y generando nuevas preguntas</p>
        </div>
      )}
      {/* Loading overlay — práctica libre (buscando en banco) */}
      {freeLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4"
          style={{ background: 'rgba(12,31,61,0.6)', backdropFilter: 'blur(6px)' }}>
          <div className="w-14 h-14 rounded-full border-4 border-white/20 border-t-blue-400 animate-spin" />
          <p className="font-semibold text-white text-lg">Cargando preguntas...</p>
          <p className="text-white/50 text-sm">Buscando en el banco compartido</p>
        </div>
      )}
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

                {/* AI Practice */}
                <button
                  onClick={() => startAIPractice(modal.examId)}
                  className="w-full flex items-start gap-4 p-4 rounded-2xl text-left transition-all hover:scale-[1.01]"
                  style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.07), rgba(79,70,229,0.07))', border: '1.5px solid rgba(124,58,237,0.25)' }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(124,58,237,0.12)' }}>
                    <Sparkles size={16} style={{ color: '#7c3aed' }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-semibold text-sm" style={{ color: '#0c1f3d' }}>Práctica con IA</p>
                      <span className="text-xs px-1.5 py-0.5 rounded-md font-semibold"
                        style={{ background: 'rgba(124,58,237,0.12)', color: '#7c3aed' }}>Nuevo</span>
                    </div>
                    <p className="text-xs" style={{ color: 'rgba(12,31,61,0.5)' }}>
                      10 preguntas generadas por Gemini · Retroalimentación inmediata
                    </p>
                  </div>
                  <ArrowRight size={14} style={{ color: 'rgba(124,58,237,0.4)', marginTop: 3, flexShrink: 0 }} />
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
                    Sub-ensayo por habilidad
                  </p>
                  <div className="space-y-2">
                    {skills.map(skill => (
                      <div key={skill.id} className="flex items-center gap-1.5">
                        <button
                          onClick={() => startPractice(modal.examId, 'skill', skill.id)}
                          className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all hover:scale-[1.01]"
                          style={{ background: `${skill.color}08`, border: `1px solid ${skill.color}20` }}>
                          <span className="text-base">{skill.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate" style={{ color: '#0c1f3d' }}>{skill.name}</p>
                            <p className="text-xs truncate" style={{ color: 'rgba(12,31,61,0.45)' }}>20 preguntas · Modo examen</p>
                          </div>
                          <ArrowRight size={13} style={{ color: `${skill.color}80`, flexShrink: 0 }} />
                        </button>
                        <button
                          onClick={() => startAIPractice(modal.examId, skill.id)}
                          title="Generar con IA"
                          className="flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0 transition-all hover:scale-110"
                          style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}>
                          <Sparkles size={14} style={{ color: '#7c3aed' }} />
                        </button>
                      </div>
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
