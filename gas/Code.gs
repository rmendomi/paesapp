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
  usuarios: ['email','name','picture','school','gradeLevel','targetScore','targets','createdAt','lastLogin'],
  sesiones: ['id','userEmail','examId','mode','correct','total','score','date'],
  streak:   ['userEmail','current','best','totalDays','lastActivity','history'],
  planner:  ['userEmail','weekId','planId','progress','updatedAt'],
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
