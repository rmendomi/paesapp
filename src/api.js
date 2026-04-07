// ── Cliente Supabase ────────────────────────────────────────────────
import { supabase } from './lib/supabase';

export const IS_DEMO_BACKEND = !import.meta.env.VITE_SUPABASE_URL;

const DEFAULT_TARGETS = { lectora: 700, m1: 700, m2: 680, historia: 690, ciencias: 710 };

// ── Contexto para generación de preguntas con IA ───────────────────
const EXAM_CONTEXT = {
  lectora: {
    name: 'Comprensión Lectora PAES',
    instructions: 'Genera preguntas de comprensión lectora estilo PAES chilena. Incluye un texto de lectura (150-250 palabras, informativo o literario) seguido de la pregunta. El texto debe ser coherente y de nivel 4° medio.',
    skills: {
      localizar:   'Localizar y recuperar información explícita del texto',
      interpretar: 'Interpretar e integrar información implícita del texto',
      evaluar:     'Evaluar y reflexionar críticamente sobre el texto, propósito y estructura',
    },
  },
  m1: {
    name: 'Matemática M1 PAES',
    instructions: 'Genera problemas matemáticos estilo PAES M1 (nivel 4° medio básico-medio). Temas: números, álgebra, geometría, estadística y probabilidad. Los cálculos deben ser verificados y correctos.',
    skills: {
      resolver:    'Resolver problemas usando procedimientos y algoritmos matemáticos',
      modelar:     'Modelar situaciones cotidianas con expresiones o ecuaciones matemáticas',
      representar: 'Representar información en gráficos, tablas o expresiones algebraicas',
      argumentar:  'Argumentar y justificar propiedades o resultados matemáticos',
    },
  },
  m2: {
    name: 'Matemática M2 PAES',
    instructions: 'Genera problemas matemáticos estilo PAES M2 (nivel avanzado). Temas: funciones, trigonometría, vectores, geometría analítica, cálculo básico. Verifica todos los cálculos.',
    skills: {
      resolver:    'Resolver problemas avanzados con funciones, trigonometría o cálculo',
      modelar:     'Modelar fenómenos reales con funciones matemáticas',
      representar: 'Representar funciones, vectores y transformaciones geométricas',
      argumentar:  'Demostrar y argumentar propiedades matemáticas avanzadas',
    },
  },
  historia: {
    name: 'Historia y Cs. Sociales PAES',
    instructions: 'Genera preguntas de historia y ciencias sociales estilo PAES. Temas: historia de Chile, historia universal, geografía, educación cívica y economía básica.',
    skills: {
      temporal: 'Pensamiento temporal: causas, consecuencias y procesos históricos en el tiempo',
      fuentes:  'Análisis de fuentes: interpretar documentos históricos, mapas o estadísticas',
      critico:  'Pensamiento crítico: evaluar múltiples perspectivas e interpretaciones históricas',
    },
  },
  ciencias: {
    name: 'Ciencias Naturales PAES',
    instructions: 'Genera preguntas de ciencias naturales estilo PAES (biología, química o física). Indica el área al inicio de la pregunta. Los datos y conceptos deben ser científicamente correctos.',
    skills: {
      observar:   'Observar y describir fenómenos naturales con precisión científica',
      planificar: 'Planificar y diseñar investigaciones o experimentos científicos',
      procesar:   'Procesar e interpretar datos, gráficos o resultados de experimentos',
      evaluar:    'Evaluar evidencias y sacar conclusiones científicas fundamentadas',
      comunicar:  'Comunicar y explicar conceptos y conocimientos científicos',
    },
  },
};

function buildPrompt(examId, skillId, count) {
  const ctx = EXAM_CONTEXT[examId];
  const skillDesc = (skillId && ctx.skills[skillId]) ? ctx.skills[skillId] : 'variedad de habilidades del examen';
  const skillLabel = skillId || 'mixed';

  return `Eres un experto evaluador de la PAES chilena (Prueba de Acceso a la Educación Superior).
Tu tarea: generar exactamente ${count} preguntas de "${ctx.name}".
Habilidad objetivo: "${skillDesc}".

${ctx.instructions}

FORMATO DE RESPUESTA — responde ÚNICAMENTE con un array JSON válido, sin texto adicional:
[
  {
    "text": "Texto completo de la pregunta. Si es comprensión lectora, incluye el texto de lectura aquí seguido de la pregunta.",
    "options": ["Primera opción", "Segunda opción", "Tercera opción", "Cuarta opción", "Quinta opción"],
    "correct": 0,
    "skill": "${skillLabel}",
    "explanation": "Explicación detallada de por qué esa es la respuesta correcta y por qué las otras son incorrectas."
  }
]

REGLAS CRÍTICAS:
- Responde SOLO con el array JSON, sin markdown ni texto extra
- "correct" es el índice 0-based de la opción correcta (0=primera, 1=segunda...)
- Cada pregunta debe tener exactamente 5 opciones
- Los distractores deben ser plausibles pero incorrectos
- Para matemáticas: verifica el cálculo dos veces antes de responder
- Nivel de dificultad: real PAES (4° medio Chile)
- Genera exactamente ${count} preguntas`;
}

