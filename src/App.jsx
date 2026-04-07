import { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import Landing     from './pages/Landing';
import Login       from './pages/Login';
import Register    from './pages/Register';
import Dashboard   from './pages/Dashboard';
import Exams       from './pages/Exams';
import Practice    from './pages/Practice';
import Results     from './pages/Results';
import Progress    from './pages/Progress';
import Settings    from './pages/Settings';
import Calculator  from './pages/Calculator';
import Universities from './pages/Universities';
import Planner     from './pages/Planner';
import Leaderboard from './pages/Leaderboard';
import Sidebar     from './components/Sidebar';

const studentPages = {
  dashboard:    Dashboard,
  exams:        Exams,
  progress:     Progress,
  settings:     Settings,
  calculator:   Universities,   // calculator redirige a Universities (están integradas)
  universities: Universities,
  planner:      Planner,
  leaderboard:  Leaderboard,
};

const PAGE_TITLES = {
  dashboard:    'Panel Principal',
  exams:        'Pruebas PAES',
  progress:     'Mi Progreso',
  settings:     'Configuración',
  calculator:   'Universidades y Calculadora',
  universities: 'Universidades y Calculadora',
  planner:      'Planificador',
  leaderboard:  'Ranking',
};

function getInitials(name) {
  if (!name) return '?';
  const parts = name.trim().split(' ');
  return ((parts[0]?.[0] || '') + (parts[1]?.[0] || '')).toUpperCase();
}

export default function App() {
  const [view,         setView]         = useState('landing');
  const [practiceData, setPracticeData] = useState(null);
  const [resultData,   setResultData]   = useState(null);

  const { user, logout, authLoading } = useAuth();

  // Si hay sesión activa al cargar, ir directo al dashboard
  useEffect(() => {
    if (!authLoading && user && (view === 'landing' || view === 'login' || view === 'register')) {
      setView('dashboard');
    }
  }, [user, authLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  const navigate = (target, data) => {
    if (target === 'practice' && data) setPracticeData(data);
    if (target === 'results'  && data) setResultData(data);
    setView(target);
  };

  const handleLogin  = () => setView('dashboard');
  const handleLogout = () => { logout(); setView('landing'); };

  // ── Pantalla de carga inicial (verificando sesión) ────────────────
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#f8faff' }}>
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(29,78,216,0.1)' }}>
            <svg className="animate-spin" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#1d4ed8" strokeWidth="2" strokeOpacity="0.25"/>
              <path d="M12 2a10 10 0 0 1 10 10" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <p className="text-sm font-medium" style={{ color: 'rgba(12,31,61,0.5)' }}>Cargando…</p>
        </div>
      </div>
    );
  }

  // ── Páginas públicas
  if (view === 'landing')  return <Landing  onEnter={() => setView('login')} />;
  if (view === 'register') return <Register onBack={() => setView('landing')} onLogin={() => setView('login')} onSuccess={handleLogin} />;
  if (view === 'login')    return <Login    onLogin={handleLogin} onBack={() => setView('landing')} onRegister={() => setView('register')} />;

  // ── Flujo de práctica (sin sidebar)
  if (view === 'practice') {
    return (
      <Practice
        data={practiceData}
        onFinish={(res) => navigate('results', res)}
        onBack={() => setView('exams')}
      />
    );
  }
  if (view === 'results') {
    return (
      <Results
        data={resultData}
        onPracticeAgain={() => setView('exams')}
        onDashboard={() => setView('dashboard')}
      />
    );
  }

  // ── Portal del estudiante (con sidebar)
  const PageComponent = studentPages[view] || Dashboard;
  const initials      = getInitials(user?.name);

  return (
    <div className="flex min-h-screen">
      <Sidebar current={view} onNavigate={navigate} onLogout={handleLogout} />

      <main className="flex-1 ml-64 min-h-screen" style={{ background: '#f8faff' }}>
        {/* Top bar */}
        <div
          className="sticky top-0 z-30 h-14 flex items-center px-8 justify-between backdrop-blur-md"
          style={{ background: 'rgba(248,250,255,0.92)', borderBottom: '1px solid rgba(12,31,61,0.06)' }}
        >
          <p className="font-display text-base font-semibold capitalize" style={{ color: '#0c1f3d' }}>
            {PAGE_TITLES[view] || view}
          </p>
          <div className="flex items-center gap-3">
            {user?.picture ? (
              <img
                src={user.picture}
                alt={user.name}
                className="w-7 h-7 rounded-full object-cover"
                style={{ border: '1.5px solid rgba(59,130,246,0.25)' }}
                referrerPolicy="no-referrer"
              />
            ) : (
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold"
                style={{ background: 'rgba(59,130,246,0.15)', color: '#1d4ed8', border: '1.5px solid rgba(59,130,246,0.25)' }}
              >
                {initials}
              </div>
            )}
          </div>
        </div>

        <PageComponent onNavigate={navigate} />
      </main>
    </div>
  );
}
