import { useState } from 'react';
import { ArrowLeft, GraduationCap, AlertCircle, Loader2, FlaskConical, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login({ onLogin, onBack, onRegister }) {
  const { login, loginDemo, resetPassword, authLoading } = useAuth();
  const [email,        setEmail]        = useState('');
  const [password,     setPassword]     = useState('');
  const [showPass,     setShowPass]     = useState(false);
  const [error,        setError]        = useState('');
  const [resetMode,    setResetMode]    = useState(false);
  const [resetSent,    setResetSent]    = useState(false);
  const [loading,      setLoading]      = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password) { setError('Completa todos los campos.'); return; }
    setLoading(true);
    try {
      await login({ email: email.trim().toLowerCase(), password });
      onLogin();
    } catch (err) {
      const msg = (err.message || '').toLowerCase();
      if (msg.includes('correo o contraseña incorrectos') || msg.includes('invalid login credentials') || msg.includes('invalid_credentials')) {
        setError('not_found');
      } else if (msg.includes('debes verificar') || msg.includes('email not confirmed')) {
        setError('unverified');
      } else if (msg.includes('too many') || msg.includes('rate limit')) {
        setError('Demasiados intentos. Espera unos minutos e intenta de nuevo.');
      } else {
        setError(err.message || 'No se pudo iniciar sesión. Intenta de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim()) { setError('Ingresa tu correo para recuperar tu contraseña.'); return; }
    setLoading(true);
    try {
      await resetPassword(email.trim().toLowerCase());
      setResetSent(true);
    } catch (err) {
      setError(err.message || 'No se pudo enviar el correo. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemo = () => { loginDemo(); onLogin(); };

  const inputBase = {
    width: '100%',
    border: '1.5px solid rgba(12,31,61,0.12)',
    borderRadius: 12,
    padding: '11px 14px 11px 42px',
    fontSize: 14,
    color: '#0c1f3d',
    background: '#fff',
    outline: 'none',
    transition: 'border-color 0.15s',
  };

  return (
    <div className="min-h-screen flex grain" style={{ background: '#f8faff' }}>

      {/* ── Panel izquierdo ── */}
      <div
        className="hidden lg:flex flex-col justify-between w-[420px] flex-shrink-0 p-12"
        style={{ background: 'linear-gradient(160deg, #0c1f3d, #1d4ed8)' }}
      >
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors text-sm mb-12"
          >
            <ArrowLeft size={15} /> Volver al inicio
          </button>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(59,130,246,0.3)' }}>
              <GraduationCap size={20} color="#93c5fd" />
            </div>
            <p className="text-white font-display font-semibold text-xl">PAES Prep</p>
          </div>
          <h2 className="font-display text-4xl font-light text-white leading-tight mb-4">
            Tu preparación <em>comienza aquí</em>
          </h2>
          <p className="text-white/55 text-sm leading-relaxed">
            Ingresa con tu correo y contraseña para acceder a tu progreso, estadísticas y ranking.
          </p>
        </div>

        <div className="space-y-4">
          {[
            ['🎯', 'Progreso guardado', 'Tu historial y puntajes se guardan automáticamente.'],
            ['📊', 'Estadísticas reales', 'Ve cómo evolucionas sesión a sesión con datos reales.'],
            ['🏆', 'Ranking nacional', 'Compárate con otros estudiantes que usan la plataforma.'],
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

      {/* ── Panel derecho ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          <button onClick={onBack} className="lg:hidden flex items-center gap-2 mb-8 text-sm font-medium" style={{ color: 'rgba(12,31,61,0.5)' }}>
            <ArrowLeft size={15} /> Volver
          </button>
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <GraduationCap size={22} style={{ color: '#1d4ed8' }} />
            <span className="font-display font-semibold text-xl" style={{ color: '#0c1f3d' }}>PAES Prep</span>
          </div>

          {/* ── Recuperar contraseña ── */}
          {resetMode ? (
            <>
              <h1 className="font-display text-3xl font-light mb-2" style={{ color: '#0c1f3d' }}>Recuperar contraseña</h1>
              <p className="text-sm mb-8" style={{ color: 'rgba(12,31,61,0.45)' }}>
                Te enviaremos un enlace para crear una nueva contraseña.
              </p>

              {resetSent ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">📬</div>
                  <p className="font-semibold text-base mb-1" style={{ color: '#0c1f3d' }}>Correo enviado</p>
                  <p className="text-sm mb-6" style={{ color: 'rgba(12,31,61,0.5)' }}>
                    Revisa tu bandeja de entrada y sigue el enlace para restablecer tu contraseña.
                  </p>
                  <button onClick={() => { setResetMode(false); setResetSent(false); }} className="text-sm font-medium" style={{ color: '#1d4ed8' }}>
                    Volver al login
                  </button>
                </div>
              ) : (
                <form onSubmit={handleReset} className="space-y-4">
                  <div className="relative">
                    <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(12,31,61,0.35)' }} />
                    <input type="email" placeholder="Tu correo electrónico" value={email} onChange={e => setEmail(e.target.value)} style={inputBase} />
                  </div>
                  {error && (
                    <div className="flex items-start gap-3 px-4 py-3 rounded-xl text-sm" style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)', color: '#991b1b' }}>
                      <AlertCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} />{error}
                    </div>
                  )}
                  <button type="submit" disabled={loading} className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-60" style={{ background: 'linear-gradient(135deg, #1d4ed8, #2563eb)' }}>
                    {loading ? <Loader2 size={16} className="animate-spin mx-auto" /> : 'Enviar enlace de recuperación'}
                  </button>
                  <button type="button" onClick={() => { setResetMode(false); setError(''); }} className="w-full text-sm text-center" style={{ color: 'rgba(12,31,61,0.45)' }}>
                    Cancelar
                  </button>
                </form>
              )}
            </>
          ) : (
            <>
              <h1 className="font-display text-3xl font-light mb-2" style={{ color: '#0c1f3d' }}>Accede a tu cuenta</h1>
              <p className="text-sm mb-8" style={{ color: 'rgba(12,31,61,0.45)' }}>
                ¿No tienes cuenta?{' '}
                <button onClick={onRegister} className="font-semibold" style={{ color: '#1d4ed8' }}>Regístrate gratis</button>
              </p>

              {/* ── Formulario login ── */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div className="relative">
                  <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(12,31,61,0.35)' }} />
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={inputBase}
                    autoComplete="email"
                  />
                </div>

                {/* Contraseña */}
                <div className="relative">
                  <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(12,31,61,0.35)' }} />
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="Contraseña"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{ ...inputBase, paddingRight: 44 }}
                    autoComplete="current-password"
                  />
                  <button type="button" onClick={() => setShowPass(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(12,31,61,0.35)' }}>
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>

                <div className="text-right">
                  <button type="button" onClick={() => { setResetMode(true); setError(''); }} className="text-xs" style={{ color: 'rgba(12,31,61,0.4)' }}>
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                {error && (
                  <div className="flex items-start gap-3 px-4 py-3 rounded-xl text-sm" style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)', color: '#991b1b' }}>
                    <AlertCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} />
                    <span>
                      {error === 'not_found' && (
                        <>Correo no registrado o contraseña incorrecta.{' '}
                          <button type="button" onClick={onRegister} className="underline font-semibold">Crear cuenta gratis</button>
                        </>
                      )}
                      {error === 'unverified' && (
                        <>Tu cuenta aún no está verificada. Revisa tu correo y haz clic en el enlace de activación.</>
                      )}
                      {error !== 'not_found' && error !== 'unverified' && error}
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || authLoading}
                  className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #1d4ed8, #2563eb)' }}
                >
                  {(loading || authLoading) ? <Loader2 size={16} className="animate-spin" /> : 'Ingresar'}
                </button>
              </form>

              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px" style={{ background: 'rgba(12,31,61,0.08)' }} />
                <span className="text-xs" style={{ color: 'rgba(12,31,61,0.3)' }}>o</span>
                <div className="flex-1 h-px" style={{ background: 'rgba(12,31,61,0.08)' }} />
              </div>

              <button
                onClick={handleDemo}
                className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-medium transition-all hover:scale-[1.01]"
                style={{ background: '#f8faff', border: '1.5px solid rgba(12,31,61,0.12)', color: 'rgba(12,31,61,0.65)' }}
              >
                <FlaskConical size={15} />
                Explorar en modo demo
              </button>

              <p className="mt-3 text-center text-xs" style={{ color: 'rgba(12,31,61,0.35)' }}>
                El modo demo usa datos de ejemplo. No se guarda progreso real.
              </p>

              <p className="mt-8 text-center text-xs leading-relaxed" style={{ color: 'rgba(12,31,61,0.3)' }}>
                Al ingresar aceptas que tu información se almacene para personalizar tu experiencia. No compartimos tus datos con terceros.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
