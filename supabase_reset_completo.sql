-- ═══════════════════════════════════════════════════════════════════════════
--  PAES Prep · RESET COMPLETO — Schema v2
--  Pegar en: Supabase → SQL Editor → Run
--
--  ⚠️  ANTES de correr este script:
--  1. Supabase Dashboard → Authentication → Users → borrar todos los usuarios
--  2. Luego correr este script
-- ═══════════════════════════════════════════════════════════════════════════

-- ── 1. Borrar tablas existentes (orden importa por foreign keys) ─────────────
DROP TABLE IF EXISTS banco_ia  CASCADE;
DROP TABLE IF EXISTS planner   CASCADE;
DROP TABLE IF EXISTS streak    CASCADE;
DROP TABLE IF EXISTS sesiones  CASCADE;
DROP TABLE IF EXISTS usuarios  CASCADE;
DROP TABLE IF EXISTS colegios  CASCADE;

-- ── 2. Tabla de usuarios ─────────────────────────────────────────────────────
CREATE TABLE usuarios (
  email           TEXT        PRIMARY KEY,
  name            TEXT        DEFAULT '',
  picture         TEXT        DEFAULT '',
  school          TEXT        DEFAULT '',
  grade_level     TEXT        DEFAULT '4° Medio',
  target_score    INT         DEFAULT 700,
  targets         JSONB       DEFAULT '{"lectora":700,"m1":700,"m2":680,"historia":690,"ciencias":710}',
  anio_nacimiento INTEGER,
  situacion       TEXT        DEFAULT 'estudiante',
  region          TEXT,
  colegio_id      INTEGER,
  created_at      TIMESTAMPTZ DEFAULT now(),
  last_login      TIMESTAMPTZ DEFAULT now()
);

