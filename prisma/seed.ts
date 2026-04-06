import { PrismaClient, Difficulty, QuestionType } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing data
  await prisma.attemptAnswer.deleteMany();
  await prisma.attempt.deleteMany();
  await prisma.questionOption.deleteMany();
  await prisma.question.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.topic.deleteMany();
  await prisma.exam.deleteMany();
  await prisma.studentProfile.deleteMany();
  await prisma.user.deleteMany();

  // Create demo user
  const hashedPassword = await bcrypt.hash('demo123', 10);
  const demoUser = await prisma.user.create({
    data: {
      email: 'demo@paes.cl',
      password: hashedPassword,
      name: 'Estudiante Demo',
      profile: {
        create: {
          targetScore: 700,
          targetM1: 700,
          targetM2: 650,
          targetLectora: 720,
          targetHistoria: 680,
          targetCiencias: 660,
          gradeLevel: '4to Medio',
          school: 'Colegio Demo',
        },
      },
    },
  });
  console.log('Created demo user:', demoUser.email);

  // ============================================================
  // EXAMS
  // ============================================================
  const lectora = await prisma.exam.create({
    data: {
      name: 'Comprensión Lectora',
      code: 'LECTORA',
      description: 'Prueba de Comprensión Lectora PAES',
      duration: 100,
      totalQ: 65,
    },
  });

  const m1 = await prisma.exam.create({
    data: {
      name: 'Matemática M1',
      code: 'M1',
      description: 'Prueba de Matemática 1 (Obligatoria)',
      duration: 100,
      totalQ: 65,
    },
  });

  const m2 = await prisma.exam.create({
    data: {
      name: 'Matemática M2',
      code: 'M2',
      description: 'Prueba de Matemática 2 (Electiva)',
      duration: 100,
      totalQ: 65,
    },
  });

  const historia = await prisma.exam.create({
    data: {
      name: 'Historia y Ciencias Sociales',
      code: 'HISTORIA',
      description: 'Prueba de Historia, Geografía y Ciencias Sociales',
      duration: 100,
      totalQ: 65,
    },
  });

  const bioExam = await prisma.exam.create({
    data: {
      name: 'Ciencias - Biología',
      code: 'CIENCIAS_BIO',
      description: 'Prueba de Ciencias módulo Biología',
      duration: 100,
      totalQ: 65,
    },
  });

  const fisExam = await prisma.exam.create({
    data: {
      name: 'Ciencias - Física',
      code: 'CIENCIAS_FIS',
      description: 'Prueba de Ciencias módulo Física',
      duration: 100,
      totalQ: 65,
    },
  });

  const quiExam = await prisma.exam.create({
    data: {
      name: 'Ciencias - Química',
      code: 'CIENCIAS_QUI',
      description: 'Prueba de Ciencias módulo Química',
      duration: 100,
      totalQ: 65,
    },
  });

  // ============================================================
  // LECTORA TOPICS & SKILLS
  // ============================================================
  const topicLocalizar = await prisma.topic.create({
    data: { examId: lectora.id, name: 'Localizar información', order: 1 },
  });
  const topicInterpretar = await prisma.topic.create({
    data: { examId: lectora.id, name: 'Interpretar y relacionar', order: 2 },
  });
  const topicEvaluar = await prisma.topic.create({
    data: { examId: lectora.id, name: 'Evaluar y reflexionar', order: 3 },
  });

  const skillLocalizar = await prisma.skill.create({
    data: { topicId: topicLocalizar.id, name: 'Localizar información explícita', order: 1 },
  });
  const skillInterpretar = await prisma.skill.create({
    data: { topicId: topicInterpretar.id, name: 'Interpretar sentido global', order: 1 },
  });
  const skillEvaluar = await prisma.skill.create({
    data: { topicId: topicEvaluar.id, name: 'Evaluar argumento y propósito', order: 1 },
  });

  // ============================================================
  // M1 TOPICS & SKILLS
  // ============================================================
  const topicNumeros = await prisma.topic.create({
    data: { examId: m1.id, name: 'Números', order: 1 },
  });
  const topicAlgebra = await prisma.topic.create({
    data: { examId: m1.id, name: 'Álgebra y funciones', order: 2 },
  });
  const topicGeometria = await prisma.topic.create({
    data: { examId: m1.id, name: 'Geometría', order: 3 },
  });
  const topicProb = await prisma.topic.create({
    data: { examId: m1.id, name: 'Probabilidad y estadística', order: 4 },
  });

  const skillNumeros = await prisma.skill.create({
    data: { topicId: topicNumeros.id, name: 'Operar con números racionales', order: 1 },
  });
  const skillAlgebra = await prisma.skill.create({
    data: { topicId: topicAlgebra.id, name: 'Resolver ecuaciones e inecuaciones', order: 1 },
  });
  const skillFunciones = await prisma.skill.create({
    data: { topicId: topicAlgebra.id, name: 'Analizar funciones', order: 2 },
  });
  const skillGeo = await prisma.skill.create({
    data: { topicId: topicGeometria.id, name: 'Calcular áreas y perímetros', order: 1 },
  });
  const skillPitag = await prisma.skill.create({
    data: { topicId: topicGeometria.id, name: 'Aplicar teorema de Pitágoras', order: 2 },
  });
  const skillProb = await prisma.skill.create({
    data: { topicId: topicProb.id, name: 'Calcular probabilidades', order: 1 },
  });

  // ============================================================
  // M2 TOPICS & SKILLS
  // ============================================================
  const topicLog = await prisma.topic.create({
    data: { examId: m2.id, name: 'Logaritmos y exponenciales', order: 1 },
  });
  const topicTrig = await prisma.topic.create({
    data: { examId: m2.id, name: 'Trigonometría', order: 2 },
  });
  const topicFinan = await prisma.topic.create({
    data: { examId: m2.id, name: 'Matemática financiera', order: 3 },
  });
  const topicEstad = await prisma.topic.create({
    data: { examId: m2.id, name: 'Estadística avanzada', order: 4 },
  });
  const topicSistema = await prisma.topic.create({
    data: { examId: m2.id, name: 'Sistemas de ecuaciones', order: 5 },
  });

  const skillLog = await prisma.skill.create({
    data: { topicId: topicLog.id, name: 'Aplicar propiedades de logaritmos', order: 1 },
  });
  const skillExp = await prisma.skill.create({
    data: { topicId: topicLog.id, name: 'Resolver ecuaciones exponenciales', order: 2 },
  });
  const skillTrig = await prisma.skill.create({
    data: { topicId: topicTrig.id, name: 'Resolver triángulos', order: 1 },
  });
  const skillFinan = await prisma.skill.create({
    data: { topicId: topicFinan.id, name: 'Calcular interés compuesto', order: 1 },
  });
  const skillEstad2 = await prisma.skill.create({
    data: { topicId: topicEstad.id, name: 'Analizar distribuciones', order: 1 },
  });
  const skillSistema = await prisma.skill.create({
    data: { topicId: topicSistema.id, name: 'Resolver sistemas 2x2', order: 1 },
  });

  // ============================================================
  // HISTORIA TOPICS & SKILLS
  // ============================================================
  const topicChileXIX = await prisma.topic.create({
    data: { examId: historia.id, name: 'Chile siglo XIX', order: 1 },
  });
  const topicGuerraFria = await prisma.topic.create({
    data: { examId: historia.id, name: 'Guerra Fría y dictadura en Chile', order: 2 },
  });
  const topicCiudadania = await prisma.topic.create({
    data: { examId: historia.id, name: 'Formación ciudadana', order: 3 },
  });
  const topicEconomia = await prisma.topic.create({
    data: { examId: historia.id, name: 'Sistema económico', order: 4 },
  });

  const skillChileXIX = await prisma.skill.create({
    data: { topicId: topicChileXIX.id, name: 'Analizar procesos independentistas', order: 1 },
  });
  const skillGuerraFria = await prisma.skill.create({
    data: { topicId: topicGuerraFria.id, name: 'Contextualizar conflictos bipolares', order: 1 },
  });
  const skillCiudadania = await prisma.skill.create({
    data: { topicId: topicCiudadania.id, name: 'Comprender derechos y deberes', order: 1 },
  });
  const skillEconomia = await prisma.skill.create({
    data: { topicId: topicEconomia.id, name: 'Analizar sistemas económicos', order: 1 },
  });

  // ============================================================
  // BIOLOGÍA TOPICS & SKILLS
  // ============================================================
  const topicCelula = await prisma.topic.create({
    data: { examId: bioExam.id, name: 'Organización celular', order: 1 },
  });
  const topicNervioso = await prisma.topic.create({
    data: { examId: bioExam.id, name: 'Sistema nervioso', order: 2 },
  });
  const topicHerencia = await prisma.topic.create({
    data: { examId: bioExam.id, name: 'Herencia y evolución', order: 3 },
  });
  const topicFotoResp = await prisma.topic.create({
    data: { examId: bioExam.id, name: 'Fotosíntesis y respiración', order: 4 },
  });

  const skillCelula = await prisma.skill.create({
    data: { topicId: topicCelula.id, name: 'Identificar organelos celulares', order: 1 },
  });
  const skillNervioso = await prisma.skill.create({
    data: { topicId: topicNervioso.id, name: 'Describir el impulso nervioso', order: 1 },
  });
  const skillHerencia = await prisma.skill.create({
    data: { topicId: topicHerencia.id, name: 'Aplicar leyes de Mendel', order: 1 },
  });
  const skillFoto = await prisma.skill.create({
    data: { topicId: topicFotoResp.id, name: 'Identificar etapas de fotosíntesis', order: 1 },
  });

  // ============================================================
  // FÍSICA TOPICS & SKILLS
  // ============================================================
  const topicMecanica = await prisma.topic.create({
    data: { examId: fisExam.id, name: 'Mecánica', order: 1 },
  });
  const topicOndasElec = await prisma.topic.create({
    data: { examId: fisExam.id, name: 'Ondas y electricidad', order: 2 },
  });

  const skillMRU = await prisma.skill.create({
    data: { topicId: topicMecanica.id, name: 'Resolver problemas de MRU y MRUA', order: 1 },
  });
  const skillNewton = await prisma.skill.create({
    data: { topicId: topicMecanica.id, name: 'Aplicar leyes de Newton', order: 2 },
  });
  const skillOndas = await prisma.skill.create({
    data: { topicId: topicOndasElec.id, name: 'Analizar propiedades de ondas', order: 1 },
  });
  const skillElec = await prisma.skill.create({
    data: { topicId: topicOndasElec.id, name: 'Aplicar ley de Ohm', order: 2 },
  });

  // ============================================================
  // QUÍMICA TOPICS & SKILLS
  // ============================================================
  const topicAtomo = await prisma.topic.create({
    data: { examId: quiExam.id, name: 'Estructura atómica', order: 1 },
  });
  const topicReacciones = await prisma.topic.create({
    data: { examId: quiExam.id, name: 'Reacciones químicas', order: 2 },
  });

  const skillAtomo = await prisma.skill.create({
    data: { topicId: topicAtomo.id, name: 'Identificar configuración electrónica', order: 1 },
  });
  const skillReacciones = await prisma.skill.create({
    data: { topicId: topicReacciones.id, name: 'Balancear ecuaciones químicas', order: 1 },
  });
  const skillEstequio = await prisma.skill.create({
    data: { topicId: topicReacciones.id, name: 'Resolver problemas estequiométricos', order: 2 },
  });

  // ============================================================
  // LECTORA QUESTIONS (15)
  // ============================================================
  const textoDigital = `La transformación digital en la educación chilena ha avanzado de manera heterogénea durante la última década. Mientras los establecimientos educacionales de zonas urbanas han incorporado tecnologías como pizarras interactivas, plataformas de aprendizaje en línea y dispositivos personales para cada estudiante, las escuelas rurales aún enfrentan barreras significativas relacionadas con la conectividad y el acceso a equipamiento. Según el Ministerio de Educación, el 78% de los colegios urbanos cuenta con acceso a internet de banda ancha, cifra que desciende al 41% en establecimientos rurales.

Esta brecha digital no solo afecta el acceso a recursos educativos, sino también las metodologías pedagógicas que los docentes pueden implementar. Un profesor que dispone de tecnología adecuada puede diseñar actividades colaborativas en tiempo real, utilizar simulaciones para enseñar conceptos abstractos y acceder a bases de datos académicas actualizadas. En contraste, los docentes en zonas de menor conectividad dependen de recursos físicos y metodologías tradicionales que, aunque válidas, limitan el repertorio pedagógico disponible.

El debate en torno a la equidad educativa en la era digital requiere reconocer que la tecnología no es un fin en sí mismo, sino un medio para potenciar el aprendizaje. Expertos en educación señalan que la implementación tecnológica debe ir acompañada de formación docente continua, ya que sin las competencias pedagógicas necesarias, los dispositivos tecnológicos se convierten en recursos subutilizados o, peor aún, en fuentes de distracción. La verdadera transformación digital en educación consiste en redefinir las prácticas pedagógicas, no simplemente en dotar a las aulas de pantallas y conexiones.`;

  await prisma.question.create({
    data: {
      examId: lectora.id, topicId: topicLocalizar.id, skillId: skillLocalizar.id,
      type: QuestionType.READING_BASED, difficulty: Difficulty.EASY,
      stem: '¿Qué porcentaje de colegios urbanos cuenta con acceso a internet de banda ancha según el Ministerio de Educación?',
      textBase: textoDigital,
      explanation: 'El texto indica explícitamente que "el 78% de los colegios urbanos cuenta con acceso a internet de banda ancha", lo que hace que la opción correcta sea directamente localizable en el tercer enunciado del primer párrafo.',
      options: {
        create: [
          { label: 'A', text: '41%', isCorrect: false, order: 1 },
          { label: 'B', text: '78%', isCorrect: true, order: 2 },
          { label: 'C', text: '65%', isCorrect: false, order: 3 },
          { label: 'D', text: '82%', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: lectora.id, topicId: topicLocalizar.id, skillId: skillLocalizar.id,
      type: QuestionType.READING_BASED, difficulty: Difficulty.EASY,
      stem: 'Según el texto, ¿cuál es uno de los recursos tecnológicos que los establecimientos urbanos han incorporado?',
      textBase: textoDigital,
      explanation: 'El primer párrafo menciona explícitamente "pizarras interactivas" como uno de los recursos tecnológicos incorporados por establecimientos urbanos.',
      options: {
        create: [
          { label: 'A', text: 'Calculadoras científicas avanzadas', isCorrect: false, order: 1 },
          { label: 'B', text: 'Laboratorios de ciencias móviles', isCorrect: false, order: 2 },
          { label: 'C', text: 'Pizarras interactivas', isCorrect: true, order: 3 },
          { label: 'D', text: 'Televisores de alta definición', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: lectora.id, topicId: topicLocalizar.id, skillId: skillLocalizar.id,
      type: QuestionType.READING_BASED, difficulty: Difficulty.EASY,
      stem: '¿Qué cifra de conectividad corresponde a los establecimientos rurales?',
      textBase: textoDigital,
      explanation: 'El texto afirma que el acceso a internet de banda ancha "desciende al 41% en establecimientos rurales", dato localizable en el primer párrafo.',
      options: {
        create: [
          { label: 'A', text: '78%', isCorrect: false, order: 1 },
          { label: 'B', text: '55%', isCorrect: false, order: 2 },
          { label: 'C', text: '41%', isCorrect: true, order: 3 },
          { label: 'D', text: '33%', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: lectora.id, topicId: topicLocalizar.id, skillId: skillLocalizar.id,
      type: QuestionType.READING_BASED, difficulty: Difficulty.MEDIUM,
      stem: 'Según el texto, ¿qué condición señalan los expertos en educación para que la tecnología sea efectiva?',
      textBase: textoDigital,
      explanation: 'El tercer párrafo indica explícitamente que "la implementación tecnológica debe ir acompañada de formación docente continua" como condición señalada por los expertos.',
      options: {
        create: [
          { label: 'A', text: 'Disponer de equipos de última generación', isCorrect: false, order: 1 },
          { label: 'B', text: 'Contar con formación docente continua', isCorrect: true, order: 2 },
          { label: 'C', text: 'Aumentar el presupuesto en infraestructura', isCorrect: false, order: 3 },
          { label: 'D', text: 'Reducir el número de estudiantes por sala', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: lectora.id, topicId: topicLocalizar.id, skillId: skillLocalizar.id,
      type: QuestionType.READING_BASED, difficulty: Difficulty.MEDIUM,
      stem: '¿Cuál es la diferencia entre las posibilidades pedagógicas del docente urbano versus el rural, según el texto?',
      textBase: textoDigital,
      explanation: 'El segundo párrafo detalla que el docente urbano puede usar actividades colaborativas en tiempo real y simulaciones, mientras que el rural depende de recursos físicos y metodologías tradicionales.',
      options: {
        create: [
          { label: 'A', text: 'El docente urbano trabaja más horas que el rural', isCorrect: false, order: 1 },
          { label: 'B', text: 'El docente urbano tiene mayor salario', isCorrect: false, order: 2 },
          { label: 'C', text: 'El docente urbano puede diseñar actividades colaborativas en tiempo real y usar simulaciones', isCorrect: true, order: 3 },
          { label: 'D', text: 'El docente rural tiene mayor autonomía pedagógica', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: lectora.id, topicId: topicInterpretar.id, skillId: skillInterpretar.id,
      type: QuestionType.READING_BASED, difficulty: Difficulty.MEDIUM,
      stem: '¿Cuál es la idea central del texto?',
      textBase: textoDigital,
      explanation: 'El texto argumenta que la transformación digital educativa es desigual entre zonas urbanas y rurales, y que su efectividad depende de la formación docente, no solo del equipamiento. Esta es la idea que atraviesa todo el texto.',
      options: {
        create: [
          { label: 'A', text: 'La tecnología es el principal obstáculo para el aprendizaje en Chile', isCorrect: false, order: 1 },
          { label: 'B', text: 'La transformación digital en educación es inequitativa y requiere formación docente para ser efectiva', isCorrect: true, order: 2 },
          { label: 'C', text: 'Los colegios rurales no necesitan tecnología para enseñar bien', isCorrect: false, order: 3 },
          { label: 'D', text: 'El Ministerio de Educación debe privatizar la educación digital', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: lectora.id, topicId: topicInterpretar.id, skillId: skillInterpretar.id,
      type: QuestionType.READING_BASED, difficulty: Difficulty.MEDIUM,
      stem: 'La expresión "brecha digital" en el contexto del texto se refiere a:',
      textBase: textoDigital,
      explanation: 'La "brecha digital" se introduce justo después de comparar el 78% urbano con el 41% rural, refiriéndose a la desigualdad en el acceso y uso de tecnología entre distintos contextos socioeducativos.',
      options: {
        create: [
          { label: 'A', text: 'La falta de electricidad en zonas rurales', isCorrect: false, order: 1 },
          { label: 'B', text: 'La diferencia de habilidades entre estudiantes', isCorrect: false, order: 2 },
          { label: 'C', text: 'La desigualdad en el acceso y uso de tecnología entre contextos educativos', isCorrect: true, order: 3 },
          { label: 'D', text: 'Los problemas técnicos de los dispositivos electrónicos', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: lectora.id, topicId: topicInterpretar.id, skillId: skillInterpretar.id,
      type: QuestionType.READING_BASED, difficulty: Difficulty.HARD,
      stem: '¿Qué implica la afirmación del texto: "sin las competencias pedagógicas necesarias, los dispositivos tecnológicos se convierten en recursos subutilizados"?',
      textBase: textoDigital,
      explanation: 'La afirmación implica que la tecnología por sí sola no garantiza un mejor aprendizaje; su efectividad depende de cómo el docente la integra pedagógicamente, lo que subraya que la formación docente es la variable clave.',
      options: {
        create: [
          { label: 'A', text: 'Los docentes deben preferir métodos tradicionales sobre los digitales', isCorrect: false, order: 1 },
          { label: 'B', text: 'La tecnología solo es útil en colegios privados', isCorrect: false, order: 2 },
          { label: 'C', text: 'Sin formación adecuada, la tecnología no mejora el aprendizaje', isCorrect: true, order: 3 },
          { label: 'D', text: 'Los estudiantes no saben usar la tecnología educativa', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: lectora.id, topicId: topicInterpretar.id, skillId: skillInterpretar.id,
      type: QuestionType.READING_BASED, difficulty: Difficulty.HARD,
      stem: '¿Qué relación se establece entre la metodología pedagógica y el acceso tecnológico en el texto?',
      textBase: textoDigital,
      explanation: 'El texto plantea una relación de condicionamiento: el acceso tecnológico amplía el repertorio metodológico del docente, pero la ausencia de tecnología limita las metodologías disponibles, aunque no las invalida completamente.',
      options: {
        create: [
          { label: 'A', text: 'Son elementos completamente independientes en el proceso educativo', isCorrect: false, order: 1 },
          { label: 'B', text: 'El acceso tecnológico condiciona las metodologías que el docente puede implementar', isCorrect: true, order: 2 },
          { label: 'C', text: 'Las metodologías tradicionales son superiores a las digitales', isCorrect: false, order: 3 },
          { label: 'D', text: 'La metodología pedagógica determina el nivel de conectividad de la escuela', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: lectora.id, topicId: topicInterpretar.id, skillId: skillInterpretar.id,
      type: QuestionType.READING_BASED, difficulty: Difficulty.MEDIUM,
      stem: 'El autor describe las metodologías tradicionales como "válidas" pero "limitantes". ¿Qué actitud refleja esto?',
      textBase: textoDigital,
      explanation: 'El texto reconoce el valor de las metodologías tradicionales ("aunque válidas") sin desacreditarlas, pero señala que limitan el repertorio pedagógico disponible. Esto refleja una postura equilibrada y matizada.',
      options: {
        create: [
          { label: 'A', text: 'Rechazo total hacia los métodos de enseñanza convencionales', isCorrect: false, order: 1 },
          { label: 'B', text: 'Una postura equilibrada que reconoce valor en ambos enfoques', isCorrect: true, order: 2 },
          { label: 'C', text: 'Apoyo incondicional a la educación digital', isCorrect: false, order: 3 },
          { label: 'D', text: 'Crítica directa al sistema de formación docente', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: lectora.id, topicId: topicEvaluar.id, skillId: skillEvaluar.id,
      type: QuestionType.READING_BASED, difficulty: Difficulty.HARD,
      stem: '¿Cuál de los siguientes títulos refleja mejor el propósito comunicativo del texto?',
      textBase: textoDigital,
      explanation: 'El propósito es reflexionar críticamente sobre la desigualdad en la transformación digital educativa y sus implicancias pedagógicas, lo que corresponde a un análisis crítico y no meramente descriptivo.',
      options: {
        create: [
          { label: 'A', text: 'Manual de uso de tecnología en el aula', isCorrect: false, order: 1 },
          { label: 'B', text: 'Brecha digital y pedagogía: un análisis crítico de la educación chilena', isCorrect: true, order: 2 },
          { label: 'C', text: 'Historia de internet en Chile', isCorrect: false, order: 3 },
          { label: 'D', text: 'Ventajas y desventajas de los dispositivos móviles', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: lectora.id, topicId: topicEvaluar.id, skillId: skillEvaluar.id,
      type: QuestionType.READING_BASED, difficulty: Difficulty.HARD,
      stem: '¿Qué debilidad argumental podría identificarse en el texto?',
      textBase: textoDigital,
      explanation: 'El texto no cita fuentes primarias de expertos educativos ni evidencia empírica directa sobre el impacto de la formación docente, lo que debilita su argumento central sobre la necesidad de esta formación.',
      options: {
        create: [
          { label: 'A', text: 'No menciona la existencia de colegios rurales', isCorrect: false, order: 1 },
          { label: 'B', text: 'Cita demasiados expertos, lo que confunde al lector', isCorrect: false, order: 2 },
          { label: 'C', text: 'Menciona la opinión de expertos sin citar estudios concretos que la respalden', isCorrect: true, order: 3 },
          { label: 'D', text: 'Solo habla de colegios privados, ignorando los públicos', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: lectora.id, topicId: topicEvaluar.id, skillId: skillEvaluar.id,
      type: QuestionType.READING_BASED, difficulty: Difficulty.MEDIUM,
      stem: '¿Con qué intención el autor afirma que "la tecnología no es un fin en sí mismo"?',
      textBase: textoDigital,
      explanation: 'El autor busca reorientar la discusión desde la provisión de equipamiento hacia el uso pedagógico significativo de la tecnología, argumentando que el fin último es mejorar el aprendizaje, no digitalizar por digitalizar.',
      options: {
        create: [
          { label: 'A', text: 'Para desacreditar el uso de tecnología en la educación', isCorrect: false, order: 1 },
          { label: 'B', text: 'Para argumentar que la tecnología debe ser un medio al servicio del aprendizaje', isCorrect: true, order: 2 },
          { label: 'C', text: 'Para criticar al Ministerio de Educación', isCorrect: false, order: 3 },
          { label: 'D', text: 'Para convencer a los padres de no comprar dispositivos', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: lectora.id, topicId: topicEvaluar.id, skillId: skillEvaluar.id,
      type: QuestionType.READING_BASED, difficulty: Difficulty.HARD,
      stem: '¿Qué tipo de texto es el que acabas de leer?',
      textBase: textoDigital,
      explanation: 'El texto combina información objetiva (estadísticas del Ministerio) con argumentación sobre la función de la tecnología educativa, por lo que corresponde a un texto argumentativo-expositivo.',
      options: {
        create: [
          { label: 'A', text: 'Narrativo con personajes y trama', isCorrect: false, order: 1 },
          { label: 'B', text: 'Instructivo con pasos a seguir', isCorrect: false, order: 2 },
          { label: 'C', text: 'Argumentativo-expositivo sobre educación y tecnología', isCorrect: true, order: 3 },
          { label: 'D', text: 'Publicitario orientado a vender tecnología', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: lectora.id, topicId: topicEvaluar.id, skillId: skillEvaluar.id,
      type: QuestionType.READING_BASED, difficulty: Difficulty.MEDIUM,
      stem: '¿Cuál de las siguientes ideas complementaría mejor la argumentación del texto?',
      textBase: textoDigital,
      explanation: 'Si la formación docente es clave para el uso efectivo de la tecnología, agregar evidencia de programas de capacitación exitosos reforzaría directamente el argumento central del texto.',
      options: {
        create: [
          { label: 'A', text: 'Las redes sociales perjudican el rendimiento académico', isCorrect: false, order: 1 },
          { label: 'B', text: 'Los programas de capacitación docente en TIC han mejorado resultados en zonas rurales', isCorrect: true, order: 2 },
          { label: 'C', text: 'Chile tiene una de las mejores infraestructuras digitales de Latinoamérica', isCorrect: false, order: 3 },
          { label: 'D', text: 'Los estudiantes prefieren aprender con libros físicos', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  // ============================================================
  // M1 QUESTIONS (20)
  // ============================================================

  // Números (5)
  await prisma.question.create({
    data: {
      examId: m1.id, topicId: topicNumeros.id, skillId: skillNumeros.id,
      type: QuestionType.CALCULATION, difficulty: Difficulty.EASY,
      stem: 'Si un producto cuesta $15.000 y se aplica un descuento del 20%, ¿cuánto se paga finalmente?',
      explanation: 'El 20% de $15.000 es $3.000. Precio final = $15.000 - $3.000 = $12.000.',
      options: {
        create: [
          { label: 'A', text: '$3.000', isCorrect: false, order: 1 },
          { label: 'B', text: '$12.000', isCorrect: true, order: 2 },
          { label: 'C', text: '$13.000', isCorrect: false, order: 3 },
          { label: 'D', text: '$18.000', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: m1.id, topicId: topicNumeros.id, skillId: skillNumeros.id,
      type: QuestionType.CALCULATION, difficulty: Difficulty.EASY,
      stem: '¿Cuál es el valor de (3/4) + (1/6)?',
      explanation: 'Para sumar fracciones con distinto denominador, se busca el mínimo común múltiplo de 4 y 6, que es 12. (3/4) = 9/12 y (1/6) = 2/12. Entonces 9/12 + 2/12 = 11/12.',
      options: {
        create: [
          { label: 'A', text: '4/10', isCorrect: false, order: 1 },
          { label: 'B', text: '11/12', isCorrect: true, order: 2 },
          { label: 'C', text: '4/12', isCorrect: false, order: 3 },
          { label: 'D', text: '5/6', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: m1.id, topicId: topicNumeros.id, skillId: skillNumeros.id,
      type: QuestionType.CALCULATION, difficulty: Difficulty.MEDIUM,
      stem: 'Si el precio de una bicicleta aumentó un 15% y ahora cuesta $69.000, ¿cuál era su precio original?',
      explanation: 'Precio original × 1,15 = 69.000. Precio original = 69.000 / 1,15 = 60.000.',
      options: {
        create: [
          { label: 'A', text: '$55.000', isCorrect: false, order: 1 },
          { label: 'B', text: '$58.000', isCorrect: false, order: 2 },
          { label: 'C', text: '$60.000', isCorrect: true, order: 3 },
          { label: 'D', text: '$62.000', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: m1.id, topicId: topicNumeros.id, skillId: skillNumeros.id,
      type: QuestionType.CALCULATION, difficulty: Difficulty.MEDIUM,
      stem: '¿Cuánto es 2³ × 2⁴?',
      explanation: 'Cuando se multiplican potencias de igual base, se suman los exponentes: 2³ × 2⁴ = 2^(3+4) = 2⁷ = 128.',
      options: {
        create: [
          { label: 'A', text: '64', isCorrect: false, order: 1 },
          { label: 'B', text: '128', isCorrect: true, order: 2 },
          { label: 'C', text: '256', isCorrect: false, order: 3 },
          { label: 'D', text: '2¹²', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: m1.id, topicId: topicNumeros.id, skillId: skillNumeros.id,
      type: QuestionType.CALCULATION, difficulty: Difficulty.HARD,
      stem: 'Una tienda ofrece un descuento del 10% sobre el precio ya rebajado en un 20%. Si el precio original era $50.000, ¿cuánto paga el cliente?',
      explanation: 'Primero se aplica el 20% de descuento: 50.000 × 0,80 = 40.000. Luego el 10% sobre ese precio: 40.000 × 0,90 = 36.000.',
      options: {
        create: [
          { label: 'A', text: '$34.000', isCorrect: false, order: 1 },
          { label: 'B', text: '$35.000', isCorrect: false, order: 2 },
          { label: 'C', text: '$36.000', isCorrect: true, order: 3 },
          { label: 'D', text: '$37.500', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  // Álgebra y funciones (7)
  await prisma.question.create({
    data: {
      examId: m1.id, topicId: topicAlgebra.id, skillId: skillAlgebra.id,
      type: QuestionType.CALCULATION, difficulty: Difficulty.EASY,
      stem: '¿Cuál es la solución de la ecuación 3x + 7 = 22?',
      explanation: '3x = 22 - 7 = 15. Entonces x = 15/3 = 5.',
      options: {
        create: [
          { label: 'A', text: 'x = 3', isCorrect: false, order: 1 },
          { label: 'B', text: 'x = 4', isCorrect: false, order: 2 },
          { label: 'C', text: 'x = 5', isCorrect: true, order: 3 },
          { label: 'D', text: 'x = 6', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: m1.id, topicId: topicAlgebra.id, skillId: skillAlgebra.id,
      type: QuestionType.CALCULATION, difficulty: Difficulty.MEDIUM,
      stem: '¿Cuáles son los valores de x que satisfacen x² - 5x + 6 = 0?',
      explanation: 'Factorizando: (x - 2)(x - 3) = 0, por lo tanto x = 2 o x = 3.',
      options: {
        create: [
          { label: 'A', text: 'x = 1 y x = 6', isCorrect: false, order: 1 },
          { label: 'B', text: 'x = 2 y x = 3', isCorrect: true, order: 2 },
          { label: 'C', text: 'x = -2 y x = -3', isCorrect: false, order: 3 },
          { label: 'D', text: 'x = 5 y x = 1', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: m1.id, topicId: topicAlgebra.id, skillId: skillFunciones.id,
      type: QuestionType.MULTIPLE_CHOICE, difficulty: Difficulty.MEDIUM,
      stem: 'La función f(x) = 2x - 4 tiene intercepto en y igual a:',
      explanation: 'El intercepto en y se obtiene evaluando f(0) = 2(0) - 4 = -4.',
      options: {
        create: [
          { label: 'A', text: '2', isCorrect: false, order: 1 },
          { label: 'B', text: '4', isCorrect: false, order: 2 },
          { label: 'C', text: '-4', isCorrect: true, order: 3 },
          { label: 'D', text: '0', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: m1.id, topicId: topicAlgebra.id, skillId: skillFunciones.id,
      type: QuestionType.MULTIPLE_CHOICE, difficulty: Difficulty.MEDIUM,
      stem: 'Para f(x) = x² - 4, ¿cuáles son los ceros de la función?',
      explanation: 'Los ceros se obtienen resolviendo x² - 4 = 0, lo que da x² = 4, es decir x = 2 o x = -2.',
      options: {
        create: [
          { label: 'A', text: 'x = 0 y x = 4', isCorrect: false, order: 1 },
          { label: 'B', text: 'x = 2', isCorrect: false, order: 2 },
          { label: 'C', text: 'x = 2 y x = -2', isCorrect: true, order: 3 },
          { label: 'D', text: 'x = -4', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: m1.id, topicId: topicAlgebra.id, skillId: skillAlgebra.id,
      type: QuestionType.CALCULATION, difficulty: Difficulty.HARD,
      stem: '¿Para qué valores de x se cumple que 2x - 1 < 5?',
      explanation: '2x < 6, entonces x < 3. La solución es el conjunto {x ∈ ℝ : x < 3}.',
      options: {
        create: [
          { label: 'A', text: 'x > 3', isCorrect: false, order: 1 },
          { label: 'B', text: 'x < 3', isCorrect: true, order: 2 },
          { label: 'C', text: 'x ≤ 3', isCorrect: false, order: 3 },
          { label: 'D', text: 'x ≥ 3', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: m1.id, topicId: topicAlgebra.id, skillId: skillFunciones.id,
      type: QuestionType.MULTIPLE_CHOICE, difficulty: Difficulty.HARD,
      stem: 'Si f(x) = x² + 2x - 3, ¿cuál es el vértice de la parábola?',
      explanation: 'El vértice de f(x) = ax² + bx + c tiene x-coordenada = -b/(2a) = -2/2 = -1. f(-1) = 1 - 2 - 3 = -4. Vértice: (-1, -4).',
      options: {
        create: [
          { label: 'A', text: '(1, 0)', isCorrect: false, order: 1 },
          { label: 'B', text: '(-1, -4)', isCorrect: true, order: 2 },
          { label: 'C', text: '(0, -3)', isCorrect: false, order: 3 },
          { label: 'D', text: '(-2, -3)', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: m1.id, topicId: topicAlgebra.id, skillId: skillFunciones.id,
      type: QuestionType.MULTIPLE_CHOICE, difficulty: Difficulty.MEDIUM,
      stem: 'Una función lineal pasa por los puntos (0, 3) y (2, 7). ¿Cuál es su ecuación?',
      explanation: 'La pendiente es m = (7-3)/(2-0) = 4/2 = 2. Como el intercepto es 3, la ecuación es f(x) = 2x + 3.',
      options: {
        create: [
          { label: 'A', text: 'f(x) = 3x + 2', isCorrect: false, order: 1 },
          { label: 'B', text: 'f(x) = 2x + 3', isCorrect: true, order: 2 },
          { label: 'C', text: 'f(x) = x + 5', isCorrect: false, order: 3 },
          { label: 'D', text: 'f(x) = 4x + 1', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  // Geometría (5)
  await prisma.question.create({
    data: {
      examId: m1.id, topicId: topicGeometria.id, skillId: skillPitag.id,
      type: QuestionType.CALCULATION, difficulty: Difficulty.EASY,
      stem: 'En un triángulo rectángulo, los catetos miden 3 y 4. ¿Cuánto mide la hipotenusa?',
      explanation: 'Usando el teorema de Pitágoras: c² = 3² + 4² = 9 + 16 = 25. Entonces c = 5.',
      options: {
        create: [
          { label: 'A', text: '5', isCorrect: true, order: 1 },
          { label: 'B', text: '6', isCorrect: false, order: 2 },
          { label: 'C', text: '7', isCorrect: false, order: 3 },
          { label: 'D', text: '√7', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: m1.id, topicId: topicGeometria.id, skillId: skillGeo.id,
      type: QuestionType.CALCULATION, difficulty: Difficulty.EASY,
      stem: '¿Cuál es el área de un rectángulo con base 8 cm y altura 5 cm?',
      explanation: 'Área de un rectángulo = base × altura = 8 × 5 = 40 cm².',
      options: {
        create: [
          { label: 'A', text: '26 cm²', isCorrect: false, order: 1 },
          { label: 'B', text: '40 cm²', isCorrect: true, order: 2 },
          { label: 'C', text: '13 cm²', isCorrect: false, order: 3 },
          { label: 'D', text: '35 cm²', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: m1.id, topicId: topicGeometria.id, skillId: skillGeo.id,
      type: QuestionType.CALCULATION, difficulty: Difficulty.MEDIUM,
      stem: 'El radio de un círculo es 7 cm. ¿Cuál es su área? (Use π ≈ 3,14)',
      explanation: 'Área del círculo = π × r² = 3,14 × 7² = 3,14 × 49 = 153,86 cm².',
      options: {
        create: [
          { label: 'A', text: '43,96 cm²', isCorrect: false, order: 1 },
          { label: 'B', text: '153,86 cm²', isCorrect: true, order: 2 },
          { label: 'C', text: '154 cm²', isCorrect: false, order: 3 },
          { label: 'D', text: '196 cm²', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: m1.id, topicId: topicGeometria.id, skillId: skillPitag.id,
      type: QuestionType.CALCULATION, difficulty: Difficulty.MEDIUM,
      stem: 'Una escalera de 10 m de largo se apoya en una pared y toca el suelo a 6 m de la base. ¿A qué altura toca la pared?',
      explanation: 'h² + 6² = 10². h² = 100 - 36 = 64. h = 8 m.',
      options: {
        create: [
          { label: 'A', text: '6 m', isCorrect: false, order: 1 },
          { label: 'B', text: '7 m', isCorrect: false, order: 2 },
          { label: 'C', text: '8 m', isCorrect: true, order: 3 },
          { label: 'D', text: '9 m', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: m1.id, topicId: topicGeometria.id, skillId: skillGeo.id,
      type: QuestionType.CALCULATION, difficulty: Difficulty.HARD,
      stem: 'Un trapecio tiene bases de 10 cm y 6 cm y una altura de 4 cm. ¿Cuál es su área?',
      explanation: 'Área del trapecio = ((B + b) / 2) × h = ((10 + 6) / 2) × 4 = 8 × 4 = 32 cm².',
      options: {
        create: [
          { label: 'A', text: '24 cm²', isCorrect: false, order: 1 },
          { label: 'B', text: '30 cm²', isCorrect: false, order: 2 },
          { label: 'C', text: '32 cm²', isCorrect: true, order: 3 },
          { label: 'D', text: '40 cm²', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  // Probabilidad (3)
  await prisma.question.create({
    data: {
      examId: m1.id, topicId: topicProb.id, skillId: skillProb.id,
      type: QuestionType.DATA_ANALYSIS, difficulty: Difficulty.EASY,
      stem: 'Se lanza un dado justo de 6 caras. ¿Cuál es la probabilidad de obtener un número par?',
      explanation: 'Los números pares en un dado son 2, 4 y 6, es decir 3 casos favorables de 6 posibles. Probabilidad = 3/6 = 1/2.',
      options: {
        create: [
          { label: 'A', text: '1/6', isCorrect: false, order: 1 },
          { label: 'B', text: '1/3', isCorrect: false, order: 2 },
          { label: 'C', text: '1/2', isCorrect: true, order: 3 },
          { label: 'D', text: '2/3', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: m1.id, topicId: topicProb.id, skillId: skillProb.id,
      type: QuestionType.DATA_ANALYSIS, difficulty: Difficulty.MEDIUM,
      stem: 'En una bolsa hay 3 bolas rojas, 2 azules y 5 verdes. Si se extrae una al azar, ¿cuál es la probabilidad de que sea azul?',
      explanation: 'Total de bolas = 3 + 2 + 5 = 10. Bolas azules = 2. Probabilidad = 2/10 = 1/5.',
      options: {
        create: [
          { label: 'A', text: '1/10', isCorrect: false, order: 1 },
          { label: 'B', text: '1/5', isCorrect: true, order: 2 },
          { label: 'C', text: '2/5', isCorrect: false, order: 3 },
          { label: 'D', text: '1/3', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: m1.id, topicId: topicProb.id, skillId: skillProb.id,
      type: QuestionType.DATA_ANALYSIS, difficulty: Difficulty.HARD,
      stem: 'Se lanzan dos monedas. ¿Cuál es la probabilidad de obtener al menos una cara?',
      explanation: 'El espacio muestral es {CC, CS, SC, SS}. Los casos con al menos una cara son CC, CS, SC: 3 casos. Probabilidad = 3/4.',
      options: {
        create: [
          { label: 'A', text: '1/4', isCorrect: false, order: 1 },
          { label: 'B', text: '1/2', isCorrect: false, order: 2 },
          { label: 'C', text: '3/4', isCorrect: true, order: 3 },
          { label: 'D', text: '1', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  // ============================================================
  // M2 QUESTIONS (15)
  // ============================================================

  // Logaritmos (4)
  await prisma.question.create({
    data: {
      examId: m2.id, topicId: topicLog.id, skillId: skillLog.id,
      type: QuestionType.CALCULATION, difficulty: Difficulty.MEDIUM,
      stem: '¿Cuál es el valor de log₂(32)?',
      explanation: 'log₂(32) = log₂(2⁵) = 5, ya que 2⁵ = 32.',
      options: {
        create: [
          { label: 'A', text: '3', isCorrect: false, order: 1 },
          { label: 'B', text: '4', isCorrect: false, order: 2 },
          { label: 'C', text: '5', isCorrect: true, order: 3 },
          { label: 'D', text: '6', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: m2.id, topicId: topicLog.id, skillId: skillLog.id,
      type: QuestionType.CALCULATION, difficulty: Difficulty.HARD,
      stem: 'Si log(a) = 2 y log(b) = 3, ¿cuál es log(a²b)?',
      explanation: 'Usando propiedades: log(a²b) = log(a²) + log(b) = 2·log(a) + log(b) = 2(2) + 3 = 7.',
      options: {
        create: [
          { label: 'A', text: '5', isCorrect: false, order: 1 },
          { label: 'B', text: '6', isCorrect: false, order: 2 },
          { label: 'C', text: '7', isCorrect: true, order: 3 },
          { label: 'D', text: '8', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: m2.id, topicId: topicLog.id, skillId: skillExp.id,
      type: QuestionType.CALCULATION, difficulty: Difficulty.MEDIUM,
      stem: 'Resuelve: 2^x = 64',
      explanation: '2^x = 64 = 2⁶, por lo tanto x = 6.',
      options: {
        create: [
          { label: 'A', text: 'x = 4', isCorrect: false, order: 1 },
          { label: 'B', text: 'x = 5', isCorrect: false, order: 2 },
          { label: 'C', text: 'x = 6', isCorrect: true, order: 3 },
          { label: 'D', text: 'x = 7', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: m2.id, topicId: topicLog.id, skillId: skillExp.id,
      type: QuestionType.CALCULATION, difficulty: Difficulty.HARD,
      stem: 'Una bacteria se duplica cada hora. Si inicialmente hay 100 bacterias, ¿cuántas habrá después de 4 horas?',
      explanation: 'Crecimiento exponencial: N(t) = 100 × 2⁴ = 100 × 16 = 1.600 bacterias.',
      options: {
        create: [
          { label: 'A', text: '400', isCorrect: false, order: 1 },
          { label: 'B', text: '800', isCorrect: false, order: 2 },
          { label: 'C', text: '1.600', isCorrect: true, order: 3 },
          { label: 'D', text: '3.200', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  // Trigonometría (3)
  await prisma.question.create({
    data: {
      examId: m2.id, topicId: topicTrig.id, skillId: skillTrig.id,
      type: QuestionType.CALCULATION, difficulty: Difficulty.MEDIUM,
      stem: '¿Cuánto mide sen(30°)?',
      explanation: 'El seno de 30° es un valor exacto: sen(30°) = 1/2.',
      options: {
        create: [
          { label: 'A', text: '1', isCorrect: false, order: 1 },
          { label: 'B', text: '√2/2', isCorrect: false, order: 2 },
          { label: 'C', text: '1/2', isCorrect: true, order: 3 },
          { label: 'D', text: '√3/2', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: m2.id, topicId: topicTrig.id, skillId: skillTrig.id,
      type: QuestionType.CALCULATION, difficulty: Difficulty.HARD,
      stem: 'En un triángulo rectángulo, el ángulo A mide 45° y la hipotenusa mide 10. ¿Cuánto mide el cateto opuesto a A?',
      explanation: 'sen(45°) = cateto opuesto / hipotenusa = √2/2. Cateto = 10 × (√2/2) = 5√2 ≈ 7,07.',
      options: {
        create: [
          { label: 'A', text: '5', isCorrect: false, order: 1 },
          { label: 'B', text: '5√2', isCorrect: true, order: 2 },
          { label: 'C', text: '5√3', isCorrect: false, order: 3 },
          { label: 'D', text: '10√2', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: m2.id, topicId: topicTrig.id, skillId: skillTrig.id,
      type: QuestionType.CALCULATION, difficulty: Difficulty.MEDIUM,
      stem: '¿Cuál de las siguientes identidades trigonométricas es correcta?',
      explanation: 'La identidad pitagórica fundamental establece que sen²(x) + cos²(x) = 1 para cualquier ángulo x.',
      options: {
        create: [
          { label: 'A', text: 'sen(x) = cos(x) para todo x', isCorrect: false, order: 1 },
          { label: 'B', text: 'sen²(x) + cos²(x) = 1', isCorrect: true, order: 2 },
          { label: 'C', text: 'tan(x) = sen(x) × cos(x)', isCorrect: false, order: 3 },
          { label: 'D', text: 'sen(2x) = 2sen(x)', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  // Matemática financiera (3)
  await prisma.question.create({
    data: {
      examId: m2.id, topicId: topicFinan.id, skillId: skillFinan.id,
      type: QuestionType.CALCULATION, difficulty: Difficulty.MEDIUM,
      stem: 'Se invierten $100.000 a una tasa de interés compuesto del 10% anual. ¿Cuánto habrá después de 2 años?',
      explanation: 'M = C(1 + r)^t = 100.000 × (1,10)² = 100.000 × 1,21 = $121.000.',
      options: {
        create: [
          { label: 'A', text: '$120.000', isCorrect: false, order: 1 },
          { label: 'B', text: '$121.000', isCorrect: true, order: 2 },
          { label: 'C', text: '$122.000', isCorrect: false, order: 3 },
          { label: 'D', text: '$110.000', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: m2.id, topicId: topicFinan.id, skillId: skillFinan.id,
      type: QuestionType.CALCULATION, difficulty: Difficulty.HARD,
      stem: 'Si $200.000 se invierten al 5% de interés simple anual, ¿cuánto interés se genera en 3 años?',
      explanation: 'Interés simple: I = C × r × t = 200.000 × 0,05 × 3 = $30.000.',
      options: {
        create: [
          { label: 'A', text: '$10.000', isCorrect: false, order: 1 },
          { label: 'B', text: '$20.000', isCorrect: false, order: 2 },
          { label: 'C', text: '$30.000', isCorrect: true, order: 3 },
          { label: 'D', text: '$40.000', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: m2.id, topicId: topicFinan.id, skillId: skillFinan.id,
      type: QuestionType.CALCULATION, difficulty: Difficulty.HARD,
      stem: 'Una persona toma un crédito de $500.000 con una tasa de interés compuesto del 2% mensual. ¿Cuánto debe pagar al cabo de 3 meses?',
      explanation: 'M = 500.000 × (1,02)³ = 500.000 × 1,061208 ≈ $530.604.',
      options: {
        create: [
          { label: 'A', text: '$530.000', isCorrect: false, order: 1 },
          { label: 'B', text: '$530.604', isCorrect: true, order: 2 },
          { label: 'C', text: '$531.000', isCorrect: false, order: 3 },
          { label: 'D', text: '$530.200', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  // Estadística (2)
  await prisma.question.create({
    data: {
      examId: m2.id, topicId: topicEstad.id, skillId: skillEstad2.id,
      type: QuestionType.DATA_ANALYSIS, difficulty: Difficulty.MEDIUM,
      stem: 'Los datos: 4, 7, 7, 8, 9, 10. ¿Cuál es la moda y la mediana?',
      explanation: 'La moda es 7 (aparece dos veces). Para la mediana con 6 datos se promedia el 3° y 4° valor: (7+8)/2 = 7,5.',
      options: {
        create: [
          { label: 'A', text: 'Moda = 8, Mediana = 7', isCorrect: false, order: 1 },
          { label: 'B', text: 'Moda = 7, Mediana = 7,5', isCorrect: true, order: 2 },
          { label: 'C', text: 'Moda = 7, Mediana = 8', isCorrect: false, order: 3 },
          { label: 'D', text: 'Moda = 9, Mediana = 7,5', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: m2.id, topicId: topicEstad.id, skillId: skillEstad2.id,
      type: QuestionType.DATA_ANALYSIS, difficulty: Difficulty.HARD,
      stem: 'La desviación estándar de los datos {2, 4, 4, 4, 5, 5, 7, 9} es:',
      explanation: 'La media es (2+4+4+4+5+5+7+9)/8 = 40/8 = 5. Las varianzas son: (9+1+1+1+0+0+4+16)/8 = 32/8 = 4. Desviación estándar = √4 = 2.',
      options: {
        create: [
          { label: 'A', text: '1', isCorrect: false, order: 1 },
          { label: 'B', text: '2', isCorrect: true, order: 2 },
          { label: 'C', text: '3', isCorrect: false, order: 3 },
          { label: 'D', text: '4', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  // Sistemas de ecuaciones (3)
  await prisma.question.create({
    data: {
      examId: m2.id, topicId: topicSistema.id, skillId: skillSistema.id,
      type: QuestionType.CALCULATION, difficulty: Difficulty.MEDIUM,
      stem: 'Resuelve el sistema: x + y = 5 y x - y = 1',
      explanation: 'Sumando las ecuaciones: 2x = 6, x = 3. Sustituyendo: 3 + y = 5, y = 2.',
      options: {
        create: [
          { label: 'A', text: 'x = 2, y = 3', isCorrect: false, order: 1 },
          { label: 'B', text: 'x = 3, y = 2', isCorrect: true, order: 2 },
          { label: 'C', text: 'x = 4, y = 1', isCorrect: false, order: 3 },
          { label: 'D', text: 'x = 1, y = 4', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: m2.id, topicId: topicSistema.id, skillId: skillSistema.id,
      type: QuestionType.CALCULATION, difficulty: Difficulty.HARD,
      stem: 'Resuelve: 2x + 3y = 12 y x - y = 1',
      explanation: 'De la segunda: x = y + 1. Sustituyendo: 2(y+1) + 3y = 12 → 5y + 2 = 12 → y = 2. x = 3.',
      options: {
        create: [
          { label: 'A', text: 'x = 2, y = 3', isCorrect: false, order: 1 },
          { label: 'B', text: 'x = 4, y = 3', isCorrect: false, order: 2 },
          { label: 'C', text: 'x = 3, y = 2', isCorrect: true, order: 3 },
          { label: 'D', text: 'x = 5, y = 4', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: m2.id, topicId: topicSistema.id, skillId: skillSistema.id,
      type: QuestionType.MULTIPLE_CHOICE, difficulty: Difficulty.MEDIUM,
      stem: '¿Cuántas soluciones tiene el sistema: 2x + 4y = 8 y x + 2y = 4?',
      explanation: 'La segunda ecuación multiplicada por 2 es igual a la primera. Son la misma recta, por lo tanto el sistema tiene infinitas soluciones.',
      options: {
        create: [
          { label: 'A', text: 'Ninguna solución', isCorrect: false, order: 1 },
          { label: 'B', text: 'Una única solución', isCorrect: false, order: 2 },
          { label: 'C', text: 'Infinitas soluciones', isCorrect: true, order: 3 },
          { label: 'D', text: 'Dos soluciones', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  // ============================================================
  // HISTORIA QUESTIONS (15)
  // ============================================================

  // Chile siglo XIX (4)
  await prisma.question.create({
    data: {
      examId: historia.id, topicId: topicChileXIX.id, skillId: skillChileXIX.id,
      type: QuestionType.MULTIPLE_CHOICE, difficulty: Difficulty.MEDIUM,
      stem: '¿En qué año se declaró la independencia de Chile?',
      explanation: 'Chile declaró formalmente su independencia el 12 de febrero de 1818, aunque el 18 de septiembre de 1810 se inició el proceso con la Primera Junta Nacional de Gobierno.',
      options: {
        create: [
          { label: 'A', text: '1810', isCorrect: false, order: 1 },
          { label: 'B', text: '1818', isCorrect: true, order: 2 },
          { label: 'C', text: '1823', isCorrect: false, order: 3 },
          { label: 'D', text: '1830', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: historia.id, topicId: topicChileXIX.id, skillId: skillChileXIX.id,
      type: QuestionType.MULTIPLE_CHOICE, difficulty: Difficulty.MEDIUM,
      stem: '¿Cuál fue el principal recurso que impulsó la economía chilena durante el siglo XIX, especialmente tras la Guerra del Pacífico?',
      explanation: 'Tras la Guerra del Pacífico (1879-1884), Chile obtuvo el control de la región del salitre en Tarapacá y Antofagasta, lo que convirtió al nitrato en el principal motor de la economía nacional por décadas.',
      options: {
        create: [
          { label: 'A', text: 'Cobre', isCorrect: false, order: 1 },
          { label: 'B', text: 'Trigo', isCorrect: false, order: 2 },
          { label: 'C', text: 'Salitre', isCorrect: true, order: 3 },
          { label: 'D', text: 'Carbón', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: historia.id, topicId: topicChileXIX.id, skillId: skillChileXIX.id,
      type: QuestionType.MULTIPLE_CHOICE, difficulty: Difficulty.HARD,
      stem: '¿Qué cambio político ocurrió en Chile como resultado de la Guerra Civil de 1891?',
      explanation: 'La Guerra Civil de 1891 enfrentó al presidente Balmaceda con el Congreso. La victoria congresista instauró el régimen parlamentario, que limitó el poder del ejecutivo hasta 1925.',
      options: {
        create: [
          { label: 'A', text: 'Se instauró una república federal', isCorrect: false, order: 1 },
          { label: 'B', text: 'Se estableció un régimen parlamentario', isCorrect: true, order: 2 },
          { label: 'C', text: 'Se declaró una monarquía constitucional', isCorrect: false, order: 3 },
          { label: 'D', text: 'Se disolvió el Congreso Nacional', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: historia.id, topicId: topicChileXIX.id, skillId: skillChileXIX.id,
      type: QuestionType.MULTIPLE_CHOICE, difficulty: Difficulty.EASY,
      stem: '¿Quién fue el principal líder del movimiento independentista en Chile?',
      explanation: 'Bernardo O\'Higgins, junto con José de San Martín, lideró el proceso de independencia chilena. O\'Higgins fue el primer Director Supremo de Chile.',
      options: {
        create: [
          { label: 'A', text: 'Manuel Rodríguez', isCorrect: false, order: 1 },
          { label: 'B', text: 'Bernardo O\'Higgins', isCorrect: true, order: 2 },
          { label: 'C', text: 'Diego Portales', isCorrect: false, order: 3 },
          { label: 'D', text: 'Francisco Bilbao', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  // Guerra Fría y dictadura (5)
  await prisma.question.create({
    data: {
      examId: historia.id, topicId: topicGuerraFria.id, skillId: skillGuerraFria.id,
      type: QuestionType.MULTIPLE_CHOICE, difficulty: Difficulty.MEDIUM,
      stem: '¿Qué evento marcó el inicio de la dictadura militar en Chile?',
      explanation: 'El golpe de Estado del 11 de septiembre de 1973, liderado por las Fuerzas Armadas, derrocó al gobierno democráticamente electo del presidente Salvador Allende, iniciando 17 años de dictadura.',
      options: {
        create: [
          { label: 'A', text: 'El golpe de Estado del 11 de septiembre de 1973', isCorrect: true, order: 1 },
          { label: 'B', text: 'La elección de Salvador Allende en 1970', isCorrect: false, order: 2 },
          { label: 'C', text: 'La crisis económica de 1972', isCorrect: false, order: 3 },
          { label: 'D', text: 'El Tanquetazo de junio de 1973', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: historia.id, topicId: topicGuerraFria.id, skillId: skillGuerraFria.id,
      type: QuestionType.MULTIPLE_CHOICE, difficulty: Difficulty.MEDIUM,
      stem: '¿Cómo se denominó la política de represión de la dictadura de Pinochet que perseguía a opositores en varios países?',
      explanation: 'La Operación Cóndor fue un plan de coordinación entre dictaduras sudamericanas (Chile, Argentina, Brasil, Uruguay, Paraguay y Bolivia) para perseguir y eliminar a opositores políticos en la región.',
      options: {
        create: [
          { label: 'A', text: 'Plan Zeta', isCorrect: false, order: 1 },
          { label: 'B', text: 'Operación Cóndor', isCorrect: true, order: 2 },
          { label: 'C', text: 'Operación Colombo', isCorrect: false, order: 3 },
          { label: 'D', text: 'Doctrina de Seguridad Nacional', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: historia.id, topicId: topicGuerraFria.id, skillId: skillGuerraFria.id,
      type: QuestionType.MULTIPLE_CHOICE, difficulty: Difficulty.HARD,
      stem: '¿Cuál fue el resultado del plebiscito de 1988 en Chile?',
      explanation: 'En el plebiscito del 5 de octubre de 1988, el NO (contra continuar la dictadura de Pinochet) obtuvo el 55,99% de los votos, lo que obligó a la realización de elecciones democráticas en 1989.',
      options: {
        create: [
          { label: 'A', text: 'El SÍ ganó con el 60% de los votos', isCorrect: false, order: 1 },
          { label: 'B', text: 'El NO ganó con el 55,99% de los votos', isCorrect: true, order: 2 },
          { label: 'C', text: 'Hubo un empate técnico que obligó a nueva votación', isCorrect: false, order: 3 },
          { label: 'D', text: 'El plebiscito fue anulado por fraude', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: historia.id, topicId: topicGuerraFria.id, skillId: skillGuerraFria.id,
      type: QuestionType.MULTIPLE_CHOICE, difficulty: Difficulty.MEDIUM,
      stem: '¿Qué organismo fue creado en Chile para investigar las violaciones a los derechos humanos durante la dictadura?',
      explanation: 'La Comisión Rettig (1990-1991) fue el primer organismo oficial para investigar y documentar las violaciones a los DDHH. Más tarde, la Comisión Valech (2003-2004) se focalizó en la tortura y la prisión política.',
      options: {
        create: [
          { label: 'A', text: 'Comisión Rettig', isCorrect: true, order: 1 },
          { label: 'B', text: 'INDH', isCorrect: false, order: 2 },
          { label: 'C', text: 'Tribunal Constitucional', isCorrect: false, order: 3 },
          { label: 'D', text: 'Comité de Derechos Humanos ONU', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: historia.id, topicId: topicGuerraFria.id, skillId: skillGuerraFria.id,
      type: QuestionType.MULTIPLE_CHOICE, difficulty: Difficulty.EASY,
      stem: '¿Qué enfrentó la Guerra Fría a nivel global?',
      explanation: 'La Guerra Fría fue el período de tensión geopolítica entre Estados Unidos (capitalismo) y la Unión Soviética (comunismo) tras la Segunda Guerra Mundial, sin que hubiera un enfrentamiento militar directo entre ambas potencias.',
      options: {
        create: [
          { label: 'A', text: 'Europa Occidental vs. Europa del Este', isCorrect: false, order: 1 },
          { label: 'B', text: 'EEUU (capitalismo) vs. URSS (comunismo)', isCorrect: true, order: 2 },
          { label: 'C', text: 'China vs. Japón por el control de Asia', isCorrect: false, order: 3 },
          { label: 'D', text: 'Países desarrollados vs. países en desarrollo', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  // Formación ciudadana (3)
  await prisma.question.create({
    data: {
      examId: historia.id, topicId: topicCiudadania.id, skillId: skillCiudadania.id,
      type: QuestionType.MULTIPLE_CHOICE, difficulty: Difficulty.EASY,
      stem: '¿Cuál de los siguientes es un principio fundamental de la democracia?',
      explanation: 'La soberanía popular es el principio según el cual el poder político emana del pueblo, que lo ejerce mediante elecciones periódicas, libres e informadas. Es el fundamento de todo sistema democrático.',
      options: {
        create: [
          { label: 'A', text: 'Concentración del poder en el ejecutivo', isCorrect: false, order: 1 },
          { label: 'B', text: 'Soberanía popular y elecciones libres', isCorrect: true, order: 2 },
          { label: 'C', text: 'Herencia del cargo de gobernante', isCorrect: false, order: 3 },
          { label: 'D', text: 'Decisiones tomadas solo por expertos', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: historia.id, topicId: topicCiudadania.id, skillId: skillCiudadania.id,
      type: QuestionType.MULTIPLE_CHOICE, difficulty: Difficulty.MEDIUM,
      stem: '¿Qué principio garantiza que ninguna persona o institución está por encima de la ley en un Estado democrático?',
      explanation: 'El Estado de derecho es el principio que establece que todos, incluido el propio Estado y sus autoridades, están sujetos a la ley, garantizando igualdad ante ella y protección de los derechos individuales.',
      options: {
        create: [
          { label: 'A', text: 'Separación de poderes', isCorrect: false, order: 1 },
          { label: 'B', text: 'Estado de derecho', isCorrect: true, order: 2 },
          { label: 'C', text: 'Pluralismo político', isCorrect: false, order: 3 },
          { label: 'D', text: 'Descentralización del poder', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: historia.id, topicId: topicCiudadania.id, skillId: skillCiudadania.id,
      type: QuestionType.MULTIPLE_CHOICE, difficulty: Difficulty.HARD,
      stem: '¿Qué diferencia existe entre derechos civiles y derechos políticos?',
      explanation: 'Los derechos civiles protegen la libertad individual (expresión, privacidad, propiedad), mientras que los derechos políticos permiten participar en la vida pública del Estado (votar, ser elegido, asociarse políticamente).',
      options: {
        create: [
          { label: 'A', text: 'Los civiles son para ciudadanos y los políticos para extranjeros', isCorrect: false, order: 1 },
          { label: 'B', text: 'Los civiles protegen libertades individuales y los políticos permiten participación pública', isCorrect: true, order: 2 },
          { label: 'C', text: 'Los políticos son más importantes que los civiles', isCorrect: false, order: 3 },
          { label: 'D', text: 'No existe diferencia; ambos son lo mismo', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  // Sistema económico (3)
  await prisma.question.create({
    data: {
      examId: historia.id, topicId: topicEconomia.id, skillId: skillEconomia.id,
      type: QuestionType.MULTIPLE_CHOICE, difficulty: Difficulty.EASY,
      stem: '¿Cuál es la principal característica de una economía de libre mercado?',
      explanation: 'En una economía de libre mercado, los precios, la producción y la distribución de bienes son determinados principalmente por la oferta y la demanda, con mínima intervención del Estado.',
      options: {
        create: [
          { label: 'A', text: 'El Estado fija todos los precios y salarios', isCorrect: false, order: 1 },
          { label: 'B', text: 'Los precios se determinan por la oferta y la demanda', isCorrect: true, order: 2 },
          { label: 'C', text: 'Solo el gobierno puede poseer empresas', isCorrect: false, order: 3 },
          { label: 'D', text: 'No existe competencia entre empresas', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: historia.id, topicId: topicEconomia.id, skillId: skillEconomia.id,
      type: QuestionType.MULTIPLE_CHOICE, difficulty: Difficulty.MEDIUM,
      stem: '¿Qué ocurre cuando hay inflación en una economía?',
      explanation: 'La inflación es el aumento generalizado y sostenido del nivel de precios, lo que reduce el poder adquisitivo del dinero, es decir, con la misma cantidad de dinero se pueden comprar menos bienes y servicios.',
      options: {
        create: [
          { label: 'A', text: 'El desempleo desaparece automáticamente', isCorrect: false, order: 1 },
          { label: 'B', text: 'Los precios bajan y el dinero vale más', isCorrect: false, order: 2 },
          { label: 'C', text: 'Los precios suben y el poder adquisitivo del dinero disminuye', isCorrect: true, order: 3 },
          { label: 'D', text: 'El PIB crece de forma inmediata', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: historia.id, topicId: topicEconomia.id, skillId: skillEconomia.id,
      type: QuestionType.MULTIPLE_CHOICE, difficulty: Difficulty.HARD,
      stem: '¿Qué medida de política fiscal puede implementar un gobierno para reactivar la economía durante una recesión?',
      explanation: 'Durante una recesión, una política fiscal expansiva (aumento del gasto público o reducción de impuestos) puede estimular la demanda agregada, generar empleos y reactivar la actividad económica.',
      options: {
        create: [
          { label: 'A', text: 'Aumentar los impuestos a los ciudadanos', isCorrect: false, order: 1 },
          { label: 'B', text: 'Reducir el gasto público al mínimo', isCorrect: false, order: 2 },
          { label: 'C', text: 'Aumentar el gasto público en infraestructura y programas sociales', isCorrect: true, order: 3 },
          { label: 'D', text: 'Eliminar los subsidios a las empresas', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  // ============================================================
  // BIOLOGÍA QUESTIONS (10)
  // ============================================================

  // Célula (3)
  await prisma.question.create({
    data: {
      examId: bioExam.id, topicId: topicCelula.id, skillId: skillCelula.id,
      type: QuestionType.MULTIPLE_CHOICE, difficulty: Difficulty.EASY,
      stem: '¿Cuál es la función principal de la mitocondria?',
      explanation: 'La mitocondria es el organelo responsable de la respiración celular aeróbica, donde se produce la mayor parte del ATP (energía) que necesita la célula, a partir de glucosa y oxígeno.',
      options: {
        create: [
          { label: 'A', text: 'Síntesis de proteínas', isCorrect: false, order: 1 },
          { label: 'B', text: 'Producción de energía (ATP) mediante respiración celular', isCorrect: true, order: 2 },
          { label: 'C', text: 'Digestión de macromoléculas', isCorrect: false, order: 3 },
          { label: 'D', text: 'Almacenamiento del material genético', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: bioExam.id, topicId: topicCelula.id, skillId: skillCelula.id,
      type: QuestionType.MULTIPLE_CHOICE, difficulty: Difficulty.MEDIUM,
      stem: '¿Qué diferencia fundamental existe entre una célula procariota y una eucariota?',
      explanation: 'La diferencia clave es que las células eucariotas poseen núcleo definido rodeado por membrana nuclear, mientras que las procariotas no tienen núcleo delimitado por membrana; su material genético está en el citoplasma.',
      options: {
        create: [
          { label: 'A', text: 'Las procariotas son más grandes que las eucariotas', isCorrect: false, order: 1 },
          { label: 'B', text: 'Las eucariotas tienen núcleo definido con membrana, las procariotas no', isCorrect: true, order: 2 },
          { label: 'C', text: 'Solo las procariotas tienen mitocondrias', isCorrect: false, order: 3 },
          { label: 'D', text: 'Las procariotas solo se reproducen sexualmente', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: bioExam.id, topicId: topicCelula.id, skillId: skillCelula.id,
      type: QuestionType.MULTIPLE_CHOICE, difficulty: Difficulty.HARD,
      stem: '¿Qué organelo es exclusivo de las células vegetales y no se encuentra en las células animales?',
      explanation: 'El cloroplasto es el organelo exclusivo de las células vegetales y de algunos protistas, donde se lleva a cabo la fotosíntesis. Las células animales no poseen cloroplastos.',
      options: {
        create: [
          { label: 'A', text: 'Ribosoma', isCorrect: false, order: 1 },
          { label: 'B', text: 'Mitocondria', isCorrect: false, order: 2 },
          { label: 'C', text: 'Cloroplasto', isCorrect: true, order: 3 },
          { label: 'D', text: 'Membrana plasmática', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  // Sistema nervioso (3)
  await prisma.question.create({
    data: {
      examId: bioExam.id, topicId: topicNervioso.id, skillId: skillNervioso.id,
      type: QuestionType.MULTIPLE_CHOICE, difficulty: Difficulty.EASY,
      stem: '¿Cuál es la unidad funcional del sistema nervioso?',
      explanation: 'La neurona es la unidad estructural y funcional del sistema nervioso. Es una célula altamente especializada capaz de recibir, integrar y transmitir señales eléctricas y químicas.',
      options: {
        create: [
          { label: 'A', text: 'Sinapsis', isCorrect: false, order: 1 },
          { label: 'B', text: 'Neurona', isCorrect: true, order: 2 },
          { label: 'C', text: 'Axón', isCorrect: false, order: 3 },
          { label: 'D', text: 'Dendrita', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: bioExam.id, topicId: topicNervioso.id, skillId: skillNervioso.id,
      type: QuestionType.MULTIPLE_CHOICE, difficulty: Difficulty.MEDIUM,
      stem: '¿Qué tipo de neurotransmisor se libera en la sinapsis para transmitir el impulso nervioso a otra neurona?',
      explanation: 'La acetilcolina es uno de los neurotransmisores más importantes. Se libera en la sinapsis y se une a receptores en la neurona postsináptica para continuar la transmisión del impulso nervioso.',
      options: {
        create: [
          { label: 'A', text: 'Glucosa', isCorrect: false, order: 1 },
          { label: 'B', text: 'ATP', isCorrect: false, order: 2 },
          { label: 'C', text: 'Acetilcolina', isCorrect: true, order: 3 },
          { label: 'D', text: 'Insulina', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: bioExam.id, topicId: topicNervioso.id, skillId: skillNervioso.id,
      type: QuestionType.MULTIPLE_CHOICE, difficulty: Difficulty.HARD,
      stem: '¿Qué parte del cerebro controla las funciones vitales como la respiración y el ritmo cardíaco?',
      explanation: 'El bulbo raquídeo (médula oblonga), ubicado en el tronco del encéfalo, controla funciones vitales automáticas como la respiración, la frecuencia cardíaca y la presión arterial.',
      options: {
        create: [
          { label: 'A', text: 'Cerebelo', isCorrect: false, order: 1 },
          { label: 'B', text: 'Corteza cerebral', isCorrect: false, order: 2 },
          { label: 'C', text: 'Bulbo raquídeo', isCorrect: true, order: 3 },
          { label: 'D', text: 'Hipotálamo', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  // Herencia y evolución (2)
  await prisma.question.create({
    data: {
      examId: bioExam.id, topicId: topicHerencia.id, skillId: skillHerencia.id,
      type: QuestionType.CALCULATION, difficulty: Difficulty.MEDIUM,
      stem: 'Si un rasgo es dominante (A) y ambos progenitores son Aa, ¿qué porcentaje de la descendencia expresará el rasgo recesivo?',
      explanation: 'En un cruce Aa × Aa, la descendencia es: 1 AA : 2 Aa : 1 aa. El 25% (aa) expresará el fenotipo recesivo, ya que solo los individuos con dos alelos recesivos lo manifiestan.',
      options: {
        create: [
          { label: 'A', text: '0%', isCorrect: false, order: 1 },
          { label: 'B', text: '25%', isCorrect: true, order: 2 },
          { label: 'C', text: '50%', isCorrect: false, order: 3 },
          { label: 'D', text: '75%', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: bioExam.id, topicId: topicHerencia.id, skillId: skillHerencia.id,
      type: QuestionType.MULTIPLE_CHOICE, difficulty: Difficulty.HARD,
      stem: '¿Cuál es el mecanismo propuesto por Darwin para explicar la evolución de las especies?',
      explanation: 'Darwin propuso la selección natural como mecanismo evolutivo: los organismos con variaciones favorables sobreviven más y se reproducen más que los menos adaptados, transmitiendo esas características a su descendencia.',
      options: {
        create: [
          { label: 'A', text: 'Mutaciones espontáneas dirigidas', isCorrect: false, order: 1 },
          { label: 'B', text: 'Selección natural de variaciones hereditarias', isCorrect: true, order: 2 },
          { label: 'C', text: 'Herencia de caracteres adquiridos', isCorrect: false, order: 3 },
          { label: 'D', text: 'Creación especial de cada especie', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  // Fotosíntesis/respiración (2)
  await prisma.question.create({
    data: {
      examId: bioExam.id, topicId: topicFotoResp.id, skillId: skillFoto.id,
      type: QuestionType.MULTIPLE_CHOICE, difficulty: Difficulty.EASY,
      stem: '¿Cuáles son los reactivos de la fotosíntesis?',
      explanation: 'En la fotosíntesis, las plantas utilizan dióxido de carbono (CO₂) y agua (H₂O), junto con la energía de la luz solar, para producir glucosa y oxígeno.',
      options: {
        create: [
          { label: 'A', text: 'Glucosa y oxígeno', isCorrect: false, order: 1 },
          { label: 'B', text: 'CO₂ y H₂O', isCorrect: true, order: 2 },
          { label: 'C', text: 'ATP y NADPH', isCorrect: false, order: 3 },
          { label: 'D', text: 'Oxígeno y nitrógeno', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: bioExam.id, topicId: topicFotoResp.id, skillId: skillFoto.id,
      type: QuestionType.MULTIPLE_CHOICE, difficulty: Difficulty.MEDIUM,
      stem: '¿Qué diferencia hay entre la respiración aeróbica y la anaeróbica?',
      explanation: 'La respiración aeróbica usa oxígeno y produce mucho ATP (36-38 moléculas por glucosa), mientras que la anaeróbica no usa oxígeno y produce poco ATP (2 por glucosa), con productos como lactato o etanol.',
      options: {
        create: [
          { label: 'A', text: 'La aeróbica ocurre solo en plantas y la anaeróbica en animales', isCorrect: false, order: 1 },
          { label: 'B', text: 'La aeróbica requiere oxígeno y produce más ATP que la anaeróbica', isCorrect: true, order: 2 },
          { label: 'C', text: 'La anaeróbica produce más energía que la aeróbica', isCorrect: false, order: 3 },
          { label: 'D', text: 'Ambas producen la misma cantidad de ATP', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  // ============================================================
  // FÍSICA QUESTIONS (8)
  // ============================================================

  // Mecánica (4)
  await prisma.question.create({
    data: {
      examId: fisExam.id, topicId: topicMecanica.id, skillId: skillMRU.id,
      type: QuestionType.CALCULATION, difficulty: Difficulty.EASY,
      stem: 'Un automóvil viaja a velocidad constante de 60 km/h. ¿Cuántos kilómetros recorre en 2 horas?',
      explanation: 'En MRU: distancia = velocidad × tiempo = 60 km/h × 2 h = 120 km.',
      options: {
        create: [
          { label: 'A', text: '30 km', isCorrect: false, order: 1 },
          { label: 'B', text: '90 km', isCorrect: false, order: 2 },
          { label: 'C', text: '120 km', isCorrect: true, order: 3 },
          { label: 'D', text: '150 km', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: fisExam.id, topicId: topicMecanica.id, skillId: skillMRU.id,
      type: QuestionType.CALCULATION, difficulty: Difficulty.MEDIUM,
      stem: 'Un objeto parte del reposo y acelera uniformemente a 4 m/s². ¿Qué velocidad tiene después de 5 segundos?',
      explanation: 'En MRUA: v = v₀ + a·t = 0 + 4 × 5 = 20 m/s.',
      options: {
        create: [
          { label: 'A', text: '4 m/s', isCorrect: false, order: 1 },
          { label: 'B', text: '10 m/s', isCorrect: false, order: 2 },
          { label: 'C', text: '20 m/s', isCorrect: true, order: 3 },
          { label: 'D', text: '25 m/s', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: fisExam.id, topicId: topicMecanica.id, skillId: skillNewton.id,
      type: QuestionType.CALCULATION, difficulty: Difficulty.MEDIUM,
      stem: 'Se aplica una fuerza neta de 20 N a un objeto de masa 5 kg. ¿Cuál es su aceleración?',
      explanation: 'Por la Segunda Ley de Newton: F = m·a → a = F/m = 20/5 = 4 m/s².',
      options: {
        create: [
          { label: 'A', text: '2 m/s²', isCorrect: false, order: 1 },
          { label: 'B', text: '4 m/s²', isCorrect: true, order: 2 },
          { label: 'C', text: '5 m/s²', isCorrect: false, order: 3 },
          { label: 'D', text: '100 m/s²', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: fisExam.id, topicId: topicMecanica.id, skillId: skillNewton.id,
      type: QuestionType.MULTIPLE_CHOICE, difficulty: Difficulty.HARD,
      stem: '¿Qué establece la Tercera Ley de Newton?',
      explanation: 'La Tercera Ley de Newton (acción y reacción) establece que si un cuerpo A ejerce una fuerza sobre B, entonces B ejerce sobre A una fuerza de igual magnitud pero en sentido opuesto.',
      options: {
        create: [
          { label: 'A', text: 'F = m × a', isCorrect: false, order: 1 },
          { label: 'B', text: 'La velocidad es constante si no hay fuerza neta', isCorrect: false, order: 2 },
          { label: 'C', text: 'A toda acción le corresponde una reacción igual y opuesta', isCorrect: true, order: 3 },
          { label: 'D', text: 'La energía se conserva en todos los sistemas', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  // Ondas y electricidad (4)
  await prisma.question.create({
    data: {
      examId: fisExam.id, topicId: topicOndasElec.id, skillId: skillOndas.id,
      type: QuestionType.MULTIPLE_CHOICE, difficulty: Difficulty.EASY,
      stem: '¿Cuál de las siguientes es una característica de las ondas transversales?',
      explanation: 'En una onda transversal, la perturbación se propaga perpendicularmente a la dirección de propagación. Ejemplos: ondas de luz, ondas en una cuerda.',
      options: {
        create: [
          { label: 'A', text: 'La perturbación es paralela a la propagación', isCorrect: false, order: 1 },
          { label: 'B', text: 'La perturbación es perpendicular a la propagación', isCorrect: true, order: 2 },
          { label: 'C', text: 'No pueden propagarse en el vacío', isCorrect: false, order: 3 },
          { label: 'D', text: 'Solo se propagan en sólidos', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: fisExam.id, topicId: topicOndasElec.id, skillId: skillOndas.id,
      type: QuestionType.CALCULATION, difficulty: Difficulty.MEDIUM,
      stem: 'Una onda tiene frecuencia de 5 Hz y longitud de onda de 2 m. ¿Cuál es su velocidad?',
      explanation: 'La velocidad de una onda es v = f × λ = 5 Hz × 2 m = 10 m/s.',
      options: {
        create: [
          { label: 'A', text: '2,5 m/s', isCorrect: false, order: 1 },
          { label: 'B', text: '7 m/s', isCorrect: false, order: 2 },
          { label: 'C', text: '10 m/s', isCorrect: true, order: 3 },
          { label: 'D', text: '15 m/s', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: fisExam.id, topicId: topicOndasElec.id, skillId: skillElec.id,
      type: QuestionType.CALCULATION, difficulty: Difficulty.MEDIUM,
      stem: 'En un circuito eléctrico hay una resistencia de 10 Ω y una tensión de 20 V. ¿Cuánta corriente circula?',
      explanation: 'Por la Ley de Ohm: I = V/R = 20/10 = 2 A.',
      options: {
        create: [
          { label: 'A', text: '0,5 A', isCorrect: false, order: 1 },
          { label: 'B', text: '1 A', isCorrect: false, order: 2 },
          { label: 'C', text: '2 A', isCorrect: true, order: 3 },
          { label: 'D', text: '5 A', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: fisExam.id, topicId: topicOndasElec.id, skillId: skillElec.id,
      type: QuestionType.CALCULATION, difficulty: Difficulty.HARD,
      stem: 'Dos resistencias de 6 Ω y 3 Ω están conectadas en paralelo. ¿Cuál es la resistencia equivalente?',
      explanation: 'Para resistencias en paralelo: 1/Req = 1/R1 + 1/R2 = 1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2. Req = 2 Ω.',
      options: {
        create: [
          { label: 'A', text: '9 Ω', isCorrect: false, order: 1 },
          { label: 'B', text: '4 Ω', isCorrect: false, order: 2 },
          { label: 'C', text: '3 Ω', isCorrect: false, order: 3 },
          { label: 'D', text: '2 Ω', isCorrect: true, order: 4 },
        ],
      },
    },
  });

  // ============================================================
  // QUÍMICA QUESTIONS (7)
  // ============================================================

  // Estructura atómica (3)
  await prisma.question.create({
    data: {
      examId: quiExam.id, topicId: topicAtomo.id, skillId: skillAtomo.id,
      type: QuestionType.MULTIPLE_CHOICE, difficulty: Difficulty.EASY,
      stem: '¿Qué partícula subatómica tiene carga positiva?',
      explanation: 'El protón tiene carga positiva (+1) y se encuentra en el núcleo del átomo. El neutrón no tiene carga y el electrón tiene carga negativa.',
      options: {
        create: [
          { label: 'A', text: 'Electrón', isCorrect: false, order: 1 },
          { label: 'B', text: 'Neutrón', isCorrect: false, order: 2 },
          { label: 'C', text: 'Protón', isCorrect: true, order: 3 },
          { label: 'D', text: 'Fotón', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: quiExam.id, topicId: topicAtomo.id, skillId: skillAtomo.id,
      type: QuestionType.MULTIPLE_CHOICE, difficulty: Difficulty.MEDIUM,
      stem: 'Un elemento tiene número atómico 11 y número másico 23. ¿Cuántos neutrones tiene?',
      explanation: 'Número de neutrones = número másico - número atómico = 23 - 11 = 12 neutrones. Este elemento es el sodio (Na).',
      options: {
        create: [
          { label: 'A', text: '11', isCorrect: false, order: 1 },
          { label: 'B', text: '12', isCorrect: true, order: 2 },
          { label: 'C', text: '23', isCorrect: false, order: 3 },
          { label: 'D', text: '34', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: quiExam.id, topicId: topicAtomo.id, skillId: skillAtomo.id,
      type: QuestionType.MULTIPLE_CHOICE, difficulty: Difficulty.HARD,
      stem: '¿Qué son los isótopos de un elemento?',
      explanation: 'Los isótopos son átomos del mismo elemento (mismo número atómico, misma cantidad de protones) pero con diferente número de neutrones, lo que les da diferente número másico.',
      options: {
        create: [
          { label: 'A', text: 'Átomos con igual número de neutrones pero distinto número de protones', isCorrect: false, order: 1 },
          { label: 'B', text: 'Átomos de distintos elementos con la misma masa', isCorrect: false, order: 2 },
          { label: 'C', text: 'Átomos del mismo elemento con diferente número de neutrones', isCorrect: true, order: 3 },
          { label: 'D', text: 'Iones del mismo elemento con diferente carga', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  // Reacciones químicas (4)
  await prisma.question.create({
    data: {
      examId: quiExam.id, topicId: topicReacciones.id, skillId: skillReacciones.id,
      type: QuestionType.MULTIPLE_CHOICE, difficulty: Difficulty.EASY,
      stem: 'Al balancear la ecuación: H₂ + O₂ → H₂O, ¿cuál es la forma correctamente balanceada?',
      explanation: 'Para balancear: 2H₂ + O₂ → 2H₂O. Se conserva el número de átomos de cada elemento en ambos lados de la ecuación.',
      options: {
        create: [
          { label: 'A', text: 'H₂ + O₂ → H₂O', isCorrect: false, order: 1 },
          { label: 'B', text: '2H₂ + O₂ → 2H₂O', isCorrect: true, order: 2 },
          { label: 'C', text: 'H₂ + 2O₂ → H₂O₂', isCorrect: false, order: 3 },
          { label: 'D', text: '4H₂ + O₂ → 2H₄O', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: quiExam.id, topicId: topicReacciones.id, skillId: skillReacciones.id,
      type: QuestionType.MULTIPLE_CHOICE, difficulty: Difficulty.MEDIUM,
      stem: '¿Qué tipo de reacción ocurre cuando el zinc reacciona con ácido clorhídrico para producir cloruro de zinc e hidrógeno?',
      explanation: 'Esta es una reacción de desplazamiento simple (sustitución simple): el zinc desplaza al hidrógeno del ácido clorhídrico. Zn + 2HCl → ZnCl₂ + H₂.',
      options: {
        create: [
          { label: 'A', text: 'Síntesis', isCorrect: false, order: 1 },
          { label: 'B', text: 'Descomposición', isCorrect: false, order: 2 },
          { label: 'C', text: 'Desplazamiento simple', isCorrect: true, order: 3 },
          { label: 'D', text: 'Combustión', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: quiExam.id, topicId: topicReacciones.id, skillId: skillEstequio.id,
      type: QuestionType.CALCULATION, difficulty: Difficulty.HARD,
      stem: 'En la reacción 2H₂ + O₂ → 2H₂O, si se consumen 4 moles de H₂, ¿cuántos moles de agua se producen?',
      explanation: 'Por estequiometría, 2 moles de H₂ producen 2 moles de H₂O. Si se consumen 4 moles de H₂ (el doble), se producen 4 moles de H₂O.',
      options: {
        create: [
          { label: 'A', text: '2 moles', isCorrect: false, order: 1 },
          { label: 'B', text: '4 moles', isCorrect: true, order: 2 },
          { label: 'C', text: '6 moles', isCorrect: false, order: 3 },
          { label: 'D', text: '8 moles', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      examId: quiExam.id, topicId: topicReacciones.id, skillId: skillEstequio.id,
      type: QuestionType.MULTIPLE_CHOICE, difficulty: Difficulty.HARD,
      stem: '¿Qué caracteriza a una reacción exotérmica?',
      explanation: 'En una reacción exotérmica, la energía de los reactivos es mayor que la de los productos, por lo que se libera energía al entorno en forma de calor. La energía de activación es menor que en las endotérmicas.',
      options: {
        create: [
          { label: 'A', text: 'Absorbe energía del entorno', isCorrect: false, order: 1 },
          { label: 'B', text: 'Libera energía al entorno en forma de calor', isCorrect: true, order: 2 },
          { label: 'C', text: 'Solo ocurre a temperaturas muy altas', isCorrect: false, order: 3 },
          { label: 'D', text: 'Los productos tienen más energía que los reactivos', isCorrect: false, order: 4 },
        ],
      },
    },
  });

  console.log('Seeding completed successfully!');
  console.log('Demo user: demo@paes.cl / demo123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
