-- ═══════════════════════════════════════════════════════════════════
-- PAES Prep — Schema Supabase
-- Ejecuta esto en: tu proyecto → SQL Editor → Run
-- ═══════════════════════════════════════════════════════════════════

-- Tabla de usuarios
create table if not exists usuarios (
  email         text primary key,
  name          text        default '',
  picture       text        default '',
  school        text        default '',
  grade_level   text        default '4° Medio',
  target_score  int         default 700,
  targets       jsonb       default '{"lectora":700,"m1":700,"m2":680,"historia":690,"ciencias":710}',
  created_at    timestamptz default now(),
  last_login    timestamptz default now()
);

-- Tabla de sesiones de práctica
create table if not exists sesiones (
  id          text        primary key,
  user_email  text        references usuarios(email) on delete cascade,
  exam_id     text,
  mode        text        default 'practice',
  correct     int         default 0,
  total       int         default 0,
  score       int         default 0,
  date        timestamptz default now()
);
create index if not exists sesiones_user_idx on sesiones(user_email);

-- Tabla de racha (streak)
create table if not exists streak (
  user_email    text        primary key references usuarios(email) on delete cascade,
  current       int         default 0,
  best          int         default 0,
  total_days    int         default 0,
  last_activity text        default '',
  history       jsonb       default '{}'
);

-- Tabla del planificador
create table if not exists planner (
  user_email  text        primary key references usuarios(email) on delete cascade,
  week_id     text        default '',
  plan_id     text        default 'standard',
  progress    jsonb       default '{}',
  updated_at  timestamptz default now()
);

-- Banco de preguntas generadas por IA
create table if not exists banco_ia (
  id            text        primary key,
  exam_id       text,
  skill_id      text,
  text          text,
  options       jsonb,
  correct       int,
  explanation   text,
  generado_por  text,
  fecha         timestamptz default now()
);

-- ── Deshabilitar RLS (para proyecto personal/educativo) ─────────────
-- Para producción real, habilita RLS y define políticas adecuadas
alter table usuarios  disable row level security;
alter table sesiones  disable row level security;
alter table streak    disable row level security;
alter table planner   disable row level security;
alter table banco_ia  disable row level security;
