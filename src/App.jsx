import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import Landing     from './pages/Landing';
import Login       from './pages/Login';
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
  calculator:   Calculator,
  universities: Universities,
  planner:      Planner,
  leaderboard:  Leaderboard,
};

const PAGE_TITLES = {
  dashboard:    'Panel Principal',
  exams:        'Pruebas PAES',
  progress:     'Mi Progreso',
  settings:     'Configuración',
  calculator:   'Calculadora PAES',
  universities: 'Universidades',
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

  const { user, logout } = useAuth();

  const navigate = (target, data) => {
    if (target === 'practice' && data) setPracticeData(data);
    if (target === 'results'  && data) setResultData(data);
    setView(target);
  };

  const handleLogin  = () => setView('dashboard');
  const handleLogout = () => { logout(); setView('landing'); };

  // ── Páginas públicas
  if (view === 'landing') return <Landing onEnter={() => setView('login')} />;
  if (view === 'login')   return <Login   onLogin={handleLogin} onBack={() => setView('landing')} />;

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
