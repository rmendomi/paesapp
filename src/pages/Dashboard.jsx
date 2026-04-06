import { ArrowRight, TrendingUp, Target, Zap, Calendar, Flame, Trophy } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { exams, getExam } from '../data/mockData';

export default function Dashboard({ onNavigate }) {
  const { user, streak, progressStats, recentActivity } = useAuth();

  const today = new Date();
  const hour  = today.getHours();
  const greeting = hour < 12 ? 'Buenos días' : hour < 19 ? 'Buenas tardes' : 'Buenas noches';
  const firstName = user?.name?.split(' ')[0] || 'Estudiante';

  const validScores  = Object.values(progressStats).filter(p => p.lastScore > 0);
  const overallScore = validScores.length > 0
    ? Math.round(validScores.reduce((s, p) => s + p.lastScore, 0) / validScores.length)
    : null;

  const targetScore = user?.targetScore || 700;
  const targets     = user?.targets || {};

  return (
    <div className="px-8 py-8 space-y-8">

      {/* Bienvenida */}
      <div className="fade-up delay-1">
        <p className="text-sm mb-1" style={{ color: 'rgba(12,31,61,0.45)' }}>
          {greeting}, {firstName} 👋
        </p>
        <h1 className="font-display text-3xl font-light" style={{ color: '#0c1f3d' }}>
          Tu panel de <em>preparación PAES</em>
        </h1>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 fade-up delay-2">
        {[
          {
            label: 'Puntaje estimado',
            value: overallScore ? `${overallScore}` : '—',
            sub:   overallScore ? 'promedio todas las pruebas' : 'practica para ver tu puntaje',
            icon:  Target, color: '#1d4ed8', bg: '#eff6ff',
          },
          {
            label: 'Meta personal',
            value: `${targetScore}`,
            sub:   'puntos objetivo',
            icon:  Zap, color: '#f59e0b', bg: '#fffbeb',
          },
          {
            label: 'Racha actual',
            value: `${streak.current}`,
            sub:   `Mejor: ${streak.best} días`,
            icon:  Flame,
            color: streak.current > 0 ? '#f97316' : 'rgba(12,31,61,0.3)',
            bg:    streak.current > 0 ? '#fff7ed' : '#f8faff',
          },
          {
            label: 'Días estudiados',
            value: `${streak.totalDays}`,
            sub:   'días totales activos',
            icon:  Trophy, color: '#15803d', bg: '#f0fdf4',
          },
        ].map(({ label, value, sub, icon: Icon, color, bg }) => (
          <div key={label} className="p-5 rounded-3xl card-lift"
            style={{ background: 'white', boxShadow: '0 2px 20px rgba(12,31,61,0.06)' }}>
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs font-semibold" style={{ color: 'rgba(12,31,61,0.45)' }}>{label}</p>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
                <Icon size={15} style={{ color }} />
              </div>
            </div>
            <p className="font-display text-3xl font-semibold" style={{ color: '#0c1f3d' }}>{value}</p>
            <p className="text-xs mt-1" style={{ color: 'rgba(12,31,61,0.4)' }}>{sub}</p>
          </div>
        ))}
      </div>

      {/* Banner de racha */}
      {streak.current === 0 && (
        <div className="p-4 rounded-2xl flex items-center gap-4 fade-up delay-2"
          style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)' }}>
          <Flame size={20} style={{ color: '#f97316', flexShrink: 0 }} />
          <div className="flex-1">
            <p className="text-sm font-semibold" style={{ color: '#c2410c' }}>¡Comienza tu racha hoy!</p>
            <p className="text-xs" style={{ color: 'rgba(194,65,12,0.7)' }}>Practica cualquier prueba para activar tu racha diaria</p>
          </div>
          <button
            onClick={() => onNavigate('exams')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white flex-shrink-0"
            style={{ background: '#f97316' }}
          >
            Practicar <ArrowRight size={12} />
          </button>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Progreso por prueba */}
        <div className="lg:col-span-2 p-6 rounded-3xl fade-up delay-3"
          style={{ background: 'white', boxShadow: '0 2px 20px rgba(12,31,61,0.06)' }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-lg font-semibold" style={{ color: '#0c1f3d' }}>Progreso por prueba</h2>
            <button
              onClick={() => onNavigate('progress')}
              className="text-xs font-semibold flex items-center gap-1"
              style={{ color: '#1d4ed8' }}
            >
              Ver detalle <ArrowRight size={11} />
            </button>
          </div>
          <div className="space-y-4">
            {exams.map(exam => {
              const stats  = progressStats[exam.id] || { lastScore: 0 };
              const target = targets[exam.id] || 700;
              const pct    = stats.lastScore > 0 ? Math.round((stats.lastScore - 100) / 9) : 0;
              return (
                <div key={exam.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{exam.icon}</span>
                      <span className="text-sm font-medium" style={{ color: '#0c1f3d' }}>{exam.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs" style={{ color: 'rgba(12,31,61,0.4)' }}>Meta {target}</span>
                      <span className="text-sm font-semibold" style={{ color: stats.lastScore > 0 ? exam.color : 'rgba(12,31,61,0.3)' }}>
                        {stats.lastScore > 0 ? `${stats.lastScore} pts` : 'Sin datos'}
                      </span>
                    </div>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: '#eff6ff' }}>
                    <div
                      className="h-2 rounded-full progress-bar"
                      style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${exam.color}99, ${exam.color})` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Práctica rápida */}
        <div className="p-6 rounded-3xl fade-up delay-4"
          style={{ background: 'linear-gradient(160deg, #0c1f3d, #1d4ed8)', boxShadow: '0 4px 30px rgba(12,31,61,0.25)' }}>
          <h2 className="font-display text-xl font-semibold text-white mb-1">¿Practicamos?</h2>
          <p className="text-white/50 text-sm mb-6">Elige una prueba y empieza ahora</p>
          <div className="space-y-2">
            {exams.map(exam => (
              <button
                key={exam.id}
                onClick={() => onNavigate('exams')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all hover:bg-white/15 group"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <span className="text-lg">{exam.icon}</span>
                <span className="text-sm text-white/80 font-medium flex-1">{exam.name}</span>
                <ArrowRight size={13} className="text-white/30 group-hover:text-white/70 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Accesos rápidos */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 fade-up delay-5">
        {[
          { label: 'Calculadora',  sub: 'Puntajes y ranking',    icon: '🧮', view: 'calculator',   color: '#1d4ed8', bg: '#eff6ff' },
          { label: 'Universidades', sub: 'Ver carreras',          icon: '🎓', view: 'universities', color: '#7c3aed', bg: '#f5f3ff' },
          { label: 'Planificador', sub: 'Semana de estudio',      icon: '📅', view: 'planner',      color: '#0891b2', bg: '#ecfeff' },
          { label: 'Ranking',      sub: `Racha: ${streak.current} días 🔥`, icon: '🏆', view: 'leaderboard', color: '#f59e0b', bg: '#fffbeb' },
        ].map(({ label, sub, icon, view, color, bg }) => (
          <button
            key={view}
            onClick={() => onNavigate(view)}
            className="p-4 rounded-2xl text-left transition-all hover:scale-[1.02]"
            style={{ background: 'white', boxShadow: '0 2px 12px rgba(12,31,61,0.06)', border: '1px solid rgba(12,31,61,0.04)' }}
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg mb-3" style={{ background: bg }}>
              {icon}
            </div>
            <p className="font-semibold text-sm" style={{ color: '#0c1f3d' }}>{label}</p>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(12,31,61,0.4)' }}>{sub}</p>
          </button>
        ))}
      </div>

      {/* Actividad reciente */}
      <div className="p-6 rounded-3xl fade-up delay-6"
        style={{ background: 'white', boxShadow: '0 2px 20px rgba(12,31,61,0.06)' }}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-lg font-semibold" style={{ color: '#0c1f3d' }}>Actividad reciente</h2>
        </div>
        {recentActivity.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-3xl mb-2">📚</p>
            <p className="text-sm font-medium" style={{ color: '#0c1f3d' }}>Aún no hay actividad</p>
            <p className="text-xs mt-1" style={{ color: 'rgba(12,31,61,0.4)' }}>
              Completa tu primera práctica para ver el historial aquí.
            </p>
            <button
              onClick={() => onNavigate('exams')}
              className="mt-4 px-5 py-2 rounded-xl text-sm font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #0c1f3d, #1d4ed8)' }}
            >
              Empezar a practicar
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {recentActivity.map((a, i) => {
              const exam = getExam(a.examId);
              const pct  = a.total > 0 ? Math.round((a.correct / a.total) * 100) : 0;
              const dateStr = a.date
                ? new Date(a.date).toLocaleDateString('es-CL', { day: 'numeric', month: 'short' })
                : '—';
              return (
                <div
                  key={i}
                  className="flex items-center gap-4 py-2 border-b last:border-0"
                  style={{ borderColor: 'rgba(12,31,61,0.05)' }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                    style={{ background: exam.bg }}
                  >
                    {exam.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: '#0c1f3d' }}>{exam.name}</p>
                    <p className="text-xs" style={{ color: 'rgba(12,31,61,0.4)' }}>{dateStr}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-semibold" style={{ color: exam.color }}>{a.score} pts</p>
                    <p className="text-xs" style={{ color: 'rgba(12,31,61,0.4)' }}>{a.correct}/{a.total} ✓</p>
                  </div>
                  <div className="w-12 h-2 rounded-full flex-shrink-0" style={{ background: '#eff6ff' }}>
                    <div className="h-2 rounded-full" style={{ width: `${pct}%`, background: exam.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
