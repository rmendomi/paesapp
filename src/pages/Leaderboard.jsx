import { useEffect } from 'react';
import { Flame, Trophy, Zap, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Asignar badge según rendimiento
function getBadge(streak, avgScore) {
  if (avgScore >= 900) return '🏆';
  if (avgScore >= 800) return '⭐';
  if (streak >= 14)   return '⭐';
  if (streak >= 7)    return '🔥';
  return '📘';
}

// Construir grid de actividad (28 días)
function buildActivityGrid(history) {
  const grid  = [];
  const today = new Date();
  for (let i = 27; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    grid.push({ date: key, active: !!(history || {})[key] });
  }
  return grid;
}

export default function Leaderboard() {
  const { user, streak, leaderboard, fetchLeaderboard } = useAuth();

  useEffect(() => {
    fetchLeaderboard();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const grid = buildActivityGrid(streak.history);

  // Encontrar al usuario actual en el ranking o crear su entrada
  const userEntry = leaderboard.find(e => e.email === user?.email);
  const USER_RANK = userEntry?.rank ?? (leaderboard.length + 1);
  const USER_AVG  = userEntry?.avgScore ?? 0;

  // Combinar lista con usuario (si no está ya incluido con datos reales)
  const allEntries = userEntry
    ? leaderboard
    : [
        ...leaderboard,
        {
          email:    user?.email || '',
          name:     user?.name  || 'Tú',
          school:   user?.school || '',
          avgScore: USER_AVG,
          streak:   streak.current,
          sessions: 0,
          xp:       0,
          rank:     USER_RANK,
          isUser:   true,
        },
      ].sort((a, b) => a.rank - b.rank);

  return (
    <div className="px-8 py-8 space-y-8">
      <div className="fade-up delay-1">
        <h1 className="font-display text-3xl font-light" style={{ color: '#0c1f3d' }}>
          Ranking <em>y rachas</em>
        </h1>
        <p className="text-sm mt-1" style={{ color: 'rgba(12,31,61,0.45)' }}>
          Compara tu progreso y mantén tu racha diaria
        </p>
      </div>

      {/* Hero de racha */}
      <div className="p-6 rounded-3xl fade-up delay-2"
        style={{ background: 'linear-gradient(160deg, #0c1f3d, #1d4ed8)', boxShadow: '0 8px 32px rgba(12,31,61,0.25)' }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-white/50 text-xs mb-1">Tu racha actual</p>
            <div className="flex items-center gap-3">
              <Flame size={32} style={{ color: streak.current > 0 ? '#f97316' : 'rgba(255,255,255,0.2)' }} />
              <p className="font-display text-5xl font-bold text-white">{streak.current}</p>
              <p className="text-white/50 text-sm">días</p>
            </div>
          </div>
          <div className="text-right space-y-1">
            <div>
              <p className="text-white/35 text-xs">Mejor racha</p>
              <p className="font-display text-2xl font-semibold" style={{ color: '#fbbf24' }}>{streak.best} 🏆</p>
            </div>
            <div>
              <p className="text-white/35 text-xs">Días totales</p>
              <p className="font-semibold text-white">{streak.totalDays}</p>
            </div>
          </div>
        </div>

        {/* Grid de actividad */}
        <div>
          <p className="text-white/35 text-xs mb-2">Últimas 4 semanas</p>
          <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(28, 1fr)' }}>
            {grid.map((cell, i) => (
              <div
                key={i}
                title={cell.date}
                className="rounded-sm aspect-square transition-all"
                style={{
                  background: cell.active ? '#60a5fa' : 'rgba(255,255,255,0.08)',
                  boxShadow:  cell.active ? '0 0 4px rgba(96,165,250,0.5)' : 'none',
                }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-white/25 text-xs">Hace 4 semanas</span>
            <span className="text-white/25 text-xs">Hoy</span>
          </div>
        </div>

        {streak.current === 0 && (
          <div className="mt-4 px-4 py-3 rounded-xl text-center"
            style={{ background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.3)' }}>
            <p className="text-sm font-semibold" style={{ color: '#fdba74' }}>
              🔥 Practica hoy para iniciar tu racha
            </p>
          </div>
        )}
        {streak.current > 0 && streak.current < 7 && (
          <div className="mt-4 px-4 py-3 rounded-xl text-center"
            style={{ background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.25)' }}>
            <p className="text-sm" style={{ color: '#fdba74' }}>
              ¡Sigue así! A {7 - streak.current} días de la insignia <strong>🔥 Semana de fuego</strong>
            </p>
          </div>
        )}
        {streak.current >= 7 && (
          <div className="mt-4 px-4 py-3 rounded-xl text-center"
            style={{ background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.3)' }}>
            <p className="text-sm font-semibold" style={{ color: '#fbbf24' }}>
              ⭐ ¡Increíble! {streak.current} días seguidos — eres imparable
            </p>
          </div>
        )}
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-3 gap-4 fade-up delay-3">
        {[
          { label: 'Tu XP',        value: userEntry ? `${userEntry.xp.toLocaleString()}` : '0', icon: Zap,        color: '#f59e0b', bg: '#fffbeb' },
          { label: 'Tu posición',  value: `#${USER_RANK}`,                                        icon: Trophy,     color: '#1d4ed8', bg: '#eff6ff' },
          { label: 'Puntaje prom.', value: USER_AVG > 0 ? `${USER_AVG}` : '—',                   icon: TrendingUp, color: '#10b981', bg: '#f0fdf4' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="p-4 rounded-2xl text-center"
            style={{ background: 'white', boxShadow: '0 2px 12px rgba(12,31,61,0.06)' }}>
            <div className="w-9 h-9 rounded-xl mx-auto mb-2 flex items-center justify-center" style={{ background: bg }}>
              <Icon size={16} style={{ color }} />
            </div>
            <p className="font-display text-2xl font-bold" style={{ color: '#0c1f3d' }}>{value}</p>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(12,31,61,0.4)' }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Tabla de ranking */}
      <div className="rounded-3xl overflow-hidden fade-up delay-4"
        style={{ background: 'white', boxShadow: '0 2px 20px rgba(12,31,61,0.06)' }}>
        <div className="px-6 py-5 border-b" style={{ borderColor: 'rgba(12,31,61,0.06)' }}>
          <h2 className="font-display text-lg font-semibold" style={{ color: '#0c1f3d' }}>
            Top estudiantes PAES Prep
          </h2>
        </div>
        {allEntries.length === 0 ? (
          <div className="px-6 py-10 text-center">
            <p className="text-3xl mb-2">🏆</p>
            <p className="text-sm" style={{ color: 'rgba(12,31,61,0.45)' }}>
              El ranking se llena a medida que los estudiantes practican. ¡Sé el primero!
            </p>
          </div>
        ) : (
          <div className="divide-y" style={{ '--tw-divide-opacity': 1 }}>
            {allEntries.map((entry, i) => {
              const isUser  = entry.isUser || entry.email === user?.email;
              const badge   = entry.badge || getBadge(isUser ? streak.current : entry.streak, entry.avgScore);
              const entryStreak = isUser ? streak.current : entry.streak;
              return (
                <div
                  key={i}
                  className="flex items-center gap-4 px-6 py-4 transition-colors"
                  style={{
                    background:  isUser ? 'rgba(29,78,216,0.04)' : 'transparent',
                    borderLeft:  isUser ? '3px solid #1d4ed8' : '3px solid transparent',
                    borderBottom: '1px solid rgba(12,31,61,0.04)',
                  }}
                >
                  {/* Posición */}
                  <div className="w-8 text-center flex-shrink-0">
                    {entry.rank <= 3 ? (
                      <span className="text-lg">
                        {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉'}
                      </span>
                    ) : (
                      <span className="font-bold text-sm" style={{ color: 'rgba(12,31,61,0.35)' }}>
                        #{entry.rank}
                      </span>
                    )}
                  </div>

                  {/* Badge */}
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                    style={{ background: isUser ? 'rgba(29,78,216,0.12)' : 'rgba(12,31,61,0.05)' }}
                  >
                    {badge}
                  </div>

                  {/* Nombre y colegio */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate" style={{ color: isUser ? '#1d4ed8' : '#0c1f3d' }}>
                      {entry.name} {isUser && '(Tú)'}
                    </p>
                    <p className="text-xs truncate" style={{ color: 'rgba(12,31,61,0.4)' }}>{entry.school || '—'}</p>
                  </div>

                  {/* Racha */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Flame size={12} style={{ color: entryStreak > 0 ? '#f97316' : 'rgba(12,31,61,0.2)' }} />
                    <span className="text-xs font-medium" style={{ color: entryStreak > 0 ? '#f97316' : 'rgba(12,31,61,0.3)' }}>
                      {entryStreak}
                    </span>
                  </div>

                  {/* XP */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Zap size={11} style={{ color: '#f59e0b' }} />
                    <span className="text-xs font-medium" style={{ color: 'rgba(12,31,61,0.5)' }}>
                      {(entry.xp || 0).toLocaleString()}
                    </span>
                  </div>

                  {/* Puntaje */}
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-sm" style={{ color: '#0c1f3d' }}>
                      {entry.avgScore > 0 ? entry.avgScore : '—'}
                    </p>
                    <p className="text-xs" style={{ color: 'rgba(12,31,61,0.35)' }}>pts prom.</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Insignias */}
      <div className="p-6 rounded-3xl fade-up delay-5"
        style={{ background: 'white', boxShadow: '0 2px 20px rgba(12,31,61,0.06)' }}>
        <h3 className="font-semibold text-sm mb-4" style={{ color: '#0c1f3d' }}>Insignias disponibles</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { badge: '🔥', name: 'Semana de fuego', desc: '7 días seguidos' },
            { badge: '⚡', name: 'Velocista',        desc: '3 ensayos en un día' },
            { badge: '🎯', name: 'Puntería',         desc: '90%+ en un ensayo' },
            { badge: '📚', name: 'Estudioso',        desc: '30 días totales' },
            { badge: '🏆', name: 'Campeón',          desc: 'Top 3 del ranking' },
            { badge: '⭐', name: 'Constante',        desc: '14 días seguidos' },
          ].map(({ badge, name, desc }) => (
            <div key={name} className="flex items-center gap-3 p-3 rounded-xl"
              style={{ background: '#f8faff', border: '1px solid rgba(12,31,61,0.05)' }}>
              <span className="text-xl">{badge}</span>
              <div>
                <p className="text-xs font-semibold" style={{ color: '#0c1f3d' }}>{name}</p>
                <p className="text-xs" style={{ color: 'rgba(12,31,61,0.4)' }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
