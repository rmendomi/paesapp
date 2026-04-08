import { useMemo } from 'react';
import {
  TrendingUp, Target, Users, DollarSign, Zap,
  BarChart3, ChevronUp, ChevronDown, Minus, Rocket,
  BookOpen, ArrowRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// ── Datos de mercado ────────────────────────────────────────────────
const MARKET = {
  totalEstudiantes:  280000,
  buscaPreparacion:  0.60,
  penetracionApps:   0.15,
  mercadoPotencial:  168000,
  precioPremium:     2990,
  conversionBaja:    0.01,
  conversionMedia:   0.05,
  costoTokenPregunta: 0.0001,
  preguntasPorDia:   10,
};

const GROWTH = [
  { mes: 3,  usuarios: 500 },
  { mes: 6,  usuarios: 2000 },
  { mes: 9,  usuarios: 8000 },
  { mes: 12, usuarios: 20000 },
];

// ── Exámenes ────────────────────────────────────────────────────────
const EXAMS = [
  { id: 'lectora',  name: 'Comprensión Lectora', icon: '📖', color: '#1d4ed8', bg: '#eff6ff' },
  { id: 'm1',       name: 'Matemática M1',        icon: '📐', color: '#0891b2', bg: '#ecfeff' },
  { id: 'm2',       name: 'Matemática M2',        icon: '∑',  color: '#7c3aed', bg: '#f5f3ff' },
  { id: 'historia', name: 'Historia',             icon: '🌎', color: '#b45309', bg: '#fffbeb' },
  { id: 'ciencias', name: 'Ciencias',             icon: '🧬', color: '#15803d', bg: '#f0fdf4' },
];

function calcProjection(trend, lastScore, target) {
  if (!trend || trend.length < 2 || !lastScore) return null;
  const gain = lastScore - trend[0];          // ganancia total
  const n    = trend.length - 1;              // número de intervalos
  const ratePerSession = gain / n;            // pts por sesión

  if (lastScore >= target) return { weeks: 0, label: '¡Ya superaste la meta!', done: true };
  if (ratePerSession <= 0) return { weeks: null, label: 'Tendencia plana o a la baja', done: false };

  // Asumir ~2 sesiones/semana
  const sessionsNeeded = (target - lastScore) / ratePerSession;
  const weeks = Math.ceil(sessionsNeeded / 2);
  if (weeks > 52) return { weeks: null, label: 'Necesita acelerar el ritmo', done: false };
  return { weeks, label: `~${weeks} semana${weeks !== 1 ? 's' : ''} a este ritmo`, done: false };
}

function TrendIcon({ trend, color }) {
  if (!trend || trend.length < 2) return <Minus size={14} style={{ color: 'rgba(12,31,61,0.3)' }} />;
  const delta = trend[trend.length - 1] - trend[0];
  if (delta > 0)  return <ChevronUp size={14} style={{ color: '#10b981' }} />;
  if (delta < 0)  return <ChevronDown size={14} style={{ color: '#ef4444' }} />;
  return <Minus size={14} style={{ color: 'rgba(12,31,61,0.4)' }} />;
}

function SparkMini({ trend, color }) {
  if (!trend || trend.length < 2) return null;
  const max = Math.max(...trend), min = Math.min(...trend);
  const range = max - min || 1;
  const w = 60, h = 24;
  const pts = trend.map((v, i) => {
    const x = (i / (trend.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 4) - 2;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: 60, height: 24 }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
    </svg>
  );
}

// Barra de crecimiento animada en CSS
function GrowthBar({ value, max, color }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div style={{ height: 6, background: 'rgba(255,255,255,0.15)', borderRadius: 99, overflow: 'hidden', flex: 1 }}>
      <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 99, transition: 'width 0.8s ease' }} />
    </div>
  );
}

