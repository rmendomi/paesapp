import { useEffect, useRef } from 'react';
import { CheckCircle, XCircle, RotateCcw, LayoutDashboard, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getExam } from '../data/mockData';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

export default function Results({ data, onPracticeAgain, onDashboard }) {
  const { saveSession } = useAuth();
  const saved = useRef(false);

  const { examId, questions, answers, correct, total, score, mode = 'practice' } = data;
  const exam      = getExam(examId);
  const pct       = Math.round((correct / total) * 100);
  const radius    = 45;
  const circ      = 2 * Math.PI * radius;
  const offset    = circ - (pct / 100) * circ;
  const errors    = answers.filter(a => !a.correct);
  const isExamMode = mode === 'exam';

  // Guardar sesión en la API (una sola vez, evita doble escritura en StrictMode)
  useEffect(() => {
    if (!saved.current) {
      saved.current = true;
      saveSession({ examId, mode, correct, total, score });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const grade =
    pct >= 90 ? { label: 'Excelente',   color: '#10b981', icon: '🏆' } :
    pct >= 70 ? { label: 'Muy bueno',   color: '#1d4ed8', icon: '⭐' } :
    pct >= 50 ? { label: 'En camino',   color: '#f59e0b', icon: '📈' } :
                { label: 'A practicar', color: '#ef4444', icon: '💪' };

  return (
    <div className="min-h-screen grain" style={{ background: '#f8faff' }}>
      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* Tarjeta de puntaje */}
        <div className="p-8 rounded-4xl mb-8 text-center fade-up delay-1"
          style={{ background: 'linear-gradient(160deg, #0c1f3d, #1d4ed8)', boxShadow: '0 25px 60px rgba(12,31,61,0.3)' }}>
          <p className="text-white/50 text-sm mb-2">{exam.icon} {exam.name}</p>
          <h1 className="font-display text-4xl font-light text-white mb-2">Resultados</h1>
          {isExamMode && (
            <p className="text-white/40 text-xs mb-4">Modo ensayo — revisión completa al final</p>
          )}

          {/* Anillo */}
          <div className="flex justify-center mb-6">
            <div className="relative w-36 h-36">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                <circle cx="50" cy="50" r={radius} fill="none" stroke="#93c5fd" strokeWidth="8"
                  strokeDasharray={circ} strokeDashoffset={offset}
                  strokeLinecap="round" className="ring-fill" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="font-display text-3xl font-semibold text-white">{pct}%</p>
                <p className="text-white/50 text-xs">{correct}/{total}</p>
              </div>
            </div>
          </div>

          {/* Puntaje estimado */}
          <div className="mb-6">
            <p className="font-display text-5xl font-bold" style={{ color: '#93c5fd' }}>{score}</p>
            <p className="text-white/50 text-sm mt-1">puntos estimados PAES</p>
          </div>

          {/* Badge de rendimiento */}
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold"
            style={{ background: `${grade.color}25`, color: grade.color, border: `1px solid ${grade.color}40` }}>
            {grade.icon} {grade.label}
          </span>

          {/* Resumen */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { label: 'Correctas',   value: correct,         color: '#6ee7b7' },
              { label: 'Incorrectas', value: total - correct, color: '#fca5a5' },
              { label: 'Total',       value: total,           color: '#93c5fd' },
            ].map(({ label, value, color }) => (
              <div key={label} className="py-3 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <p className="font-display text-2xl font-semibold" style={{ color }}>{value}</p>
                <p className="text-white/45 text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Acciones */}
        <div className="flex gap-3 mb-8 fade-up delay-2">
          <button
            onClick={onPracticeAgain}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm transition-all hover:scale-[1.02]"
            style={{ color: '#1d4ed8', border: '1.5px solid rgba(29,78,216,0.2)', background: 'white', boxShadow: '0 2px 12px rgba(12,31,61,0.06)' }}
          >
            <RotateCcw size={15} /> Practicar otra prueba
          </button>
          <button
            onClick={onDashboard}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm text-white transition-all hover:scale-[1.02]"
            style={{ background: 'linear-gradient(135deg, #0c1f3d, #1d4ed8)' }}
          >
            <LayoutDashboard size={15} /> Panel principal
          </button>
        </div>

        {/* Modo ensayo: errores primero */}
        {isExamMode && errors.length > 0 && (
          <div className="mb-8 fade-up delay-3">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(239,68,68,0.1)' }}>
                <AlertTriangle size={16} style={{ color: '#ef4444' }} />
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold" style={{ color: '#0c1f3d' }}>Errores a revisar</h2>
                <p className="text-xs" style={{ color: 'rgba(12,31,61,0.45)' }}>
                  {errors.length} pregunta{errors.length !== 1 ? 's' : ''} incorrecta{errors.length !== 1 ? 's' : ''} — estudia estas explicaciones
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {errors.map((ans, i) => {
                const q    = ans.question;
                const qNum = answers.findIndex(a => a.questionId === ans.questionId) + 1;
                return (
                  <div key={i} className="p-5 rounded-3xl"
                    style={{ background: 'white', boxShadow: '0 2px 16px rgba(12,31,61,0.06)', borderLeft: '3px solid #ef4444' }}>
                    <div className="flex items-start gap-3 mb-3">
                      <XCircle size={16} style={{ color: '#ef4444', flexShrink: 0, marginTop: 2 }} />
                      <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: '#0c1f3d' }}>
                        <span className="font-semibold text-xs mr-2" style={{ color: 'rgba(12,31,61,0.4)' }}>P{qNum}</span>
                        {q.text.length > 200 ? q.text.slice(0, 200) + '…' : q.text}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 ml-7 mb-3">
                      <span className="text-xs px-3 py-1 rounded-lg font-medium"
                        style={{ background: 'rgba(16,185,129,0.1)', color: '#065f46', border: '1px solid rgba(16,185,129,0.2)' }}>
                        ✓ Correcta: {LETTERS[q.correct]}) {q.options[q.correct]}
                      </span>
                      <span className="text-xs px-3 py-1 rounded-lg font-medium"
                        style={{ background: 'rgba(239,68,68,0.07)', color: '#991b1b', border: '1px solid rgba(239,68,68,0.18)' }}>
                        Tu respuesta: {LETTERS[ans.selected]}) {q.options[ans.selected]}
                      </span>
                    </div>
                    <div className="ml-7 p-3 rounded-xl"
                      style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)' }}>
                      <p className="text-xs leading-relaxed" style={{ color: 'rgba(12,31,61,0.65)' }}>{q.explanation}</p>
                      {q.videoUrl && (
                        <a href={q.videoUrl} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold px-3 py-1.5 rounded-lg"
                          style={{ background: 'rgba(29,78,216,0.1)', color: '#1d4ed8' }}>
                          ▶ Ver video explicativo
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Ensayo sin errores */}
        {isExamMode && errors.length === 0 && (
          <div className="mb-8 p-6 rounded-3xl text-center fade-up delay-3"
            style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
            <CheckCircle size={32} className="mx-auto mb-3" style={{ color: '#10b981' }} />
            <p className="font-semibold" style={{ color: '#065f46' }}>¡Sin errores! Resultado perfecto.</p>
            <p className="text-sm mt-1" style={{ color: 'rgba(6,95,70,0.7)' }}>Excelente dominio de este ensayo.</p>
          </div>
        )}

        {/* Revisión completa */}
        <div className="fade-up delay-4">
          <h2 className="font-display text-xl font-semibold mb-4" style={{ color: '#0c1f3d' }}>
            {isExamMode ? 'Revisión completa' : 'Revisión de preguntas'}
          </h2>
          <div className="space-y-4">
            {answers.map((ans, i) => {
              const q = ans.question;
              return (
                <div key={i} className="p-5 rounded-3xl"
                  style={{
                    background: 'white',
                    boxShadow: '0 2px 16px rgba(12,31,61,0.06)',
                    borderLeft: `3px solid ${ans.correct ? '#10b981' : '#ef4444'}`,
                  }}>
                  <div className="flex items-start gap-3 mb-3">
                    {ans.correct
                      ? <CheckCircle size={16} style={{ color: '#10b981', flexShrink: 0, marginTop: 2 }} />
                      : <XCircle    size={16} style={{ color: '#ef4444', flexShrink: 0, marginTop: 2 }} />}
                    <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: '#0c1f3d' }}>
                      <span className="font-semibold text-xs mr-2" style={{ color: 'rgba(12,31,61,0.4)' }}>P{i + 1}</span>
                      {q.text.length > 180 ? q.text.slice(0, 180) + '…' : q.text}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 ml-7">
                    <span className="text-xs px-3 py-1 rounded-lg font-medium"
                      style={{ background: 'rgba(16,185,129,0.1)', color: '#065f46', border: '1px solid rgba(16,185,129,0.2)' }}>
                      ✓ {LETTERS[q.correct]}) {q.options[q.correct]}
                    </span>
                    {!ans.correct && (
                      <span className="text-xs px-3 py-1 rounded-lg font-medium"
                        style={{ background: 'rgba(239,68,68,0.07)', color: '#991b1b', border: '1px solid rgba(239,68,68,0.18)' }}>
                        Tu respuesta: {LETTERS[ans.selected]}) {q.options[ans.selected]}
                      </span>
                    )}
                  </div>
                  <p className="ml-7 mt-2 text-xs leading-relaxed" style={{ color: 'rgba(12,31,61,0.55)' }}>
                    {q.explanation}
                  </p>
                  {q.videoUrl && (
                    <a href={q.videoUrl} target="_blank" rel="noopener noreferrer"
                      className="ml-7 inline-flex items-center gap-1 mt-1.5 text-xs font-semibold"
                      style={{ color: '#1d4ed8' }}>
                      ▶ Ver video
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
