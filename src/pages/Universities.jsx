import { useState } from 'react';
import { Search, CheckCircle, XCircle, ChevronDown, ChevronUp, TrendingUp, Info } from 'lucide-react';
import { exams, universities, calcWeightedScore } from '../data/mockData';

// ── Calculadora PAES ───────────────────────────────────────────────
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
  if (pct >= 99) return { label: 'Top 1%',           color: '#10b981' };
  if (pct >= 95) return { label: 'Top 5%',           color: '#10b981' };
  if (pct >= 90) return { label: 'Top 10%',          color: '#1d4ed8' };
  if (pct >= 75) return { label: 'Top 25%',          color: '#1d4ed8' };
  if (pct >= 50) return { label: 'Sobre el promedio', color: '#f59e0b' };
  return               { label: 'Bajo el promedio',  color: '#ef4444' };
};

export default function Universities() {
  const [scores,   setScores]   = useState({ nem: '', lectora: '', m1: '', m2: '', historia: '', ciencias: '' });
  const [search,   setSearch]   = useState('');
  const [expanded, setExpanded] = useState({});

  const setScore = (id, val) => {
    const n = val === '' ? '' : Math.min(1000, Math.max(100, parseInt(val) || 100));
    setScores(prev => ({ ...prev, [id]: n === '' ? '' : n }));
  };

  // Puntajes numéricos válidos
  const scoresObj = Object.fromEntries(
    Object.entries(scores).filter(([, v]) => v !== '' && !isNaN(Number(v))).map(([k, v]) => [k, Number(v)])
  );
  const hasScores = Object.keys(scoresObj).length > 0;

  // Cálculo de promedio y percentil (solo pruebas PAES, sin NEM)
  const paesScores = exams.map(e => scoresObj[e.id]).filter(v => v !== undefined);
  const avgScore   = paesScores.length > 0 ? Math.round(paesScores.reduce((a, b) => a + b, 0) / paesScores.length) : null;
  const pctile     = avgScore ? scoreToPercentile(avgScore) : null;
  const rank       = pctile  ? percentileLabel(pctile)     : null;

  const matchCareer = (career) => {
    const ponds  = career.ponderaciones;
    const needed = Object.keys(ponds);
    const hasAll = needed.every(k => scoresObj[k] !== undefined);
    if (!hasAll) return { weighted: null, qualifies: null, missing: needed.filter(k => scoresObj[k] === undefined) };
    const weighted = calcWeightedScore(scoresObj, ponds);
    return { weighted, qualifies: weighted >= career.cutoff, missing: [] };
  };

  const filteredUniversities = universities.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.careers.some(c => c.name.toLowerCase().includes(search.toLowerCase()))
  );

  const toggleExpand = (uniId) => setExpanded(prev => ({ ...prev, [uniId]: !prev[uniId] }));

  return (
    <div className="px-8 py-8 space-y-8">
      <div className="fade-up delay-1">
        <h1 className="font-display text-3xl font-light" style={{ color: '#0c1f3d' }}>
          Universidades <em>y Calculadora</em>
        </h1>
        <p className="text-sm mt-1" style={{ color: 'rgba(12,31,61,0.45)' }}>
          Ingresa tus puntajes, calcula tu percentil y descubre a qué carreras puedes postular
        </p>
      </div>

      {/* ── Puntajes + resultado en una fila ── */}
      <div className="grid lg:grid-cols-3 gap-6 fade-up delay-2">

        {/* Inputs (2/3) */}
        <div className="lg:col-span-2 p-6 rounded-3xl"
          style={{ background: 'white', boxShadow: '0 2px 20px rgba(12,31,61,0.06)' }}>
          <h2 className="font-display text-base font-semibold mb-4" style={{ color: '#0c1f3d' }}>
            Ingresa tus puntajes
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'rgba(12,31,61,0.5)' }}>NEM</label>
              <input type="number" min="100" max="1000"
                value={scores.nem} onChange={e => setScore('nem', e.target.value)}
                placeholder="ej. 650"
                className="w-full px-3 py-2.5 rounded-xl text-sm font-medium outline-none"
                style={{ background: '#f8faff', border: '1.5px solid rgba(12,31,61,0.1)', color: '#0c1f3d' }} />
            </div>
            {exams.map(exam => (
              <div key={exam.id}>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'rgba(12,31,61,0.5)' }}>
                  {exam.icon} {exam.code}
                </label>
                <input type="number" min="100" max="1000"
                  value={scores[exam.id]} onChange={e => setScore(exam.id, e.target.value)}
                  placeholder="100–1000"
                  className="w-full px-3 py-2.5 rounded-xl text-sm font-medium outline-none"
                  style={{ background: exam.bg, border: `1.5px solid ${exam.color}25`, color: '#0c1f3d' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Resultado percentil (1/3) */}
        {avgScore ? (
          <div className="p-6 rounded-3xl flex flex-col items-center justify-center text-center"
            style={{ background: 'linear-gradient(160deg, #0c1f3d, #1d4ed8)', boxShadow: '0 8px 32px rgba(12,31,61,0.2)' }}>
            <p className="text-white/50 text-xs mb-1">Puntaje promedio PAES</p>
            <p className="font-display text-5xl font-bold mb-2" style={{ color: '#93c5fd' }}>{avgScore}</p>
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <span className="text-xs px-3 py-1.5 rounded-full font-semibold"
                style={{ background: `${rank.color}25`, color: rank.color, border: `1px solid ${rank.color}40` }}>
                {rank.label}
              </span>
              <span className="text-white/40 text-xs">Percentil {pctile}</span>
            </div>
            {/* Per-exam */}
            <div className="mt-4 w-full space-y-1.5">
              {exams.filter(e => scores[e.id] !== '' && !isNaN(Number(scores[e.id]))).map(exam => {
                const s  = Number(scores[exam.id]);
                const ep = scoreToPercentile(s);
                return (
                  <div key={exam.id} className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.07)' }}>
                    <span className="text-sm">{exam.icon}</span>
                    <span className="text-white/60 text-xs flex-1 text-left">{exam.code}</span>
                    <span className="font-semibold text-sm" style={{ color: '#bfdbfe' }}>{s}</span>
                    <span className="text-white/35 text-xs">P{ep}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-3xl flex flex-col items-center justify-center text-center"
            style={{ background: 'white', boxShadow: '0 2px 20px rgba(12,31,61,0.06)' }}>
            <TrendingUp size={32} className="mb-3" style={{ color: 'rgba(12,31,61,0.12)' }} />
            <p className="font-semibold text-sm" style={{ color: 'rgba(12,31,61,0.4)' }}>
              Ingresa tus puntajes
            </p>
            <p className="text-xs mt-1" style={{ color: 'rgba(12,31,61,0.3)' }}>
              para ver tu percentil nacional
            </p>
          </div>
        )}
      </div>

      {/* ── Escala de puntajes ── */}
      <div className="p-5 rounded-2xl fade-up delay-3"
        style={{ background: 'white', boxShadow: '0 2px 12px rgba(12,31,61,0.05)' }}>
        <div className="flex items-center gap-2 mb-3">
          <Info size={13} style={{ color: 'rgba(12,31,61,0.35)' }} />
          <p className="text-xs font-semibold" style={{ color: 'rgba(12,31,61,0.5)' }}>Escala de puntajes PAES</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { range: '850–1000', label: 'Excelente',  sub: 'Top 5% nacional',   color: '#10b981', bg: 'rgba(16,185,129,0.08)'  },
            { range: '700–849',  label: 'Muy bueno',  sub: 'Top 25% nacional',  color: '#1d4ed8', bg: 'rgba(29,78,216,0.06)'   },
            { range: '550–699',  label: 'Promedio',   sub: '30–65% nacional',   color: '#f59e0b', bg: 'rgba(245,158,11,0.07)'  },
            { range: '100–549',  label: 'A mejorar',  sub: 'Bajo el promedio',  color: '#ef4444', bg: 'rgba(239,68,68,0.06)'   },
          ].map(({ range, label, sub, color, bg }) => (
            <div key={label} className="p-3 rounded-xl text-center"
              style={{ background: bg, border: `1px solid ${color}20` }}>
              <p className="font-bold text-xs" style={{ color }}>{range}</p>
              <p className="font-semibold text-xs mt-0.5" style={{ color }}>{label}</p>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(12,31,61,0.4)' }}>{sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Buscador universidades ── */}
      <div className="relative fade-up delay-3">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'rgba(12,31,61,0.3)' }} />
        <input
          type="text"
          placeholder="Buscar universidad o carrera..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-2xl text-sm outline-none"
          style={{ background: 'white', border: '1.5px solid rgba(12,31,61,0.08)', color: '#0c1f3d', boxShadow: '0 2px 12px rgba(12,31,61,0.04)' }}
        />
      </div>

      {/* ── Lista de universidades ── */}
      <div className="space-y-4 fade-up delay-4">
        {filteredUniversities.map(uni => {
          const isExpanded    = expanded[uni.id];
          const careerResults = uni.careers.map(c => ({ ...c, ...matchCareer(c) }));
          const qualified     = hasScores ? careerResults.filter(c => c.qualifies === true).length : null;

          return (
            <div key={uni.id} className="rounded-3xl overflow-hidden"
              style={{ background: 'white', boxShadow: '0 2px 20px rgba(12,31,61,0.06)' }}>
              <button
                onClick={() => toggleExpand(uni.id)}
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-gray-50/50 transition-colors">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: `${uni.color}15`, border: `2px solid ${uni.color}30` }}>
                  {uni.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-semibold" style={{ color: '#0c1f3d' }}>{uni.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(12,31,61,0.45)' }}>
                    {uni.abbr} · {uni.careers.length} carreras
                    {qualified !== null && (
                      <span className="ml-2 font-semibold" style={{ color: qualified > 0 ? '#10b981' : '#ef4444' }}>
                        · {qualified} elegibles
                      </span>
                    )}
                  </p>
                </div>
                {isExpanded
                  ? <ChevronUp   size={16} style={{ color: 'rgba(12,31,61,0.3)', flexShrink: 0 }} />
                  : <ChevronDown size={16} style={{ color: 'rgba(12,31,61,0.3)', flexShrink: 0 }} />}
              </button>

              {isExpanded && (
                <div className="border-t" style={{ borderColor: 'rgba(12,31,61,0.06)' }}>
                  {careerResults.map((career, i) => {
                    const { weighted, qualifies, missing } = career;
                    return (
                      <div key={i} className="flex items-start gap-4 px-5 py-4 border-b last:border-0"
                        style={{ borderColor: 'rgba(12,31,61,0.04)' }}>
                        <div className="flex-shrink-0 mt-0.5">
                          {qualifies === true  && <CheckCircle size={16} style={{ color: '#10b981' }} />}
                          {qualifies === false && <XCircle     size={16} style={{ color: '#ef4444' }} />}
                          {qualifies === null  && <div className="w-4 h-4 rounded-full border-2 flex-shrink-0" style={{ borderColor: 'rgba(12,31,61,0.15)' }} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm" style={{ color: '#0c1f3d' }}>{career.name}</p>
                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {Object.entries(career.ponderaciones).map(([key, val]) => {
                              const exam  = exams.find(e => e.id === key);
                              const label = key === 'nem' ? 'NEM' : (exam?.code || key.toUpperCase());
                              const color = key === 'nem' ? '#6b7280' : (exam?.color || '#6b7280');
                              return (
                                <span key={key} className="text-xs px-2 py-0.5 rounded-lg font-medium"
                                  style={{ background: `${color}12`, color, border: `1px solid ${color}25` }}>
                                  {label} {Math.round(val * 100)}%
                                </span>
                              );
                            })}
                          </div>
                          {missing.length > 0 && (
                            <p className="text-xs mt-1" style={{ color: 'rgba(12,31,61,0.4)' }}>
                              Falta ingresar: {missing.map(m => m === 'nem' ? 'NEM' : m.toUpperCase()).join(', ')}
                            </p>
                          )}
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-bold text-sm"
                            style={{ color: weighted && qualifies ? '#10b981' : weighted ? '#ef4444' : 'rgba(12,31,61,0.3)' }}>
                            {weighted ?? '—'}
                          </p>
                          <p className="text-xs mt-0.5" style={{ color: 'rgba(12,31,61,0.35)' }}>Corte {career.cutoff}</p>
                          <p className="text-xs"          style={{ color: 'rgba(12,31,61,0.35)' }}>{career.vacantes} vacantes</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
