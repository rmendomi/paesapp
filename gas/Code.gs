// ═══════════════════════════════════════════════════════════════════
// PAES Prep — Backend Google Apps Script
// Spreadsheet: https://docs.google.com/spreadsheets/d/16toegriqoV1bde-fDQGh9RvNrs9E9ZhKhTLmEjtPjHA
//
// INSTRUCCIONES DE DESPLIEGUE:
// 1. Abre script.google.com → Nuevo proyecto
// 2. Pega este código completo
// 3. Extensiones → Apps Script (si desde la Hoja)
// 4. Implementar → Nueva implementación → Aplicación web
//    - Ejecutar como: Yo (tu cuenta)
//    - Quién tiene acceso: Cualquier persona
// 5. Copia la URL del Web App → ponla en VITE_GAS_URL del .env
// ═══════════════════════════════════════════════════════════════════

var SS_ID = '16toegriqoV1bde-fDQGh9RvNrs9E9ZhKhTLmEjtPjHA';

// ── Inicializar hojas con headers ──────────────────────────────────
var SHEET_HEADERS = {
  usuarios:  ['email','name','picture','school','gradeLevel','targetScore','targets','createdAt','lastLogin'],
  sesiones:  ['id','userEmail','examId','mode','correct','total','score','date'],
  streak:    ['userEmail','current','best','totalDays','lastActivity','history'],
  planner:   ['userEmail','weekId','planId','progress','updatedAt'],
  banco_ia:  ['id','examId','skillId','text','options','correct','explanation','generadoPor','fecha'],
};

// ── Configuración IA ───────────────────────────────────────────────
// Cambia esta variable para alternar proveedor: 'gemini' | 'claude'
var AI_PROVIDER = 'claude';

var EXAM_CONTEXT = {
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

function getSheet(name) {
  var ss = SpreadsheetApp.openById(SS_ID);
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    var headers = SHEET_HEADERS[name];
    if (headers) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, headers.length)
        .setBackground('#0c1f3d')
        .setFontColor('#ffffff')
        .setFontWeight('bold');
    }
  }
  return sheet;
}

function findRow(sheet, value, col) {
  col = col || 1;
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][col - 1]) === String(value)) {
      return { row: i + 1, data: data[i] };
    }
  }
  return null;
}

function safeJSON(str, def) {
  try { return JSON.parse(str); } catch { return def; }
}

// ── Entrypoints ────────────────────────────────────────────────────
function doGet(e)  { return handleRequest(e); }
function doPost(e) { return handleRequest(e); }

