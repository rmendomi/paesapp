-- ═══════════════════════════════════════════════════════════════════
-- PAES Prep — Migración: banco_ia mejorado + preguntas_vistas
-- Ejecuta en: tu proyecto Supabase → SQL Editor → Run
-- ═══════════════════════════════════════════════════════════════════

-- 1. Agregar columna veces_usada a banco_ia (cuántas veces fue servida)
alter table banco_ia
  add column if not exists veces_usada int default 0;

-- 2. Tabla de seguimiento: qué preguntas ya vio cada usuario
--    Así garantizamos que cada pregunta solo se muestra 1 vez por usuario.
create table if not exists preguntas_vistas (
  user_email   text,
  question_id  text,
  exam_id      text,
  skill_id     text,
  vista_en     timestamptz default now(),
  fue_correcta boolean,
  primary key (user_email, question_id)
);
create index if not exists pv_user_exam_idx on preguntas_vistas(user_email, exam_id);
create index if not exists pv_user_skill_idx on preguntas_vistas(user_email, exam_id, skill_id);

alter table preguntas_vistas disable row level security;

-- 3. Función RPC para incrementar veces_usada de forma atómica
create or replace function increment_veces_usada(qid text)
returns void as $$
  update banco_ia set veces_usada = coalesce(veces_usada, 0) + 1 where id = qid;
$$ language sql security definer;

-- 4. Ampliar sesiones: guardar skill_id y question_ids para análisis de errores
alter table sesiones
  add column if not exists skill_id      text,
  add column if not exists question_ids  jsonb default '[]',
  add column if not exists wrong_ids     jsonb default '[]';
