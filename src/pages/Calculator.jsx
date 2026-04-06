import { useState } from 'react';
import { Calculator as CalcIcon, Info, TrendingUp, Target } from 'lucide-react';
import { exams, universities, calcWeightedScore } from '../data/mockData';

// PAES 2024 score → approximate national percentile
const scoreToPercentile = (score) => {
  if (score >= 900) return 99;
  if (score >= 850) return 97;
  if (score >= 800) return 93;
  if (score >= 750) return 87;
  if (score >= 700) return 78;
  if (score >= 650) return 66;
  if (score >= 600) return 52;
  if (score >= 550) return 38;
  if (score >= 500) return 26;
  if (score >= 450) return 16;
  if (score >= 400) return 9;
  if (score >= 350) return 4;
  return 2;
};

const percentileLabel = (pct) => {
  if (pct >= 99) return { label: 'Top 1%', color: '#10b981' };
  if (pct >= 95) return { label: 'Top 5%', color: '#10b981' };
  if (pct >= 90) return { label: 'Top 10%', color: '#1d4ed8' };
  if (pct >= 75) return { label: 'Top 25%', color: '#1d4ed8' };
  if (pct >= 50) return { label: 'Sobre el promedio', color: '#f59e0b' };
  return { label: 'Bajo el promedio', color: '#ef4444' };
};

// Sample university ponderaciones for display
const sampleCareers = [
  { name: 'Medicina (UCH)', ponderaciones: { nem: 0.1, lectora: 0.15, m1: 0.25, ciencias: 0.5 } },
  { name: 'Ingeniería Civil (PUC)', ponderaciones: { nem: 0.1, lectora: 0.1, m1: 0.4, m2: 0.4 } },
  { name: 'Derecho (UCH)', ponderaciones: { nem: 0.2, lectora: 0.5, historia: 0.3 } },
  { name: 'Pedagogía Básica', ponderaciones: { nem: 0.3, lectora: 0.35, historia: 0.2, m1: 0.15 } },
  { name: 'Psicología (USACH)', ponderaciones: { nem: 0.2, lectora: 0.4, historia: 0.25, ciencias: 0.15 } },
];

