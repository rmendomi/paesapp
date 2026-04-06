import { useState } from 'react';
import { ArrowLeft, GraduationCap, AlertCircle, Loader2, FlaskConical } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';

export default function Login({ onLogin, onBack }) {
  const { login, loginDemo, authLoading } = useAuth();
  const [error, setError] = useState('');

  const handleGoogleSuccess = async (credentialResponse) => {
    setError('');
    try {
      await login(credentialResponse.credential);
      onLogin();
    } catch (err) {
      setError('No se pudo conectar. Verifica tu conexión e intenta de nuevo.');
      console.error('[Login]', err);
    }
  };

  const handleDemo = () => {
    loginDemo();
    onLogin();
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
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(59,130,246,0.3)' }}>
              <GraduationCap size={20} color="#93c5fd" />
            </div>
            <p className="text-white font-display font-semibold text-xl">PAES Prep</p>
          </div>

          <h2 className="font-display text-4xl font-light text-white leading-tight mb-4">
            Tu preparación <em>comienza aquí</em>
          </h2>
          <p className="text-white/55 text-sm leading-relaxed">
            Inicia sesión con tu cuenta Google para acceder a tu progreso real, ranking y estadísticas personalizadas.
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

          <button
            onClick={onBack}
            className="lg:hidden flex items-center gap-2 mb-8 text-sm font-medium"
            style={{ color: 'rgba(12,31,61,0.5)' }}
          >
            <ArrowLeft size={15} /> Volver
          </button>

          <div className="lg:hidden flex items-center gap-2 mb-8">
            <GraduationCap size={22} style={{ color: '#1d4ed8' }} />
            <span className="font-display font-semibold text-xl" style={{ color: '#0c1f3d' }}>PAES Prep</span>
          </div>

          <h1 className="font-display text-3xl font-light mb-2" style={{ color: '#0c1f3d' }}>
            Accede a tu cuenta
          </h1>
          <p className="text-sm mb-8" style={{ color: 'rgba(12,31,61,0.45)' }}>
            Usa tu cuenta Google para iniciar sesión de forma segura.
          </p>

          {/* ── Google Sign-In ── */}
          <div className="flex flex-col items-center gap-4">
            {authLoading ? (
              <div className="flex items-center gap-3 py-4">
                <Loader2 size={20} className="animate-spin" style={{ color: '#1d4ed8' }} />
                <span className="text-sm" style={{ color: 'rgba(12,31,61,0.6)' }}>
                  Verificando credenciales…
                </span>
              </div>
            ) : (
              <div className="w-full flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => setError('No se pudo abrir el inicio de sesión de Google.')}
                  text="signin_with"
                  shape="rectangular"
                  theme="filled_blue"
                  size="large"
                  locale="es"
                  width="320"
                />
              </div>
            )}

            {error && (
              <div
                className="w-full flex items-start gap-3 px-4 py-3 rounded-xl text-sm"
                style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)', color: '#991b1b' }}
              >
                <AlertCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} />
                {error}
              </div>
            )}
          </div>

          {/* ── Separador ── */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{ background: 'rgba(12,31,61,0.08)' }} />
            <span className="text-xs" style={{ color: 'rgba(12,31,61,0.3)' }}>o</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(12,31,61,0.08)' }} />
          </div>

          {/* ── Modo demo ── */}
          <button
            onClick={handleDemo}
            disabled={authLoading}
            className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-medium transition-all hover:scale-[1.01] disabled:opacity-60"
            style={{
              background: '#f8faff',
              border: '1.5px solid rgba(12,31,61,0.12)',
              color: 'rgba(12,31,61,0.65)',
            }}
          >
            <FlaskConical size={15} />
            Explorar en modo demo
          </button>

          <p className="mt-3 text-center text-xs" style={{ color: 'rgba(12,31,61,0.35)' }}>
            El modo demo usa datos de ejemplo. No se guarda progreso real.
          </p>

          {/* ── Aviso de privacidad ── */}
          <p className="mt-8 text-center text-xs leading-relaxed" style={{ color: 'rgba(12,31,61,0.3)' }}>
            Al iniciar sesión aceptas que tu nombre y correo Google se almacenen para personalizar tu experiencia. No compartimos tus datos con terceros.
          </p>
        </div>
      </div>
    </div>
  );
}
