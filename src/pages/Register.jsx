import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, GraduationCap, AlertCircle, Loader2, Eye, EyeOff, Mail, Lock, User, ChevronDown, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api';

const REGIONES = [
  'Arica y Parinacota',
  'Tarapacá',
  'Antofagasta',
  'Atacama',
  'Coquimbo',
  'Valparaíso',
  'Metropolitana',
  "O'Higgins",
  'Maule',
  'Ñuble',
  'Biobío',
  'La Araucanía',
  'Los Ríos',
  'Los Lagos',
  'Aysén',
  'Magallanes',
];

const ANIOS = Array.from({ length: 2010 - 1965 + 1 }, (_, i) => 2010 - i);

const SITUACIONES = [
  { value: 'estudiante', label: 'Soy estudiante de enseñanza media' },
  { value: 'egresado',   label: 'Ya egresé del colegio' },
  { value: 'adulto',     label: 'Adulto/a que quiere ingresar a la universidad' },
];

// Input base style
const inputStyle = {
  width: '100%',
  border: '1.5px solid rgba(12,31,61,0.12)',
  borderRadius: 12,
  padding: '11px 14px',
  fontSize: 14,
  color: '#0c1f3d',
  background: '#fff',
  outline: 'none',
  transition: 'border-color 0.15s',
};
const inputWithIconStyle = { ...inputStyle, paddingLeft: 42 };

function getPasswordStrength(pwd) {
  if (!pwd || pwd.length < 6) return 0;
  let score = 1;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return Math.min(score, 3);
}
const STRENGTH_LABELS = ['', 'Débil', 'Media', 'Fuerte'];
const STRENGTH_COLORS = ['', '#ef4444', '#f59e0b', '#22c55e'];