export default function Calculator({ onNavigate }) {
  const [nem, setNem] = useState('');
  const [scores, setScores] = useState({ lectora: '', m1: '', m2: '', historia: '', ciencias: '' });

  const setScore = (id, val) => {
    const n = Math.min(1000, Math.max(100, parseInt(val) || ''));
    setScores(prev => ({ ...prev, [id]: n || val }));
  };

  const numScores = Object.entries(scores).filter(([, v]) => v !== '' && !isNaN(Number(v)));
  const avg = numScores.length > 0
    ? Math.round(numScores.reduce((s, [, v]) => s + Number(v), 0) / numScores.length)
    : null;

  const pctile = avg ? scoreToPercentile(avg) : null;
  const rank   = pctile ? percentileLabel(pctile) : null;

  const scoresObj = Object.fromEntries(
    Object.entries(scores).filter(([, v]) => v !== '' && !isNaN(Number(v))).map(([k, v]) => [k, Number(v)])
  );
  const nemNum = nem !== '' && !isNaN(Number(nem)) ? Number(nem) : null;

  return (
    <div className="px-8 py-8 space-y-8">
      <div className="fade-up delay-1">
        <h1 className="font-display text-3xl font-light" style={{ color: '#0c1f3d' }}>
          Calculadora <em>PAES</em>
        </h1>
        <p className="text-sm mt-1" style={{ color: 'rgba(12,31,61,0.45)' }}>
          Ingresa tus puntajes para calcular tu ranking y ponderaciones
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input card */}
        <div className="p-6 rounded-3xl fade-up delay-2"
          style={{ background: 'white', boxShadow: '0 2px 20px rgba(12,31,61,0.06)' }}>
          <h2 className="font-display text-lg font-semibold mb-5" style={{ color: '#0c1f3d' }}>
            Ingresa tus puntajes
          </h2>

          {/* NEM */}
          <div className="mb-5">
            <label className="block text-xs font-semibold mb-2" style={{ color: 'rgba(12,31,61,0.6)' }}>
              NEM (Notas de enseñanza media) · 100–1000
            </label>
            <input
              type="number" min="100" max="1000"
              value={nem}
              onChange={e => setNem(e.target.value)}
              placeholder="ej. 650"
              className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none transition-all"
              style={{
                background: '#f8faff',
                border: '1.5px solid rgba(12,31,61,0.1)',
                color: '#0c1f3d',
              }}
            />
          </div>

          {/* PAES scores */}
          <div className="space-y-3">
            {exams.map(exam => (
              <div key={exam.id}>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'rgba(12,31,61,0.6)' }}>
                  {exam.icon} {exam.name}
                </label>
                <input
                  type="number" min="100" max="1000"
                  value={scores[exam.id]}
                  onChange={e => setScore(exam.id, e.target.value)}
                  placeholder="100 – 1000"
                  className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none"
                  style={{
                    background: exam.bg,
                    border: `1.5px solid ${exam.color}25`,
                    color: '#0c1f3d',
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Results card */}
        <div className="space-y-4 fade-up delay-3">
          {/* Average & ranking */}
          {avg ? (
            <div className="p-6 rounded-3xl text-center"
              style={{ background: 'linear-gradient(160deg, #0c1f3d, #1d4ed8)', boxShadow: '0 8px 32px rgba(12,31,61,0.25)' }}>
              <p className="text-white/50 text-xs mb-1">Puntaje promedio PAES</p>
              <p className="font-display text-6xl font-bold mb-2" style={{ color: '#93c5fd' }}>{avg}</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-xs px-3 py-1.5 rounded-full font-semibold"
                  style={{ background: `${rank.color}25`, color: rank.color, border: `1px solid ${rank.color}40` }}>
                  {rank.label}
                </span>
                <span className="text-white/40 text-xs">· Percentil {pctile}</span>
              </div>

              {/* Per-exam scores */}
              <div className="mt-5 space-y-2">
                {exams.filter(e => scores[e.id] !== '' && !isNaN(Number(scores[e.id]))).map(exam => {
                  const s = Number(scores[exam.id]);
                  const ep = scoreToPercentile(s);
                  return (
                    <div key={exam.id} className="flex items-center gap-3 px-3 py-2 rounded-xl"
                      style={{ background: 'rgba(255,255,255,0.07)' }}>
                      <span className="text-base">{exam.icon}</span>
                      <span className="text-white/70 text-xs flex-1 text-left">{exam.name}</span>
                      <span className="font-semibold text-sm" style={{ color: exam.color === '#1d4ed8' ? '#93c5fd' : '#bfdbfe' }}>
                        {s}
                      </span>
                      <span className="text-white/35 text-xs">P{ep}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-3xl flex flex-col items-center justify-center text-center"
              style={{ background: 'white', boxShadow: '0 2px 20px rgba(12,31,61,0.06)', minHeight: 180 }}>
              <CalcIcon size={32} className="mb-3" style={{ color: 'rgba(12,31,61,0.15)' }} />
              <p className="font-semibold text-sm" style={{ color: 'rgba(12,31,61,0.4)' }}>
                Ingresa al menos un puntaje
              </p>
            </div>
          )}

          {/* Ponderaciones */}
          <div className="p-6 rounded-3xl"
            style={{ background: 'white', boxShadow: '0 2px 20px rgba(12,31,61,0.06)' }}>
            <div className="flex items-center gap-2 mb-4">
              <Target size={16} style={{ color: '#1d4ed8' }} />
              <h3 className="font-display text-base font-semibold" style={{ color: '#0c1f3d' }}>
                Puntaje ponderado por carrera
              </h3>
            </div>
            <div className="space-y-2">
              {sampleCareers.map((career, i) => {
                const allScores = nemNum ? { ...scoresObj, nem: nemNum } : scoresObj;
                const weighted = calcWeightedScore(allScores, career.ponderaciones);
                const hasEnough = Object.keys(career.ponderaciones).every(k => k === 'nem' ? nemNum !== null : scoresObj[k] !== undefined);
                return (
                  <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                    style={{ background: '#f8faff', border: '1px solid rgba(12,31,61,0.05)' }}>
                    <span className="text-xs flex-1" style={{ color: '#0c1f3d' }}>{career.name}</span>
                    <span className="font-semibold text-sm"
                      style={{ color: hasEnough ? '#1d4ed8' : 'rgba(12,31,61,0.25)' }}>
                      {hasEnough ? weighted : '—'}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="text-xs mt-3" style={{ color: 'rgba(12,31,61,0.35)' }}>
              * Basado en ponderaciones reales PAES 2024. Para ver más carreras usa el buscador de universidades.
            </p>
          </div>

          {/* CTA universities */}
          <button onClick={() => onNavigate('universities')}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm text-white transition-all hover:scale-[1.02]"
            style={{ background: 'linear-gradient(135deg, #0c1f3d, #1d4ed8)' }}>
            <TrendingUp size={15} />
            Ver universidades y carreras disponibles
          </button>
        </div>
      </div>

      {/* Score scale reference */}
      <div className="p-6 rounded-3xl fade-up delay-4"
        style={{ background: 'white', boxShadow: '0 2px 20px rgba(12,31,61,0.06)' }}>
        <div className="flex items-center gap-2 mb-4">
          <Info size={15} style={{ color: 'rgba(12,31,61,0.4)' }} />
          <h3 className="font-semibold text-sm" style={{ color: '#0c1f3d' }}>Escala de puntajes PAES</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { range: '850 – 1000', label: 'Excelente', sub: 'Top 5% nacional', color: '#10b981', bg: 'rgba(16,185,129,0.08)' },
            { range: '700 – 849', label: 'Muy bueno', sub: 'Top 25% nacional', color: '#1d4ed8', bg: 'rgba(29,78,216,0.06)' },
            { range: '550 – 699', label: 'Promedio', sub: '30-65% nacional', color: '#f59e0b', bg: 'rgba(245,158,11,0.07)' },
            { range: '100 – 549', label: 'A mejorar', sub: 'Bajo el promedio', color: '#ef4444', bg: 'rgba(239,68,68,0.06)' },
          ].map(({ range, label, sub, color, bg }) => (
            <div key={label} className="p-3 rounded-2xl text-center"
              style={{ background: bg, border: `1px solid ${color}20` }}>
              <p className="font-display font-bold text-sm" style={{ color }}>{range}</p>
              <p className="font-semibold text-xs mt-0.5" style={{ color }}>{label}</p>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(12,31,61,0.4)' }}>{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
