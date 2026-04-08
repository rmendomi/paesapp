import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react';
import { getExam, toScore } from '../data/mockData';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

// Duración PAES real por examen (en segundos)
const EXAM_DURATIONS = {
  lectora:  100 * 60,
  m1:       100 * 60,
  m2:       100 * 60,
  historia:  85 * 60,
  ciencias: 110 * 60,
};

// Palabras clave PAES que indican qué se pide
const KEYWORD_PATTERNS = [
  // Qué preguntan
  /\b(¿Cuál|¿Qué|¿Cómo|¿Por qué|¿Cuándo|¿Dónde|¿Quién|¿Cuánto|¿Cuántos|¿Cuántas)\b/gi,
  // Verbos de acción que definen la tarea
  /\b(señala|identifica|indica|determina|calcula|resuelve|evalúa|analiza|interpreta|deduce|infiere|explica|define|describe|compara|selecciona|elige|escoge|encuentra|menciona|establece|justifica|argumenta|reconoce|relaciona|clasifica|ordena|caracteriza|según|conforme|basándote|considerando|teniendo en cuenta)\b/gi,
  // Palabras que acotan el contexto
  /\b(EXCEPTO|NO|solo|únicamente|principalmente|principalmente|necesariamente|correctamente|incorrectamente|verdadero|falso|mejor|peor|mayor|menor|máximo|mínimo)\b/g,
];

