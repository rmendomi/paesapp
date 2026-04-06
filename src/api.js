// ── Cliente HTTP para el Web App de Google Apps Script ────────────
const GAS_URL = import.meta.env.VITE_GAS_URL;

export const IS_DEMO_BACKEND = !GAS_URL || GAS_URL === 'TU_URL_DEL_WEB_APP_GAS_AQUI';

export async function gasCall(action, data = {}) {
  if (IS_DEMO_BACKEND) {
    // Sin backend configurado → modo demo (localStorage solamente)
    return { ok: true, _demo: true };
  }

  const response = await fetch(GAS_URL, {
    method:   'POST',
    headers:  { 'Content-Type': 'text/plain' },
    body:     JSON.stringify({ action, ...data }),
    redirect: 'follow',
  });

  const result = await response.json();
  if (result.error) throw new Error(result.error);
  return result;
}

export const api = {
  getOrCreateUser:    (d)              => gasCall('getOrCreateUser', d),
  updateProfile:      (d)              => gasCall('updateProfile', d),
  saveSession:        (d)              => gasCall('saveSession', d),
  getUserData:        (email)          => gasCall('getUserData', { email }),
  updateStreak:       (email, streak)  => gasCall('updateStreak', { email, streak }),
  savePlannerProgress: (email, weekId, planId, progress) =>
                                          gasCall('savePlannerProgress', { email, weekId, planId, progress }),
  getLeaderboard:     ()               => gasCall('getLeaderboard'),
};
