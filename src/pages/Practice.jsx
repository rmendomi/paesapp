import { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { getExam, toScore } from '../data/mockData';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

export default function Practice({ data, onFinish, onBack }) {
  const { examId, questions, mode = 'practice', skillName } = data;
  const exam = getExam(examId);
  const isExamMode = mode === 'exam';

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected,   setSelected]   = useState(null);
  const [confirmed,  setConfirmed]  = useState(false);
  const [answers,    setAnswers]    = useState([]);

  const q        = questions[currentIdx];
  const isLast   = currentIdx === questions.length - 1;
  const progress = Math.round(((currentIdx + (confirmed ? 1 : 0)) / questions.length) * 100);

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
      // In exam mode: no feedback, immediately advance
      if (isLast) {
        const correct = newAnswers.filter(a => a.correct).length;
        onFinish({ examId, questions, answers: newAnswers, correct, total: questions.length, score: toScore(correct, questions.length), mode });
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
      const correct = answers.filter(a => a.correct).length;
      onFinish({ examId, questions, answers, correct, total: questions.length, score: toScore(correct, questions.length), mode });
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
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-sm font-medium"
            style={{ color: 'rgba(12,31,61,0.5)' }}>
            <ArrowLeft size={15} /> Salir
          </button>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <span className="text-base">{exam.icon}</span>
              <span className="font-display font-semibold text-sm" style={{ color: '#0c1f3d' }}>
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
          <div className="flex items-center gap-2 text-sm" style={{ color: 'rgba(12,31,61,0.5)' }}>
            <span className="font-semibold" style={{ color: exam.color }}>{currentIdx + 1}</span>
            <span>/</span>
            <span>{questions.length}</span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-1" style={{ background: '#eff6ff' }}>
          <div className="h-1 transition-all duration-500"
            style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${exam.color}99, ${exam.color})` }} />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Question number badge */}
        <div className="flex items-center gap-3 mb-6">
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
        </div>

        {/* Question text */}
        <div className="mb-8 p-6 rounded-3xl"
          style={{ background: 'white', boxShadow: '0 2px 20px rgba(12,31,61,0.06)', border: '1px solid rgba(12,31,61,0.04)' }}>
          <p className="text-base leading-relaxed whitespace-pre-line" style={{ color: '#0c1f3d' }}>
            {q.text}
          </p>
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