// Resaltar palabras clave en el texto de una pregunta
function highlightKeywords(text) {
  if (!text) return null;

  // Marcar posiciones de todas las keywords
  const marks = new Array(text.length).fill(false);
  KEYWORD_PATTERNS.forEach(pattern => {
    const regex = new RegExp(pattern.source, pattern.flags);
    let match;
    while ((match = regex.exec(text)) !== null) {
      for (let i = match.index; i < match.index + match[0].length; i++) {
        marks[i] = true;
      }
    }
  });

  // Construir segmentos resaltados
  const segments = [];
  let i = 0;
  while (i < text.length) {
    if (marks[i]) {
      let j = i;
      while (j < text.length && marks[j]) j++;
      segments.push({ text: text.slice(i, j), highlight: true });
      i = j;
    } else {
      let j = i;
      while (j < text.length && !marks[j]) j++;
      segments.push({ text: text.slice(i, j), highlight: false });
      i = j;
    }
  }

  return segments.map((seg, idx) =>
    seg.highlight ? (
      <mark key={idx} style={{
        background: 'rgba(245,158,11,0.25)',
        color: '#92400e',
        borderRadius: '3px',
        padding: '0 2px',
        fontWeight: 600,
      }}>
        {seg.text}
      </mark>
    ) : seg.text
  );
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function Practice({ data, onFinish, onBack }) {
  const { examId, questions, mode = 'practice', skillName } = data;
  const exam = getExam(examId);
  const isExamMode = mode === 'exam';

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected,   setSelected]   = useState(null);
  const [confirmed,  setConfirmed]  = useState(false);
  const [answers,    setAnswers]    = useState([]);

  // Timer: solo en modo ensayo global
  const totalSeconds = isExamMode ? (EXAM_DURATIONS[examId] || 100 * 60) : 0;
  const [timeLeft,   setTimeLeft]   = useState(totalSeconds);
  const [timerDone,  setTimerDone]  = useState(false);

  const finishExam = useCallback((currentAnswers) => {
    const correct = currentAnswers.filter(a => a.correct).length;
    onFinish({
      examId, questions, answers: currentAnswers,
      correct, total: questions.length,
      score: toScore(correct, questions.length),
      mode,
    });
  }, [examId, questions, mode, onFinish]);

  // Countdown timer
  useEffect(() => {
    if (!isExamMode || timerDone) return;
    if (timeLeft <= 0) {
      setTimerDone(true);
      // Auto-submit con las respuestas actuales al acabar el tiempo
      setAnswers(prev => {
        finishExam(prev);
        return prev;
      });
      return;
    }
    const interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [isExamMode, timeLeft, timerDone, finishExam]);

  const q        = questions[currentIdx];
  const isLast   = currentIdx === questions.length - 1;
  const progress = Math.round(((currentIdx + (confirmed ? 1 : 0)) / questions.length) * 100);

  // Color del timer según tiempo restante
  const timerPct    = totalSeconds > 0 ? timeLeft / totalSeconds : 1;
  const timerColor  = timerPct > 0.33 ? '#10b981' : timerPct > 0.15 ? '#f59e0b' : '#ef4444';
  const timerBg     = timerPct > 0.33 ? 'rgba(16,185,129,0.08)' : timerPct > 0.15 ? 'rgba(245,158,11,0.08)' : 'rgba(239,68,68,0.08)';
  const timerBorder = timerPct > 0.33 ? 'rgba(16,185,129,0.2)' : timerPct > 0.15 ? 'rgba(245,158,11,0.2)' : 'rgba(239,68,68,0.3)';

  const handleConfirm = () => {
    if (selected === null) return;
    const newAnswer = {
      questionId: q.id,
      selected,
      correct: selected === q.correct,
      question: q,
    };
    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);

    if (isExamMode) {
      if (isLast) {
        finishExam(newAnswers);
      } else {
        setCurrentIdx(i => i + 1);
        setSelected(null);
      }
    } else {
      setConfirmed(true);
    }
  };

  const handleNext = () => {
    if (isLast) {
      finishExam(answers);
    } else {
      setCurrentIdx(i => i + 1);
      setSelected(null);
      setConfirmed(false);
    }
  };

  const optionClass = (idx) => {
    if (!confirmed || isExamMode) return selected === idx ? 'option-selected' : '';
    if (idx === q.correct)                         return 'option-correct';
    if (idx === selected && idx !== q.correct)     return 'option-wrong';
    return '';
  };

  return (
    <div className="min-h-screen grain" style={{ background: '#f8faff' }}>
      {/* Header */}
      <div className="sticky top-0 z-30 backdrop-blur-md border-b"
        style={{ background: 'rgba(248,250,255,0.95)', borderColor: 'rgba(12,31,61,0.07)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <button onClick={onBack} className="flex items-center gap-2 text-sm font-medium flex-shrink-0"
            style={{ color: 'rgba(12,31,61,0.5)' }}>
            <ArrowLeft size={15} /> Salir
          </button>

          <div className="flex flex-col items-center min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-base">{exam.icon}</span>
              <span className="font-display font-semibold text-sm truncate" style={{ color: '#0c1f3d' }}>
                {skillName ? skillName : exam.name}
              </span>
            </div>
            {isExamMode && (
              <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: 'rgba(239,68,68,0.08)', color: '#991b1b', border: '1px solid rgba(239,68,68,0.2)' }}>
                Modo ensayo
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Timer — solo modo ensayo */}
            {isExamMode && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-sm font-bold"
                style={{ background: timerBg, border: `1px solid ${timerBorder}`, color: timerColor }}>
                <Clock size={13} />
                {formatTime(timeLeft)}
              </div>
            )}
            <div className="flex items-center gap-2 text-sm" style={{ color: 'rgba(12,31,61,0.5)' }}>
              <span className="font-semibold" style={{ color: exam.color }}>{currentIdx + 1}</span>
              <span>/</span>
              <span>{questions.length}</span>
            </div>
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-1" style={{ background: '#eff6ff' }}>
          <div className="h-1 transition-all duration-500"
            style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${exam.color}99, ${exam.color})` }} />
        </div>
        {/* Timer bar — solo modo ensayo */}
        {isExamMode && totalSeconds > 0 && (
          <div className="h-0.5" style={{ background: 'rgba(12,31,61,0.05)' }}>
            <div className="h-0.5 transition-all duration-1000"
              style={{ width: `${(timeLeft / totalSeconds) * 100}%`, background: timerColor, opacity: 0.6 }} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {/* Question number badge */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="badge" style={{ background: exam.bg, color: exam.color, border: `1px solid ${exam.color}30` }}>
            Pregunta {currentIdx + 1} de {questions.length}
          </span>
          {!isExamMode && confirmed && (
            <span className="badge"
              style={selected === q.correct
                ? { background: 'rgba(16,185,129,0.1)', color: '#065f46', border: '1px solid rgba(16,185,129,0.2)' }
                : { background: 'rgba(239,68,68,0.08)', color: '#991b1b', border: '1px solid rgba(239,68,68,0.2)' }}>
              {selected === q.correct ? '✓ Correcto' : '✗ Incorrecto'}
            </span>
          )}
          {isExamMode && (
            <span className="badge" style={{ background: 'rgba(245,158,11,0.1)', color: '#92400e', border: '1px solid rgba(245,158,11,0.2)' }}>
              Sin retroalimentación
            </span>
          )}
          {q.aiGenerated && (
            <span className="badge" style={{ background: 'rgba(124,58,237,0.1)', color: '#7c3aed', border: '1px solid rgba(124,58,237,0.2)' }}>
              {q.fromBanco ? '📚 Del banco' : '✨ IA nueva'}
            </span>
          )}
        </div>

        {/* Question text con keywords resaltadas */}
        <div className="mb-8 p-6 rounded-3xl"
          style={{ background: 'white', boxShadow: '0 2px 20px rgba(12,31,61,0.06)', border: '1px solid rgba(12,31,61,0.04)' }}>
          <p className="text-base leading-relaxed whitespace-pre-line" style={{ color: '#0c1f3d' }}>
            {highlightKeywords(q.text)}
          </p>
          {/* Leyenda del resaltado */}
          <div className="mt-3 pt-3 flex items-center gap-1.5" style={{ borderTop: '1px solid rgba(12,31,61,0.04)' }}>
            <mark style={{ background: 'rgba(245,158,11,0.25)', color: '#92400e', borderRadius: '3px', padding: '0 2px', fontSize: '11px', fontWeight: 600 }}>
              palabras clave
            </mark>
            <span className="text-xs" style={{ color: 'rgba(12,31,61,0.35)' }}>indican qué te piden</span>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {q.options.map((opt, idx) => (
            <button key={idx}
              disabled={confirmed && !isExamMode}
              onClick={() => !(confirmed && !isExamMode) && setSelected(idx)}
              className={`w-full flex items-start gap-4 px-5 py-4 rounded-2xl text-left transition-all option-btn ${optionClass(idx)}`}
              style={{
                background: 'white',
                border: '1.5px solid rgba(12,31,61,0.1)',
                boxShadow: '0 1px 8px rgba(12,31,61,0.04)',
              }}>
              <span className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5"
                style={{
                  background: (!isExamMode && confirmed && idx === q.correct) ? 'rgba(16,185,129,0.15)' :
                              (!isExamMode && confirmed && idx === selected && idx !== q.correct) ? 'rgba(239,68,68,0.12)' :
                              selected === idx ? 'rgba(59,130,246,0.12)' : 'rgba(12,31,61,0.06)',
                  color: (!isExamMode && confirmed && idx === q.correct) ? '#065f46' :
                         (!isExamMode && confirmed && idx === selected && idx !== q.correct) ? '#991b1b' :
                         selected === idx ? '#1d4ed8' : 'rgba(12,31,61,0.5)',
                }}>
                {LETTERS[idx]}
              </span>
              <span className="text-sm leading-relaxed flex-1" style={{ color: '#0c1f3d' }}>{opt}</span>
              {!isExamMode && confirmed && idx === q.correct && (
                <CheckCircle size={18} style={{ color: '#10b981', flexShrink: 0, marginTop: 2 }} />
              )}
              {!isExamMode && confirmed && idx === selected && idx !== q.correct && (
                <XCircle size={18} style={{ color: '#ef4444', flexShrink: 0, marginTop: 2 }} />
              )}
            </button>
          ))}
        </div>

        {/* Explanation (practice mode only) */}
        {!isExamMode && confirmed && (
          <div className="mb-8 p-5 rounded-2xl fade-up delay-1"
            style={{
              background: selected === q.correct ? 'rgba(16,185,129,0.08)' : 'rgba(59,130,246,0.07)',
              border: `1px solid ${selected === q.correct ? 'rgba(16,185,129,0.2)' : 'rgba(59,130,246,0.2)'}`,
            }}>
            <div className="flex items-start gap-3">
              <AlertCircle size={16} style={{ color: selected === q.correct ? '#10b981' : '#1d4ed8', flexShrink: 0, marginTop: 1 }} />
              <div>
                <p className="text-sm font-semibold mb-1" style={{ color: '#0c1f3d' }}>
                  {selected === q.correct ? 'Explicación' : `La respuesta correcta era ${LETTERS[q.correct]}`}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(12,31,61,0.65)' }}>
                  {q.explanation}
                </p>
                {q.videoUrl && (
                  <a href={q.videoUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold px-3 py-1.5 rounded-lg"
                    style={{ background: 'rgba(29,78,216,0.1)', color: '#1d4ed8' }}>
                    ▶ Ver explicación en video
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end">
          {!confirmed || isExamMode ? (
            <button
              onClick={handleConfirm}
              disabled={selected === null}
              className="flex items-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-white transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{ background: `linear-gradient(135deg, ${exam.color}dd, ${exam.color})` }}>
              {isExamMode && isLast ? 'Finalizar ensayo' : isExamMode ? 'Siguiente' : 'Confirmar respuesta'}
              {isExamMode && <ArrowRight size={15} />}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-white transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #0c1f3d, #1d4ed8)' }}>
              {isLast ? 'Ver resultados' : 'Siguiente pregunta'}
              <ArrowRight size={15} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
