import { useState } from 'react';
import { Search, CheckCircle, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { exams, universities, calcWeightedScore } from '../data/mockData';

export default function Universities({ onNavigate }) {
  const [scores, setScores] = useState({ nem: '', lectora: '', m1: '', m2: '', historia: '', ciencias: '' });
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState({});

  const setScore = (id, val) => {
    const n = val === '' ? '' : Math.min(1000, Math.max(100, parseInt(val) || 100));
    setScores(prev => ({ ...prev, [id]: n === '' ? '' : n }));
  };

  const scoresObj = Object.fromEntries(
    Object.entries(scores).filter(([, v]) => v !== '' && !isNaN(Number(v))).map(([k, v]) => [k, Number(v)])
  );
  const hasScores = Object.keys(scoresObj).length > 0;

  const matchCareer = (career) => {
    const ponds = career.ponderaciones;
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
          Universidades <em>y carreras</em>
        </h1>
        <p className="text-sm mt-1" style={{ color: 'rgba(12,31,61,0.45)' }}>
          Ingresa tus puntajes y descubre a qué carreras puedes postular
        </p>
      </div>

      {/* Score inputs */}
      <div className="p-6 rounded-3xl fade-up delay-2"
        style={{ background: 'white', boxShadow: '0 2px 20px rgba(12,31,61,0.06)' }}>
        <h2 className="font-display text-base font-semibold mb-4" style={{ color: '#0c1f3d' }}>
          Tus puntajes
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'rgba(12,31,61,0.5)' }}>
              NEM
            </label>
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

      {/* Search */}
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

      {/* Universities list */}
      <div className="space-y-4 fade-up delay-4">
        {filteredUniversities.map(uni => {
          const isExpanded = expanded[uni.id];
          const careerResults = uni.careers.map(c => ({ ...c, ...matchCareer(c) }));
          const qualified = hasScores ? careerResults.filter(c => c.qualifies === true).length : null;

          return (
            <div key={uni.id} className="rounded-3xl overflow-hidden"
              style={{ background: 'white', boxShadow: '0 2px 20px rgba(12,31,61,0.06)' }}>
              {/* University header */}
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
                  ? <ChevronUp size={16} style={{ color: 'rgba(12,31,61,0.3)', flexShrink: 0 }} />
                  : <ChevronDown size={16} style={{ color: 'rgba(12,31,61,0.3)', flexShrink: 0 }} />}
              </button>

              {/* Careers */}
              {isExpanded && (
                <div className="border-t" style={{ borderColor: 'rgba(12,31,61,0.06)' }}>
                  {careerResults.map((career, i) => {
                    const { weighted, qualifies, missing } = career;
                    return (
                      <div key={i}
                        className="flex items-start gap-4 px-5 py-4 border-b last:border-0"
                        style={{ borderColor: 'rgba(12,31,61,0.04)' }}>
                        <div className="flex-shrink-0 mt-0.5">
                          {qualifies === true && <CheckCircle size={16} style={{ color: '#10b981' }} />}
                          {qualifies === false && <XCircle size={16} style={{ color: '#ef4444' }} />}
                          {qualifies === null && (
                            <div className="w-4 h-4 rounded-full border-2 flex-shrink-0"
                              style={{ borderColor: 'rgba(12,31,61,0.15)' }} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm" style={{ color: '#0c1f3d' }}>{career.name}</p>
                          {/* Ponderaciones */}
                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {Object.entries(career.ponderaciones).map(([key, val]) => {
                              const exam = exams.find(e => e.id === key);
                              const label = key === 'nem' ? 'NEM' : exam?.code || key.toUpperCase();
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
                          <p className="font-bold text-sm" style={{ color: weighted && qualifies ? '#10b981' : weighted ? '#ef4444' : 'rgba(12,31,61,0.3)' }}>
                            {weighted ?? '—'}
                          </p>
                          <p className="text-xs mt-0.5" style={{ color: 'rgba(12,31,61,0.35)' }}>
                            Corte {career.cutoff}
                          </p>
                          <p className="text-xs" style={{ color: 'rgba(12,31,61,0.35)' }}>
                            {career.vacantes} vacantes
                          </p>
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