function parseAIResponse(raw) {
  try { return JSON.parse(raw); } catch (_) {}
  const match = raw.match(/\[[\s\S]*\]/);
  if (match) {
    try { return JSON.parse(match[0]); } catch (_) {}
  }
  throw new Error('La IA no devolvió JSON válido. Intenta nuevamente.');
}

async function callGemini(prompt) {
  const key = import.meta.env.VITE_GEMINI_API_KEY;
  if (!key) throw new Error('VITE_GEMINI_API_KEY no configurada en .env');

  const resp = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.75, maxOutputTokens: 4096 },
      }),
    }
  );

  const data = await resp.json();
  if (data.error) throw new Error('Gemini error: ' + data.error.message);
  return data.candidates[0].content.parts[0].text;
}

async function saveToBancoIA(questions, examId, skillId, userEmail) {
  try {
    const rows = questions.map(q => ({
      id:           q.id,
      exam_id:      examId,
      skill_id:     skillId || 'mixed',
      text:         q.text,
      options:      q.options,
      correct:      q.correct,
      explanation:  q.explanation,
      generado_por: userEmail || 'unknown',
    }));
    await supabase.from('banco_ia').insert(rows);
  } catch (_) {
    // No crítico — no interrumpir el flujo
  }
}

// ── API principal ──────────────────────────────────────────────────
export const api = {

  // Crea perfil en tabla usuarios tras registro con Supabase Auth
  async createUserProfile({ email, nombre, anioNacimiento, situacion, region, colegioId }) {
    const now = new Date().toISOString();
    const { error } = await supabase.from('usuarios').upsert({
      email,
      name:            nombre || '',
      picture:         '',
      school:          '',
      grade_level:     '4° Medio',
      target_score:    700,
      targets:         DEFAULT_TARGETS,
      anio_nacimiento: anioNacimiento || null,
      situacion:       situacion || 'estudiante',
      region:          region || null,
      colegio_id:      colegioId || null,
      created_at:      now,
      last_login:      now,
    });
    if (error) throw new Error(error.message);

    // Crear fila de streak
    await supabase.from('streak').insert({
      user_email: email, current: 0, best: 0,
      total_days: 0, last_activity: '', history: {},
    }).onConflict('user_email').ignore();

    return { ok: true };
  },

  // Obtiene perfil del usuario autenticado
  async getUserProfile(email) {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (error) throw new Error(error.message);
    if (!data) return null;

    await supabase.from('usuarios').update({ last_login: new Date().toISOString() }).eq('email', email);

    return {
      email:          data.email,
      name:           data.name,
      picture:        data.picture || null,
      school:         data.school,
      gradeLevel:     data.grade_level,
      targetScore:    data.target_score,
      targets:        data.targets || DEFAULT_TARGETS,
      anioNacimiento: data.anio_nacimiento,
      situacion:      data.situacion,
      region:         data.region,
      colegioId:      data.colegio_id,
      createdAt:      data.created_at,
      lastLogin:      new Date().toISOString(),
    };
  },

  // Obtiene colegios filtrados por región
  async getColegiosByRegion(region) {
    const { data, error } = await supabase
      .from('colegios')
      .select('id, nombre, comuna, tipo')
      .eq('region', region)
      .order('nombre');
    if (error) throw new Error(error.message);
    return data || [];
  },

  async getOrCreateUser({ email, name, picture }) {
    const now = new Date().toISOString();

    const { data: existing } = await supabase
      .from('usuarios')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (existing) {
      await supabase.from('usuarios').update({
        last_login: now,
        ...(name    && { name }),
        ...(picture && { picture }),
      }).eq('email', email);

      return {
        ok: true,
        user: {
          email:       existing.email,
          name:        name    || existing.name,
          picture:     picture || existing.picture,
          school:      existing.school,
          gradeLevel:  existing.grade_level,
          targetScore: existing.target_score,
          targets:     existing.targets || DEFAULT_TARGETS,
          createdAt:   existing.created_at,
          lastLogin:   now,
        },
      };
    }

    // Nuevo usuario
    const { error } = await supabase.from('usuarios').insert({
      email, name: name || '', picture: picture || '',
      school: '', grade_level: '4° Medio', target_score: 700,
      targets: DEFAULT_TARGETS,
    });
    if (error) throw new Error(error.message);

    // Crear fila de streak
    await supabase.from('streak').insert({
      user_email: email, current: 0, best: 0,
      total_days: 0, last_activity: '', history: {},
    });

    return {
      ok: true,
      user: {
        email, name: name || '', picture: picture || '',
        school: '', gradeLevel: '4° Medio', targetScore: 700,
        targets: DEFAULT_TARGETS, createdAt: now, lastLogin: now,
      },
    };
  },

  async updateProfile({ email, name, picture, school, gradeLevel, targetScore, targets }) {
    const update = {};
    if (name        !== undefined) update.name         = name;
    if (picture     !== undefined) update.picture      = picture;
    if (school      !== undefined) update.school       = school;
    if (gradeLevel  !== undefined) update.grade_level  = gradeLevel;
    if (targetScore !== undefined) update.target_score = targetScore;
    if (targets     !== undefined) update.targets      = targets;

    const { error } = await supabase.from('usuarios').update(update).eq('email', email);
    if (error) throw new Error(error.message);
    return { ok: true };
  },

  async saveSession({ userEmail, examId, mode, correct, total, score, date }) {
    const id = `${userEmail}_${Date.now()}`;
    const { error } = await supabase.from('sesiones').insert({
      id, user_email: userEmail, exam_id: examId,
      mode: mode || 'practice',
      correct: correct || 0, total: total || 0, score: score || 0,
      date: date || new Date().toISOString(),
    });
    if (error) throw new Error(error.message);
    return { ok: true, id };
  },

  async getUserData(email) {
    const [sesRes, strRes, planRes] = await Promise.all([
      supabase.from('sesiones').select('*').eq('user_email', email).order('date'),
      supabase.from('streak').select('*').eq('user_email', email).maybeSingle(),
      supabase.from('planner').select('*').eq('user_email', email).maybeSingle(),
    ]);

    const sessions = (sesRes.data || []).map(s => ({
      id: s.id, examId: s.exam_id, mode: s.mode,
      correct: s.correct, total: s.total, score: s.score, date: s.date,
    }));

    const raw = strRes.data;
    const streak = raw
      ? { current: raw.current || 0, best: raw.best || 0, totalDays: raw.total_days || 0, lastActivity: raw.last_activity || '', history: raw.history || {} }
      : { current: 0, best: 0, totalDays: 0, lastActivity: '', history: {} };

    const plan = planRes.data;
    const planner = plan
      ? { weekId: plan.week_id || '', planId: plan.plan_id || 'standard', progress: plan.progress || {} }
      : { weekId: '', planId: 'standard', progress: {} };

    return { ok: true, sessions, streak, planner };
  },

  async updateStreak(email, streak) {
    const { error } = await supabase.from('streak').upsert({
      user_email:    email,
      current:       streak.current    || 0,
      best:          streak.best       || 0,
      total_days:    streak.totalDays  || 0,
      last_activity: streak.lastActivity || '',
      history:       streak.history    || {},
    }, { onConflict: 'user_email' });
    if (error) throw new Error(error.message);
    return { ok: true };
  },

  async savePlannerProgress(email, weekId, planId, progress) {
    const { error } = await supabase.from('planner').upsert({
      user_email: email,
      week_id:    weekId  || '',
      plan_id:    planId  || 'standard',
      progress:   progress || {},
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_email' });
    if (error) throw new Error(error.message);
    return { ok: true };
  },

  async getLeaderboard() {
    const [sesRes, usrRes, strRes] = await Promise.all([
      supabase.from('sesiones').select('user_email, score'),
      supabase.from('usuarios').select('email, name, school'),
      supabase.from('streak').select('user_email, current'),
    ]);

    const byUser = {};
    for (const s of sesRes.data || []) {
      if (!s.user_email || !s.score) continue;
      if (!byUser[s.user_email]) byUser[s.user_email] = { total: 0, count: 0 };
      byUser[s.user_email].total += s.score;
      byUser[s.user_email].count += 1;
    }

    const uInfo = Object.fromEntries((usrRes.data || []).map(u => [u.email, u]));
    const sInfo = Object.fromEntries((strRes.data || []).map(s => [s.user_email, s.current || 0]));

    const entries = Object.entries(byUser)
      .filter(([, u]) => u.count > 0)
      .map(([email, u]) => {
        const avg  = Math.round(u.total / u.count);
        const info = uInfo[email] || {};
        return {
          email, name:  info.name  || email.split('@')[0],
          school: info.school || '', avgScore: avg,
          streak: sInfo[email] || 0, sessions: u.count,
          xp: u.count * 100 + avg,
        };
      })
      .sort((a, b) => b.avgScore - a.avgScore)
      .slice(0, 20)
      .map((e, i) => ({ ...e, rank: i + 1 }));

    return { ok: true, leaderboard: entries };
  },

  async generateStudyPlan({ name, progressStats, targets }) {
    const examNames = {
      lectora: 'Comprensión Lectora', m1: 'Matemática M1',
      m2: 'Matemática M2', historia: 'Historia', ciencias: 'Ciencias',
    };
    const gaps = ['lectora', 'm1', 'm2', 'historia', 'ciencias'].map(id => {
      const stat   = (progressStats && progressStats[id]) || {};
      const target = (targets && targets[id]) || 700;
      const score  = stat.lastScore || 0;
      return `- ${examNames[id]}: puntaje actual ${score || 'sin datos'}, meta ${target}, brecha ${score ? target - score : 'desconocida'}`;
    });

    const prompt = `Eres un experto pedagogo PAES chilena. Crea un plan de estudio semanal personalizado.

Estudiante: ${name || 'Estudiante'}
Rendimiento actual:
${gaps.join('\n')}

Genera un plan de 7 días (Lunes a Domingo) priorizando las materias con mayor brecha entre puntaje actual y meta.

Responde ÚNICAMENTE con JSON válido con esta estructura exacta:
{
  "name": "Plan IA Personalizado",
  "icon": "🤖",
  "hoursPerWeek": 10,
  "analysis": "2-3 oraciones: qué áreas priorizar y por qué, basado en los datos reales del estudiante",
  "days": [
    { "sessions": [{ "examId": "lectora", "topic": "Localizar información explícita en textos", "duration": 30 }] },
    { "sessions": [{ "examId": "m1", "topic": "Resolver ecuaciones y sistemas lineales", "duration": 45 }] },
    { "sessions": [] },
    { "sessions": [{ "examId": "historia", "topic": "Análisis de fuentes históricas", "duration": 30 }] },
    { "sessions": [{ "examId": "ciencias", "topic": "Interpretar gráficos experimentales", "duration": 30 }] },
    { "sessions": [{ "examId": "lectora", "topic": "Ensayo completo Comprensión Lectora", "duration": 60 }] },
    { "sessions": [] }
  ]
}

REGLAS CRÍTICAS:
- examId debe ser uno de: lectora, m1, m2, historia, ciencias
- Prioriza los exámenes con mayor brecha (puntaje actual más lejos de la meta)
- Si no hay datos de puntaje, tratar como debilidad alta
- duration: 20, 30, 45 o 60 minutos
- 1-2 sesiones por día máximo; el domingo puede quedar vacío (sessions: [])
- hoursPerWeek: suma total de minutos / 60, redondeado
- Los topics deben ser específicos para PAES Chile, nivel 4° medio
- Responde SOLO con el JSON, sin texto adicional`;

    const raw    = await callGemini(prompt);
    const parsed = parseAIResponse(raw);
    if (!parsed.days || parsed.days.length !== 7) {
      throw new Error('El plan generado no tiene el formato correcto. Intenta de nuevo.');
    }
    return { ok: true, plan: parsed };
  },

  async generateQuestions({ examId, skillId, count, userEmail }) {
    const ctx = EXAM_CONTEXT[examId];
    if (!ctx) throw new Error('examId no reconocido: ' + examId);

    const n      = Math.min(Number(count) || 5, 10);
    const prompt = buildPrompt(examId, skillId, n);
    const raw    = await callGemini(prompt);

    let parsed = parseAIResponse(raw);
    if (!Array.isArray(parsed)) parsed = [parsed];

    const ts = String(Date.now());
    const questions = parsed
      .map((q, i) => ({
        id:          `ai_${examId}_${skillId || 'mix'}_${ts}_${i}`,
        skill:       q.skill || skillId || 'mixed',
        text:        String(q.text || '').trim(),
        options:     Array.isArray(q.options) ? q.options.map(String) : [],
        correct:     typeof q.correct === 'number' ? q.correct : 0,
        explanation: String(q.explanation || '').trim(),
        aiGenerated: true,
        provider:    'gemini',
      }))
      .filter(q => q.text.length > 0 && q.options.length >= 4);

    if (questions.length === 0) {
      throw new Error('La IA generó preguntas con formato inválido. Intenta nuevamente.');
    }

    saveToBancoIA(questions, examId, skillId, userEmail);

    return { ok: true, questions, provider: 'gemini', count: questions.length };
  },
};
