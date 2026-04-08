import { useState, useEffect } from 'react';
import { TrendingUp, Lightbulb, AlertTriangle, Target, BookOpen, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { exams, skillsConfig } from '../data/mockData';
import { supabase } from '../lib/supabase';

// Consejos específicos por habilidad PAES
const SKILL_TIPS = {
  lectora: {
    localizar:   { tip: 'Practica subrayar mientras lees. La respuesta suele estar casi textual en el texto. Busca sinónimos de palabras clave.', icon: '🔍' },
    interpretar: { tip: 'Hazte la pregunta: "¿Qué quiso decir el autor?". Busca el sentido global, no solo lo literal.', icon: '💡' },
    evaluar:     { tip: 'Analiza el propósito del texto y el tono del autor. ¿Para quién escribe? ¿Qué defiende?', icon: '⚖️' },
  },
  m1: {
    resolver:    { tip: 'Escribe los datos, el incógnito y la fórmula antes de operar. Verifica con estimaciones.', icon: '🧮' },
    modelar:     { tip: 'Identifica las variables del problema. Dibuja un diagrama o tabla cuando sea posible.', icon: '📊' },
    representar: { tip: 'Practica identificar qué tipo de gráfico o representación se usa en cada contexto.', icon: '📈' },
    argumentar:  { tip: 'Verifica cada paso del razonamiento. Busca el paso donde se genera el error lógico.', icon: '💬' },
  },
  m2: {
    resolver:    { tip: 'Repasa logaritmos y trigonometría básica. Los errores suelen venir de identidades mal aplicadas.', icon: '🧮' },
    modelar:     { tip: 'Identifica qué tipo de función modela el problema (exponencial, lineal, trigonométrica).', icon: '📊' },
    representar: { tip: 'Practica graficar funciones manualmente. Identifica dominio, imagen y puntos clave.', icon: '📈' },
    argumentar:  { tip: 'Lee cada paso del argumento y busca la contradicción o el error lógico.', icon: '💬' },
  },
  historia: {
    temporal:    { tip: 'Crea líneas de tiempo para los períodos que estudias. Asocia causas-consecuencias-períodos.', icon: '⏳' },
    fuentes:     { tip: 'Pregúntate: ¿Quién escribió esto? ¿Cuándo? ¿Con qué propósito? ¿Es confiable?', icon: '📜' },
    critico:     { tip: 'Busca múltiples perspectivas sobre un mismo hecho. La PAES valora el análisis, no la memorización.', icon: '🧠' },
  },
  ciencias: {
    observar:    { tip: 'Practica identificar hipótesis y variables en textos científicos. ¿Qué se quiere demostrar?', icon: '🔭' },
    planificar:  { tip: 'Repasa el diseño experimental: variable independiente, dependiente y de control.', icon: '📋' },
    procesar:    { tip: 'Ejercita lectura de gráficos y tablas. Identifica tendencias, valores máximos y mínimos.', icon: '📉' },
    evaluar:     { tip: 'Practica identificar fallas en experimentos: muestra pequeña, falta de control, sesgo.', icon: '✅' },
    comunicar:   { tip: 'Practica con vocabulario científico. Identifica el concepto central de cada texto.', icon: '📢' },
  },
};

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

// Analiza errores de sesiones para detectar habilidades débiles
function analyzeWeakSkills(sessions) {
  const skillErrors = {}; // { 'lectora_localizar': { errors: 0, total: 0 } }

  sessions.forEach(s => {
    if (!s.examId || !s.skill_id) return;
    const key = `${s.examId}_${s.skill_id}`;
    if (!skillErrors[key]) skillErrors[key] = { examId: s.examId, skillId: s.skill_id, errors: 0, total: 0 };
    skillErrors[key].total += s.total || 0;
    skillErrors[key].errors += (s.total || 0) - (s.correct || 0);
  });

  return Object.values(skillErrors).filter(s => s.total >= 3 && (s.errors / s.total) > 0.5);
}

export default function Progress({ onNavigate }) {
  const { progressStats, user, sessions } = useAuth();
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

  // ── Sugerencias PAES: errores repetidos ──────────────────────────
  const [weakSkills,    setWeakSkills]    = useState([]);
  const [loadingSugg,   setLoadingSugg]   = useState(true);

  useEffect(() => {
    if (!user?.email) { setLoadingSugg(false); return; }

    async function fetchWeakSkills() {
      setLoadingSugg(true);
      try {
        // Obtener historial de preguntas_vistas con resultados
        const { data } = await supabase
          .from('preguntas_vistas')
          .select('exam_id, skill_id, fue_correcta')
          .eq('user_email', user.email)
          .not('fue_correcta', 'is', null);

        if (!data || data.length === 0) {
          // Fallback: analizar sesiones si no hay preguntas_vistas
          const weak = analyzeWeakSkills(sessions || []);
          setWeakSkills(weak);
          return;
        }

        // Agrupar por (exam_id, skill_id)
        const grouped = {};
        data.forEach(r => {
          const key = `${r.exam_id}_${r.skill_id}`;
          if (!grouped[key]) grouped[key] = { examId: r.exam_id, skillId: r.skill_id, total: 0, errors: 0 };
          grouped[key].total++;
          if (!r.fue_correcta) grouped[key].errors++;
        });

        const weak = Object.values(grouped)
          .filter(g => g.total >= 3 && (g.errors / g.total) > 0.45)
          .sort((a, b) => (b.errors / b.total) - (a.errors / a.total))
          .slice(0, 6);

        setWeakSkills(weak);
      } catch (_) {
        setWeakSkills([]);
      } finally {
        setLoadingSugg(false);
      }
    }

    fetchWeakSkills();
  }, [user?.email, sessions]);

  const hasSuggestions = weakSkills.length > 0;

  return (
    <div className="px-4 sm:px-8 py-8 space-y-8">
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

      {/* ── SUGERENCIAS PAES ────────────────────────────────────────────── */}
      <div className="fade-up delay-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Lightbulb size={20} style={{ color: '#f59e0b' }} />
            <h2 className="font-display text-xl font-semibold" style={{ color: '#0c1f3d' }}>Sugerencias PAES</h2>
          </div>
          {loadingSugg && (
            <RefreshCw size={14} className="animate-spin" style={{ color: 'rgba(12,31,61,0.3)' }} />
          )}
        </div>

        {loadingSugg ? (
          <div className="p-6 rounded-3xl text-center" style={{ background: 'white', boxShadow: '0 2px 20px rgba(12,31,61,0.06)' }}>
            <p className="text-sm" style={{ color: 'rgba(12,31,61,0.4)' }}>Analizando tu historial...</p>
          </div>
        ) : !hasSuggestions ? (
          <div className="p-6 rounded-3xl" style={{ background: 'white', boxShadow: '0 2px 20px rgba(12,31,61,0.06)' }}>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎉</span>
              <div>
                <p className="font-semibold text-sm mb-1" style={{ color: '#0c1f3d' }}>
                  {totalAttempts === 0 ? 'Sin historial aún' : '¡Sin habilidades débiles detectadas!'}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(12,31,61,0.5)' }}>
                  {totalAttempts === 0
                    ? 'Practica con la IA para que el sistema detecte tus puntos de mejora automáticamente.'
                    : 'Estás respondiendo bien en todas las habilidades. Sigue practicando para mantener el ritmo.'}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Banner de alerta */}
            <div className="flex items-center gap-3 p-4 rounded-2xl"
              style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
              <AlertTriangle size={16} style={{ color: '#f59e0b', flexShrink: 0 }} />
              <p className="text-sm" style={{ color: '#92400e' }}>
                Detectamos <strong>{hasSuggestions ? weakSkills.length : 0} habilidad{weakSkills.length !== 1 ? 'es' : ''}</strong> con más del 45% de errores repetidos. Aquí los refuerzos específicos:
              </p>
            </div>

            {/* Cards por habilidad débil */}
            <div className="grid sm:grid-cols-2 gap-3">
              {weakSkills.map(({ examId, skillId, total, errors }) => {
                const exam     = exams.find(e => e.id === examId);
                const skill    = skillsConfig[examId]?.find(s => s.id === skillId);
                const tipData  = SKILL_TIPS[examId]?.[skillId];
                const errRate  = Math.round((errors / total) * 100);
                if (!exam || !skill) return null;

                return (
                  <div key={`${examId}_${skillId}`} className="p-5 rounded-2xl"
                    style={{ background: 'white', boxShadow: '0 2px 20px rgba(12,31,61,0.06)', border: `1px solid ${exam.color}18` }}>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{exam.icon}</span>
                        <div>
                          <p className="text-xs font-semibold" style={{ color: exam.color }}>{exam.name}</p>
                          <p className="font-semibold text-sm" style={{ color: '#0c1f3d' }}>
                            {tipData?.icon} {skill.name}
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-bold text-sm" style={{ color: errRate >= 70 ? '#ef4444' : '#f59e0b' }}>
                          {errRate}% errores
                        </p>
                        <p className="text-xs" style={{ color: 'rgba(12,31,61,0.4)' }}>{total} preguntas</p>
                      </div>
                    </div>

                    {/* Barra de errores */}
                    <div className="mb-3">
                      <div className="h-1.5 rounded-full" style={{ background: '#f1f5f9' }}>
                        <div className="h-1.5 rounded-full transition-all"
                          style={{ width: `${errRate}%`, background: errRate >= 70 ? '#ef4444' : '#f59e0b' }} />
                      </div>
                    </div>

                    {/* Consejo */}
                    {tipData && (
                      <p className="text-xs leading-relaxed" style={{ color: 'rgba(12,31,61,0.6)' }}>
                        💡 {tipData.tip}
                      </p>
                    )}

                    {/* CTA */}
                    {onNavigate && (
                      <button
                        onClick={() => onNavigate('exams')}
                        className="mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold transition-all hover:scale-[1.02]"
                        style={{ background: `${exam.color}12`, color: exam.color, border: `1px solid ${exam.color}20` }}>
                        <BookOpen size={12} />
                        Practicar esta habilidad
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

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

      {/* CTA proyecciones */}
      <div className="p-6 rounded-3xl fade-up delay-4 flex items-center justify-between gap-4"
        style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(79,70,229,0.06))', border: '1px solid rgba(124,58,237,0.15)' }}>
        <div className="flex items-center gap-3">
          <Target size={22} style={{ color: '#7c3aed' }} />
          <div>
            <p className="font-semibold text-sm" style={{ color: '#0c1f3d' }}>¿Llegarás a tu meta PAES?</p>
            <p className="text-xs" style={{ color: 'rgba(12,31,61,0.5)' }}>Ve tu proyección de puntaje y fechas estimadas.</p>
          </div>
        </div>
        {onNavigate && (
          <button
            onClick={() => onNavigate('proyecciones')}
            className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105"
            style={{ background: '#7c3aed', color: 'white' }}>
            Ver proyecciones
          </button>
        )}
      </div>
    </div>
  );
}
