import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { supabase } from '../lib/supabase';
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

function todayStr()     { return new Date().toISOString().split('T')[0]; }
function yesterdayStr() { return new Date(Date.now() - 86400000).toISOString().split('T')[0]; }

function computeNextStreak(s) {
  const today = todayStr();
  if (s.lastActivity === today) return s;
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
  if (!s.lastActivity) return { ...s, current: 0, lastActivity: '' };
  return { ...s, current: 0 };
}

export function AuthProvider({ children }) {
  const [user,        setUser]        = useState(null);
  const [sessions,    setSessions]    = useState([]);
  const [streak,      setStreak]      = useState({ current: 0, best: 0, totalDays: 0, lastActivity: '', history: {} });
  const [planner,     setPlanner]     = useState({ weekId: '', planId: 'standard', progress: {} });
  const [leaderboard, setLeaderboard] = useState([]);
  const [isDemo,      setIsDemo]      = useState(false);
  const [authLoading, setAuthLoading] = useState(true); // true hasta verificar sesión inicial

  // ── Carga todos los datos de un usuario autenticado ──────────────
  const loadUserData = useCallback(async (email) => {
    try {
      const profile = await api.getUserProfile(email);
      if (!profile) {
        // Sesión Auth válida pero sin fila en usuarios → cerrar sesión para que pueda re-registrarse
        console.warn('[AuthContext] Usuario sin perfil en tabla usuarios, cerrando sesión:', email);
        await supabase.auth.signOut();
        return;
      }
      setUser(profile);

      const data = await api.getUserData(email);
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
      if (s !== raw) api.updateStreak(email, s).catch(() => {});

      setPlanner(data.planner || { weekId: '', planId: 'standard', progress: {} });
      setIsDemo(false);
    } catch (err) {
      console.error('[AuthContext] loadUserData:', err);
    }
  }, []);

  // ── Escuchar cambios de sesión Supabase Auth ─────────────────────
  useEffect(() => {
    if (IS_DEMO_BACKEND) { setAuthLoading(false); return; }

    let resolved = false;
    const resolve = () => { if (!resolved) { resolved = true; setAuthLoading(false); } };

    // Timeout de seguridad: si getSession tarda más de 5s, liberar el loading
    const timeout = setTimeout(() => {
      console.warn('[AuthContext] getSession timeout — liberando loading');
      resolve();
    }, 5000);

    // Verificar si hay sesión activa al montar
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        clearTimeout(timeout);
        resolve();
        if (session?.user?.email) {
          loadUserData(session.user.email); // sin await — no bloquea
        }
      })
      .catch((err) => {
        clearTimeout(timeout);
        console.error('[AuthContext] getSession error:', err);
        resolve();
      });

    // Suscribirse a cambios de auth (login / logout / verificación email)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user?.email) {
        await loadUserData(session.user.email);
      }
      if (event === 'SIGNED_OUT') {
        setUser(null);
        setSessions([]);
        setStreak({ current: 0, best: 0, totalDays: 0, lastActivity: '', history: {} });
        setPlanner({ weekId: '', planId: 'standard', progress: {} });
        setLeaderboard([]);
        setIsDemo(false);
      }
    });

    return () => { clearTimeout(timeout); subscription.unsubscribe(); };
  }, [loadUserData]);

  // ── Registro con email + contraseña ─────────────────────────────
  const register = useCallback(async ({ email, password, nombre, anioNacimiento, situacion, region, colegioId }) => {
    setAuthLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw new Error(error.message);

      // Crear perfil en tabla usuarios
      await api.createUserProfile({ email, nombre, anioNacimiento, situacion, region, colegioId });

      // Si Supabase devuelve sesión inmediata (email confirm desactivado en dev)
      if (data.session) {
        await loadUserData(email);
      }

      return { needsEmailVerification: !data.session };
    } finally {
      setAuthLoading(false);
    }
  }, [loadUserData]);

  // ── Login con email + contraseña ─────────────────────────────────
  const login = useCallback(async ({ email, password }) => {
    setAuthLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        if (error.message.includes('Email not confirmed')) {
          throw new Error('Debes verificar tu correo antes de ingresar. Revisa tu bandeja de entrada.');
        }
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('Correo o contraseña incorrectos. Verifica tus datos.');
        }
        throw new Error(error.message);
      }
      // onAuthStateChange SIGNED_IN cargará los datos
    } finally {
      setAuthLoading(false);
    }
  }, []);

  // ── Login modo demo ──────────────────────────────────────────────
  const loginDemo = useCallback(() => {
    setUser({ ...studentProfile, picture: null });
    setSessions([]);
    setStreak(initialStreakData);
    setPlanner({ weekId: '', planId: 'standard', progress: {} });
    setIsDemo(true);
  }, []);

  // ── Logout ───────────────────────────────────────────────────────
  const logout = useCallback(async () => {
    if (isDemo) {
      setUser(null);
      setSessions([]);
      setStreak({ current: 0, best: 0, totalDays: 0, lastActivity: '', history: {} });
      setPlanner({ weekId: '', planId: 'standard', progress: {} });
      setLeaderboard([]);
      setIsDemo(false);
      return;
    }
    await supabase.auth.signOut(); // onAuthStateChange SIGNED_OUT limpiará el estado
  }, [isDemo]);

  // ── Recuperar contraseña ─────────────────────────────────────────
  const resetPassword = useCallback(async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin,
    });
    if (error) throw new Error(error.message);
  }, []);

  // ── Actualizar perfil ────────────────────────────────────────────
  const updateProfile = useCallback(async (data) => {
    if (!user) return;
    if (!isDemo && !IS_DEMO_BACKEND) {
      await api.updateProfile({ email: user.email, ...data });
    }
    setUser(prev => ({ ...prev, ...data }));
  }, [user, isDemo]);

  // ── Guardar sesión de práctica + actualizar racha ────────────────
  const saveSession = useCallback(async (sessionData) => {
    if (!user) return;
    const date       = new Date().toISOString();
    const newSession = { userEmail: user.email, ...sessionData, date };

    if (!isDemo && !IS_DEMO_BACKEND) {
      api.saveSession(newSession).catch(() => {});
    }
    setSessions(prev => [...prev, newSession]);

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
    if (isDemo || IS_DEMO_BACKEND) { setLeaderboard(leaderboardData); return; }
    try {
      const r = await api.getLeaderboard();
      setLeaderboard(r.leaderboard || []);
    } catch { setLeaderboard(leaderboardData); }
  }, [isDemo]);

  // ── Estadísticas derivadas ───────────────────────────────────────
  const progressStats = useMemo(() => {
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
      login, loginDemo, logout, register, resetPassword,
      updateProfile, saveSession, savePlannerProgress, fetchLeaderboard,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