export default function Proyecciones({ onNavigate }) {
  const { user, progressStats = {}, sessions = [] } = useAuth();
  const targets = user?.targets || {};

  // ── Cálculos de proyección del estudiante ──────────────────────────
  const examProjections = useMemo(() => EXAMS.map(exam => {
    const stats  = progressStats[exam.id] || {};
    const target = targets[exam.id] || 700;
    const last   = stats.lastScore || 0;
    const trend  = stats.trend || [];
    const proj   = calcProjection(trend, last, target);
    const pct    = last > 0 ? Math.min(100, Math.round((last / target) * 100)) : 0;
    return { ...exam, stats, target, last, trend, proj, pct };
  }), [progressStats, targets]);

  const validScores = examProjections.filter(e => e.last > 0);
  const avgCurrent  = validScores.length
    ? Math.round(validScores.reduce((s, e) => s + e.last, 0) / validScores.length) : 0;
  const avgTarget   = Math.round(Object.values(targets).reduce((s, t) => s + (t || 700), 0) / 5);

  // ── Cálculos de mercado ──────────────────────────────────────────
  const revBaja  = Math.round(MARKET.mercadoPotencial * MARKET.conversionBaja * MARKET.precioPremium);
  const revMedia = Math.round(MARKET.mercadoPotencial * MARKET.conversionMedia * MARKET.precioPremium);
  const maxUsers = GROWTH[GROWTH.length - 1].usuarios;

  return (
    <div className="px-4 sm:px-8 py-8 space-y-10" style={{ background: '#f8faff', minHeight: '100vh' }}>

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="fade-up delay-1">
        <div className="flex items-center gap-3 mb-1">
          <BarChart3 size={22} style={{ color: '#1d4ed8' }} />
          <h1 className="font-display text-3xl font-light" style={{ color: '#0c1f3d' }}>
            Proyecciones <em>& Análisis</em>
          </h1>
        </div>
        <p className="text-sm mt-1" style={{ color: 'rgba(12,31,61,0.45)' }}>
          Proyección de tu puntaje PAES y análisis del potencial de la aplicación
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          SECCIÓN 1: PROYECCIÓN DEL ESTUDIANTE
      ══════════════════════════════════════════════════════════════ */}
      <section className="space-y-5 fade-up delay-2">
        <div className="flex items-center gap-2">
          <Target size={18} style={{ color: '#1d4ed8' }} />
          <h2 className="font-display text-xl font-semibold" style={{ color: '#0c1f3d' }}>
            Tu proyección de puntaje
          </h2>
        </div>

        {/* Resumen global */}
        {validScores.length > 0 && (
          <div className="p-5 rounded-3xl"
            style={{ background: 'white', boxShadow: '0 2px 20px rgba(12,31,61,0.06)', border: '1px solid rgba(12,31,61,0.04)' }}>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="font-display text-2xl font-semibold" style={{ color: '#1d4ed8' }}>{avgCurrent} pts</p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(12,31,61,0.45)' }}>Promedio actual</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <ArrowRight size={18} style={{ color: 'rgba(12,31,61,0.2)' }} />
              </div>
              <div>
                <p className="font-display text-2xl font-semibold" style={{ color: '#0c1f3d' }}>{avgTarget} pts</p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(12,31,61,0.45)' }}>Meta promedio</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1.5" style={{ color: 'rgba(12,31,61,0.4)' }}>
                <span>Progreso global hacia metas</span>
                <span>{avgTarget > 0 ? Math.min(100, Math.round((avgCurrent / avgTarget) * 100)) : 0}%</span>
              </div>
              <div className="h-2 rounded-full" style={{ background: '#eff6ff' }}>
                <div className="h-2 rounded-full transition-all duration-700"
                  style={{ width: `${avgTarget > 0 ? Math.min(100, Math.round((avgCurrent / avgTarget) * 100)) : 0}%`, background: 'linear-gradient(90deg, #1d4ed8, #3b82f6)' }} />
              </div>
            </div>
          </div>
        )}

        {/* Cards por examen */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {examProjections.map(({ id, name, icon, color, bg, stats, target, last, trend, proj, pct }) => (
            <div key={id} className="p-5 rounded-3xl card-lift"
              style={{ background: 'white', boxShadow: '0 2px 20px rgba(12,31,61,0.06)', border: `1px solid ${color}10` }}>

              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: bg }}>
                    {icon}
                  </div>
                  <div>
                    <p className="font-semibold text-sm leading-tight" style={{ color: '#0c1f3d' }}>{name}</p>
                    <p className="text-xs" style={{ color: 'rgba(12,31,61,0.4)' }}>
                      {stats.attempted || 0} sesión{stats.attempted !== 1 ? 'es' : ''}
                    </p>
                  </div>
                </div>
                <SparkMini trend={trend} color={color} />
              </div>

              {/* Puntaje */}
              <div className="flex items-end justify-between mb-3">
                <div>
                  <p className="font-display text-2xl font-semibold" style={{ color: last > 0 ? color : 'rgba(12,31,61,0.25)' }}>
                    {last > 0 ? `${last} pts` : '—'}
                  </p>
                  <p className="text-xs" style={{ color: 'rgba(12,31,61,0.4)' }}>Actual · Meta {target}</p>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold"
                  style={{ color: last >= target ? '#10b981' : last > 0 ? color : 'rgba(12,31,61,0.3)' }}>
                  <TrendIcon trend={trend} />
                  {last >= target ? '+' + (last - target) : last > 0 ? (last - target) + ' pts' : ''}
                </div>
              </div>

              {/* Barra progreso */}
              <div className="mb-3">
                <div className="h-1.5 rounded-full" style={{ background: '#eff6ff' }}>
                  <div className="h-1.5 rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}99, ${color})` }} />
                </div>
                <p className="text-xs mt-1" style={{ color: 'rgba(12,31,61,0.35)' }}>{pct}% de la meta</p>
              </div>

              {/* Proyección */}
              <div className="px-3 py-2 rounded-xl text-xs"
                style={{
                  background: proj?.done
                    ? 'rgba(16,185,129,0.08)' : last > 0
                    ? `${color}0a` : 'rgba(12,31,61,0.03)',
                  border: `1px solid ${proj?.done ? 'rgba(16,185,129,0.2)' : last > 0 ? `${color}20` : 'rgba(12,31,61,0.06)'}`,
                }}>
                {!last ? (
                  <span style={{ color: 'rgba(12,31,61,0.4)' }}>Empieza a practicar para ver tu proyección</span>
                ) : proj?.done ? (
                  <span style={{ color: '#065f46', fontWeight: 600 }}>🎉 {proj.label}</span>
                ) : (
                  <span style={{ color }}>
                    <span className="font-semibold">📅 {proj?.label || 'Sin tendencia clara'}</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECCIÓN 2: PROYECCIÓN DE ÉXITO DE LA APP
      ══════════════════════════════════════════════════════════════ */}
      <section className="space-y-5 fade-up delay-3">
        <div className="flex items-center gap-2">
          <Rocket size={18} style={{ color: '#1d4ed8' }} />
          <h2 className="font-display text-xl font-semibold" style={{ color: '#0c1f3d' }}>
            Proyección de la aplicación
          </h2>
        </div>

        {/* Tarjetas de mercado */}
        <div className="p-6 rounded-3xl"
          style={{ background: 'linear-gradient(135deg, #0c1f3d 0%, #1a2f5a 50%, #1d4ed8 100%)' }}>

          {/* Título */}
          <div className="flex items-center gap-3 mb-6">
            <Users size={20} style={{ color: '#93c5fd' }} />
            <div>
              <p className="text-white font-display text-lg font-semibold">Mercado chileno PAES 2024</p>
              <p className="text-white/45 text-xs">Estudio de tamaño de mercado y oportunidad</p>
            </div>
          </div>

          {/* Métricas de mercado */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { label: 'Estudiantes PAES/año', value: '280.000+', icon: Users, color: '#93c5fd' },
              { label: 'Buscan preparación', value: '60%', icon: BookOpen, color: '#6ee7b7' },
              { label: 'Mercado potencial', value: '168.000', icon: Target, color: '#fcd34d' },
              { label: 'Penetración apps hoy', value: '15%', icon: Zap, color: '#f9a8d4' },
            ].map(({ label, value, icon: Icon, color: c }) => (
              <div key={label} className="p-3 rounded-2xl text-center"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Icon size={16} style={{ color: c, margin: '0 auto 6px' }} />
                <p className="font-display text-lg font-semibold" style={{ color: c }}>{value}</p>
                <p className="text-white/45 text-xs leading-tight mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Modelo freemium */}
          <div className="mb-6">
            <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">
              Modelo Freemium · $2.990/mes premium
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                {
                  label:  '1% conversión',
                  users:  '1.680 usuarios',
                  rev:    `$${revBaja.toLocaleString('es-CL')}/mes`,
                  color:  '#6ee7b7',
                  desc:   'Escenario conservador',
                },
                {
                  label:  '5% conversión',
                  users:  '8.400 usuarios',
                  rev:    `$${revMedia.toLocaleString('es-CL')}/mes`,
                  color:  '#fcd34d',
                  desc:   'Escenario optimista',
                },
              ].map(({ label, users, rev, color: c, desc }) => (
                <div key={label} className="p-4 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${c}30` }}>
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign size={14} style={{ color: c }} />
                    <p className="text-xs font-semibold" style={{ color: c }}>{label}</p>
                    <span className="text-xs text-white/30">· {desc}</span>
                  </div>
                  <p className="font-display text-xl font-semibold text-white">{rev}</p>
                  <p className="text-white/40 text-xs mt-0.5">{users} premium</p>
                </div>
              ))}
            </div>
          </div>

          {/* Proyección usuarios 12 meses */}
          <div className="mb-5">
            <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">
              Proyección de usuarios · 12 meses
            </p>
            <div className="space-y-2.5">
              {GROWTH.map(({ mes, usuarios }) => (
                <div key={mes} className="flex items-center gap-3">
                  <span className="text-white/40 text-xs w-12 flex-shrink-0">Mes {mes}</span>
                  <GrowthBar value={usuarios} max={maxUsers} color={`hsl(${217 - (mes / 12) * 40}, 80%, 65%)`} />
                  <span className="text-white font-semibold text-xs w-18 flex-shrink-0 text-right">
                    {usuarios.toLocaleString('es-CL')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Costo IA con banco compartido */}
          <div className="p-4 rounded-2xl"
            style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)' }}>
            <div className="flex items-start gap-3">
              <Zap size={16} style={{ color: '#c4b5fd' }} className="flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white text-sm font-semibold mb-1">Costo IA con banco compartido</p>
                <p className="text-white/55 text-xs leading-relaxed">
                  <span className="text-white/80">1.000 usuarios</span> × 10 preguntas/día × $0,0001/pregunta =
                  {' '}<span className="text-purple-300 font-semibold">~$30/mes</span>.
                  El banco de preguntas compartido reduce costos hasta
                  {' '}<span className="text-purple-300 font-semibold">~95%</span> al reutilizar preguntas ya generadas
                  por otros usuarios.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Estrategia de crecimiento */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              icon: '🎯', title: 'Fase 1 · Producto', period: 'Meses 1-3',
              desc: 'Banco de preguntas, login Google, modo ensayo. Conseguir primeros 500 usuarios orgánicos vía redes y colegios.',
              color: '#1d4ed8',
            },
            {
              icon: '📣', title: 'Fase 2 · Crecimiento', period: 'Meses 4-9',
              desc: 'Partnerships con colegios, TikTok/Instagram de tips PAES. Meta: 8.000 usuarios activos.',
              color: '#7c3aed',
            },
            {
              icon: '💰', title: 'Fase 3 · Monetización', period: 'Meses 10-12',
              desc: 'Lanzar plan premium $2.990/mes: historial ilimitado, IA personalizada, análisis por habilidad.',
              color: '#0891b2',
            },
          ].map(({ icon, title, period, desc, color: c }) => (
            <div key={title} className="p-5 rounded-3xl card-lift"
              style={{ background: 'white', boxShadow: '0 2px 20px rgba(12,31,61,0.06)', borderTop: `3px solid ${c}` }}>
              <p className="text-2xl mb-2">{icon}</p>
              <p className="font-semibold text-sm mb-0.5" style={{ color: '#0c1f3d' }}>{title}</p>
              <p className="text-xs font-medium mb-2" style={{ color: c }}>{period}</p>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(12,31,61,0.55)' }}>{desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="p-5 rounded-3xl flex items-center justify-between gap-4"
          style={{ background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.2)' }}>
          <div className="flex items-center gap-3">
            <TrendingUp size={20} style={{ color: '#10b981' }} />
            <div>
              <p className="font-semibold text-sm" style={{ color: '#0c1f3d' }}>Empieza a practicar hoy</p>
              <p className="text-xs" style={{ color: 'rgba(12,31,61,0.5)' }}>Cada sesión mejora tu proyección y enriquece el banco de preguntas.</p>
            </div>
          </div>
          {onNavigate && (
            <button
              onClick={() => onNavigate('exams')}
              className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
              Practicar
              <ArrowRight size={13} />
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
