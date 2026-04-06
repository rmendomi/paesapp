import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { api, IS_DEMO_BACKEND } from '../api';
import {
  studentProfile,
  progressStats as mockStats,
  recentActivity as mockActivity,
  initialStreakData,
  leaderboardData,
} from '../data/mockData';

const AuthContext = createContext(null);

const EXAM_IDS = ['lectora', 'm1', 'm2', 'historia', 'ciencias'];

// Decodifica el JWT de Google sin dependencias externas
function decodeGoogleJwt(token) {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(
      decodeURIComponent(
        atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
      )
    );
  } catch { return null; }
}

function todayStr()     { return new Date().toISOString().split('T')[0]; }
function yesterdayStr() { return new Date(Date.now() - 86400000).toISOString().split('T')[0]; }

function computeNextStreak(s) {
  const today = todayStr();
  if (s.lastActivity === today) return s; // ya registrado hoy
  if (s.lastActivity === yesterdayStr()) {
    return {
      ...s,
      current:      (s.current || 0) + 1,
      best:         Math.max(s.best || 0, (s.current || 0) + 1),
      lastActivity: today,
      totalDays:    (s.totalDays || 0) + 1,
      history:      { ...s.history, [today]: true },
    };
  }
  // Racha rota (o primer día)
  if (!s.lastActivity) {
    return { ...s, current: 0, lastActivity: '' };
  }
  return { ...s, current: 0 };
}

export function AuthProvider({ children }) {
  const [user,        setUser]        = useState(null);
  const [sessions,    setSessions]    = useState([]);
  const [streak,      setStreak]      = useState({ current: 0, best: 0, totalDays: 0, lastActivity: '', history: {} });
  const [planner,     setPlanner]     = useState({ weekId: '', planId: 'standard', progress: {} });
  const [leaderboard, setLeaderboard] = useState([]);
  const [isDemo,      setIsDemo]      = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  // ── Login con Google OAuth ───────────────────────────────────────
  const login = useCallback(async (credential) => {
    setAuthLoading(true);
    try {
      const g = decodeGoogleJwt(credential);
      if (!g) throw new Error('Token de Google inválido');

      const { user: u } = await api.getOrCreateUser({
        email:   g.email,
        name:    g.name,
        picture: g.picture,
      });
      setUser(u);

      const data = await api.getUserData(g.email);
      setSessions(data.sessions || []);

      const raw = data.streak || {};
      const s   = computeNextStreak({
        current:      Number(raw.current)   || 0,
        best:         Number(raw.best)      || 0,
        totalDays:    Number(raw.totalDays) || 0,
        lastActivity: raw.lastActivity      || '',
        history:      raw.history           || {},
      });
      setStreak(s);
      if (s !== raw) {
        api.updateStreak(g.email, s).catch(() => {});
      }

      setPlanner(data.planner || { weekId: '', planId: 'standard', progress: {} });
      setIsDemo(false);
      return u;
    } finally {
      setAuthLoading(false);
    }
  }, []);

  // ── Login modo demo (sin cuenta real) ───────────────────────────
  const loginDemo = useCallback(() => {
    setUser({ ...studentProfile, picture: null });
    setSessions([]);
    setStreak(initialStreakData);
    setPlanner({ weekId: '', planId: 'standard', progress: {} });
    setIsDemo(true);
  }, []);

  // ── Logout ──────────────────────────────────────────────────────
  const logout = useCallback(() => {
    setUser(null);
    setSessions([]);
    setStreak({ current: 0, best: 0, totalDays: 0, lastActivity: '', history: {} });
    setPlanner({ weekId: '', planId: 'standard', progress: {} });
    setLeaderboard([]);
    setIsDemo(false);
  }, []);

  // ── Actualizar perfil ────────────────────────────────────────────
  const updateProfile = useCallback(async (data) => {
    if (!user) return;
    if (!isDemo && !IS_DEMO_BACKEND) {
      await api.updateProfile({ email: user.email, ...data });
    }
    setUser(prev => ({ ...prev, ...data }));
  }, [user, isDemo]);

  // ── Guardar sesión de práctica + actualizar racha ───────────────
  const saveSession = useCallback(async (sessionData) => {
    if (!user) return;
    const date       = new Date().toISOString();
    const newSession = { userEmail: user.email, ...sessionData, date };

    if (!isDemo && !IS_DEMO_BACKEND) {
      api.saveSession(newSession).catch(() => {});
    }
    setSessions(prev => [...prev, newSession]);

    // Actualizar streak si aplica
    setStreak(prev => {
      const today = todayStr();
      if (prev.lastActivity === today) return prev;
      const yday = yesterdayStr();
      let ns;
      if (prev.lastActivity === yday) {
        ns = {
          ...prev,
          current:      prev.current + 1,
          best:         Math.max(prev.best, prev.current + 1),
          lastActivity: today,
          totalDays:    prev.totalDays + 1,
          history:      { ...prev.history, [today]: true },
        };
      } else {
        ns = {
          ...prev,
          current:      1,
          lastActivity: today,
          totalDays:    prev.totalDays + 1,
          history:      { ...prev.history, [today]: true },
        };
      }
      if (!isDemo && !IS_DEMO_BACKEND) {
        api.updateStreak(user.email, ns).catch(() => {});
      }
      return ns;
    });
  }, [user, isDemo]);

  // ── Guardar progreso del planificador ───────────────────────────
  const savePlannerProgress = useCallback(async (weekId, planId, progress) => {
    if (!user) return;
    if (!isDemo && !IS_DEMO_BACKEND) {
      api.savePlannerProgress(user.email, weekId, planId, progress).catch(() => {});
    }
    setPlanner({ weekId, planId, progress });
  }, [user, isDemo]);

  // ── Cargar leaderboard ───────────────────────────────────────────
  const fetchLeaderboard = useCallback(async () => {
    if (isDemo || IS_DEMO_BACKEND) {
      setLeaderboard(leaderboardData);
      return;
    }
    try {
      const r = await api.getLeaderboard();
      setLeaderboard(r.leaderboard || []);
    } catch {
      setLeaderboard(leaderboardData);
    }
  }, [isDemo]);

  // ── Estadísticas derivadas ───────────────────────────────────────
  const progressStats = useMemo(() => {
    // Modo demo sin sesiones → usar datos mock
    if (isDemo && sessions.length === 0) return mockStats;

    const stats = {};
    EXAM_IDS.forEach(id => {
      const es = sessions.filter(s => s.examId === id);
      stats[id] = {
        attempted: es.length,
        correct:   es.reduce((sum, s) => sum + (Number(s.correct) || 0), 0),
        lastScore: es.length > 0 ? Number(es[es.length - 1].score) : 0,
        trend:     es.slice(-5).map(s => Number(s.score)),
      };
    });
    return stats;
  }, [sessions, isDemo]);

  const recentActivity = useMemo(() => {
    if (isDemo && sessions.length === 0) return mockActivity;
    return [...sessions].reverse().slice(0, 5);
  }, [sessions, isDemo]);

  return (
    <AuthContext.Provider value={{
      user, sessions, streak, planner, leaderboard,
      isDemo, authLoading,
      progressStats, recentActivity,
      login, loginDemo, logout,
      updateProfile, saveSession, savePlannerProgress, fetchLeaderboard,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