// Componente de select de colegio con búsqueda
function ColegioSelect({ colegios, value, onChange, loading }) {
  const [search,    setSearch]    = useState('');
  const [open,      setOpen]      = useState(false);
  const [customMode, setCustomMode] = useState(false);
  const [customText, setCustomText] = useState('');
  const ref = useRef(null);

  const filtered = colegios.filter(c =>
    c.nombre.toLowerCase().includes(search.toLowerCase()) ||
    (c.comuna || '').toLowerCase().includes(search.toLowerCase())
  );

  const selected = value === 'custom'
    ? null
    : colegios.find(c => c.id === value);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (colegio) => {
    setCustomMode(false);
    onChange(colegio.id, colegio.nombre);
    setOpen(false);
    setSearch('');
  };

  const handleCustomMode = () => {
    setOpen(false);
    setCustomMode(true);
    onChange('custom', customText);
  };

  const handleCustomChange = (e) => {
    setCustomText(e.target.value);
    onChange('custom', e.target.value);
  };

  if (customMode) {
    return (
      <div className="space-y-2">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(12,31,61,0.35)' }} />
          <input
            autoFocus
            type="text"
            placeholder="Escribe el nombre de tu colegio"
            value={customText}
            onChange={handleCustomChange}
            style={{ ...inputStyle, paddingLeft: 42 }}
          />
        </div>
        <button
          type="button"
          onClick={() => { setCustomMode(false); setCustomText(''); onChange(null, ''); }}
          className="text-xs"
          style={{ color: 'rgba(12,31,61,0.4)' }}
        >
          ← Volver a la lista
        </button>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{ ...inputStyle, display: 'flex', alignItems: 'center', justifyContent: 'space-between', textAlign: 'left', cursor: 'pointer' }}
        disabled={loading}
      >
        <span style={{ color: selected ? '#0c1f3d' : 'rgba(12,31,61,0.35)', fontSize: 14 }}>
          {loading ? 'Cargando colegios…' : selected ? selected.nombre : 'Selecciona tu colegio'}
        </span>
        <ChevronDown size={14} style={{ color: 'rgba(12,31,61,0.35)', flexShrink: 0 }} />
      </button>

      {open && !loading && (
        <div
          className="absolute z-50 w-full mt-1 rounded-xl shadow-xl overflow-hidden"
          style={{ background: '#fff', border: '1.5px solid rgba(12,31,61,0.1)', maxHeight: 300 }}
        >
          {/* Buscador */}
          <div className="p-2" style={{ borderBottom: '1px solid rgba(12,31,61,0.06)' }}>
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: 'rgba(12,31,61,0.35)' }} />
              <input
                autoFocus
                type="text"
                placeholder="Buscar colegio o comuna…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ ...inputStyle, paddingLeft: 30, padding: '7px 10px 7px 28px', fontSize: 13 }}
              />
            </div>
          </div>

          {/* Lista */}
          <div style={{ overflowY: 'auto', maxHeight: 220 }}>
            {/* Opción "no tengo colegio" */}
            <button
              type="button"
              onClick={() => handleSelect({ id: null, nombre: 'No tengo colegio / Independiente' })}
              className="w-full text-left px-4 py-2.5 hover:bg-blue-50 transition-colors"
              style={{ fontSize: 13, color: 'rgba(12,31,61,0.6)', borderBottom: '1px solid rgba(12,31,61,0.04)' }}
            >
              No tengo colegio / Independiente
            </button>

            {filtered.length === 0 && search ? (
              <>
                <p className="px-4 pt-3 pb-1 text-xs" style={{ color: 'rgba(12,31,61,0.4)' }}>
                  No encontramos "{search}" en la lista.
                </p>
                <button
                  type="button"
                  onClick={handleCustomMode}
                  className="w-full text-left px-4 py-2.5 hover:bg-blue-50 transition-colors"
                  style={{ fontSize: 13, color: '#1d4ed8', fontWeight: 600, borderTop: '1px solid rgba(12,31,61,0.04)' }}
                >
                  + Ingresar nombre manualmente
                </button>
              </>
            ) : (
              <>
                {filtered.map(c => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleSelect(c)}
                    className="w-full text-left px-4 py-2.5 hover:bg-blue-50 transition-colors"
                    style={{ fontSize: 13, color: '#0c1f3d' }}
                  >
                    <div className="font-medium">{c.nombre}</div>
                    {c.comuna && <div style={{ fontSize: 11, color: 'rgba(12,31,61,0.4)', marginTop: 1 }}>{c.comuna} · {c.tipo}</div>}
                  </button>
                ))}
                {/* Siempre mostrar opción manual al fondo */}
                <button
                  type="button"
                  onClick={handleCustomMode}
                  className="w-full text-left px-4 py-2.5 hover:bg-blue-50 transition-colors"
                  style={{ fontSize: 13, color: '#1d4ed8', borderTop: '1px solid rgba(12,31,61,0.06)' }}
                >
                  + Mi colegio no está en la lista
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Register({ onBack, onLogin, onSuccess }) {
  const { register, authLoading } = useAuth();

  const [form, setForm] = useState({
    nombre:         '',
    email:          '',
    password:       '',
    confirmPass:    '',
    anioNacimiento: '',
    situacion:      '',
    region:         '',
    colegioId:      null,
    colegioNombre:  '',
  });
  const [showPass,     setShowPass]     = useState(false);
  const [showConfirm,  setShowConfirm]  = useState(false);
  const [colegios,     setColegios]     = useState([]);
  const [loadingCols,  setLoadingCols]  = useState(false);
  const [error,        setError]        = useState('');
  const [loading,      setLoading]      = useState(false);
  const [emailSent,    setEmailSent]    = useState(false);

  const needsColegio = form.situacion === 'estudiante' || form.situacion === 'egresado';

  // Cargar colegios cuando cambia la región
  useEffect(() => {
    if (!form.region || !needsColegio) return;
    setLoadingCols(true);
    setColegios([]);
    setForm(f => ({ ...f, colegioId: null, colegioNombre: '' }));
    api.getColegiosByRegion(form.region)
      .then(data => setColegios(data))
      .catch(() => setColegios([]))
      .finally(() => setLoadingCols(false));
  }, [form.region, needsColegio]);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const validate = () => {
    if (!form.nombre.trim())         return 'Ingresa tu nombre.';
    if (!form.email.trim())          return 'Ingresa tu correo.';
    if (!/\S+@\S+\.\S+/.test(form.email)) return 'Correo no válido.';
    if (form.password.length < 6)    return 'La contraseña debe tener al menos 6 caracteres.';
    if (form.password !== form.confirmPass) return 'Las contraseñas no coinciden.';
    if (!form.anioNacimiento)        return 'Selecciona tu año de nacimiento.';
    if (!form.situacion)             return 'Selecciona tu situación actual.';
    if (needsColegio && !form.region) return 'Selecciona tu región.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const err = validate();
    if (err) { setError(err); return; }
    setLoading(true);
    try {
      const result = await register({
        email:          form.email.trim().toLowerCase(),
        password:       form.password,
        nombre:         form.nombre.trim(),
        anioNacimiento: Number(form.anioNacimiento),
        situacion:      form.situacion,
        region:         form.region || null,
        colegioId:      (form.colegioId && form.colegioId !== 'custom') ? form.colegioId : null,
      });

      if (result.needsEmailVerification) {
        setEmailSent(true);
      } else {
        // Sin confirmación (dev): ir al dashboard directamente
        onSuccess?.();
      }
    } catch (err) {
      if (err.message?.includes('already registered')) {
        setError('Este correo ya está registrado. ¿Quieres iniciar sesión?');
      } else {
        setError(err.message || 'No se pudo crear la cuenta. Intenta de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  // ── Pantalla de éxito ────────────────────────────────────────────
  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center grain" style={{ background: '#f8faff' }}>
        <div className="text-center max-w-sm px-6">
          {/* Ícono con anillo de éxito */}
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.12), rgba(29,78,216,0.1))' }}>
              <div className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(34,197,94,0.15)' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M20 7L9 18L4 13" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          <h1 className="font-display text-2xl font-semibold mb-2" style={{ color: '#0c1f3d' }}>
            ¡Cuenta creada con éxito!
          </h1>
          <p className="text-sm mb-5 leading-relaxed" style={{ color: 'rgba(12,31,61,0.55)' }}>
            Solo falta un paso: confirma tu correo para activar tu cuenta.
          </p>

          {/* Caja del correo */}
          <div className="rounded-xl px-4 py-3 mb-6" style={{ background: 'rgba(29,78,216,0.06)', border: '1px solid rgba(29,78,216,0.12)' }}>
            <p className="text-xs mb-1" style={{ color: 'rgba(12,31,61,0.45)' }}>Enviamos un enlace de activación a</p>
            <p className="font-semibold text-sm" style={{ color: '#1d4ed8' }}>{form.email}</p>
          </div>

          <p className="text-xs mb-8 leading-relaxed" style={{ color: 'rgba(12,31,61,0.4)' }}>
            Haz clic en el enlace del correo para activar tu cuenta.
            Luego podrás iniciar sesión normalmente.
          </p>

          <button
            onClick={onLogin}
            className="w-full py-3 rounded-xl text-sm font-semibold text-white mb-3 transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #1d4ed8, #2563eb)' }}
          >
            Ir al inicio de sesión
          </button>
          <button
            onClick={onBack}
            className="w-full py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-black/5"
            style={{ color: 'rgba(12,31,61,0.5)' }}
          >
            Volver al inicio
          </button>

          <p className="mt-5 text-xs" style={{ color: 'rgba(12,31,61,0.3)' }}>
            ¿No llegó el correo? Revisa la carpeta de spam.
          </p>
        </div>
      </div>
    );
  }

  const labelStyle = { fontSize: 12, fontWeight: 600, color: 'rgba(12,31,61,0.55)', marginBottom: 6, display: 'block', letterSpacing: '0.02em' };

  return (
    <div className="min-h-screen flex grain" style={{ background: '#f8faff' }}>

      {/* ── Panel izquierdo ── */}
      <div
        className="hidden lg:flex flex-col justify-between w-[380px] flex-shrink-0 p-12"
        style={{ background: 'linear-gradient(160deg, #0c1f3d, #1d4ed8)' }}
      >
        <div>
          <button onClick={onBack} className="flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors text-sm mb-12">
            <ArrowLeft size={15} /> Volver al inicio
          </button>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(59,130,246,0.3)' }}>
              <GraduationCap size={20} color="#93c5fd" />
            </div>
            <p className="text-white font-display font-semibold text-xl">PAES Prep</p>
          </div>
          <h2 className="font-display text-3xl font-light text-white leading-tight mb-4">
            Crea tu cuenta <em>gratis</em>
          </h2>
          <p className="text-white/55 text-sm leading-relaxed">
            Regístrate en menos de 2 minutos y comienza a prepararte con IA.
          </p>
        </div>

        <div className="space-y-4">
          {[
            ['🤖', 'IA personalizada', 'Preguntas generadas según tus áreas débiles.'],
            ['📈', 'Seguimiento real',  'Ve tu evolución con gráficos y estadísticas.'],
            ['🔥', 'Racha diaria',      'Mantén tu racha y sube en el ranking nacional.'],
          ].map(([icon, t, d]) => (
            <div key={t} className="flex items-start gap-3">
              <span className="text-lg">{icon}</span>
              <div>
                <p className="text-white text-sm font-semibold">{t}</p>
                <p className="text-white/45 text-xs">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Panel derecho (formulario) ── */}
      <div className="flex-1 flex items-start justify-center px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-lg">

          <button onClick={onBack} className="lg:hidden flex items-center gap-2 mb-8 text-sm font-medium" style={{ color: 'rgba(12,31,61,0.5)' }}>
            <ArrowLeft size={15} /> Volver
          </button>
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <GraduationCap size={22} style={{ color: '#1d4ed8' }} />
            <span className="font-display font-semibold text-xl" style={{ color: '#0c1f3d' }}>PAES Prep</span>
          </div>

          <h1 className="font-display text-3xl font-light mb-1" style={{ color: '#0c1f3d' }}>Crear cuenta</h1>
          <p className="text-sm mb-8" style={{ color: 'rgba(12,31,61,0.45)' }}>
            ¿Ya tienes cuenta?{' '}
            <button onClick={onLogin} className="font-semibold" style={{ color: '#1d4ed8' }}>Inicia sesión</button>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* ── Sección personal ── */}
            <div className="grid grid-cols-1 gap-4">
              {/* Nombre */}
              <div>
                <label style={labelStyle}>NOMBRE</label>
                <div className="relative">
                  <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(12,31,61,0.35)' }} />
                  <input
                    type="text"
                    placeholder="¿Cómo te llamas?"
                    value={form.nombre}
                    onChange={e => set('nombre', e.target.value)}
                    style={inputWithIconStyle}
                    autoComplete="given-name"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label style={labelStyle}>CORREO ELECTRÓNICO</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(12,31,61,0.35)' }} />
                  <input
                    type="email"
                    placeholder="tu@correo.com"
                    value={form.email}
                    onChange={e => set('email', e.target.value)}
                    style={inputWithIconStyle}
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Contraseña */}
              <div className="space-y-3">
                <div>
                  <label style={labelStyle}>CONTRASEÑA</label>
                  <div className="relative">
                    <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(12,31,61,0.35)' }} />
                    <input
                      type={showPass ? 'text' : 'password'}
                      placeholder="Mínimo 6 caracteres"
                      value={form.password}
                      onChange={e => set('password', e.target.value)}
                      style={{
                        ...inputWithIconStyle,
                        paddingRight: 40,
                        ...(form.password.length >= 6 && { borderColor: STRENGTH_COLORS[getPasswordStrength(form.password)] }),
                      }}
                      autoComplete="new-password"
                    />
                    <button type="button" onClick={() => setShowPass(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(12,31,61,0.35)' }}>
                      {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                  {/* Barra de seguridad */}
                  {form.password && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1">
                        {[1, 2, 3].map(level => {
                          const s = getPasswordStrength(form.password);
                          return (
                            <div
                              key={level}
                              style={{
                                flex: 1, height: 3, borderRadius: 2,
                                background: level <= s ? STRENGTH_COLORS[s] : 'rgba(12,31,61,0.1)',
                                transition: 'background 0.2s',
                              }}
                            />
                          );
                        })}
                      </div>
                      <p style={{ fontSize: 11, color: form.password.length < 6 ? '#ef4444' : STRENGTH_COLORS[getPasswordStrength(form.password)] }}>
                        {form.password.length < 6
                          ? 'Mínimo 6 caracteres'
                          : `Seguridad: ${STRENGTH_LABELS[getPasswordStrength(form.password)]}`}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label style={labelStyle}>CONFIRMAR CONTRASEÑA</label>
                  <div className="relative">
                    <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(12,31,61,0.35)' }} />
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      placeholder="Repite la contraseña"
                      value={form.confirmPass}
                      onChange={e => set('confirmPass', e.target.value)}
                      style={{
                        ...inputWithIconStyle,
                        paddingRight: 40,
                        ...(form.confirmPass && {
                          borderColor: form.password === form.confirmPass ? '#22c55e' : 'rgba(239,68,68,0.5)',
                        }),
                      }}
                      autoComplete="new-password"
                    />
                    <button type="button" onClick={() => setShowConfirm(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(12,31,61,0.35)' }}>
                      {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                  {/* Indicador de coincidencia */}
                  {form.confirmPass && (
                    <p style={{ fontSize: 11, marginTop: 4, color: form.password === form.confirmPass ? '#16a34a' : '#dc2626' }}>
                      {form.password === form.confirmPass ? '✓ Las contraseñas coinciden' : '✗ No coinciden aún'}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ── Separador ── */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: 'rgba(12,31,61,0.08)' }} />
              <span className="text-xs font-medium" style={{ color: 'rgba(12,31,61,0.3)' }}>TU PERFIL</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(12,31,61,0.08)' }} />
            </div>

            {/* Año de nacimiento + Situación */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label style={labelStyle}>AÑO DE NACIMIENTO</label>
                <select
                  value={form.anioNacimiento}
                  onChange={e => set('anioNacimiento', e.target.value)}
                  style={{ ...inputStyle, cursor: 'pointer', color: form.anioNacimiento ? '#0c1f3d' : 'rgba(12,31,61,0.35)' }}
                >
                  <option value="">Selecciona</option>
                  {ANIOS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>SITUACIÓN ACTUAL</label>
                <select
                  value={form.situacion}
                  onChange={e => { set('situacion', e.target.value); set('region', ''); set('colegioId', null); }}
                  style={{ ...inputStyle, cursor: 'pointer', color: form.situacion ? '#0c1f3d' : 'rgba(12,31,61,0.35)' }}
                >
                  <option value="">Selecciona</option>
                  {SITUACIONES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
            </div>

            {/* ── Colegio (condicional) ── */}
            {needsColegio && (
              <>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px" style={{ background: 'rgba(12,31,61,0.08)' }} />
                  <span className="text-xs font-medium" style={{ color: 'rgba(12,31,61,0.3)' }}>COLEGIO</span>
                  <div className="flex-1 h-px" style={{ background: 'rgba(12,31,61,0.08)' }} />
                </div>

                <div>
                  <label style={labelStyle}>REGIÓN</label>
                  <select
                    value={form.region}
                    onChange={e => set('region', e.target.value)}
                    style={{ ...inputStyle, cursor: 'pointer', color: form.region ? '#0c1f3d' : 'rgba(12,31,61,0.35)' }}
                  >
                    <option value="">Selecciona tu región</option>
                    {REGIONES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>

                {form.region && (
                  <div>
                    <label style={labelStyle}>
                      {form.situacion === 'egresado' ? 'COLEGIO DE EGRESO' : 'COLEGIO'}
                      <span style={{ fontWeight: 400, color: 'rgba(12,31,61,0.35)', marginLeft: 4 }}>(opcional)</span>
                    </label>
                    <ColegioSelect
                      colegios={colegios}
                      value={form.colegioId}
                      onChange={(id, nombre) => { set('colegioId', id); set('colegioNombre', nombre); }}
                      loading={loadingCols}
                    />
                    <p className="mt-1.5 text-xs" style={{ color: 'rgba(12,31,61,0.35)' }}>
                      Establecimientos con enseñanza media por región. Si el tuyo no aparece, puedes ingresarlo manualmente.
                    </p>
                  </div>
                )}
              </>
            )}

            {/* Error */}
            {error && (
              <div className="flex items-start gap-3 px-4 py-3 rounded-xl text-sm" style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)', color: '#991b1b' }}>
                <AlertCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} />
                <span>
                  {error}
                  {error.includes('ya está registrado') && (
                    <> <button type="button" onClick={onLogin} className="underline font-semibold">Iniciar sesión</button></>
                  )}
                </span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || authLoading}
              className="w-full py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg, #1d4ed8, #2563eb)' }}
            >
              {(loading || authLoading) ? <Loader2 size={16} className="animate-spin" /> : 'Crear cuenta gratis'}
            </button>
          </form>

          <p className="mt-6 text-center text-xs leading-relaxed" style={{ color: 'rgba(12,31,61,0.3)' }}>
            Al registrarte aceptas que tu información se almacene para personalizar tu experiencia. No compartimos tus datos con terceros.
          </p>
        </div>
      </div>
    </div>
  );
}
