import { TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { exams } from '../data/mockData';

function MiniChart({ trend, color }) {
  if (!trend || trend.length < 2) {
    return (
      <div className="w-full flex items-center justify-center" style={{ height: 40 }}>
        <span className="text-xs" style={{ color: 'rgba(12,31,61,0.3)' }}>Sin datos suficientes</span>
      </div>
    );
  }
  const max   = Math.max(...trend);
  const min   = Math.min(...trend);
  const range = max - min || 1;
  const w = 100, h = 40;
  const pts = trend.map((v, i) => {
    const x = (i / (trend.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 6) - 3;
    return `${x},${y}`;
  });
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height: 40 }}>
      <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {trend.map((v, i) => {
        const x = (i / (trend.length - 1)) * w;
        const y = h - ((v - min) / range) * (h - 6) - 3;
        return <circle key={i} cx={x} cy={y} r={i === trend.length - 1 ? 3 : 2} fill={color} />;
      })}
    </svg>
  );
}

export default function Progress() {
  const { progressStats, user } = useAuth();
  const targets = user?.targets || {};

  const totalAttempts = Object.values(progressStats).reduce((s, p) => s + p.attempted, 0);
  const totalCorrect  = Object.values(progressStats).reduce((s, p) => s + p.correct,   0);
  const validScores   = Object.values(progressStats).filter(p => p.lastScore > 0);
  const avgScore      = validScores.length > 0
    ? Math.round(validScores.reduce((s, p) => s + p.lastScore, 0) / validScores.length)
    : 0;

  const globalAccuracy = totalAttempts > 0
    ? Math.round((totalCorrect / (totalAttempts * 10)) * 100)
    : 0;

  // Insights dinámicos
  const bestExam = validScores.length > 0
    ? exams.reduce((best, exam) =>
        (progressStats[exam.id]?.lastScore || 0) > (progressStats[best.id]?.lastScore || 0) ? exam : best
      , exams[0])
    : null;

  const weakestExam = validScores.length > 0
    ? exams.reduce((worst, exam) => {
        const diff  = (progressStats[exam.id]?.lastScore || 0) - (targets[exam.id] || 700);
        const wDiff = (progressStats[worst.id]?.lastScore || 0) - (targets[worst.id] || 700);
        return diff < wDiff ? exam : worst;
      }, exams[0])
    : null;

  const allTrends   = Object.values(progressStats).flatMap(p => p.trend || []);
  const improvement = allTrends.length >= 2
    ? Math.round(allTrends[allTrends.length - 1] - allTrends[0])
    : null;

  return (
    <div className="px-8 py-8 space-y-8">
      <div className="fade-up delay-1">
        <h1 className="font-display text-3xl font-light" style={{ color: '#0c1f3d' }}>
          Mi <em>progreso</em>
        </h1>
        <p className="text-sm mt-1" style={{ color: 'rgba(12,31,61,0.45)' }}>
          Evolución de tu rendimiento por prueba
        </p>
      </div>

      {/* Resumen global */}
      <div className="grid grid-cols-3 gap-4 fade-up delay-2">
        {[
          { label: 'Sesiones totales', value: totalAttempts > 0 ? totalAttempts   : '—', icon: '📅', color: '#1d4ed8' },
          { label: 'Prom. general',    value: avgScore > 0       ? `${avgScore} pts` : '—', icon: '🎯', color: '#f59e0b' },
          { label: '% Acierto global', value: totalAttempts > 0  ? `${globalAccuracy}%` : '—', icon: '✅', color: '#10b981' },
        ].map(({ label, value, icon, color }) => (
          <div key={label} className="p-5 rounded-3xl text-center card-lift"
            style={{ background: 'white', boxShadow: '0 2px 20px rgba(12,31,61,0.06)' }}>
            <div className="text-2xl mb-2">{icon}</div>
            <p className="font-display text-2xl font-semibold" style={{ color }}>{value}</p>
            <p className="text-xs mt-1" style={{ color: 'rgba(12,31,61,0.4)' }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Sin datos */}
      {totalAttempts === 0 && (
        <div className="p-8 rounded-3xl text-center fade-up delay-2"
          style={{ background: 'white', boxShadow: '0 2px 20px rgba(12,31,61,0.06)' }}>
          <p className="text-4xl mb-3">📊</p>
          <p className="font-display text-xl font-semibold mb-1" style={{ color: '#0c1f3d' }}>Aún no tienes sesiones</p>
          <p className="text-sm" style={{ color: 'rgba(12,31,61,0.45)' }}>
            Completa prácticas y ensayos para ver tu evolución aquí.
          </p>
        </div>
      )}

      {/* Evolución por prueba */}
      {totalAttempts > 0 && (
        <div className="space-y-4 fade-up delay-3">
          <h2 className="font-display text-xl font-semibold" style={{ color: '#0c1f3d' }}>Evolución por prueba</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {exams.map(exam => {
              const stats  = progressStats[exam.id] || { attempted: 0, correct: 0, lastScore: 0, trend: [] };
              const target = targets[exam.id] || 700;
              const last   = stats.lastScore;
              const first  = stats.trend?.[0] || 0;
              const diff   = last - target;
              const gained = last - first;
              const hasData = last > 0;

              return (
                <div key={exam.id} className="p-6 rounded-3xl card-lift"
                  style={{ background: 'white', boxShadow: '0 2px 20px rgba(12,31,61,0.06)' }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{exam.icon}</span>
                      <div>
                        <p className="font-semibold text-sm" style={{ color: '#0c1f3d' }}>{exam.name}</p>
                        <p className="text-xs" style={{ color: 'rgba(12,31,61,0.4)' }}>
                          {stats.attempted} sesión{stats.attempted !== 1 ? 'es' : ''}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      {hasData ? (
                        <>
                          <p className="font-display text-xl font-semibold" style={{ color: exam.color }}>{last} pts</p>
                          <p className="text-xs" style={{ color: diff >= 0 ? '#10b981' : '#ef4444' }}>
                            {diff >= 0 ? `✓ +${diff} sobre meta` : `${diff} para meta`}
                          </p>
                        </>
                      ) : (
                        <p className="text-sm" style={{ color: 'rgba(12,31,61,0.3)' }}>Sin datos</p>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <MiniChart trend={stats.trend} color={exam.color} />
                  </div>

                  {hasData && (
                    <>
                      <div className="flex justify-between text-xs" style={{ color: 'rgba(12,31,61,0.4)' }}>
                        <span>Inicio: {first} pts</span>
                        <span className="font-semibold" style={{ color: gained > 0 ? '#10b981' : gained < 0 ? '#ef4444' : 'rgba(12,31,61,0.4)' }}>
                          {gained > 0 ? `+${gained}` : gained} pts
                        </span>
                        <span>Actual: {last} pts</span>
                      </div>
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1" style={{ color: 'rgba(12,31,61,0.4)' }}>
                          <span>Meta: {target} pts</span>
                          <span>{Math.min(100, Math.round((last / target) * 100))}%</span>
                        </div>
                        <div className="h-1.5 rounded-full" style={{ background: '#eff6ff' }}>
                          <div className="h-1.5 rounded-full progress-bar"
                            style={{ width: `${Math.min(100, Math.round((last / target) * 100))}%`, background: exam.color }} />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Análisis */}
      {totalAttempts > 0 && (
        <div className="p-6 rounded-3xl fade-up delay-4"
          style={{ background: 'linear-gradient(135deg, #0c1f3d, #1d4ed8)' }}>
          <div className="flex items-start gap-3 mb-4">
            <TrendingUp size={20} style={{ color: '#93c5fd' }} />
            <h3 className="font-display text-lg font-semibold text-white">Análisis de tu rendimiento</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: '💪',
                title: 'Fortaleza',
                desc: bestExam
                  ? `${bestExam.name} es tu prueba más fuerte con ${progressStats[bestExam.id]?.lastScore || 0} pts. Mantén la práctica.`
                  : 'Practica más para identificar tu prueba más fuerte.',
              },
              {
                icon: '⚠️',
                title: 'A mejorar',
                desc: weakestExam
                  ? `${weakestExam.name} está más lejos de tu meta. Practica más esta prueba.`
                  : 'Sigue practicando para identificar áreas de mejora.',
              },
              {
                icon: '📈',
                title: 'Tendencia',
                desc: improvement !== null
                  ? improvement > 0
                    ? `Tu puntaje promedio ha subido +${improvement} pts desde tu primera sesión.`
                    : improvement < 0
                      ? `Tu puntaje bajó ${improvement} pts. Sigue practicando con constancia.`
                      : 'Tu puntaje se mantiene estable. ¡Sigue así!'
                  : 'Completa más sesiones para ver tu tendencia.',
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="p-4 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <p className="text-lg mb-2">{icon}</p>
                <p className="text-white text-sm font-semibold mb-1">{title}</p>
                <p className="text-white/55 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
