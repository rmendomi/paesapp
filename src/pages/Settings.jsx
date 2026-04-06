import { useState } from 'react';
import { Save, User, Target, CheckCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { exams } from '../data/mockData';

export default function Settings({ onNavigate }) {
  const { user, updateProfile } = useAuth();

  const [name,    setName]    = useState(user?.name    || '');
  const [school,  setSchool]  = useState(user?.school  || '');
  const [grade,   setGrade]   = useState(user?.gradeLevel || '4° Medio');
  const [targets, setTargets] = useState({ ...(user?.targets || { lectora: 700, m1: 700, m2: 680, historia: 690, ciencias: 710 }) });
  const [saving,  setSaving]  = useState(false);
  const [saved,   setSaved]   = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile({ name, school, gradeLevel: grade, targets, targetScore: Math.round(Object.values(targets).reduce((s, v) => s + v, 0) / Object.values(targets).length) });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      console.error('[Settings]', err);
    } finally {
      setSaving(false);
    }
  };

  const setTarget = (id, val) => {
    const n = Math.min(1000, Math.max(100, parseInt(val) || 100));
    setTargets(t => ({ ...t, [id]: n }));
  };

  return (
    <div className="px-8 py-8 max-w-2xl space-y-8">
      <div className="fade-up delay-1">
        <h1 className="font-display text-3xl font-light" style={{ color: '#0c1f3d' }}>
          Configuración <em>del perfil</em>
        </h1>
        <p className="text-sm mt-1" style={{ color: 'rgba(12,31,61,0.45)' }}>
          Personaliza tu meta y datos de estudiante
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 fade-up delay-2">
        {/* Datos personales */}
        <div className="p-6 rounded-3xl"
          style={{ background: 'white', boxShadow: '0 2px 20px rgba(12,31,61,0.06)' }}>
          <div className="flex items-center gap-2 mb-5">
            <User size={16} style={{ color: '#1d4ed8' }} />
            <h2 className="font-display text-lg font-semibold" style={{ color: '#0c1f3d' }}>Datos personales</h2>
          </div>

          {/* Correo Google (solo lectura) */}
          {user?.email && (
            <div className="mb-4">
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'rgba(12,31,61,0.5)' }}>
                Cuenta Google
              </label>
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
                style={{ background: 'rgba(59,130,246,0.05)', border: '1.5px solid rgba(59,130,246,0.12)', color: 'rgba(12,31,61,0.6)' }}
              >
                {user.picture && (
                  <img src={user.picture} alt="" className="w-5 h-5 rounded-full" referrerPolicy="no-referrer" />
                )}
                {user.email}
              </div>
            </div>
          )}

          <div className="space-y-4">
            {[
              { label: 'Nombre completo',      value: name,   setter: setName,   type: 'text', ph: 'Tu nombre...' },
              { label: 'Colegio / Institución', value: school, setter: setSchool, type: 'text', ph: 'Nombre del colegio...' },
            ].map(({ label, value, setter, type, ph }) => (
              <div key={label}>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'rgba(12,31,61,0.5)' }}>{label}</label>
                <input
                  type={type} value={value} onChange={e => setter(e.target.value)}
                  placeholder={ph}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{ background: '#f8faff', border: '1.5px solid rgba(12,31,61,0.1)', color: '#0c1f3d' }}
                  onFocus={e => e.target.style.borderColor = '#3b82f6'}
                  onBlur={e => e.target.style.borderColor = 'rgba(12,31,61,0.1)'}
                />
              </div>
            ))}
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'rgba(12,31,61,0.5)' }}>Curso</label>
              <select
                value={grade} onChange={e => setGrade(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all appearance-none cursor-pointer"
                style={{ background: '#f8faff', border: '1.5px solid rgba(12,31,61,0.1)', color: '#0c1f3d' }}
              >
                {['1° Medio', '2° Medio', '3° Medio', '4° Medio', 'Egresado'].map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Metas de puntaje */}
        <div className="p-6 rounded-3xl"
          style={{ background: 'white', boxShadow: '0 2px 20px rgba(12,31,61,0.06)' }}>
          <div className="flex items-center gap-2 mb-5">
            <Target size={16} style={{ color: '#1d4ed8' }} />
            <h2 className="font-display text-lg font-semibold" style={{ color: '#0c1f3d' }}>Metas de puntaje</h2>
          </div>
          <p className="text-xs mb-4" style={{ color: 'rgba(12,31,61,0.45)' }}>
            Define tu puntaje objetivo para cada prueba (100 – 1000 puntos)
          </p>
          <div className="space-y-4">
            {exams.map(exam => (
              <div key={exam.id} className="flex items-center gap-4">
                <span className="text-lg flex-shrink-0">{exam.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: '#0c1f3d' }}>{exam.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number" min="100" max="1000" step="10"
                    value={targets[exam.id] || 700}
                    onChange={e => setTarget(exam.id, e.target.value)}
                    className="w-20 px-3 py-2 rounded-xl text-sm font-semibold text-center outline-none transition-all"
                    style={{ background: exam.bg, border: `1.5px solid ${exam.color}30`, color: exam.color }}
                    onFocus={e => e.target.style.borderColor = exam.color}
                    onBlur={e => e.target.style.borderColor = `${exam.color}30`}
                  />
                  <span className="text-xs" style={{ color: 'rgba(12,31,61,0.4)' }}>pts</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botón guardar */}
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-white transition-all hover:scale-105 disabled:opacity-70 disabled:cursor-wait"
          style={{ background: saved ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #0c1f3d, #1d4ed8)' }}
        >
          {saving
            ? <><Loader2 size={16} className="animate-spin" /> Guardando…</>
            : saved
              ? <><CheckCircle size={16} /> Guardado ✓</>
              : <><Save size={16} /> Guardar cambios</>}
        </button>
      </form>
    </div>
  );
}
