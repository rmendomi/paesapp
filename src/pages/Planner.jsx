import { useState, useEffect } from 'react';
import { CheckSquare, Square, Calendar, Clock, Zap, RotateCcw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { studyPlanTemplates, exams } from '../data/mockData';

const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

function getWeekId() {
  const now  = new Date();
  const jan1 = new Date(now.getFullYear(), 0, 1);
  const week = Math.ceil(((now - jan1) / 86400000 + jan1.getDay() + 1) / 7);
  return `${now.getFullYear()}-W${week}`;
}

export default function Planner() {
  const { planner, savePlannerProgress } = useAuth();

  const currentWeekId = getWeekId();

  // Si hay datos del servidor para la semana actual, úsalos; si no, inicio vacío
  const [selectedPlan, setSelectedPlan] = useState(
    planner.weekId === currentWeekId ? planner.planId : 'standard'
  );
  const [checked, setChecked] = useState(
    planner.weekId === currentWeekId ? planner.progress : {}
  );

  // Sincronizar cuando los datos del contexto cambien (carga inicial)
  useEffect(() => {
    if (planner.weekId === currentWeekId) {
      setSelectedPlan(planner.planId || 'standard');
      setChecked(planner.progress || {});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planner.weekId]);

  const toggle = (key) => {
    setChecked(prev => {
      const next = { ...prev, [key]: !prev[key] };
      savePlannerProgress(currentWeekId, selectedPlan, next);
      return next;
    });
  };

  const handleChangePlan = (id) => {
    setSelectedPlan(id);
    setChecked({});
    savePlannerProgress(currentWeekId, id, {});
  };

  const resetWeek = () => {
    setChecked({});
    savePlannerProgress(currentWeekId, selectedPlan, {});
  };

  const plan           = studyPlanTemplates.find(p => p.id === selectedPlan);
  const allSessions    = plan.days.flatMap((day, di) => day.sessions.map((s, si) => ({ ...s, day: di, si })));
  const totalSessions  = allSessions.length;
  const completedCount = allSessions.filter(s => checked[`${s.day}-${s.si}`]).length;
  const pct            = totalSessions > 0 ? Math.round((completedCount / totalSessions) * 100) : 0;

  return (
    <div className="px-8 py-8 space-y-8">
      <div className="fade-up delay-1">
        <h1 className="font-display text-3xl font-light" style={{ color: '#0c1f3d' }}>
          Planificador <em>de estudio</em>
        </h1>
        <p className="text-sm mt-1" style={{ color: 'rgba(12,31,61,0.45)' }}>
          Elige tu ritmo semanal y marca tus sesiones completadas
        </p>
      </div>

      {/* Selector de plan */}
      <div className="grid grid-cols-3 gap-3 fade-up delay-2">
        {studyPlanTemplates.map(p => (
          <button
            key={p.id}
            onClick={() => handleChangePlan(p.id)}
            className="p-4 rounded-2xl text-left transition-all hover:scale-[1.02]"
            style={{
              background: selectedPlan === p.id ? 'linear-gradient(135deg, #0c1f3d, #1d4ed8)' : 'white',
              boxShadow:  '0 2px 12px rgba(12,31,61,0.06)',
              border:     selectedPlan === p.id ? 'none' : '1.5px solid rgba(12,31,61,0.08)',
            }}
          >
            <p className="text-xl mb-1">{p.icon}</p>
            <p className="font-semibold text-sm" style={{ color: selectedPlan === p.id ? 'white' : '#0c1f3d' }}>
              {p.name}
            </p>
            <p className="text-xs mt-0.5" style={{ color: selectedPlan === p.id ? 'rgba(255,255,255,0.55)' : 'rgba(12,31,61,0.45)' }}>
              {p.hoursPerWeek}h / semana
            </p>
          </button>
        ))}
      </div>

      {/* Resumen de progreso */}
      <div className="p-6 rounded-3xl fade-up delay-3"
        style={{ background: 'linear-gradient(160deg, #0c1f3d, #1d4ed8)', boxShadow: '0 8px 32px rgba(12,31,61,0.2)' }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/50 text-xs">Semana actual · {plan.name}</p>
            <p className="font-display text-2xl font-semibold text-white mt-0.5">
              {completedCount} / {totalSessions} sesiones
            </p>
          </div>
          <div className="text-right">
            <p className="font-display text-4xl font-bold" style={{ color: '#93c5fd' }}>{pct}%</p>
            <p className="text-white/40 text-xs">{plan.hoursPerWeek}h planificadas</p>
          </div>
        </div>
        <div className="h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
          <div
            className="h-2 rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #93c5fd, #60a5fa)' }}
          />
        </div>
        <div className="flex justify-end mt-3">
          <button
            onClick={resetWeek}
            className="flex items-center gap-1.5 text-xs text-white/35 hover:text-white/60 transition-colors"
          >
            <RotateCcw size={11} /> Reiniciar semana
          </button>
        </div>
      </div>

      {/* Sesiones diarias */}
      <div className="space-y-4 fade-up delay-4">
        {plan.days.map((day, di) => {
          if (!day.sessions || day.sessions.length === 0) return null;
          const dayCompleted = day.sessions.every((_, si) => checked[`${di}-${si}`]);
          return (
            <div key={di} className="p-5 rounded-3xl"
              style={{ background: 'white', boxShadow: '0 2px 16px rgba(12,31,61,0.06)' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: dayCompleted ? 'rgba(16,185,129,0.12)' : 'rgba(12,31,61,0.06)' }}>
                    <Calendar size={16} style={{ color: dayCompleted ? '#10b981' : 'rgba(12,31,61,0.4)' }} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: '#0c1f3d' }}>{DAYS[di]}</p>
                    <p className="text-xs" style={{ color: 'rgba(12,31,61,0.4)' }}>
                      {day.sessions.length} sesión{day.sessions.length !== 1 ? 'es' : ''} ·{' '}
                      {day.sessions.reduce((s, ses) => s + ses.duration, 0)} min
                    </p>
                  </div>
                </div>
                {dayCompleted && (
                  <span className="text-xs px-2.5 py-1 rounded-lg font-semibold"
                    style={{ background: 'rgba(16,185,129,0.1)', color: '#065f46', border: '1px solid rgba(16,185,129,0.2)' }}>
                    ✓ Completado
                  </span>
                )}
              </div>

              <div className="space-y-2">
                {day.sessions.map((session, si) => {
                  const key  = `${di}-${si}`;
                  const done = !!checked[key];
                  const exam = exams.find(e => e.id === session.examId);
                  return (
                    <button
                      key={si}
                      onClick={() => toggle(key)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all hover:scale-[1.01]"
                      style={{
                        background: done ? 'rgba(16,185,129,0.07)' : '#f8faff',
                        border:     done ? '1px solid rgba(16,185,129,0.2)' : '1px solid rgba(12,31,61,0.06)',
                      }}
                    >
                      {done
                        ? <CheckSquare size={18} style={{ color: '#10b981', flexShrink: 0 }} />
                        : <Square      size={18} style={{ color: 'rgba(12,31,61,0.25)', flexShrink: 0 }} />}
                      <span className="text-lg flex-shrink-0">{exam?.icon || '📚'}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate"
                          style={{ color: done ? '#065f46' : '#0c1f3d', textDecoration: done ? 'line-through' : 'none' }}>
                          {session.topic}
                        </p>
                        <p className="text-xs" style={{ color: 'rgba(12,31,61,0.4)' }}>
                          {exam?.name || 'General'} · {session.duration} min
                        </p>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0" style={{ color: 'rgba(12,31,61,0.3)' }}>
                        <Clock size={11} />
                        <span className="text-xs">{session.duration}m</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Consejo */}
      <div className="p-5 rounded-2xl fade-up delay-5"
        style={{ background: 'rgba(29,78,216,0.06)', border: '1px solid rgba(29,78,216,0.15)' }}>
        <div className="flex items-start gap-3">
          <Zap size={15} style={{ color: '#1d4ed8', flexShrink: 0, marginTop: 1 }} />
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(12,31,61,0.65)' }}>
            <strong style={{ color: '#0c1f3d' }}>Consejo:</strong> Tu progreso se guarda automáticamente y se reinicia cada semana.
            La constancia es más efectiva que estudiar muchas horas en un solo día.
          </p>
        </div>
      </div>
    </div>
  );
}