-- ── 3. Tabla de sesiones de práctica ────────────────────────────────────────
CREATE TABLE sesiones (
  id          TEXT        PRIMARY KEY,
  user_email  TEXT        REFERENCES usuarios(email) ON DELETE CASCADE,
  exam_id     TEXT,
  mode        TEXT        DEFAULT 'practice',
  correct     INT         DEFAULT 0,
  total       INT         DEFAULT 0,
  score       INT         DEFAULT 0,
  date        TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX sesiones_user_idx ON sesiones(user_email);

-- ── 4. Tabla de racha (streak) ───────────────────────────────────────────────
CREATE TABLE streak (
  user_email    TEXT        PRIMARY KEY REFERENCES usuarios(email) ON DELETE CASCADE,
  current       INT         DEFAULT 0,
  best          INT         DEFAULT 0,
  total_days    INT         DEFAULT 0,
  last_activity TEXT        DEFAULT '',
  history       JSONB       DEFAULT '{}'
);

-- ── 5. Tabla del planificador ────────────────────────────────────────────────
CREATE TABLE planner (
  user_email  TEXT        PRIMARY KEY REFERENCES usuarios(email) ON DELETE CASCADE,
  week_id     TEXT        DEFAULT '',
  plan_id     TEXT        DEFAULT 'standard',
  progress    JSONB       DEFAULT '{}',
  updated_at  TIMESTAMPTZ DEFAULT now()
);

-- ── 6. Banco de preguntas generadas por IA ───────────────────────────────────
CREATE TABLE banco_ia (
  id           TEXT        PRIMARY KEY,
  exam_id      TEXT,
  skill_id     TEXT,
  text         TEXT,
  options      JSONB,
  correct      INT,
  explanation  TEXT,
  generado_por TEXT,
  fecha        TIMESTAMPTZ DEFAULT now()
);

-- ── 7. Tabla de colegios ─────────────────────────────────────────────────────
CREATE TABLE colegios (
  id      SERIAL PRIMARY KEY,
  rbd     TEXT UNIQUE,
  nombre  TEXT NOT NULL,
  region  TEXT NOT NULL,
  comuna  TEXT,
  tipo    TEXT
);
CREATE INDEX idx_colegios_region ON colegios(region);

-- ── 8. Deshabilitar RLS ──────────────────────────────────────────────────────
ALTER TABLE usuarios  DISABLE ROW LEVEL SECURITY;
ALTER TABLE sesiones  DISABLE ROW LEVEL SECURITY;
ALTER TABLE streak    DISABLE ROW LEVEL SECURITY;
ALTER TABLE planner   DISABLE ROW LEVEL SECURITY;
ALTER TABLE banco_ia  DISABLE ROW LEVEL SECURITY;
ALTER TABLE colegios  DISABLE ROW LEVEL SECURITY;

-- ── 9. Seed colegios ─────────────────────────────────────────────────────────
INSERT INTO colegios (rbd, nombre, region, comuna, tipo) VALUES

-- Arica y Parinacota
('1001', 'Liceo Roberto Cares López',                    'Arica y Parinacota', 'Arica',          'Municipal'),
('1002', 'Liceo Industrial de Arica A-6',                'Arica y Parinacota', 'Arica',          'Municipal'),
('1003', 'Liceo Técnico Femenino de Arica',              'Arica y Parinacota', 'Arica',          'Municipal'),
('1004', 'Colegio San Marcos',                           'Arica y Parinacota', 'Arica',          'Part. Subvencionado'),
('1005', 'Colegio Lord Cochrane',                        'Arica y Parinacota', 'Arica',          'Part. Subvencionado'),
('1006', 'Colegio Sagrado Corazón de Arica',             'Arica y Parinacota', 'Arica',          'Part. Subvencionado'),
('1007', 'Liceo Politécnico de Arica',                   'Arica y Parinacota', 'Arica',          'Municipal'),

-- Tarapacá
('2001', 'Liceo Bicentenario Arturo Pérez Canto',        'Tarapacá', 'Iquique',       'Municipal'),
('2002', 'Liceo de Hombres de Iquique',                  'Tarapacá', 'Iquique',       'Municipal'),
('2003', 'Liceo Politécnico de Iquique',                 'Tarapacá', 'Iquique',       'Municipal'),
('2004', 'Liceo Industrial Diego Portales',              'Tarapacá', 'Iquique',       'Municipal'),
('2005', 'Colegio Salesiano Don Bosco Iquique',          'Tarapacá', 'Iquique',       'Part. Subvencionado'),
('2006', 'Colegio San Marcelo',                          'Tarapacá', 'Iquique',       'Part. Subvencionado'),
('2007', 'Liceo Técnico de Alto Hospicio',               'Tarapacá', 'Alto Hospicio', 'Municipal'),

-- Antofagasta
('3001', 'Liceo Bicentenario Domingo Latrille',          'Antofagasta', 'Antofagasta',           'Municipal'),
('3002', 'Liceo Industrial de Antofagasta',              'Antofagasta', 'Antofagasta',           'Municipal'),
('3003', 'Liceo Técnico Femenino de Antofagasta',        'Antofagasta', 'Antofagasta',           'Municipal'),
('3004', 'Colegio San José de Antofagasta',              'Antofagasta', 'Antofagasta',           'Part. Subvencionado'),
('3005', 'Liceo Andrés Sabella',                         'Antofagasta', 'Antofagasta',           'Municipal'),
('3006', 'Liceo Técnico Industrial de Calama',           'Antofagasta', 'Calama',                'Municipal'),
('3007', 'Liceo Los Andes',                              'Antofagasta', 'San Pedro de Atacama',  'Municipal'),

-- Atacama
('4001', 'Liceo Agustín Edwards Ross',                   'Atacama', 'Copiapó',         'Municipal'),
('4002', 'Liceo Industrial Pedro Aguirre Cerda',         'Atacama', 'Copiapó',         'Municipal'),
('4003', 'Liceo Santa Rosa de Atacama',                  'Atacama', 'Copiapó',         'Municipal'),
('4004', 'Colegio San Francisco Javier de Copiapó',      'Atacama', 'Copiapó',         'Part. Subvencionado'),
('4005', 'Liceo Diego de Almagro',                       'Atacama', 'Diego de Almagro','Municipal'),
('4006', 'Liceo Politécnico Atacama',                    'Atacama', 'Copiapó',         'Municipal'),

-- Coquimbo
('5001', 'Liceo Gregorio Cordovez',                      'Coquimbo', 'La Serena', 'Municipal'),
('5002', 'Liceo Bicentenario de Excelencia La Serena',   'Coquimbo', 'La Serena', 'Municipal'),
('5003', 'Liceo Técnico Gabriela Mistral',               'Coquimbo', 'La Serena', 'Municipal'),
('5004', 'Colegio Alemán de La Serena',                  'Coquimbo', 'La Serena', 'Part. Pagado'),
('5005', 'Colegio San Francisco Javier de La Serena',    'Coquimbo', 'La Serena', 'Part. Subvencionado'),
('5006', 'Liceo Eduardo Frei Montalva',                  'Coquimbo', 'Coquimbo',  'Municipal'),
('5007', 'Liceo San Joaquín de Coquimbo',                'Coquimbo', 'Coquimbo',  'Municipal'),
('5008', 'Liceo Politécnico de Ovalle',                  'Coquimbo', 'Ovalle',    'Municipal'),

-- Valparaíso
('6001', 'Liceo Eduardo de la Barra',                    'Valparaíso', 'Valparaíso',  'Municipal'),
('6002', 'Liceo Industrial Puerto de Valparaíso',        'Valparaíso', 'Valparaíso',  'Municipal'),
('6003', 'Liceo Técnico Femenino de Valparaíso',         'Valparaíso', 'Valparaíso',  'Municipal'),
('6004', 'Liceo Carolina Llona de Curauma',              'Valparaíso', 'Valparaíso',  'Municipal'),
('6005', 'Colegio Alemán de Valparaíso',                 'Valparaíso', 'Valparaíso',  'Part. Pagado'),
('6006', 'Instituto Miguel León Prado',                  'Valparaíso', 'Valparaíso',  'Part. Subvencionado'),
('6007', 'Liceo Bicentenario República de Brasil',       'Valparaíso', 'Viña del Mar','Municipal'),
('6008', 'Colegio McKay',                                'Valparaíso', 'Viña del Mar','Part. Pagado'),
('6009', 'Colegio San Pedro Nolasco',                    'Valparaíso', 'Viña del Mar','Part. Subvencionado'),
('6010', 'Colegio Maristas Hermano Camilo',              'Valparaíso', 'Viña del Mar','Part. Subvencionado'),
('6011', 'Liceo Politécnico de Quilpué',                 'Valparaíso', 'Quilpué',     'Municipal'),
('6012', 'Liceo Santa María de San Felipe',              'Valparaíso', 'San Felipe',  'Municipal'),
('6013', 'Liceo Bicentenario de San Antonio',            'Valparaíso', 'San Antonio', 'Municipal'),

-- Metropolitana
('7001', 'Instituto Nacional General José Miguel Carrera','Metropolitana','Santiago',    'Municipal'),
('7002', 'Liceo 1 Javiera Carrera',                      'Metropolitana','Santiago',    'Municipal'),
('7003', 'Liceo de Aplicación',                          'Metropolitana','Santiago',    'Municipal'),
('7004', 'Liceo Experimental Manuel de Salas',           'Metropolitana','Ñuñoa',       'Municipal'),
('7005', 'Liceo Andrés Bello',                           'Metropolitana','Santiago',    'Municipal'),
('7006', 'Liceo Valentín Letelier',                      'Metropolitana','Santiago',    'Municipal'),
('7007', 'Liceo José Victorino Lastarria',               'Metropolitana','Santiago',    'Municipal'),
('7008', 'Liceo Manuel Barros Borgoño',                  'Metropolitana','Santiago',    'Municipal'),
('7009', 'Liceo Luis Amunátegui',                        'Metropolitana','Santiago',    'Municipal'),
('7010', 'Liceo Darío Salas',                            'Metropolitana','Santiago',    'Municipal'),
('7011', 'Liceo Polivalente Confederación Suiza',        'Metropolitana','Santiago',    'Municipal'),
('7012', 'Liceo Industrial Benjamín Dávila Larraín',     'Metropolitana','Santiago',    'Municipal'),
('7013', 'Liceo Gabriela Mistral de Providencia',        'Metropolitana','Providencia', 'Municipal'),
('7014', 'Liceo Francisco de Miranda',                   'Metropolitana','Santiago',    'Municipal'),
('7015', 'Liceo Bicentenario de San Bernardo',           'Metropolitana','San Bernardo','Municipal'),
('7016', 'Liceo Camilo Henríquez de Puente Alto',        'Metropolitana','Puente Alto', 'Municipal'),
('7017', 'Colegio Sagrados Corazones de Alameda',        'Metropolitana','Santiago',    'Part. Subvencionado'),
('7018', 'Colegio San Ignacio El Bosque',                'Metropolitana','Providencia', 'Part. Subvencionado'),
('7019', 'Colegio San Ignacio Alonso Ovalle',            'Metropolitana','Santiago',    'Part. Subvencionado'),
('7020', 'Instituto Alonso de Ercilla',                  'Metropolitana','Santiago',    'Part. Subvencionado'),
('7021', 'Colegio La Salle de Santiago',                 'Metropolitana','Providencia', 'Part. Subvencionado'),
('7022', 'Colegio Alberto Hurtado',                      'Metropolitana','Pudahuel',    'Part. Subvencionado'),
('7023', 'The Grange School',                            'Metropolitana','La Reina',    'Part. Pagado'),
('7024', 'Saint George''s College',                      'Metropolitana','Las Condes',  'Part. Pagado'),
('7025', 'Colegio Nido de Águilas',                      'Metropolitana','Las Condes',  'Part. Pagado'),
('7026', 'Deutsche Schule Santiago',                     'Metropolitana','Las Condes',  'Part. Pagado'),
('7027', 'Colegio Dunalastair',                          'Metropolitana','Las Condes',  'Part. Pagado'),
('7028', 'Colegio Mayflower',                            'Metropolitana','Las Condes',  'Part. Pagado'),
('7029', 'Colegio Tabancura',                            'Metropolitana','Las Condes',  'Part. Pagado'),
('7030', 'Colegio Cumbres',                              'Metropolitana','Las Condes',  'Part. Pagado'),
('7031', 'Colegio Craighouse',                           'Metropolitana','Las Condes',  'Part. Pagado'),
('7032', 'Colegio Villa María Academy',                  'Metropolitana','Providencia', 'Part. Pagado'),

-- O'Higgins
('8001', 'Instituto O''Higgins de Rancagua',             'O''Higgins', 'Rancagua',    'Municipal'),
('8002', 'Liceo Oscar Castro Zúñiga',                    'O''Higgins', 'Rancagua',    'Municipal'),
('8003', 'Liceo Técnico Profesional de Rancagua',        'O''Higgins', 'Rancagua',    'Municipal'),
('8004', 'Liceo Bicentenario de Excelencia Rancagua',    'O''Higgins', 'Rancagua',    'Municipal'),
('8005', 'Colegio Alemán de Rancagua',                   'O''Higgins', 'Rancagua',    'Part. Pagado'),
('8006', 'Colegio San Francisco de Asís Rancagua',       'O''Higgins', 'Rancagua',    'Part. Subvencionado'),
('8007', 'Liceo de San Fernando',                        'O''Higgins', 'San Fernando','Municipal'),
('8008', 'Liceo Politécnico Santa Cruz',                 'O''Higgins', 'Santa Cruz',  'Municipal'),

-- Maule
('9001', 'Liceo Abate Molina',                           'Maule', 'Talca',   'Municipal'),
('9002', 'Liceo Bicentenario de Excelencia Talca',       'Maule', 'Talca',   'Municipal'),
('9003', 'Liceo Industrial de Talca',                    'Maule', 'Talca',   'Municipal'),
('9004', 'Colegio Alemán de Talca',                      'Maule', 'Talca',   'Part. Pagado'),
('9005', 'Liceo de Curicó',                              'Maule', 'Curicó',  'Municipal'),
('9006', 'Colegio San Agustín de Curicó',                'Maule', 'Curicó',  'Part. Subvencionado'),
('9007', 'Liceo Técnico Profesional de Linares',         'Maule', 'Linares', 'Municipal'),

-- Ñuble
('10001', 'Liceo Óscar Castro Zúñiga de Chillán',        'Ñuble', 'Chillán',    'Municipal'),
('10002', 'Liceo Industrial de Chillán',                  'Ñuble', 'Chillán',    'Municipal'),
('10003', 'Instituto Comercial de Chillán',               'Ñuble', 'Chillán',    'Municipal'),
('10004', 'Colegio San Carlos de Chillán',                'Ñuble', 'Chillán',    'Part. Subvencionado'),
('10005', 'Liceo Técnico Profesional de San Carlos',      'Ñuble', 'San Carlos', 'Municipal'),

-- Biobío
('11001', 'Liceo Enrique Molina Garmendia',               'Biobío', 'Concepción', 'Municipal'),
('11002', 'Instituto Internacional de Concepción',        'Biobío', 'Concepción', 'Municipal'),
('11003', 'Liceo Industrial Pedro de Valdivia',           'Biobío', 'Concepción', 'Municipal'),
('11004', 'Liceo Técnico Femenino de Concepción',         'Biobío', 'Concepción', 'Municipal'),
('11005', 'Liceo Bicentenario de Excelencia Concepción',  'Biobío', 'Concepción', 'Municipal'),
('11006', 'Colegio Alemán de Concepción',                 'Biobío', 'Concepción', 'Part. Pagado'),
('11007', 'Colegio San Ignacio de Concepción',            'Biobío', 'Concepción', 'Part. Subvencionado'),
('11008', 'Liceo El Carmen de Los Ángeles',               'Biobío', 'Los Ángeles','Municipal'),
('11009', 'Liceo Técnico Profesional de Chiguayante',     'Biobío', 'Chiguayante','Municipal'),

-- La Araucanía
('12001', 'Liceo Pablo Neruda de Temuco',                 'La Araucanía', 'Temuco',    'Municipal'),
('12002', 'Liceo Bicentenario de Excelencia Temuco',      'La Araucanía', 'Temuco',    'Municipal'),
('12003', 'Liceo Camilo Henríquez de Temuco',             'La Araucanía', 'Temuco',    'Municipal'),
('12004', 'Liceo Industrial de Temuco',                   'La Araucanía', 'Temuco',    'Municipal'),
('12005', 'Instituto Inglés de Temuco',                   'La Araucanía', 'Temuco',    'Part. Subvencionado'),
('12006', 'Deutsche Schule Temuco',                       'La Araucanía', 'Temuco',    'Part. Pagado'),
('12007', 'Colegio San Agustín de Temuco',                'La Araucanía', 'Temuco',    'Part. Subvencionado'),
('12008', 'Liceo Técnico Profesional de Villarrica',      'La Araucanía', 'Villarrica','Municipal'),

-- Los Ríos
('13001', 'Liceo Carlos Anwandter',                       'Los Ríos', 'Valdivia',  'Municipal'),
('13002', 'Liceo Bicentenario de Excelencia Valdivia',    'Los Ríos', 'Valdivia',  'Municipal'),
('13003', 'Liceo Industrial de Valdivia',                 'Los Ríos', 'Valdivia',  'Municipal'),
('13004', 'Instituto Alemán de Valdivia',                 'Los Ríos', 'Valdivia',  'Part. Pagado'),
('13005', 'Instituto Sagrada Familia de Valdivia',        'Los Ríos', 'Valdivia',  'Part. Subvencionado'),
('13006', 'Liceo Técnico Profesional de La Unión',        'Los Ríos', 'La Unión',  'Municipal'),

-- Los Lagos
('14001', 'Instituto Superior de Comercio Puerto Montt',  'Los Lagos', 'Puerto Montt','Municipal'),
('14002', 'Liceo Bicentenario de Excelencia Puerto Montt','Los Lagos', 'Puerto Montt','Municipal'),
('14003', 'Liceo Politécnico de Puerto Montt',            'Los Lagos', 'Puerto Montt','Municipal'),
('14004', 'Colegio San Francisco Javier de Puerto Montt', 'Los Lagos', 'Puerto Montt','Part. Subvencionado'),
('14005', 'Deutsche Schule Puerto Montt',                 'Los Lagos', 'Puerto Montt','Part. Pagado'),
('14006', 'Liceo Bicentenario de Osorno',                 'Los Lagos', 'Osorno',      'Municipal'),
('14007', 'Liceo Industrial de Osorno',                   'Los Lagos', 'Osorno',      'Municipal'),
('14008', 'Colegio San Mateo de Osorno',                  'Los Lagos', 'Osorno',      'Part. Subvencionado'),

-- Aysén
('15001', 'Liceo Arturo Prat Chacón',                     'Aysén', 'Coyhaique',   'Municipal'),
('15002', 'Liceo Politécnico de Aysén',                   'Aysén', 'Coyhaique',   'Municipal'),
('15003', 'Instituto Don Bosco de Coyhaique',             'Aysén', 'Coyhaique',   'Part. Subvencionado'),
('15004', 'Liceo Técnico Profesional Puerto Aysén',       'Aysén', 'Puerto Aysén','Municipal'),

-- Magallanes
('16001', 'Liceo Fiscal Sara Braun',                      'Magallanes', 'Punta Arenas','Municipal'),
('16002', 'Liceo Industrial de Punta Arenas',             'Magallanes', 'Punta Arenas','Municipal'),
('16003', 'Instituto Magallanes',                         'Magallanes', 'Punta Arenas','Municipal'),
('16004', 'Liceo María Auxiliadora de Punta Arenas',      'Magallanes', 'Punta Arenas','Part. Subvencionado'),
('16005', 'Colegio Salesiano Don Bosco Punta Arenas',     'Magallanes', 'Punta Arenas','Part. Subvencionado')

ON CONFLICT (rbd) DO NOTHING;

-- ── Verificación ─────────────────────────────────────────────────────────────
SELECT 'usuarios' AS tabla, count(*) FROM usuarios
UNION ALL SELECT 'sesiones',  count(*) FROM sesiones
UNION ALL SELECT 'streak',    count(*) FROM streak
UNION ALL SELECT 'planner',   count(*) FROM planner
UNION ALL SELECT 'banco_ia',  count(*) FROM banco_ia
UNION ALL SELECT 'colegios',  count(*) FROM colegios;