function handleRequest(e) {
  try {
    var params = {};
    if (e.postData && e.postData.contents) {
      params = JSON.parse(e.postData.contents);
    } else {
      params = e.parameter || {};
    }

    var result;
    switch (params.action) {
      case 'getOrCreateUser':     result = getOrCreateUser(params);     break;
      case 'updateProfile':       result = updateProfile(params);       break;
      case 'saveSession':         result = saveSession(params);         break;
      case 'getUserData':         result = getUserData(params);         break;
      case 'updateStreak':        result = updateStreak(params);        break;
      case 'savePlannerProgress': result = savePlannerProgress(params); break;
      case 'getLeaderboard':      result = getLeaderboard(params);      break;
      case 'generateQuestion':    result = generateQuestion(params);    break;
      default: result = { error: 'Acción desconocida: ' + params.action };
    }

    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── Acciones ───────────────────────────────────────────────────────

function getOrCreateUser(p) {
  if (!p.email) return { error: 'email requerido' };

  var sheet = getSheet('usuarios');
  var found = findRow(sheet, p.email, 1);
  var now   = new Date().toISOString();
  var defaultTargets = { lectora: 700, m1: 700, m2: 680, historia: 690, ciencias: 710 };

  if (found) {
    // Actualizar lastLogin, name y picture
    sheet.getRange(found.row, 9).setValue(now);
    if (p.name)    sheet.getRange(found.row, 2).setValue(p.name);
    if (p.picture) sheet.getRange(found.row, 3).setValue(p.picture);
    var d = found.data;
    return {
      ok: true,
      user: {
        email:       d[0],
        name:        p.name    || d[1],
        picture:     p.picture || d[2],
        school:      d[3],
        gradeLevel:  d[4],
        targetScore: Number(d[5]) || 700,
        targets:     safeJSON(d[6], defaultTargets),
        createdAt:   d[7],
        lastLogin:   now,
      },
    };
  }

  // Nuevo usuario
  sheet.appendRow([
    p.email, p.name || '', p.picture || '',
    '', '4° Medio', 700,
    JSON.stringify(defaultTargets),
    now, now,
  ]);

  // Crear fila de streak vacía
  var strSheet = getSheet('streak');
  if (!findRow(strSheet, p.email, 1)) {
    strSheet.appendRow([p.email, 0, 0, 0, '', '{}']);
  }

  return {
    ok: true,
    user: {
      email: p.email, name: p.name || '', picture: p.picture || '',
      school: '', gradeLevel: '4° Medio', targetScore: 700,
      targets: defaultTargets, createdAt: now, lastLogin: now,
    },
  };
}

function updateProfile(p) {
  if (!p.email) return { error: 'email requerido' };
  var sheet = getSheet('usuarios');
  var found = findRow(sheet, p.email, 1);
  if (!found) return { error: 'Usuario no encontrado' };

  if (p.name        !== undefined) sheet.getRange(found.row, 2).setValue(p.name);
  if (p.picture     !== undefined) sheet.getRange(found.row, 3).setValue(p.picture);
  if (p.school      !== undefined) sheet.getRange(found.row, 4).setValue(p.school);
  if (p.gradeLevel  !== undefined) sheet.getRange(found.row, 5).setValue(p.gradeLevel);
  if (p.targetScore !== undefined) sheet.getRange(found.row, 6).setValue(p.targetScore);
  if (p.targets     !== undefined) sheet.getRange(found.row, 7).setValue(JSON.stringify(p.targets));

  return { ok: true };
}

function saveSession(p) {
  if (!p.userEmail) return { error: 'userEmail requerido' };
  var sheet = getSheet('sesiones');
  var id = p.userEmail + '_' + Date.now();
  sheet.appendRow([
    id, p.userEmail, p.examId, p.mode || 'practice',
    Number(p.correct) || 0, Number(p.total) || 0,
    Number(p.score) || 0,
    p.date || new Date().toISOString(),
  ]);
  return { ok: true, id: id };
}

function getUserData(p) {
  if (!p.email) return { error: 'email requerido' };

  // Sesiones del usuario
  var sesSheet = getSheet('sesiones');
  var sesData  = sesSheet.getDataRange().getValues();
  var sessions = [];
  for (var i = 1; i < sesData.length; i++) {
    if (String(sesData[i][1]) === p.email) {
      sessions.push({
        id: sesData[i][0], examId: sesData[i][2], mode: sesData[i][3],
        correct: Number(sesData[i][4]), total: Number(sesData[i][5]),
        score: Number(sesData[i][6]), date: sesData[i][7],
      });
    }
  }

  // Streak
  var strSheet = getSheet('streak');
  var strFound = findRow(strSheet, p.email, 1);
  var streak = { current: 0, best: 0, totalDays: 0, lastActivity: '', history: {} };
  if (strFound) {
    streak = {
      current:      Number(strFound.data[1]) || 0,
      best:         Number(strFound.data[2]) || 0,
      totalDays:    Number(strFound.data[3]) || 0,
      lastActivity: String(strFound.data[4] || ''),
      history:      safeJSON(strFound.data[5], {}),
    };
  }

  // Planner
  var planSheet = getSheet('planner');
  var planFound = findRow(planSheet, p.email, 1);
  var planner = { weekId: '', planId: 'standard', progress: {} };
  if (planFound) {
    planner = {
      weekId:   String(planFound.data[1] || ''),
      planId:   String(planFound.data[2] || 'standard'),
      progress: safeJSON(planFound.data[3], {}),
    };
  }

  return { ok: true, sessions: sessions, streak: streak, planner: planner };
}

function updateStreak(p) {
  if (!p.email) return { error: 'email requerido' };
  var sheet = getSheet('streak');
  var found = findRow(sheet, p.email, 1);
  var s = p.streak || {};
  var row = [
    p.email,
    Number(s.current) || 0,
    Number(s.best) || 0,
    Number(s.totalDays) || 0,
    s.lastActivity || '',
    JSON.stringify(s.history || {}),
  ];
  if (found) {
    sheet.getRange(found.row, 1, 1, 6).setValues([row]);
  } else {
    sheet.appendRow(row);
  }
  return { ok: true };
}

function savePlannerProgress(p) {
  if (!p.email) return { error: 'email requerido' };
  var sheet = getSheet('planner');
  var found = findRow(sheet, p.email, 1);
  var row = [
    p.email, p.weekId || '', p.planId || 'standard',
    JSON.stringify(p.progress || {}),
    new Date().toISOString(),
  ];
  if (found) {
    sheet.getRange(found.row, 1, 1, 5).setValues([row]);
  } else {
    sheet.appendRow(row);
  }
  return { ok: true };
}

function getLeaderboard() {
  var sesSheet   = getSheet('sesiones');
  var sesData    = sesSheet.getDataRange().getValues();
  var usrSheet   = getSheet('usuarios');
  var usrData    = usrSheet.getDataRange().getValues();
  var strSheet   = getSheet('streak');
  var strData    = strSheet.getDataRange().getValues();

  // Agregar puntajes por usuario
  var byUser = {};
  for (var i = 1; i < sesData.length; i++) {
    var em = String(sesData[i][1]);
    var sc = Number(sesData[i][6]);
    if (!em || !sc) continue;
    if (!byUser[em]) byUser[em] = { total: 0, count: 0 };
    byUser[em].total += sc;
    byUser[em].count += 1;
  }

  // Info de usuario
  var uInfo = {};
  for (var j = 1; j < usrData.length; j++) {
    var ue = String(usrData[j][0]);
    if (ue) uInfo[ue] = { name: usrData[j][1], school: usrData[j][3] };
  }

  // Streak actual
  var sInfo = {};
  for (var k = 1; k < strData.length; k++) {
    var se = String(strData[k][0]);
    if (se) sInfo[se] = Number(strData[k][1]) || 0;
  }

  var entries = [];
  for (var email in byUser) {
    var u = byUser[email];
    if (u.count === 0) continue;
    var avg = Math.round(u.total / u.count);
    var info = uInfo[email] || {};
    entries.push({
      email:    email,
      name:     info.name || email.split('@')[0],
      school:   info.school || '',
      avgScore: avg,
      streak:   sInfo[email] || 0,
      sessions: u.count,
      xp:       u.count * 100 + avg,
    });
  }

  entries.sort(function(a, b) { return b.avgScore - a.avgScore; });
  entries.forEach(function(e, i) { e.rank = i + 1; });

  return { ok: true, leaderboard: entries.slice(0, 20) };
}

// ── Generación de preguntas con IA ─────────────────────────────────

function buildPrompt(examId, skillId, count) {
  var ctx = EXAM_CONTEXT[examId];
  var skillDesc = (skillId && ctx.skills[skillId]) ? ctx.skills[skillId] : 'variedad de habilidades del examen';
  var skillLabel = skillId || 'mixed';

  return 'Eres un experto evaluador de la PAES chilena (Prueba de Acceso a la Educación Superior).\n' +
    'Tu tarea: generar exactamente ' + count + ' preguntas de "' + ctx.name + '".\n' +
    'Habilidad objetivo: "' + skillDesc + '".\n\n' +
    ctx.instructions + '\n\n' +
    'FORMATO DE RESPUESTA — responde ÚNICAMENTE con un array JSON válido, sin texto adicional:\n' +
    '[\n' +
    '  {\n' +
    '    "text": "Texto completo de la pregunta. Si es comprensión lectora, incluye el texto de lectura aquí seguido de la pregunta.",\n' +
    '    "options": ["Primera opción", "Segunda opción", "Tercera opción", "Cuarta opción", "Quinta opción"],\n' +
    '    "correct": 0,\n' +
    '    "skill": "' + skillLabel + '",\n' +
    '    "explanation": "Explicación detallada de por qué esa es la respuesta correcta y por qué las otras son incorrectas."\n' +
    '  }\n' +
    ']\n\n' +
    'REGLAS CRÍTICAS:\n' +
    '- Tu respuesta debe comenzar DIRECTAMENTE con el carácter [ sin ningún texto previo\n' +
    '- Tu respuesta debe terminar DIRECTAMENTE con el carácter ] sin ningún texto posterior\n' +
    '- NO uses bloques de código markdown (no uses ```)\n' +
    '- NO agregues explicaciones, comentarios ni texto adicional antes o después del JSON\n' +
    '- "correct" es el índice 0-based de la opción correcta (0=primera, 1=segunda...)\n' +
    '- Cada pregunta debe tener exactamente 5 opciones\n' +
    '- Los distractores deben ser plausibles pero incorrectos\n' +
    '- Para matemáticas: verifica el cálculo dos veces antes de responder\n' +
    '- Nivel de dificultad: real PAES (4° medio Chile)\n' +
    '- Genera exactamente ' + count + ' preguntas';
}

function callGemini(prompt) {
  var props = PropertiesService.getScriptProperties();
  var key = props.getProperty('GEMINI_API_KEY');
  if (!key) throw new Error('GEMINI_API_KEY no configurada en Script Properties de GAS');

  var url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + key;
  var payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.75, maxOutputTokens: 4096 },
  };

  var resp = UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  });

  var data = JSON.parse(resp.getContentText());
  if (data.error) throw new Error('Gemini API error: ' + data.error.message);
  return data.candidates[0].content.parts[0].text;
}

function callClaude(prompt) {
  var props = PropertiesService.getScriptProperties();
  var key = props.getProperty('CLAUDE_API_KEY');
  if (!key) throw new Error('CLAUDE_API_KEY no configurada en Script Properties de GAS');

  var payload = {
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }],
  };

  var resp = UrlFetchApp.fetch('https://api.anthropic.com/v1/messages', {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  });

  var data = JSON.parse(resp.getContentText());
  if (data.error) throw new Error('Claude API error: ' + data.error.message);
  return data.content[0].text;
}

function parseAIResponse(raw) {
  if (!raw) throw new Error('La IA devolvió una respuesta vacía');

  // 1. Intento directo
  try { return JSON.parse(raw.trim()); } catch (_) {}

  // 2. Eliminar bloques markdown ```json ... ``` o ``` ... ```
  var stripped = raw
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```\s*$/, '')
    .trim();
  try { return JSON.parse(stripped); } catch (_) {}

  // 3. Extraer primer bloque JSON array [ ... ]
  var arrayMatch = raw.match(/\[[\s\S]*?\](?=\s*$)/);
  if (!arrayMatch) arrayMatch = raw.match(/\[[\s\S]*\]/);
  if (arrayMatch) {
    try { return JSON.parse(arrayMatch[0]); } catch (_) {}
    // Intentar reparar JSON truncado añadiendo cierre
    try { return JSON.parse(arrayMatch[0] + ']'); } catch (_) {}
  }

  // 4. Extraer entre la primera [ y última ]
  var start = raw.indexOf('[');
  var end   = raw.lastIndexOf(']');
  if (start !== -1 && end > start) {
    var slice = raw.slice(start, end + 1);
    try { return JSON.parse(slice); } catch (_) {}
  }

  // Adjuntar fragmento de la respuesta para diagnóstico
  var preview = raw.substring(0, 200).replace(/\n/g, '\\n');
  throw new Error('La IA no devolvió JSON válido. Respuesta recibida: ' + preview);
}

function saveToAIBank(questions, examId, skillId, userEmail) {
  try {
    var sheet = getSheet('banco_ia');
    var now = new Date().toISOString();
    questions.forEach(function(q) {
      sheet.appendRow([
        q.id, examId, skillId || 'mixed',
        q.text, JSON.stringify(q.options), q.correct,
        q.explanation, userEmail || 'unknown', now,
      ]);
    });
  } catch (_) {
    // No crítico — no interrumpir el flujo
  }
}

function generateQuestion(p) {
  var examId  = p.examId;
  var skillId = p.skillId || null;
  var count   = Math.min(Number(p.count) || 5, 10);

  var ctx = EXAM_CONTEXT[examId];
  if (!ctx) return { error: 'examId no reconocido: ' + examId };

  var prompt = buildPrompt(examId, skillId, count);

  var raw;
  try {
    if (AI_PROVIDER === 'gemini') {
      raw = callGemini(prompt);
    } else if (AI_PROVIDER === 'claude') {
      raw = callClaude(prompt);
    } else {
      return { error: 'AI_PROVIDER no reconocido: ' + AI_PROVIDER };
    }
  } catch (e) {
    return { error: e.toString() };
  }

  var parsed;
  try {
    parsed = parseAIResponse(raw);
    if (!Array.isArray(parsed)) parsed = [parsed];
  } catch (e) {
    return { error: e.toString() };
  }

  // Normalizar y validar cada pregunta
  var ts = String(Date.now());
  var questions = parsed
    .map(function(q, i) {
      return {
        id:          'ai_' + examId + '_' + (skillId || 'mix') + '_' + ts + '_' + i,
        skill:       q.skill || skillId || 'mixed',
        text:        String(q.text || '').trim(),
        options:     Array.isArray(q.options) ? q.options.map(String) : [],
        correct:     typeof q.correct === 'number' ? q.correct : 0,
        explanation: String(q.explanation || '').trim(),
        aiGenerated: true,
        provider:    AI_PROVIDER,
      };
    })
    .filter(function(q) {
      return q.text.length > 0 && q.options.length >= 4;
    });

  if (questions.length === 0) {
    return { error: 'La IA generó preguntas con formato inválido. Intenta nuevamente.' };
  }

  // Guardar en banco_ia para historial
  saveToAIBank(questions, examId, skillId, p.userEmail);

  return { ok: true, questions: questions, provider: AI_PROVIDER, count: questions.length };
}
