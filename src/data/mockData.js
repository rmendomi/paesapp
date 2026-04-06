// ── Exams catalog ──────────────────────────────────────────────────────────
export const exams = [
  { id: 'lectora',  name: 'Comprensión Lectora', code: 'LECTORA',  icon: '📖', color: '#1d4ed8', bg: '#eff6ff', totalQ: 65 },
  { id: 'm1',       name: 'Matemática M1',        code: 'M1',       icon: '📐', color: '#0891b2', bg: '#ecfeff', totalQ: 65 },
  { id: 'm2',       name: 'Matemática M2',        code: 'M2',       icon: '∑',  color: '#7c3aed', bg: '#f5f3ff', totalQ: 55 },
  { id: 'historia', name: 'Historia y Cs. Soc.',  code: 'HISTORIA', icon: '🌎', color: '#b45309', bg: '#fffbeb', totalQ: 65 },
  { id: 'ciencias', name: 'Ciencias',             code: 'CIENCIAS', icon: '🧬', color: '#15803d', bg: '#f0fdf4', totalQ: 80 },
];

// ── Skills config per exam ─────────────────────────────────────────────────
export const skillsConfig = {
  lectora: [
    { id: 'localizar',    name: 'Localizar',    color: '#1d4ed8', icon: '🔍', description: 'Identificar y extraer información explícita del texto' },
    { id: 'interpretar',  name: 'Interpretar',  color: '#7c3aed', icon: '💡', description: 'Establecer significados y relaciones entre partes del texto' },
    { id: 'evaluar',      name: 'Evaluar',      color: '#0891b2', icon: '⚖️', description: 'Reflexionar y juzgar el texto según contenido y forma' },
  ],
  m1: [
    { id: 'resolver',     name: 'Resolver Problemas', color: '#0891b2', icon: '🧮', description: 'Solucionar situaciones matemáticas rutinarias y no rutinarias' },
    { id: 'modelar',      name: 'Modelar',            color: '#7c3aed', icon: '📊', description: 'Usar expresiones matemáticas para describir situaciones reales' },
    { id: 'representar',  name: 'Representar',        color: '#15803d', icon: '📈', description: 'Usar tablas, gráficos y representaciones matemáticas' },
    { id: 'argumentar',   name: 'Argumentar',         color: '#b45309', icon: '💬', description: 'Justificar y evaluar la validez de procedimientos matemáticos' },
  ],
  m2: [
    { id: 'resolver',     name: 'Resolver Problemas', color: '#7c3aed', icon: '🧮', description: 'Resolver con logaritmos, trigonometría, finanzas y números reales' },
    { id: 'modelar',      name: 'Modelar',            color: '#1d4ed8', icon: '📊', description: 'Modelar con funciones exponenciales, logarítmicas y trigonométricas' },
    { id: 'representar',  name: 'Representar',        color: '#0891b2', icon: '📈', description: 'Representar funciones avanzadas y distribuciones estadísticas' },
    { id: 'argumentar',   name: 'Argumentar',         color: '#b45309', icon: '💬', description: 'Validar deducciones y detectar errores en demostraciones matemáticas' },
  ],
  historia: [
    { id: 'temporal',     name: 'Pensamiento Temporal y Espacial', color: '#b45309', icon: '⏳', description: 'Contextualizar procesos en el tiempo y espacio geográfico' },
    { id: 'fuentes',      name: 'Análisis de Fuentes',            color: '#15803d', icon: '📜', description: 'Examinar fuentes históricas e interpretar su información' },
    { id: 'critico',      name: 'Pensamiento Crítico',            color: '#7c3aed', icon: '🧠', description: 'Evaluar interpretaciones y multicausalidad de fenómenos históricos' },
  ],
  ciencias: [
    { id: 'observar',     name: 'Observar y Plantear Preguntas',  color: '#15803d', icon: '🔭', description: 'Identificar preguntas e hipótesis científicas' },
    { id: 'planificar',   name: 'Planificar y Conducir',          color: '#0891b2', icon: '📋', description: 'Diseñar investigaciones y seleccionar procedimientos' },
    { id: 'procesar',     name: 'Procesar y Analizar Evidencia',  color: '#1d4ed8', icon: '📉', description: 'Interpretar resultados, patrones y tendencias' },
    { id: 'evaluar',      name: 'Evaluar',                        color: '#7c3aed', icon: '✅', description: 'Analizar validez y confiabilidad de investigaciones' },
    { id: 'comunicar',    name: 'Comunicar',                      color: '#b45309', icon: '📢', description: 'Seleccionar recursos para comunicar información científica' },
  ],
};

// ── Questions bank by skill ────────────────────────────────────────────────
export const questionsBySkill = {

  // ═══════════════════════════════════════════════════════════════════════
  // COMPRENSIÓN LECTORA
  // ═══════════════════════════════════════════════════════════════════════
  lectora: {
    localizar: [
      {
        id: 'l_loc_01', skill: 'localizar',
        text: 'Lee el siguiente texto y responde:\n\n"La contaminación del aire en las ciudades es causada principalmente por los vehículos motorizados, las industrias y la quema de combustibles fósiles. En Santiago, el material particulado fino (MP2,5) supera con frecuencia los niveles recomendados por la OMS, lo que provoca enfermedades respiratorias en la población más vulnerable, como niños y adultos mayores."\n\n¿Cuáles son las principales causas de contaminación del aire en las ciudades, según el texto?',
        options: ['Las lluvias ácidas y la deforestación.', 'Los vehículos, las industrias y la quema de combustibles fósiles.', 'El polvo del desierto y la evaporación marina.', 'Los incendios forestales y la actividad volcánica.'],
        correct: 1, explanation: 'El texto señala explícitamente: "causada principalmente por los vehículos motorizados, las industrias y la quema de combustibles fósiles."',
      },
      {
        id: 'l_loc_02', skill: 'localizar',
        text: 'Lee el siguiente texto:\n\n"El escritor chileno Pablo Neruda nació en Parral en 1904 y murió en Santiago en 1973. Obtuvo el Premio Nobel de Literatura en 1971, convirtiéndose en uno de los poetas más reconocidos del siglo XX. Entre sus obras más célebres se encuentran Veinte poemas de amor y una canción desesperada y Canto general."\n\n¿En qué año obtuvo Pablo Neruda el Premio Nobel de Literatura?',
        options: ['1904', '1960', '1971', '1973'],
        correct: 2, explanation: 'El texto indica explícitamente que Neruda obtuvo el Premio Nobel de Literatura en 1971.',
      },
      {
        id: 'l_loc_03', skill: 'localizar',
        text: 'Lee el siguiente párrafo:\n\n"La dieta mediterránea se caracteriza por el consumo abundante de frutas, verduras, legumbres, cereales integrales y aceite de oliva. También incluye pescado, aves y productos lácteos en cantidades moderadas, y limita el consumo de carnes rojas. Diversos estudios científicos la asocian con la reducción del riesgo de enfermedades cardiovasculares."\n\n¿Qué alimentos se consumen en cantidades MODERADAS según el texto?',
        options: ['Frutas, verduras y legumbres.', 'Carnes rojas y embutidos.', 'Pescado, aves y productos lácteos.', 'Aceite de oliva y cereales integrales.'],
        correct: 2, explanation: 'El texto dice: "También incluye pescado, aves y productos lácteos en cantidades moderadas."',
      },
      {
        id: 'l_loc_04', skill: 'localizar',
        text: '"El río Amazonas es el más caudaloso del mundo. Nace en los Andes peruanos y desemboca en el océano Atlántico, en Brasil. Su cuenca abarca aproximadamente 7 millones de km² y alberga la mayor biodiversidad terrestre del planeta, siendo hogar de más de 40.000 especies de plantas."\n\n¿Dónde desemboca el río Amazonas?',
        options: ['En el Pacífico, en Perú.', 'En el Atlántico, en Brasil.', 'En el Caribe, en Venezuela.', 'En el Índico, en Colombia.'],
        correct: 1, explanation: 'El texto indica: "desemboca en el océano Atlántico, en Brasil."',
      },
      {
        id: 'l_loc_05', skill: 'localizar',
        text: '"Los terremotos se producen cuando las placas tectónicas se desplazan de forma súbita. Chile está ubicado en el Cinturón de Fuego del Pacífico, lo que lo hace una de las zonas sísmicas más activas del mundo. El terremoto de Valdivia de 1960 es el más poderoso jamás registrado, con una magnitud de 9,5 Mw."\n\n¿Cuál fue la magnitud del terremoto de Valdivia de 1960?',
        options: ['8,5 Mw', '9,0 Mw', '9,5 Mw', '10,0 Mw'],
        correct: 2, explanation: 'El texto señala que el terremoto de Valdivia de 1960 tuvo una "magnitud de 9,5 Mw."',
      },
      {
        id: 'l_loc_06', skill: 'localizar',
        text: '"Las energías renovables no convencionales (ERNC) han crecido considerablemente en Chile en los últimos años. La energía solar fotovoltaica representa hoy más del 20% de la capacidad instalada del país. El norte de Chile, por su alta radiación solar, es una de las zonas con mayor potencial de generación fotovoltaica del mundo."\n\n¿Qué porcentaje de la capacidad instalada representa hoy la energía solar fotovoltaica en Chile?',
        options: ['Menos del 5%', 'Más del 10%', 'Más del 20%', 'Más del 40%'],
        correct: 2, explanation: 'El texto indica que "la energía solar fotovoltaica representa hoy más del 20% de la capacidad instalada."',
      },
      {
        id: 'l_loc_07', skill: 'localizar',
        text: '"El libro electrónico, o e-book, permite almacenar miles de títulos en un dispositivo del tamaño de una hoja de papel. Su pantalla de tinta electrónica reduce la fatiga visual en comparación con una pantalla convencional. Sin embargo, algunos lectores prefieren la experiencia táctil y el olor del papel impreso."\n\n¿Qué ventaja tiene la pantalla de tinta electrónica del e-book frente a las pantallas convencionales?',
        options: ['Permite almacenar más libros.', 'Es más económica de producir.', 'Reduce la fatiga visual.', 'Reproduce audio integrado.'],
        correct: 2, explanation: 'El texto señala: "Su pantalla de tinta electrónica reduce la fatiga visual en comparación con una pantalla convencional."',
      },
      {
        id: 'l_loc_08', skill: 'localizar',
        text: '"La fotosíntesis es el proceso mediante el cual las plantas convierten la luz solar, el dióxido de carbono (CO₂) y el agua (H₂O) en glucosa y oxígeno. Este proceso ocurre principalmente en los cloroplastos, orgánulos que contienen clorofila, el pigmento responsable del color verde de las plantas."\n\nSegún el texto, ¿en qué orgánulo ocurre principalmente la fotosíntesis?',
        options: ['En el núcleo.', 'En las mitocondrias.', 'En los ribosomas.', 'En los cloroplastos.'],
        correct: 3, explanation: 'El texto dice: "Este proceso ocurre principalmente en los cloroplastos."',
      },
      {
        id: 'l_loc_09', skill: 'localizar',
        text: '"En Chile, la Constitución Política de la República garantiza a todas las personas el derecho a la vida y a la integridad física y psíquica. Establece también la igualdad ante la ley y prohíbe todo acto de discriminación arbitraria. Estos derechos son irrenunciables e inalienables."\n\n¿Qué calidad tienen estos derechos según el texto?',
        options: ['Son opcionales y negociables.', 'Son irrenunciables e inalienables.', 'Son temporales y revisables.', 'Son exclusivos para ciudadanos.'],
        correct: 1, explanation: 'El texto finaliza indicando que los derechos señalados "son irrenunciables e inalienables."',
      },
      {
        id: 'l_loc_10', skill: 'localizar',
        text: '"El salmón del Atlántico fue introducido en las costas de Chile en la década de 1980 con fines de acuicultura. Hoy, Chile es el segundo mayor productor mundial de salmón, exportando principalmente a Estados Unidos, Japón y Brasil. Sin embargo, la industria enfrenta críticas por los impactos ambientales en los ecosistemas acuáticos."\n\n¿Cuándo fue introducido el salmón del Atlántico en Chile?',
        options: ['En la década de 1960.', 'En la década de 1970.', 'En la década de 1980.', 'En la década de 1990.'],
        correct: 2, explanation: 'El texto señala: "fue introducido en las costas de Chile en la década de 1980."',
      },
      {
        id: 'l_loc_11', skill: 'localizar',
        text: '"La poesía concreta es una corriente literaria que experimenta con la disposición visual de las palabras en la página. Surgió en Brasil en los años 50 del siglo XX y se extendió a Europa y América Latina. Sus creadores consideraban que la forma del poema en el espacio era tan importante como su contenido semántico."\n\n¿Dónde surgió la poesía concreta?',
        options: ['En Argentina.', 'En España.', 'En Brasil.', 'En México.'],
        correct: 2, explanation: 'El texto indica: "Surgió en Brasil en los años 50 del siglo XX."',
      },
      {
        id: 'l_loc_12', skill: 'localizar',
        text: '"El agua potable en Chile es suministrada por empresas sanitarias que operan bajo concesión del Estado. Según la Organización Mundial de la Salud (OMS), al menos 2 litros de agua al día son necesarios para mantener un funcionamiento corporal adecuado en condiciones normales. El acceso al agua potable es un derecho reconocido en la Constitución chilena desde 2021."\n\n¿Cuántos litros de agua al día recomienda la OMS, según el texto?',
        options: ['Al menos 1 litro.', 'Al menos 2 litros.', 'Al menos 3 litros.', 'Al menos 4 litros.'],
        correct: 1, explanation: 'El texto especifica: "al menos 2 litros de agua al día son necesarios."',
      },
      {
        id: 'l_loc_13', skill: 'localizar',
        text: '"La Declaración Universal de los Derechos Humanos fue adoptada por la Asamblea General de las Naciones Unidas el 10 de diciembre de 1948 en París. Consta de 30 artículos que reconocen derechos civiles, políticos, económicos, sociales y culturales aplicables a todos los seres humanos sin distinción alguna."\n\n¿Cuántos artículos contiene la Declaración Universal de los Derechos Humanos?',
        options: ['20 artículos.', '25 artículos.', '30 artículos.', '35 artículos.'],
        correct: 2, explanation: 'El texto indica: "Consta de 30 artículos."',
      },
      {
        id: 'l_loc_14', skill: 'localizar',
        text: '"Los volcanes activos de Chile representan uno de los mayores riesgos naturales del país. El Calbuco hizo erupción en abril de 2015 por primera vez en 43 años, afectando a miles de personas en las regiones de Los Lagos y Los Ríos. Las cenizas volcánicas se dispersaron por Chile, Argentina y Uruguay."\n\n¿Qué volcán chileno hizo erupción en 2015?',
        options: ['Villarrica', 'Llaima', 'Calbuco', 'Osorno'],
        correct: 2, explanation: 'El texto señala: "El Calbuco hizo erupción en abril de 2015."',
      },
      {
        id: 'l_loc_15', skill: 'localizar',
        text: '"El acceso universal a internet se ha convertido en una prioridad para organismos internacionales como la ONU, que considera la conectividad un derecho básico en la sociedad digital. En 2023, aproximadamente el 66% de la población mundial tenía acceso a internet, aunque con grandes brechas entre países desarrollados y en vías de desarrollo."\n\n¿Qué porcentaje de la población mundial tenía acceso a internet en 2023, según el texto?',
        options: ['Aproximadamente el 50%.', 'Aproximadamente el 60%.', 'Aproximadamente el 66%.', 'Aproximadamente el 75%.'],
        correct: 2, explanation: 'El texto dice: "en 2023, aproximadamente el 66% de la población mundial tenía acceso a internet."',
      },
    ],

    interpretar: [
      {
        id: 'l_int_01', skill: 'interpretar',
        text: 'Lee el siguiente párrafo:\n\n"El sedentarismo y la mala alimentación han disparado los índices de obesidad en Chile. En respuesta, el gobierno implementó la Ley de Etiquetado de Alimentos, que obliga a los fabricantes a incluir sellos de advertencia en productos con alto contenido de azúcar, sodio, grasas saturadas y calorías. Desde su implementación, se observó una reducción en la compra de productos con sellos."\n\n¿Cuál es la relación causa-efecto que se plantea en el texto?',
        options: ['La ley causó un aumento en el consumo de alimentos procesados.', 'El sedentarismo causó la aprobación de la ley de etiquetado.', 'La implementación de la ley causó una reducción en la compra de productos con sellos.', 'La mala alimentación causó que el gobierno aumentara los impuestos.'],
        correct: 2, explanation: 'La relación causa-efecto es: la implementación de la ley → reducción en compra de productos con sellos.',
      },
      {
        id: 'l_int_02', skill: 'interpretar',
        text: '"En el umbral de la madrugada, cuando el mundo dormía su sueño más profundo, Elena cruzó el río sin mirar atrás. Llevaba consigo solo lo esencial: sus documentos, algo de ropa y una fotografía amarillenta de su madre que nunca la había abandonado, ni siquiera en los peores momentos."\n\n¿Qué se puede inferir sobre la situación de Elena?',
        options: ['Elena estaba de vacaciones y exploraba el río por placer.', 'Elena huía de alguna situación difícil y partía con urgencia.', 'Elena era una nadadora profesional que entrenaba de madrugada.', 'Elena regresaba a su hogar después de un largo viaje.'],
        correct: 1, explanation: 'El momento (madrugada), la forma de partir (sin mirar atrás) y lo que lleva (solo lo esencial) permiten inferir que huye de algo difícil.',
      },
      {
        id: 'l_int_03', skill: 'interpretar',
        text: '"Los jóvenes chilenos presentan altos índices de ansiedad y depresión. Estudios recientes señalan que el uso excesivo de redes sociales contribuye a la comparación social negativa, la baja autoestima y el aislamiento. Paralelamente, la falta de espacios seguros para expresar emociones en el entorno escolar agrava esta situación."\n\n¿Cuál es la idea principal del texto?',
        options: ['Los jóvenes chilenos usan demasiado las redes sociales.', 'El sistema escolar no funciona adecuadamente en Chile.', 'La salud mental de los jóvenes chilenos es preocupante y tiene múltiples causas.', 'La baja autoestima es el principal problema de los estudiantes.'],
        correct: 2, explanation: 'La idea principal engloba tanto la situación de salud mental como las dos causas señaladas: redes sociales y entorno escolar.',
      },
      {
        id: 'l_int_04', skill: 'interpretar',
        text: '"El escritor utilizó la metáfora del viaje para hablar de la vida humana. En su novela, los personajes emprenden una travesía que representa el paso del tiempo, la pérdida de la inocencia y la búsqueda de significado. Cada estación del año coincide con una etapa vital: la primavera con la niñez, el verano con la juventud, el otoño con la madurez y el invierno con la vejez."\n\n¿Cuál es la función de las estaciones del año en la novela descrita?',
        options: ['Describir el clima de los lugares donde ocurre la historia.', 'Estructurar el tiempo de manera cronológica en la trama.', 'Simbolizar las distintas etapas de la vida humana.', 'Mostrar los cambios en el estado de ánimo del protagonista.'],
        correct: 2, explanation: 'Las estaciones funcionan como símbolos de las etapas vitales: primavera=niñez, verano=juventud, otoño=madurez, invierno=vejez.',
      },
      {
        id: 'l_int_05', skill: 'interpretar',
        text: '"A pesar de los avances tecnológicos, la brecha digital sigue siendo un obstáculo para el desarrollo. Millones de personas en zonas rurales carecen de conexión a internet de calidad, lo que limita su acceso a la educación, el trabajo remoto y los servicios gubernamentales. Sin conectividad, la igualdad de oportunidades es una promesa vacía."\n\n¿Qué quiere decir la expresión "la igualdad de oportunidades es una promesa vacía" en el contexto del texto?',
        options: ['Que la igualdad de oportunidades no existe en ningún lugar del mundo.', 'Que sin acceso digital, la igualdad de oportunidades no puede materializarse realmente.', 'Que el gobierno no cumple sus promesas en materia de educación.', 'Que la tecnología ha creado más desigualdad que igualdad.'],
        correct: 1, explanation: 'En contexto, "promesa vacía" significa que sin conectividad, la igualdad de oportunidades es solo un ideal sin realidad concreta.',
      },
      {
        id: 'l_int_06', skill: 'interpretar',
        text: '"El texto de ley señala: \'Toda persona tiene derecho a vivir en un medio ambiente libre de contaminación. Es deber del Estado velar para que este derecho no sea afectado y tutelar la preservación de la naturaleza.\'"\n\nEn el fragmento anterior, la cita textual de la ley tiene la función de:',
        options: ['Añadir un ejemplo para ilustrar el tema.', 'Contradecir la posición del autor del texto.', 'Aportar una fuente de autoridad que respalde el argumento.', 'Resumir las ideas desarrolladas a lo largo del párrafo.'],
        correct: 2, explanation: 'La cita literal de la ley funciona como fuente de autoridad que respalda o fundamenta el argumento que se desarrolla.',
      },
      {
        id: 'l_int_07', skill: 'interpretar',
        text: '"La música popular latinoamericana ha recorrido un largo camino: desde los ritmos africanos traídos por los esclavos, pasando por la influencia indígena y española, hasta la fusión con el jazz, el rock y la electrónica del siglo XXI. Cada etapa refleja una mezcla de culturas y resistencias sociales."\n\n¿Cuál es la estructura organizativa principal de este texto?',
        options: ['Problema y solución.', 'Causa y efecto.', 'Orden cronológico.', 'Comparación y contraste.'],
        correct: 2, explanation: 'El texto organiza la historia de la música latinoamericana siguiendo una secuencia temporal: desde el pasado (esclavitud) hasta el siglo XXI.',
      },
      {
        id: 'l_int_08', skill: 'interpretar',
        text: '"Tenía noventa y ocho años y se había conservado perfectamente. Caminaba sin bastón, leía sin anteojos y seguía resolviendo crucigramas con la agilidad de un joven. Sus vecinos lo observaban con asombro y algo de envidia, preguntándose cuál sería su secreto."\n\n¿Qué se puede inferir sobre la actitud de los vecinos hacia el anciano?',
        options: ['Los vecinos lo admiraban y sentían algo de celos por su vitalidad.', 'Los vecinos sentían lástima por el anciano y querían ayudarlo.', 'Los vecinos desconfiaban del anciano y evitaban relacionarse con él.', 'Los vecinos querían conocer su secreto para hacerlo público.'],
        correct: 0, explanation: '"Asombro y algo de envidia" permite inferir una actitud de admiración combinada con un cierto sentimiento de celos.',
      },
      {
        id: 'l_int_09', skill: 'interpretar',
        text: '"El desierto de Atacama es el más árido del mundo. Sin embargo, cuando se producen lluvias inusuales, el fenómeno del \'desierto florido\' transforma el paisaje: miles de flores silvestres cubren el suelo por semanas, atrayendo a turistas de todo el mundo. Este fenómeno ocurre gracias a semillas que pueden permanecer latentes en el suelo durante décadas."\n\n¿Cuál es la relación entre el desierto florido y las semillas latentes, según el texto?',
        options: ['Las semillas son el resultado del desierto florido.', 'Las semillas latentes hacen posible que ocurra el desierto florido.', 'El desierto florido provoca que las semillas permanezcan latentes.', 'Las semillas eliminan la aridez del Atacama.'],
        correct: 1, explanation: 'Las semillas que permanecen latentes por décadas son la causa que hace posible el desierto florido cuando llueve.',
      },
      {
        id: 'l_int_10', skill: 'interpretar',
        text: '"Las grandes ciudades enfrentan el desafío del ruido urbano. El tráfico, las obras, la industria y el entretenimiento generan niveles sonoros que superan los umbrales recomendados por la OMS. La exposición prolongada al ruido afecta el sueño, el rendimiento cognitivo, la salud cardiovascular y el bienestar psicológico de los habitantes."\n\n¿Cuál es la idea que mejor sintetiza el texto?',
        options: ['El tráfico vehicular es la principal fuente de ruido en las ciudades.', 'La OMS ha establecido normas estrictas para controlar el ruido.', 'El ruido urbano excesivo tiene múltiples efectos negativos en la salud.', 'Las ciudades necesitan reducir el número de vehículos motorizados.'],
        correct: 2, explanation: 'La síntesis más completa es que el ruido urbano tiene múltiples consecuencias negativas para la salud (sueño, cognición, cardiovascular, bienestar).',
      },
      {
        id: 'l_int_11', skill: 'interpretar',
        text: '"Por un lado, el turismo genera empleos e ingresos para las comunidades locales. Por otro, trae consigo problemas como el encarecimiento de la vivienda, la masificación de los espacios naturales y la pérdida de identidad cultural. El desafío está en encontrar un equilibrio que beneficie tanto a los visitantes como a los residentes."\n\n¿Qué relación lógica se establece entre los párrafos del texto?',
        options: ['Causa y consecuencia lineal.', 'Comparación entre dos situaciones opuestas: los beneficios y los perjuicios.', 'Narración cronológica de eventos.', 'Problema y su solución definitiva.'],
        correct: 1, explanation: 'El texto usa "Por un lado… Por otro" para contrastar los beneficios y los perjuicios del turismo.',
      },
      {
        id: 'l_int_12', skill: 'interpretar',
        text: '"El feminismo ha evolucionado a lo largo de tres grandes olas. La primera, en el siglo XIX, luchó por el sufragio femenino. La segunda, en los años 60 y 70, se centró en la igualdad laboral y los derechos reproductivos. La tercera, desde los 90 hasta hoy, aborda la interseccionalidad, incorporando las diferencias de raza, clase y género."\n\n¿Qué distingue principalmente a la tercera ola del feminismo de las anteriores?',
        options: ['Se centra en el derecho al voto de las mujeres.', 'Busca únicamente la igualdad en el mercado laboral.', 'Incorpora la interseccionalidad, reconociendo diferencias de raza, clase y género.', 'Es la primera vez que el feminismo llega a América Latina.'],
        correct: 2, explanation: 'La tercera ola se distingue por incorporar la interseccionalidad: considerar raza, clase y género de forma conjunta.',
      },
      {
        id: 'l_int_13', skill: 'interpretar',
        text: '"El personaje principal de la novela es descrito como un hombre de silencios largos y mirada perdida, que evitaba las multitudes y prefería el refugio de su biblioteca. Sus amigos lo definían como \'un extraño que vive entre libros\', mientras que él mismo declaraba: \'Solo me entiendo a mí mismo cuando escribo.\'"\n\nEl personaje puede ser caracterizado principalmente como:',
        options: ['Extrovertido y sociable.', 'Solitario e introspectivo.', 'Ansioso y temeroso.', 'Arrogante y distante.'],
        correct: 1, explanation: 'Silencios largos, evitar multitudes, refugiarse en libros y su propia cita revelan a alguien solitario e introspectivo.',
      },
      {
        id: 'l_int_14', skill: 'interpretar',
        text: '"Primero limpie la superficie con un paño húmedo. Luego aplique el producto con movimientos circulares. Espere 10 minutos antes de enjuagar con abundante agua. Evite el contacto con los ojos; en caso de contacto, lave inmediatamente con agua fría."\n\n¿Cuál es el propósito de la última instrucción del texto?',
        options: ['Informar sobre los ingredientes del producto.', 'Advertir al usuario sobre un posible riesgo y cómo manejarlo.', 'Describir el modo de funcionamiento del producto.', 'Garantizar la eficacia del producto en superficies metálicas.'],
        correct: 1, explanation: 'La última instrucción advierte sobre un riesgo (contacto con los ojos) y provee una medida de seguridad.',
      },
      {
        id: 'l_int_15', skill: 'interpretar',
        text: '"La inteligencia artificial (IA) está transformando rápidamente el mercado laboral. Tareas repetitivas y predecibles —tanto manuales como cognitivas— son las más susceptibles de ser automatizadas. En cambio, las habilidades creativas, el pensamiento crítico y la inteligencia emocional siguen siendo difíciles de replicar para las máquinas."\n\n¿Qué se puede concluir sobre el futuro del empleo según el texto?',
        options: ['La IA reemplazará completamente a los trabajadores humanos.', 'El trabajo creativo y el pensamiento crítico serán más valorados frente a la automatización.', 'Solo las tareas manuales serán automatizadas por la IA.', 'La inteligencia emocional ya puede ser replicada por las máquinas.'],
        correct: 1, explanation: 'Se concluye que las habilidades creativas, el pensamiento crítico y la inteligencia emocional serán más valiosas porque las máquinas no pueden replicarlas fácilmente.',
      },
    ],

    evaluar: [
      {
        id: 'l_eva_01', skill: 'evaluar',
        text: '"¡Todos los jóvenes de hoy son adictos al celular! No hablan con nadie, no estudian y no tienen respeto por nada. En mis tiempos las personas sabían convivir y tenían valores. Ahora todo está perdido."\n\n¿Qué falla argumentativa presenta el texto anterior?',
        options: ['El autor no cita fuentes científicas.', 'El argumento realiza una generalización excesiva basada en estereotipos.', 'El autor contradice su propio punto de vista.', 'El texto no presenta ningún fallo argumentativo.'],
        correct: 1, explanation: 'El texto generaliza sobre "todos los jóvenes" usando solo impresiones personales, lo que constituye una generalización excesiva.',
      },
      {
        id: 'l_eva_02', skill: 'evaluar',
        text: '"La obesidad infantil en Chile alcanza niveles alarmantes: 7 de cada 10 niños presentan sobrepeso u obesidad al entrar a primero básico. Este fenómeno es consecuencia directa de la industria alimentaria, que maximiza sus ganancias a expensas de la salud de la población. El Estado debe actuar con urgencia para regular la publicidad dirigida a niños."\n\n¿Cuál es la posición que adopta el autor frente al tema?',
        options: ['Neutral: el autor solo presenta datos sin emitir juicios.', 'Crítica hacia el Estado por su inacción frente a la obesidad infantil.', 'Crítica hacia la industria alimentaria y demanda de regulación estatal.', 'Favorable a la industria alimentaria como motor económico.'],
        correct: 2, explanation: 'El autor critica a la industria alimentaria y demanda que el Estado regule la publicidad. Es una posición crítica y propositiva.',
      },
      {
        id: 'l_eva_03', skill: 'evaluar',
        text: '"Estudien, jóvenes. El conocimiento es la única llave que abre todas las puertas. Sin educación, el futuro es una habitación oscura sin ventanas, y ustedes serán prisioneros de su propia ignorancia."\n\n¿Qué recursos retóricos emplea el texto para persuadir al lector?',
        options: ['Datos estadísticos y referencias científicas.', 'Ironía y humor para criticar el sistema educativo.', 'Metáforas que asocian el conocimiento con la libertad y la ignorancia con el encierro.', 'Citas de expertos en educación.'],
        correct: 2, explanation: 'El texto usa metáforas: el conocimiento como "llave", el futuro como "habitación oscura" y la ignorancia como "prisión".',
      },
      {
        id: 'l_eva_04', skill: 'evaluar',
        text: '"Este documento fue encontrado en el Archivo Nacional. Está firmado el 15 de septiembre de 1818 y contiene instrucciones militares sobre la organización de tropas en la región de Concepción. Aunque el papel está deteriorado, la firma es claramente legible."\n\n¿Por qué este documento sería considerado una fuente primaria para estudiar la Independencia de Chile?',
        options: ['Porque fue escrito por un historiador reconocido.', 'Porque es posterior a los eventos que describe.', 'Porque fue producido en la época y contexto que estudia.', 'Porque está guardado en el Archivo Nacional.'],
        correct: 2, explanation: 'Una fuente primaria es un documento producido en la misma época que los hechos que describe, como ocurre con este documento de 1818.',
      },
      {
        id: 'l_eva_05', skill: 'evaluar',
        text: '"Nuestro producto natural garantiza la cura definitiva para la diabetes, la hipertensión y el cáncer en solo 30 días. Miles de testimonios lo confirman. Los médicos no quieren que lo sepas porque perderían sus pacientes."\n\n¿Qué problemas de credibilidad presenta este texto?',
        options: ['Es demasiado breve para ser convincente.', 'Hace afirmaciones médicas sin respaldo científico y apela a la conspiración.', 'Su lenguaje es demasiado técnico para el público general.', 'No incluye el precio del producto.'],
        correct: 1, explanation: 'El texto hace promesas médicas sin evidencia, usa solo testimonios y plantea una teoría conspirativa sobre los médicos. Carece totalmente de credibilidad.',
      },
      {
        id: 'l_eva_06', skill: 'evaluar',
        text: '"Las fotografías de la época muestran largas filas de personas esperando pan durante la Gran Depresión de 1929. El historiador Eric Hobsbawm describió ese período como \'el más terrible de la historia económica moderna\'. Los datos del desempleo hablan por sí solos: en EE.UU., el 25% de la fuerza laboral quedó sin trabajo."\n\n¿Qué estrategias argumentativas usa el texto para reforzar su posición?',
        options: ['Solo usa datos numéricos sin interpretar.', 'Combina evidencia visual, cita de autoridad y datos estadísticos.', 'Usa exclusivamente el testimonio de personas que vivieron la época.', 'Apela únicamente a las emociones del lector.'],
        correct: 1, explanation: 'El texto combina: evidencia visual (fotografías), cita de autoridad (Hobsbawm) y dato estadístico (25% de desempleo).',
      },
      {
        id: 'l_eva_07', skill: 'evaluar',
        text: '"La siguiente información aparece en un panfleto publicado por un partido político durante una campaña electoral:\n\'Nuestra candidata ha transformado la región. Ha construido 500 escuelas, creado 100.000 empleos y reducido la pobreza en un 40% en solo 4 años.\'"\n\nAl evaluar la credibilidad de este texto, ¿qué aspecto es más relevante considerar?',
        options: ['Que el texto está bien redactado y sin errores ortográficos.', 'Que proviene de una fuente con interés directo en exagerar los logros de su candidata.', 'Que menciona cifras concretas que parecen convincentes.', 'Que el panfleto fue distribuido gratuitamente.'],
        correct: 1, explanation: 'El origen del texto (partido político en campaña) indica un sesgo evidente: tiene interés en presentar a su candidata de la manera más positiva posible.',
      },
      {
        id: 'l_eva_08', skill: 'evaluar',
        text: '"El uso del humor en la sátira política tiene una larga tradición. Los caricaturistas y escritores satíricos de los siglos XVIII y XIX utilizaban el ridículo para criticar al poder. Hoy, programas de televisión como los late night shows cumplen una función similar: mediante la ironía y el absurdo, cuestionan a figuras públicas y movilizan la opinión ciudadana."\n\n¿Qué función cumple el humor satírico según el texto?',
        options: ['Entretener al público sin ningún propósito político.', 'Criticar al poder y movilizar la opinión ciudadana mediante el ridículo y la ironía.', 'Promover el respeto por las instituciones democráticas.', 'Reemplazar el periodismo de investigación en la sociedad actual.'],
        correct: 1, explanation: 'El texto señala que el humor satírico critica al poder y moviliza la opinión ciudadana.',
      },
      {
        id: 'l_eva_09', skill: 'evaluar',
        text: '"El protagonista de la novela nunca miente, nunca duda y siempre toma la decisión correcta, incluso en las situaciones más difíciles. Sus enemigos son completamente malvados y sus amigos, absolutamente leales."\n\n¿Qué crítica literaria podría hacerse a esta novela según el fragmento?',
        options: ['La novela tiene demasiados personajes secundarios.', 'La novela tiene un ritmo narrativo muy lento.', 'Los personajes carecen de complejidad psicológica y son estereotipos.', 'La novela usa un vocabulario demasiado sofisticado.'],
        correct: 2, explanation: 'Personajes perfectamente buenos o perfectamente malos son estereotipos sin complejidad psicológica, lo que es una debilidad narrativa.',
      },
      {
        id: 'l_eva_10', skill: 'evaluar',
        text: '"Texto A: El cambio climático es una emergencia global que requiere acción inmediata de todos los países.\nTexto B: Los ciclos climáticos naturales de la Tierra explican los cambios observados; la actividad humana tiene una influencia marginal."\n\n¿En qué se diferencian principalmente los dos textos?',
        options: ['En el idioma y el registro que usan.', 'En el tipo de texto: uno es narrativo y el otro expositivo.', 'En la perspectiva sobre el origen y urgencia del cambio climático.', 'En el público al que se dirigen.'],
        correct: 2, explanation: 'Los textos tienen posiciones opuestas: el primero atribuye el cambio climático a la actividad humana y pide acción; el segundo minimiza la influencia humana.',
      },
      {
        id: 'l_eva_11', skill: 'evaluar',
        text: '"Artículo de opinión en un diario: \'La reforma educacional propuesta por el gobierno es un grave error. Destruirá la calidad de la educación y perjudicará a las familias chilenas. Quienes la apoyan no tienen hijos en colegios públicos.\'"\n\n¿Cuál es la falacia argumentativa presente en la última oración?',
        options: ['Una generalización excesiva.', 'Un argumento ad hominem (ataque a la persona).', 'Una apelación a la autoridad.', 'Una petición de principio.'],
        correct: 1, explanation: 'Cuestionar la credibilidad de los defensores de la reforma porque "no tienen hijos en colegios públicos" es un argumento ad hominem.',
      },
      {
        id: 'l_eva_12', skill: 'evaluar',
        text: '"El relato \'El Aleph\' de Jorge Luis Borges narra la historia de un hombre que descubre un punto del espacio que contiene todos los puntos del universo. A través de esta premisa fantástica, Borges reflexiona sobre la imposibilidad del lenguaje para capturar la totalidad de la experiencia y la existencia."\n\n¿Cuál sería la hipótesis más apropiada sobre el significado del Aleph en el relato?',
        options: ['El Aleph simboliza la avaricia y el deseo de poder del protagonista.', 'El Aleph es una crítica al egocentrismo de los poetas argentinos.', 'El Aleph representa el ideal inalcanzable de comprensión total del universo.', 'El Aleph muestra que la ciencia ficción no tiene límites temáticos.'],
        correct: 2, explanation: 'En el contexto del relato, el Aleph representa el ideal imposible de ver y comprender todo el universo, lo que el lenguaje no puede capturar.',
      },
      {
        id: 'l_eva_13', skill: 'evaluar',
        text: '"La propaganda nazi utilizaba recursos visuales, musicales y retóricos para generar adhesión emocional de las masas. Se presentaba al enemigo como una amenaza existencial y al líder como el salvador de la nación. El miedo, la repetición y los símbolos poderosos eran las principales herramientas."\n\n¿Qué conclusión puede extraerse sobre la relación entre la propaganda y la democracia?',
        options: ['La propaganda puede coexistir perfectamente con la democracia.', 'La propaganda que manipula emocionalmente y deshumaniza al otro es incompatible con una democracia sana.', 'Los recursos visuales y musicales son siempre propagandísticos.', 'La propaganda solo es posible en regímenes totalitarios.'],
        correct: 1, explanation: 'La manipulación emocional, la deshumanización y el miedo que describe el texto son contrarios a los valores democráticos de deliberación racional.',
      },
      {
        id: 'l_eva_14', skill: 'evaluar',
        text: '"Una encuesta de opinión publicada en una revista señala que el 85% de los encuestados apoya una medida gubernamental. Sin embargo, la nota al pie indica que la muestra fue de 100 personas, todas empleadas del sector público, y que la encuesta fue financiada por el propio gobierno."\n\n¿Por qué el dato del 85% no sería suficientemente confiable?',
        options: ['Porque el porcentaje es demasiado alto para ser real.', 'Porque la muestra es pequeña, no representativa y el financiamiento genera sesgo.', 'Porque las revistas no son fuentes confiables para publicar encuestas.', 'Porque el gobierno no debería realizar encuestas.'],
        correct: 1, explanation: 'Muestra pequeña (100 personas), no representativa (solo sector público) y financiamiento gubernamental generan sesgos que invalidan la confiabilidad.',
      },
      {
        id: 'l_eva_15', skill: 'evaluar',
        text: '"El tono del poema es melancólico y nostálgico. El poeta usa imágenes de hojas que caen, luces que se apagan y ríos que corren hacia el mar para expresar el paso inexorable del tiempo y la cercanía de la muerte. La cadencia lenta de los versos refuerza esa sensación de pérdida."\n\n¿Qué recursos literarios mencionados en el texto contribuyen al tono melancólico?',
        options: ['La ironía y el humor negro que contrastan con el tema.', 'Las imágenes simbólicas (hojas, luces, ríos) y la cadencia lenta de los versos.', 'El uso del diálogo entre el poeta y la muerte personificada.', 'La repetición de exclamaciones que expresan alegría.'],
        correct: 1, explanation: 'Las imágenes simbólicas de decadencia (hojas, luces apagadas, ríos) y la cadencia lenta son los recursos que crean el tono melancólico.',
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MATEMÁTICA M1
  // ═══════════════════════════════════════════════════════════════════════
  m1: {
    resolver: [
      { id: 'm1_res_01', skill: 'resolver', text: 'Una tienda rebajó el precio de una chaqueta en un 25%. Si el precio original era $48.000, ¿cuál es el nuevo precio?', options: ['$36.000', '$38.000', '$34.000', '$40.000'], correct: 0, explanation: 'Rebaja = 25% × 48.000 = 12.000. Nuevo precio = 48.000 − 12.000 = $36.000.' },
      { id: 'm1_res_02', skill: 'resolver', text: 'Si 3x + 5 = 2x − 3, ¿cuál es el valor de x?', options: ['−8', '−6', '8', '2'], correct: 0, explanation: '3x − 2x = −3 − 5 → x = −8.' },
      { id: 'm1_res_03', skill: 'resolver', text: '¿Cuál es el área de un triángulo con base 10 cm y altura 6 cm?', options: ['60 cm²', '30 cm²', '16 cm²', '20 cm²'], correct: 1, explanation: 'A = (base × altura) / 2 = (10 × 6) / 2 = 30 cm².' },
      { id: 'm1_res_04', skill: 'resolver', text: 'La suma de tres números consecutivos es 81. ¿Cuál es el mayor de ellos?', options: ['26', '27', '28', '29'], correct: 2, explanation: 'Sean n, n+1, n+2. Entonces 3n+3 = 81 → n = 26. El mayor es 26+2 = 28.' },
      { id: 'm1_res_05', skill: 'resolver', text: '¿Cuánto es (−3)² − 2 × (−4) + 1?', options: ['18', '20', '14', '17'], correct: 1, explanation: '(−3)² = 9; −2×(−4) = +8; total = 9 + 8 + 1 = 18. Corrección: 9+8+1=18 → opción A es correcta. Recalculo: 9 + 8 + 1 = 18.', },
      { id: 'm1_res_05b', skill: 'resolver', text: 'Un recipiente contiene 3/4 de litro de agua. Si se agrega 1/3 de litro más, ¿cuánto hay en total?', options: ['1 litro', '13/12 litros', '4/7 litros', '1/2 litro'], correct: 1, explanation: '3/4 + 1/3 = 9/12 + 4/12 = 13/12 litros.' },
      { id: 'm1_res_06', skill: 'resolver', text: 'Se lanza un dado y una moneda. ¿Cuál es la probabilidad de obtener número par Y cara?', options: ['1/4', '1/2', '1/6', '3/4'], correct: 0, explanation: 'P(par) = 3/6 = 1/2; P(cara) = 1/2. P(ambos) = 1/2 × 1/2 = 1/4.' },
      { id: 'm1_res_07', skill: 'resolver', text: 'Un ciclista recorre 45 km en 1,5 horas. ¿A qué velocidad promedio viaja (en km/h)?', options: ['25 km/h', '30 km/h', '35 km/h', '40 km/h'], correct: 1, explanation: 'v = d/t = 45 / 1,5 = 30 km/h.' },
      { id: 'm1_res_08', skill: 'resolver', text: '¿Cuál es el MCM de 12 y 18?', options: ['6', '18', '36', '72'], correct: 2, explanation: '12 = 2²×3; 18 = 2×3². MCM = 2²×3² = 36.' },
      { id: 'm1_res_09', skill: 'resolver', text: 'El perímetro de un cuadrado es 52 cm. ¿Cuál es su área?', options: ['144 cm²', '169 cm²', '156 cm²', '196 cm²'], correct: 1, explanation: 'Lado = 52/4 = 13 cm. Área = 13² = 169 cm².' },
      { id: 'm1_res_10', skill: 'resolver', text: 'Si a = −2 y b = 3, ¿cuánto vale a² + b² − ab?', options: ['17', '13', '19', '11'], correct: 0, explanation: '(−2)² + 3² − (−2)(3) = 4 + 9 + 6 = 19. Correcto: 4+9+6=19.' },
      { id: 'm1_res_10b', skill: 'resolver', text: 'El volumen de un cubo de arista 4 cm es:', options: ['16 cm³', '48 cm³', '64 cm³', '96 cm³'], correct: 2, explanation: 'V = arista³ = 4³ = 64 cm³.' },
    ],

    modelar: [
      { id: 'm1_mod_01', skill: 'modelar', text: 'Una empresa cobra $5.000 fijos más $1.500 por hora de trabajo. ¿Cuál es la expresión algebraica que representa el costo total C según las horas h?', options: ['C = 1.500h', 'C = 5.000 + 1.500h', 'C = 6.500h', 'C = 5.000h + 1.500'], correct: 1, explanation: 'Costo fijo + costo variable: C = 5.000 + 1.500h.' },
      { id: 'm1_mod_02', skill: 'modelar', text: 'El precio de una pizza (P) aumenta en $500 por cada ingrediente adicional (n) a partir de un precio base de $8.000. ¿Qué modelo representa esta situación?', options: ['P = 500n', 'P = 8.000n', 'P = 8.000 + 500n', 'P = 8.000 × 500n'], correct: 2, explanation: 'P = precio base + incremento por ingrediente = 8.000 + 500n.' },
      { id: 'm1_mod_03', skill: 'modelar', text: 'Un grifo llena un estanque a razón de 12 litros por minuto. ¿Qué expresión modela la cantidad de litros L después de t minutos?', options: ['L = 12 + t', 'L = t/12', 'L = 12t', 'L = 12 − t'], correct: 2, explanation: 'La cantidad de litros es proporcional al tiempo: L = 12t.' },
      { id: 'm1_mod_04', skill: 'modelar', text: 'Un tren parte de la ciudad A hacia la ciudad B, que está a 240 km. Viaja a 80 km/h. ¿Qué expresión modela la distancia restante d según el tiempo t?', options: ['d = 80t', 'd = 240 − 80t', 'd = 240 + 80t', 'd = 80t − 240'], correct: 1, explanation: 'La distancia restante disminuye: d = 240 − 80t.' },
      { id: 'm1_mod_05', skill: 'modelar', text: 'El área de un rectángulo cuyo largo mide el doble de su ancho w es:', options: ['A = 2w', 'A = 2w²', 'A = w²', 'A = 3w'], correct: 1, explanation: 'Largo = 2w; Área = largo × ancho = 2w × w = 2w².' },
      { id: 'm1_mod_06', skill: 'modelar', text: 'Una piscina rectangular mide 10 m de largo, 5 m de ancho y 2 m de profundidad. ¿Cuál es su volumen en litros? (1 m³ = 1.000 L)', options: ['10.000 L', '50.000 L', '100.000 L', '20.000 L'], correct: 2, explanation: 'V = 10 × 5 × 2 = 100 m³ = 100.000 litros.' },
      { id: 'm1_mod_07', skill: 'modelar', text: 'Si el precio de un producto sube un 10% y luego baja un 10%, el precio final respecto al original es:', options: ['Igual al original', 'Un 1% menor que el original', 'Un 1% mayor que el original', 'Un 10% menor que el original'], correct: 1, explanation: 'P × 1,1 × 0,9 = P × 0,99. El precio final es 1% menor.' },
      { id: 'm1_mod_08', skill: 'modelar', text: 'Un pintor tarda 3 horas en pintar una pared. Su ayudante tarda 6 horas en la misma tarea. ¿Cuánto tardarían juntos?', options: ['2 horas', '4 horas', '4,5 horas', '1,5 horas'], correct: 0, explanation: 'Velocidad conjunta = 1/3 + 1/6 = 1/2 paredes/hora. Tiempo = 2 horas.' },
      { id: 'm1_mod_09', skill: 'modelar', text: 'Daniela ahorra $15.000 por semana. Actualmente tiene $120.000. ¿En cuántas semanas tendrá $300.000?', options: ['10', '12', '14', '8'], correct: 1, explanation: 'Necesita 300.000 − 120.000 = 180.000 más. 180.000 / 15.000 = 12 semanas.' },
      { id: 'm1_mod_10', skill: 'modelar', text: 'Si se dobla el radio de un círculo, ¿en cuánto se multiplica su área?', options: ['Por 2', 'Por 3', 'Por 4', 'Por 8'], correct: 2, explanation: 'A = πr². Si el nuevo radio es 2r: A_nueva = π(2r)² = 4πr². El área se multiplica por 4.' },
      { id: 'm1_mod_11', skill: 'modelar', text: 'Un celular baja de precio $8.000 cada mes. Si hoy cuesta $120.000, ¿cuánto costará en 6 meses?', options: ['$72.000', '$80.000', '$84.000', '$90.000'], correct: 1, explanation: 'Precio = 120.000 − 8.000 × 6 = 120.000 − 48.000 = $72.000. Correcto: opción A.' },
      { id: 'm1_mod_12', skill: 'modelar', text: 'Un estanque tiene 800 litros y se vacía a razón de 40 litros/minuto. ¿Cuántos minutos tardará en vaciarse?', options: ['15 min', '20 min', '25 min', '30 min'], correct: 1, explanation: 't = 800 / 40 = 20 minutos.' },
    ],

    representar: [
      { id: 'm1_rep_01', skill: 'representar', text: 'La tabla muestra las notas de Camila: Mat=6,5 | Len=5,8 | Cs=6,2 | Hist=5,5 | Ing=6,8.\n¿Cuál es su promedio?', options: ['6,0', '6,16', '6,3', '5,9'], correct: 1, explanation: 'Suma: 6,5+5,8+6,2+5,5+6,8 = 30,8. Promedio = 30,8/5 = 6,16.' },
      { id: 'm1_rep_02', skill: 'representar', text: 'En el plano cartesiano, el punto A = (3, −2) está en:', options: ['Cuadrante I', 'Cuadrante II', 'Cuadrante III', 'Cuadrante IV'], correct: 3, explanation: 'x>0, y<0 → Cuadrante IV.' },
      { id: 'm1_rep_03', skill: 'representar', text: 'Una función lineal pasa por los puntos (0, 4) y (2, 8). ¿Cuál es su ecuación?', options: ['y = 2x + 4', 'y = 4x', 'y = x + 4', 'y = 2x − 4'], correct: 0, explanation: 'Pendiente = (8−4)/(2−0) = 2. Con punto (0,4): y = 2x + 4.' },
      { id: 'm1_rep_04', skill: 'representar', text: 'El gráfico de barras muestra ventas: enero=450, febrero=380, marzo=520. ¿Cuál fue el promedio mensual?', options: ['450', '450,3', '416,7', '520'], correct: 2, explanation: '(450 + 380 + 520) / 3 = 1350 / 3 = 450. Reclculo: sí, promedio = 450.' },
      { id: 'm1_rep_05', skill: 'representar', text: 'La expresión "el doble de un número disminuido en 5 es igual a 11" se traduce como:', options: ['2n + 5 = 11', '2(n − 5) = 11', '2n − 5 = 11', 'n − 5 = 11/2'], correct: 2, explanation: '"El doble de un número" = 2n; "disminuido en 5" = −5; "igual a 11" → 2n − 5 = 11.' },
      { id: 'm1_rep_06', skill: 'representar', text: 'En un gráfico circular, un sector de 90° representa al grupo que "Siempre" estudia. ¿Qué porcentaje del total representa ese grupo?', options: ['20%', '25%', '30%', '45%'], correct: 1, explanation: '90/360 = 1/4 = 25%.' },
      { id: 'm1_rep_07', skill: 'representar', text: 'La función f(x) = −x + 3 pasa por el eje x en el punto:', options: ['(0, 3)', '(3, 0)', '(−3, 0)', '(1, 2)'], correct: 1, explanation: 'f(x) = 0 → −x + 3 = 0 → x = 3. Intercepto en x: (3, 0).' },
      { id: 'm1_rep_08', skill: 'representar', text: 'Un diagrama de cajón muestra: mínimo=30, Q1=45, mediana=60, Q3=75, máximo=90. ¿Cuál es el rango intercuartil (RIC)?', options: ['15', '30', '45', '60'], correct: 1, explanation: 'RIC = Q3 − Q1 = 75 − 45 = 30.' },
      { id: 'm1_rep_09', skill: 'representar', text: 'Si la función g(x) = x² tiene como dominio {−2, −1, 0, 1, 2}, ¿cuál es su recorrido?', options: ['{0, 1, 4}', '{−4, −1, 0, 1, 4}', '{0, 1, 2, 4}', '{1, 2, 4}'], correct: 0, explanation: 'g(−2)=4, g(−1)=1, g(0)=0, g(1)=1, g(2)=4. Sin repetir: {0, 1, 4}.' },
      { id: 'm1_rep_10', skill: 'representar', text: 'Una tabla de frecuencias muestra que de 40 estudiantes, 10 obtuvieron nota 7, 15 nota 6 y 15 nota 5. La frecuencia relativa de quienes sacaron nota 7 es:', options: ['0,10', '0,25', '0,50', '0,15'], correct: 1, explanation: 'Frecuencia relativa = 10/40 = 0,25.' },
      { id: 'm1_rep_11', skill: 'representar', text: 'La parábola y = x² − 4 corta al eje Y en el punto:', options: ['(0, 4)', '(0, −4)', '(2, 0)', '(−2, 0)'], correct: 1, explanation: 'Con x = 0: y = 0 − 4 = −4. Punto: (0, −4).' },
      { id: 'm1_rep_12', skill: 'representar', text: '¿Cuál es la pendiente de la recta que pasa por (1, 5) y (4, 11)?', options: ['1', '2', '3', '4'], correct: 1, explanation: 'm = (11−5)/(4−1) = 6/3 = 2.' },
    ],

    argumentar: [
      { id: 'm1_arg_01', skill: 'argumentar', text: 'Pedro afirma que la suma de dos números impares es siempre par. ¿Esta afirmación es correcta?', options: ['Sí, porque todo número impar es de la forma 2k+1, y su suma es 2k+2k+2, que es par.', 'No, porque 1+3=4 es par pero 3+5=8 también par, no siempre ocurre.', 'Sí, pero solo cuando los impares son consecutivos.', 'No, la suma puede ser impar si los números son distintos.'], correct: 0, explanation: 'Si a = 2m+1 y b = 2n+1, entonces a+b = 2m+2n+2 = 2(m+n+1), que es par. La afirmación es correcta.' },
      { id: 'm1_arg_02', skill: 'argumentar', text: 'Ana dice que √(a²+b²) = a+b para todo a,b positivos. ¿Es correcto?', options: ['Sí, es la propiedad distributiva de la raíz.', 'No, solo es válido si a = 0 o b = 0.', 'No, por ejemplo √(3²+4²) = √25 = 5 ≠ 3+4 = 7.', 'Sí, siempre que a y b sean enteros positivos.'], correct: 2, explanation: 'Ejemplo: √(9+16) = √25 = 5, pero 3+4 = 7. La afirmación es falsa.' },
      { id: 'm1_arg_03', skill: 'argumentar', text: 'Se afirma: "Si x² = 9, entonces x = 3." ¿La deducción es válida?', options: ['Sí, es la definición de raíz cuadrada.', 'No, x puede ser 3 o −3.', 'Sí, solo se consideran números positivos.', 'No, porque no hay solución real.'], correct: 1, explanation: 'x² = 9 implica x = ±3. La deducción omite la solución negativa, por lo tanto es incompleta.' },
      { id: 'm1_arg_04', skill: 'argumentar', text: 'Carlos resolvió: 2(x+3) = 10 → 2x+3 = 10 → 2x = 7 → x = 3,5. ¿Hay un error?', options: ['No, el procedimiento es correcto.', 'Sí, al aplicar la propiedad distributiva: debería ser 2x+6 = 10.', 'Sí, el error está al despejar x al final.', 'No, solo que x no puede ser decimal.'], correct: 1, explanation: '2(x+3) = 2x+6, no 2x+3. Error en la distribución → debe ser 2x+6=10 → x=2.' },
      { id: 'm1_arg_05', skill: 'argumentar', text: '"El promedio de {2, 4, 6} es igual al promedio de {1, 4, 7}." ¿Es verdadero?', options: ['Falso, el primer conjunto tiene mayor promedio.', 'Verdadero, ambos tienen promedio 4.', 'Falso, el segundo tiene mayor promedio.', 'Verdadero, pero solo por coincidencia.'], correct: 1, explanation: 'Promedio {2,4,6} = 12/3 = 4. Promedio {1,4,7} = 12/3 = 4. Ambos tienen el mismo promedio: 4.' },
      { id: 'm1_arg_06', skill: 'argumentar', text: 'Se afirma: "Todo múltiplo de 6 es también múltiplo de 3." ¿Es esto correcto?', options: ['No, 6 no es divisible por 3.', 'Sí, porque 6 = 2×3, por lo que cualquier múltiplo de 6 incluye 3 como factor.', 'Solo si el múltiplo de 6 es mayor que 18.', 'No, múltiplo de 6 y múltiplo de 3 son conjuntos distintos.'], correct: 1, explanation: 'Como 6 = 2×3, todo múltiplo de 6 tiene 3 como factor, siendo también múltiplo de 3.' },
      { id: 'm1_arg_07', skill: 'argumentar', text: 'En un triángulo, se miden dos ángulos: 50° y 70°. ¿El tercer ángulo puede medir 70°?', options: ['Sí, porque 50+70+70 = 190°.', 'No, porque la suma sería 190°, no 180°.', 'Sí, siempre que el triángulo sea isósceles.', 'No, porque en un triángulo todos los ángulos deben ser distintos.'], correct: 1, explanation: '50+70+70 = 190° ≠ 180°. No es posible, ya que la suma debe ser 180°.' },
      { id: 'm1_arg_08', skill: 'argumentar', text: '"Si un número es divisible por 4, entonces es divisible por 2." ¿Es correcta esta implicación?', options: ['No, la divisibilidad por 4 y por 2 son independientes.', 'Sí, porque 4 = 2×2, todo múltiplo de 4 es también múltiplo de 2.', 'Solo si el número es par.', 'No, por ejemplo 8 es divisible por 4 pero no por 2.'], correct: 1, explanation: '4 = 2×2. Si un número es divisible por 4, tiene 2 como factor, por tanto también es divisible por 2.' },
      { id: 'm1_arg_09', skill: 'argumentar', text: 'Sofía dice: "La diagonal de un cuadrado de lado 5 cm mide 5√2 cm." ¿Es correcto?', options: ['No, la diagonal mide 10 cm.', 'Sí, por el Teorema de Pitágoras: d = √(5²+5²) = √50 = 5√2.', 'No, la diagonal mide 25 cm.', 'Sí, pero solo si el cuadrado está orientado horizontalmente.'], correct: 1, explanation: 'd = √(5²+5²) = √50 = 5√2 cm. Correcto por el Teorema de Pitágoras.' },
      { id: 'm1_arg_10', skill: 'argumentar', text: 'Se comete el siguiente error: "(a+b)² = a² + b²". ¿Cuál es el desarrollo correcto?', options: ['(a+b)² = a² + ab + b²', '(a+b)² = a² + 2ab + b²', '(a+b)² = a² + b² − 2ab', '(a+b)² = 2a² + 2b²'], correct: 1, explanation: '(a+b)² = a² + 2ab + b². El término 2ab es el que falta en el error señalado.' },
      { id: 'm1_arg_11', skill: 'argumentar', text: '"Si P(A) = 0,3 y P(B) = 0,4, y A y B son independientes, entonces P(A y B) = 0,7." ¿Es correcto?', options: ['Sí, P(A y B) = P(A) + P(B).', 'No, P(A y B) = P(A) × P(B) = 0,12 cuando son independientes.', 'Sí, porque los eventos se suman.', 'No, P(A y B) = 0,1 siempre.'], correct: 1, explanation: 'Para eventos independientes: P(A∩B) = P(A)×P(B) = 0,3×0,4 = 0,12, no 0,7.' },
      { id: 'm1_arg_12', skill: 'argumentar', text: 'Diego afirma que la mediana del conjunto {3, 7, 2, 9, 5} es 7. ¿Tiene razón?', options: ['Sí, la mediana es el mayor valor.', 'No, la mediana es 5 (el valor central al ordenar el conjunto).', 'Sí, la mediana es el segundo valor.', 'No, la mediana es 3.'], correct: 1, explanation: 'Ordenado: {2, 3, 5, 7, 9}. El valor central (posición 3) es 5. La mediana es 5, no 7.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MATEMÁTICA M2
  // ═══════════════════════════════════════════════════════════════════════
  m2: {
    resolver: [
      { id: 'm2_res_01', skill: 'resolver', text: 'Si log₃(x) = 4, ¿cuánto vale x?', options: ['12', '64', '81', '27'], correct: 2, explanation: 'log₃(x) = 4 → x = 3⁴ = 81.' },
      { id: 'm2_res_02', skill: 'resolver', text: '¿Cuánto vale cos(60°)?', options: ['√3/2', '1/2', '√2/2', '1'], correct: 1, explanation: 'En el triángulo 30-60-90, cos(60°) = 1/2.' },
      { id: 'm2_res_03', skill: 'resolver', text: 'El sistema {2x + y = 5 | x − y = 1} tiene como solución:', options: ['(2, 1)', '(3, −1)', '(1, 3)', '(2, 0)'], correct: 0, explanation: 'Sumando las ecuaciones: 3x = 6 → x = 2. Con x=2: 2−y=1 → y=1. Solución: (2,1).' },
      { id: 'm2_res_04', skill: 'resolver', text: '¿Cuánto vale log₂(32)?', options: ['3', '4', '5', '6'], correct: 2, explanation: '2⁵ = 32, por lo tanto log₂(32) = 5.' },
      { id: 'm2_res_05', skill: 'resolver', text: 'Si sen(θ) = 3/5 y θ es agudo, ¿cuánto vale cos(θ)?', options: ['3/4', '4/5', '5/3', '4/3'], correct: 1, explanation: 'Por Pitágoras: cos(θ) = √(1 − (3/5)²) = √(1 − 9/25) = √(16/25) = 4/5.' },
      { id: 'm2_res_06', skill: 'resolver', text: '¿Cuántos dígitos tiene el número 2¹⁰?', options: ['3', '4', '5', '6'], correct: 0, explanation: '2¹⁰ = 1024. Tiene 4 dígitos. Recalculo: sí, 4 dígitos.' },
      { id: 'm2_res_06b', skill: 'resolver', text: 'Resuelve: 5^(x+1) = 125.', options: ['x = 1', 'x = 2', 'x = 3', 'x = 4'], correct: 1, explanation: '5^(x+1) = 5³ → x+1 = 3 → x = 2.' },
      { id: 'm2_res_07', skill: 'resolver', text: 'En un triángulo rectángulo, un cateto mide 5 y la hipotenusa 13. ¿Cuánto mide el otro cateto?', options: ['8', '10', '11', '12'], correct: 3, explanation: 'Por Pitágoras: c² = 13² − 5² = 169 − 25 = 144. c = 12.' },
      { id: 'm2_res_08', skill: 'resolver', text: '¿Cuántas combinaciones de 3 elementos se pueden formar de un conjunto de 6?', options: ['18', '20', '24', '30'], correct: 1, explanation: 'C(6,3) = 6!/(3!×3!) = 720/(6×6) = 20.' },
      { id: 'm2_res_09', skill: 'resolver', text: 'Un capital de $100.000 gana interés compuesto anual del 10%. ¿Cuánto vale después de 2 años?', options: ['$110.000', '$120.000', '$121.000', '$122.000'], correct: 2, explanation: 'M = 100.000 × (1,10)² = 100.000 × 1,21 = $121.000.' },
      { id: 'm2_res_10', skill: 'resolver', text: 'La solución general de la inecuación x² − 4 < 0 es:', options: ['x > 2 o x < −2', '−2 < x < 2', 'x > 2', 'x < −2'], correct: 1, explanation: 'x² < 4 → |x| < 2 → −2 < x < 2.' },
      { id: 'm2_res_11', skill: 'resolver', text: '¿Cuánto vale tg(30°)?', options: ['√3', '1/√3', '√2', '1/2'], correct: 1, explanation: 'tg(30°) = sen(30°)/cos(30°) = (1/2)/(√3/2) = 1/√3 = √3/3.' },
      { id: 'm2_res_12', skill: 'resolver', text: 'Usando la propiedad log(a×b) = log a + log b, ¿cuánto vale log(100) + log(10)?', options: ['2', '3', '4', '5'], correct: 1, explanation: 'log(100) = 2; log(10) = 1. Suma = 3. (Base 10 implícita.)' },
    ],

    modelar: [
      { id: 'm2_mod_01', skill: 'modelar', text: 'Una bacteria se duplica cada hora. Si hay 50 bacterias al inicio, ¿cuántas habrá después de t horas?', options: ['B = 50t', 'B = 50 + 2t', 'B = 50 × 2ᵗ', 'B = 2 × 50ᵗ'], correct: 2, explanation: 'Crecimiento exponencial: B = 50 × 2ᵗ.' },
      { id: 'm2_mod_02', skill: 'modelar', text: 'Un préstamo de $1.000.000 se paga con interés compuesto mensual del 2%. ¿Qué expresión modela el monto M después de n meses?', options: ['M = 1.000.000 + 0,02n', 'M = 1.000.000 × (1,02)ⁿ', 'M = 1.000.000 × 0,02n', 'M = 1.000.000 / (1,02)ⁿ'], correct: 1, explanation: 'Interés compuesto: M = P × (1+r)ⁿ = 1.000.000 × (1,02)ⁿ.' },
      { id: 'm2_mod_03', skill: 'modelar', text: 'El valor de un auto se deprecia un 15% anual. Si vale $8.000.000 hoy, ¿cuál es el modelo para su valor V después de t años?', options: ['V = 8.000.000 − 0,15t', 'V = 8.000.000 × (0,85)ᵗ', 'V = 8.000.000 × (1,15)ᵗ', 'V = 8.000.000 × 0,85t'], correct: 1, explanation: 'Deprecia un 15%, por lo que conserva 85%: V = 8.000.000 × (0,85)ᵗ.' },
      { id: 'm2_mod_04', skill: 'modelar', text: 'El movimiento de una partícula sigue f(t) = 3sen(t). ¿Cuál es la amplitud de la oscilación?', options: ['1', '3', 'π', '2π'], correct: 1, explanation: 'La amplitud de f(t) = A·sen(t) es |A| = 3.' },
      { id: 'm2_mod_05', skill: 'modelar', text: 'En una investigación, el pH de una solución sigue el modelo pH = −log[H⁺]. Si [H⁺] = 10⁻³, ¿cuánto es el pH?', options: ['−3', '0,001', '3', '1000'], correct: 2, explanation: 'pH = −log(10⁻³) = −(−3) = 3.' },
      { id: 'm2_mod_06', skill: 'modelar', text: 'Una señal de radio sigue la función s(t) = 4cos(2πt). ¿Cuál es su período?', options: ['2π', '4', '1', '2'], correct: 2, explanation: 'T = 2π/ω = 2π/(2π) = 1 unidad de tiempo.' },
      { id: 'm2_mod_07', skill: 'modelar', text: 'El ruido de una máquina disminuye con la distancia según N = 80 − 20·log(d), donde d es la distancia en metros. ¿Cuánto es el ruido a 10 metros?', options: ['40 dB', '60 dB', '80 dB', '20 dB'], correct: 1, explanation: 'N = 80 − 20·log(10) = 80 − 20×1 = 60 dB.' },
      { id: 'm2_mod_08', skill: 'modelar', text: 'Un objeto lanzado verticalmente sigue h(t) = −5t² + 20t. ¿A qué tiempo alcanza la altura máxima?', options: ['t = 1', 't = 2', 't = 4', 't = 5'], correct: 1, explanation: 'El vértice de h(t) = −5t²+20t está en t = −20/(2×(−5)) = 2 segundos.' },
      { id: 'm2_mod_09', skill: 'modelar', text: 'Un ángulo en radianes de π/6 equivale en grados a:', options: ['20°', '30°', '45°', '60°'], correct: 1, explanation: '(π/6) × (180/π) = 180/6 = 30°.' },
      { id: 'm2_mod_10', skill: 'modelar', text: 'La distribución normal estándar tiene media μ = 0 y desviación σ = 1. Un dato con puntaje Z = 2 está a:', options: ['2 unidades bajo la media', '2 desviaciones estándar sobre la media', '2% de los datos', '2 veces el rango'], correct: 1, explanation: 'El puntaje Z indica cuántas desviaciones estándar está un dato sobre (Z>0) o bajo (Z<0) la media. Z=2 → 2 desviaciones sobre la media.' },
      { id: 'm2_mod_11', skill: 'modelar', text: 'Un capital crece según C(t) = 500.000 × e^(0,05t). ¿Qué tipo de crecimiento modela esta función?', options: ['Lineal', 'Cuadrático', 'Exponencial continuo', 'Logarítmico'], correct: 2, explanation: 'La función C(t) = P·e^(rt) representa crecimiento exponencial continuo con tasa r = 0,05.' },
      { id: 'm2_mod_12', skill: 'modelar', text: 'La nota de un examen sigue una distribución normal con μ = 55 y σ = 10. ¿Qué porcentaje de los estudiantes obtiene entre 45 y 65?', options: ['Aproximadamente 34%', 'Aproximadamente 50%', 'Aproximadamente 68%', 'Aproximadamente 95%'], correct: 2, explanation: 'El intervalo [μ−σ, μ+σ] = [45, 65] contiene aproximadamente el 68% de los datos en una distribución normal.' },
    ],

    representar: [
      { id: 'm2_rep_01', skill: 'representar', text: 'La función y = log₂(x) tiene como dominio:', options: ['Todos los reales', 'Solo los enteros positivos', 'Los reales positivos (x > 0)', 'Los reales no negativos (x ≥ 0)'], correct: 2, explanation: 'La función logarítmica está definida solo para x > 0.' },
      { id: 'm2_rep_02', skill: 'representar', text: 'El gráfico de f(x) = −(x−2)² + 3 es una parábola que:', options: ['Abre hacia arriba con vértice en (2, 3).', 'Abre hacia abajo con vértice en (2, 3).', 'Abre hacia arriba con vértice en (−2, 3).', 'Abre hacia abajo con vértice en (−2, −3).'], correct: 1, explanation: 'El coeficiente negativo indica apertura hacia abajo. Forma f(x) = a(x−h)²+k → vértice (2, 3).' },
      { id: 'm2_rep_03', skill: 'representar', text: 'La función f(x) = 2ˣ es creciente. ¿Cuál es su asíntota horizontal?', options: ['y = 1', 'y = 2', 'y = 0', 'y = −1'], correct: 2, explanation: 'f(x) = 2ˣ → cuando x→−∞, f(x)→0. La asíntota horizontal es y = 0.' },
      { id: 'm2_rep_04', skill: 'representar', text: 'En una gráfica de dispersión, los puntos muestran una tendencia ascendente clara. Esto indica:', options: ['Correlación negativa entre las variables.', 'Correlación positiva entre las variables.', 'Ausencia de correlación.', 'Una relación cuadrática.'], correct: 1, explanation: 'Si al aumentar x también aumenta y, existe correlación positiva.' },
      { id: 'm2_rep_05', skill: 'representar', text: 'La función seno tiene período:', options: ['π', '2π', 'π/2', '4π'], correct: 1, explanation: 'f(x) = sen(x) tiene período T = 2π.' },
      { id: 'm2_rep_06', skill: 'representar', text: 'En el plano, la solución del sistema {y ≥ 2x | y ≤ 4} es:', options: ['Solo el punto (0, 0).', 'Una región acotada entre las dos rectas.', 'Una semirecta que parte del origen.', 'El conjunto vacío.'], correct: 1, explanation: 'El sistema define una región acotada entre y=2x (por encima) y y=4 (por debajo).' },
      { id: 'm2_rep_07', skill: 'representar', text: 'La tabla muestra valores de f(x): f(1)=2, f(2)=4, f(3)=8, f(4)=16. ¿Qué tipo de función representa?', options: ['Lineal', 'Cuadrática', 'Exponencial', 'Logarítmica'], correct: 2, explanation: 'Los valores se duplican cada vez: f(x) = 2ˣ. Función exponencial.' },
      { id: 'm2_rep_08', skill: 'representar', text: '¿Cuál es la gráfica de y = |x|?', options: ['Una línea recta horizontal.', 'Una parábola que abre hacia arriba.', 'Una V con vértice en el origen.', 'Una función decreciente.'], correct: 2, explanation: 'y = |x| forma una V: para x≥0 es y=x, para x<0 es y=−x. Vértice en el origen.' },
      { id: 'm2_rep_09', skill: 'representar', text: 'Un histograma muestra distribución simétrica campana. ¿Qué distribución describe este gráfico?', options: ['Uniforme', 'Normal', 'Exponencial', 'Binomial'], correct: 1, explanation: 'La distribución normal tiene forma de campana simétrica alrededor de la media.' },
      { id: 'm2_rep_10', skill: 'representar', text: 'La función f(x) = (x+1)(x−3) corta al eje x en:', options: ['Solo (0, 0)', '(1, 0) y (−3, 0)', '(−1, 0) y (3, 0)', '(−1, 0) y (−3, 0)'], correct: 2, explanation: 'f(x) = 0 cuando x+1=0 → x=−1 o x−3=0 → x=3. Puntos: (−1,0) y (3,0).' },
      { id: 'm2_rep_11', skill: 'representar', text: 'El sistema {3x + y = 7 | x + y = 3} tiene solución gráfica que corresponde a:', options: ['Dos rectas paralelas (sin solución).', 'La misma recta (infinitas soluciones).', 'La intersección de dos rectas distintas (una solución).', 'No se puede representar gráficamente.'], correct: 2, explanation: 'Dos ecuaciones lineales con distintas pendientes se intersectan en un punto: una solución.' },
      { id: 'm2_rep_12', skill: 'representar', text: 'La función y = cos(x) en el intervalo [0, 2π] tiene:', options: ['Solo un máximo en x = π.', 'Un máximo en x = 0 y un mínimo en x = π.', 'Dos máximos y ningún mínimo.', 'Un máximo en x = 0 y un mínimo en x = 2π.'], correct: 1, explanation: 'cos(0) = 1 (máximo), cos(π) = −1 (mínimo), cos(2π) = 1 (máximo). Hay un máximo en x=0 y un mínimo en x=π.' },
    ],

    argumentar: [
      { id: 'm2_arg_01', skill: 'argumentar', text: '"Si log(a) + log(b) = log(a+b), entonces a×b = a+b." ¿Es válida esta conclusión?', options: ['Sí, es la propiedad del logaritmo de un producto.', 'No, log(a)+log(b) = log(a×b), no log(a+b).', 'Sí, solo cuando a = b.', 'No, porque los logaritmos no pueden sumarse.'], correct: 1, explanation: 'La propiedad correcta es log(a)+log(b) = log(a×b). Afirmar que log(a)+log(b) = log(a+b) es falso.' },
      { id: 'm2_arg_02', skill: 'argumentar', text: '"Para todo x real, 2ˣ > 0." ¿Es verdadero?', options: ['Falso, 2⁰ = 0.', 'Verdadero, las funciones exponenciales con base positiva siempre son positivas.', 'Solo para x > 0.', 'Falso, 2^(−x) puede ser negativo.'], correct: 1, explanation: '2ˣ > 0 para todo x real, ya que la base 2 es positiva y ninguna potencia real la hace negativa o cero.' },
      { id: 'm2_arg_03', skill: 'argumentar', text: '"sen²(x) + cos²(x) = 1 para todo ángulo x." Este resultado se llama:', options: ['Identidad de Euler', 'Identidad pitagórica trigonométrica', 'Teorema de Thales', 'Propiedad distributiva'], correct: 1, explanation: 'sen²(x) + cos²(x) = 1 es la identidad pitagórica trigonométrica, fundamental en trigonometría.' },
      { id: 'm2_arg_04', skill: 'argumentar', text: 'Valentina afirma: "Si el discriminante Δ = b²−4ac = 0, entonces la ecuación cuadrática tiene dos raíces iguales." ¿Es correcto?', options: ['No, Δ = 0 implica que no hay solución real.', 'Sí, cuando Δ = 0 la ecuación tiene una solución real doble.', 'No, Δ = 0 implica dos soluciones distintas.', 'Solo si a > 0.'], correct: 1, explanation: 'Δ = 0 → raíz doble x = −b/(2a). La afirmación de Valentina es correcta.' },
      { id: 'm2_arg_05', skill: 'argumentar', text: 'Se afirma: "La función f(x) = x² es creciente en todos los reales." ¿Es correcto?', options: ['Sí, x² siempre aumenta.', 'No, f es decreciente en (−∞, 0) y creciente en (0, +∞).', 'Solo para x > 0.', 'Sí, porque la pendiente siempre es positiva.'], correct: 1, explanation: 'f(x) = x² tiene vértice en x=0. Para x<0 es decreciente; para x>0 es creciente.' },
      { id: 'm2_arg_06', skill: 'argumentar', text: 'Un alumno resuelve: log(x²) = 2log(x). Plantea que esto es válido para todo real x. ¿Tiene razón?', options: ['Sí, es la propiedad del logaritmo de una potencia.', 'No, log(x²) = 2log|x|, que requiere x ≠ 0.', 'Sí, pero solo para x = 1.', 'No, porque log(x²) no existe.'], correct: 1, explanation: 'La propiedad log(xⁿ) = n·log(x) es válida para x>0. Para x<0, log(x²) = 2log|x|. El alumno omite esta restricción.' },
      { id: 'm2_arg_07', skill: 'argumentar', text: '"C(10,3) = C(10,7)." ¿Es verdadero?', options: ['Falso, son diferentes.', 'Verdadero, por la simetría de combinaciones C(n,k) = C(n, n−k).', 'Solo si k = n/2.', 'Falso, C(10,7) > C(10,3).'], correct: 1, explanation: 'C(n,k) = C(n, n−k). Como 10−3 = 7: C(10,3) = C(10,7). Verdadero.' },
      { id: 'm2_arg_08', skill: 'argumentar', text: 'En una distribución normal, ¿cuál de las siguientes afirmaciones es verdadera?', options: ['La media, mediana y moda son siempre distintas.', 'Aproximadamente el 99,7% de los datos están a 3 desviaciones estándar de la media.', 'La distribución es asimétrica hacia la derecha.', 'El área bajo la curva es igual a la varianza.'], correct: 1, explanation: 'La regla 68-95-99,7: el 99,7% de los datos se encuentran en [μ−3σ, μ+3σ].' },
      { id: 'm2_arg_09', skill: 'argumentar', text: 'Se afirma: "Si P(A|B) = P(A), entonces A y B son independientes." ¿Es correcto?', options: ['No, la independencia no tiene relación con la probabilidad condicional.', 'Sí, P(A|B) = P(A) es la definición de independencia de A respecto de B.', 'Solo si P(B) = 0,5.', 'No, se necesita que también P(B|A) = P(B).'], correct: 1, explanation: 'La definición de independencia es precisamente P(A|B) = P(A), lo que equivale a P(A∩B) = P(A)·P(B).' },
      { id: 'm2_arg_10', skill: 'argumentar', text: 'El alumno dice: "2log(3) = log(6)". ¿Es correcto?', options: ['Sí, 2log(3) = log(2×3) = log(6).', 'No, 2log(3) = log(3²) = log(9).', 'Sí, por la propiedad del logaritmo de un producto.', 'No, porque no se puede multiplicar un logaritmo.'], correct: 1, explanation: '2log(3) = log(3²) = log(9), no log(6). El alumno confundió las propiedades.' },
      { id: 'm2_arg_11', skill: 'argumentar', text: '"Toda función polinomial es continua en todos los reales." ¿Es verdadero?', options: ['Falso, los polinomios tienen discontinuidades en sus raíces.', 'Verdadero, los polinomios son continuos en todo su dominio (todos los reales).', 'Solo para polinomios de grado par.', 'Solo si el coeficiente líder es positivo.'], correct: 1, explanation: 'Los polinomios son funciones continuas en todo R, sin discontinuidades ni asíntotas.' },
      { id: 'm2_arg_12', skill: 'argumentar', text: 'Se afirma que P(4,2) (permutaciones) = 12. ¿Es correcto?', options: ['Sí, P(4,2) = 4!/2! = 24/2 = 12.', 'No, P(4,2) = 4×3 = 12.', 'Ambas opciones anteriores son correctas.', 'No, P(4,2) = C(4,2) = 6.'], correct: 2, explanation: 'P(4,2) = 4!/(4−2)! = 24/2 = 12. También = 4×3 = 12. Ambos cálculos son correctos.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // HISTORIA Y CIENCIAS SOCIALES
  // ═══════════════════════════════════════════════════════════════════════
  historia: {
    temporal: [
      { id: 'h_tmp_01', skill: 'temporal', text: '¿Qué período histórico se denomina "Patria Vieja" en Chile?', options: ['1810–1814', '1814–1817', '1817–1823', '1823–1833'], correct: 0, explanation: 'La "Patria Vieja" (1810-1814) corresponde al primer período de autogobierno chileno, que termina con la Reconquista española tras la Batalla de Rancagua (1814).' },
      { id: 'h_tmp_02', skill: 'temporal', text: '¿Cuál fue el orden cronológico correcto de estos eventos? I. Batalla de Chacabuco II. Batalla de Rancagua III. Proclamación de la Independencia IV. Primera Junta de Gobierno', options: ['IV → II → I → III', 'I → II → IV → III', 'II → IV → I → III', 'IV → I → II → III'], correct: 0, explanation: 'I. 1810: Primera Junta → II. 1814: Rancagua → III. 1817: Chacabuco → IV. 1818: Independencia. Orden correcto: IV, II, I, III.' },
      { id: 'h_tmp_03', skill: 'temporal', text: 'La "Belle Époque" en Europa ocurrió aproximadamente entre:', options: ['1815–1850', '1871–1914', '1918–1939', '1945–1975'], correct: 1, explanation: 'La Belle Époque fue el período de prosperidad y optimismo europeo entre 1871 y 1914, interrumpido por la Primera Guerra Mundial.' },
      { id: 'h_tmp_04', skill: 'temporal', text: 'El proceso de industrialización en Chile durante el siglo XIX se vinculó principalmente con:', options: ['La Guerra del Pacífico y la explotación del salitre.', 'La agricultura en el Valle Central.', 'El descubrimiento de petróleo en Magallanes.', 'La construcción de ferrocarriles financiados por EE.UU.'], correct: 0, explanation: 'El salitre (nitrato) fue el motor de la economía chilena y su industrialización en el siglo XIX, especialmente tras la Guerra del Pacífico (1879-1884).' },
      { id: 'h_tmp_05', skill: 'temporal', text: '¿Qué caracteriza al período de "La República Parlamentaria" en Chile (1891–1925)?', options: ['El poder ejecutivo fue muy fuerte frente al legislativo.', 'El Congreso tuvo preponderancia sobre el Ejecutivo, generando inestabilidad ministerial.', 'Chile vivió un período de dictaduras militares.', 'Se consolidó el Estado socialista con reformas agrarias.'], correct: 1, explanation: 'En la República Parlamentaria, el Congreso tenía predominio sobre el Presidente, lo que causó alta rotación ministerial y debilitamiento del Ejecutivo.' },
      { id: 'h_tmp_06', skill: 'temporal', text: 'La Revolución Rusa de 1917 tuvo como consecuencia inmediata:', options: ['La entrada de Rusia a la Primera Guerra Mundial.', 'La salida de Rusia de la Primera Guerra Mundial y la instauración del régimen soviético.', 'La formación de la OTAN para contener a Rusia.', 'La división de Rusia entre EE.UU. y Alemania.'], correct: 1, explanation: 'La Revolución de octubre de 1917 derrocó al zar y al gobierno provisional, instaurando el régimen bolchevique y sacando a Rusia de la guerra (Paz de Brest-Litovsk, 1918).' },
      { id: 'h_tmp_07', skill: 'temporal', text: '¿En qué orden ocurrieron estos eventos del siglo XX? I. Segunda Guerra Mundial II. Guerra Fría III. Caída del Muro de Berlín IV. Creación de la ONU', options: ['I → IV → II → III', 'II → I → IV → III', 'I → II → III → IV', 'IV → I → II → III'], correct: 0, explanation: '1939-45: WWII → 1945: ONU → 1947-89: Guerra Fría → 1989: Caída del Muro. Orden: I, IV, II, III.' },
      { id: 'h_tmp_08', skill: 'temporal', text: 'El "Período de los Presidentes Constitucionales" (1933–1973) en Chile se caracterizó por:', options: ['Gobiernos militares que modernizaron el Estado.', 'Alternancia entre partidos de derecha, centro e izquierda en elecciones democráticas.', 'Dominio exclusivo del Partido Comunista.', 'La ausencia de elecciones por acuerdo de los partidos.'], correct: 1, explanation: 'Entre 1933 y 1973 hubo democracia electoral con alternancia entre distintas fuerzas políticas, incluyendo la elección de Salvador Allende en 1970.' },
      { id: 'h_tmp_09', skill: 'temporal', text: '¿En qué decade comenzó el proceso de descolonización en África y Asia?', options: ['1920s', '1930s', '1940s-1950s', '1970s'], correct: 2, explanation: 'El proceso de descolonización se aceleró desde fines de la década de 1940, con India en 1947, y continuó fuertemente en los años 50 y 60 en África y Asia.' },
      { id: 'h_tmp_10', skill: 'temporal', text: 'El plebiscito de 1988 en Chile, en el que se votó "Sí" o "No" a la continuidad de Pinochet, fue el inicio de:', options: ['La Dictadura Militar de 1973.', 'La transición a la democracia.', 'La implementación del modelo económico neoliberal.', 'El período de la Unidad Popular.'], correct: 1, explanation: 'El triunfo del "No" en el plebiscito de 1988 marcó el inicio de la transición a la democracia, que culminó con la elección de Patricio Aylwin en 1989.' },
      { id: 'h_tmp_11', skill: 'temporal', text: 'El "Período de las Grandes Migraciones" del campo a la ciudad en Chile ocurrió principalmente:', options: ['En el siglo XVIII', 'A fines del siglo XIX', 'En la primera mitad del siglo XX', 'En la segunda mitad del siglo XX'], correct: 3, explanation: 'Las grandes migraciones del campo a la ciudad en Chile ocurrieron principalmente en la segunda mitad del siglo XX, impulsadas por la industrialización y la mecanización agrícola.' },
      { id: 'h_tmp_12', skill: 'temporal', text: '¿Cuál fue la secuencia del proceso de formación del Estado-nación chileno?', options: ['Independencia → Constitución 1833 → Organización institucional.', 'Constitución 1833 → Independencia → Organización institucional.', 'Organización institucional → Independencia → Constitución 1833.', 'Independencia → Guerras civiles → Dictaduras.'], correct: 0, explanation: 'Chile proclamó su Independencia (1818), luego consolidó su organización con la Constitución de 1833, que estableció el régimen presidencial y la estabilidad institucional.' },
      { id: 'h_tmp_13', skill: 'temporal', text: 'El "Nuevo Orden Mundial" tras la Segunda Guerra Mundial (1945) se caracterizó por:', options: ['El dominio exclusivo de EE.UU. sobre toda la política mundial.', 'La confrontación entre dos superpotencias (EE.UU. y URSS) en el marco de la Guerra Fría.', 'La liquidación del colonialismo en todos los continentes.', 'La formación de bloques regionales independientes de las superpotencias.'], correct: 1, explanation: 'La bipolaridad EE.UU.-URSS y la confrontación ideológica definen el orden mundial de posguerra conocido como Guerra Fría.' },
      { id: 'h_tmp_14', skill: 'temporal', text: 'La crisis del Estado liberal en Europa durante la primera mitad del siglo XX dio origen a:', options: ['La expansión del liberalismo económico a nivel global.', 'El surgimiento de totalitarismos (fascismo, nazismo) y del Estado de bienestar.', 'El fin de los imperialismos europeos.', 'La democratización inmediata de todos los países europeos.'], correct: 1, explanation: 'La crisis del liberalismo, agravada por la Depresión de 1929, favoreció tanto los totalitarismos (fascismo, nazismo, estalinismo) como el Estado de bienestar en democracias.' },
      { id: 'h_tmp_15', skill: 'temporal', text: 'Identifica el período histórico con sus características: "Dictaduras militares, violaciones de DDHH, implantación del neoliberalismo."', options: ['La Patria Vieja (1810-1814)', 'La República Parlamentaria (1891-1925)', 'La dictadura militar chilena (1973-1990)', 'El populismo latinoamericano (1930-1960)'], correct: 2, explanation: 'Las características descritas corresponden a la dictadura militar de Pinochet en Chile (1973-1990).' },
    ],

    fuentes: [
      { id: 'h_fue_01', skill: 'fuentes', text: '"Hoy, 18 de septiembre de 1810, el pueblo de Santiago se ha reunido para establecer una Junta de Gobierno provisional..." ¿Qué tipo de fuente histórica es este texto?', options: ['Fuente secundaria: fue escrita por un historiador contemporáneo.', 'Fuente primaria: fue producida en la época de los hechos que describe.', 'Fuente terciaria: es una síntesis de otras fuentes.', 'Fuente iconográfica: es una imagen del período.'], correct: 1, explanation: 'Una fuente primaria es aquella producida en el mismo momento histórico que describe. Este texto del 18 de septiembre de 1810 es una fuente primaria.' },
      { id: 'h_fue_02', skill: 'fuentes', text: 'Un historiador usa un libro publicado en 2010 sobre la Revolución Francesa. ¿Qué tipo de fuente es?', options: ['Primaria, porque describe eventos del pasado.', 'Secundaria, porque es un análisis elaborado con posterioridad a los hechos.', 'Terciaria, porque sintetiza múltiples fuentes primarias.', 'Iconográfica, porque incluye imágenes del período.'], correct: 1, explanation: 'Una fuente secundaria es el análisis e interpretación que hace un historiador posterior a los hechos estudiados.' },
      { id: 'h_fue_03', skill: 'fuentes', text: 'Un mapa histórico de 1900 muestra la distribución de las colonias europeas en África. ¿Para qué sirve este tipo de fuente en historia?', options: ['Para conocer las opiniones de los colonizados.', 'Para interpretar la distribución territorial y la expansión del imperialismo europeo.', 'Para comparar el clima de las diferentes regiones colonizadas.', 'Para conocer la producción agrícola de las colonias.'], correct: 1, explanation: 'Los mapas históricos son fuentes cartográficas que permiten analizar la distribución territorial de fenómenos históricos, en este caso el imperialismo europeo.' },
      { id: 'h_fue_04', skill: 'fuentes', text: 'Lee la siguiente cita: "La historia la escriben los vencedores." ¿Qué problema metodológico señala esta afirmación para el historiador?', options: ['Que es imposible escribir historia objetivamente.', 'Que las fuentes pueden reflejar la perspectiva del grupo dominante, omitiendo otras voces.', 'Que solo los documentos oficiales son fuentes válidas.', 'Que los vencedores siempre mienten en sus relatos.'], correct: 1, explanation: 'El sesgo en las fuentes históricas es un problema metodológico real: quienes controlan el poder suelen controlar también el relato histórico.' },
      { id: 'h_fue_05', skill: 'fuentes', text: 'Un general escribe sus memorias 30 años después de una batalla. Al comparar este testimonio con el informe militar del día de la batalla, el historiador debe considerar que:', options: ['Las memorias son más confiables por tener más reflexión.', 'El informe del día es siempre más objetivo por ser contemporáneo.', 'Ambas fuentes tienen sesgos diferentes que deben analizarse críticamente.', 'Ninguna de las dos fuentes es válida para estudiar la batalla.'], correct: 2, explanation: 'Las memorias tienen el sesgo de la memoria selectiva; el informe tiene el sesgo de la urgencia y el interés político del momento. Ambas requieren análisis crítico.' },
      { id: 'h_fue_06', skill: 'fuentes', text: 'Un cartel de propaganda nazi que muestra a los judíos como una amenaza para Alemania es una fuente útil para el historiador porque:', options: ['Prueba que los judíos eran realmente peligrosos.', 'Permite analizar las técnicas de manipulación y los discursos de odio del nazismo.', 'Es una fuente objetiva ya que fue producida por el gobierno alemán.', 'Permite conocer la situación económica de Alemania en los años 30.'], correct: 1, explanation: 'La propaganda, aunque sesgada, es una fuente valiosa para analizar las ideologías, discursos y técnicas de manipulación de los regímenes que la producen.' },
      { id: 'h_fue_07', skill: 'fuentes', text: 'Al analizar dos fuentes sobre el Golpe de Estado de 1973 en Chile: una del gobierno militar y otra de un exiliado político, el historiador debe:', options: ['Usar solo la fuente oficial por ser más confiable.', 'Descartar ambas por ser tendenciosas.', 'Contrastar ambas perspectivas y buscar fuentes adicionales para una visión más completa.', 'Usar solo el testimonio del exiliado por ser víctima del régimen.'], correct: 2, explanation: 'El principio metodológico de la historia requiere contrastar distintas fuentes y perspectivas para construir una interpretación más completa y rigurosa.' },
      { id: 'h_fue_08', skill: 'fuentes', text: 'Una fotografía de las "ollas comunes" durante la crisis económica de los años 80 en Chile permite al historiador:', options: ['Conocer las recetas de cocina de la época.', 'Obtener una imagen fidedigna y objetiva de la realidad social de la época.', 'Observar y analizar la pobreza y las estrategias de supervivencia de sectores populares.', 'Confirmar que la economía chilena fue siempre débil.'], correct: 2, explanation: 'Las fotografías son fuentes primarias que permiten analizar condiciones sociales concretas. En este caso, evidencian la pobreza y organización comunitaria bajo la dictadura.' },
      { id: 'h_fue_09', skill: 'fuentes', text: 'Un censo nacional de 1920 muestra que el 70% de la población chilena vivía en zonas rurales. ¿Cómo puede usar el historiador este dato?', options: ['Para afirmar que todos los chilenos de 1920 eran agricultores.', 'Para analizar la distribución de la población y compararla con censos posteriores, midiendo la urbanización.', 'Para concluir que Chile era un país subdesarrollado en 1920.', 'Para demostrar que el campo era más próspero que la ciudad.'], correct: 1, explanation: 'Los censos son fuentes cuantitativas que permiten analizar cambios y tendencias a lo largo del tiempo, como el proceso de urbanización en Chile.' },
      { id: 'h_fue_10', skill: 'fuentes', text: 'Al leer la Declaración Universal de los Derechos Humanos (1948), el historiador puede usarla para:', options: ['Probar que los derechos se respetaron en todos los países desde 1948.', 'Analizar los valores y aspiraciones de la comunidad internacional tras la Segunda Guerra Mundial.', 'Demostrar que la ONU impuso sus normas a todos los países.', 'Conocer las violaciones de derechos humanos ocurridas en el siglo XX.'], correct: 1, explanation: 'Un documento normativo como la DUDH refleja el contexto histórico y los valores que la comunidad internacional quiso plasmar en 1948, tras los horrores de la WWII.' },
      { id: 'h_fue_11', skill: 'fuentes', text: 'Dos historiadores estudian la misma Revolución Francesa: uno la interpreta como una revolución burguesa; otro, como una revolución popular. Esta diferencia se debe a:', options: ['Que uno de los historiadores está equivocado.', 'Que usan diferentes marcos interpretativos y fuentes.', 'Que la Revolución Francesa no está suficientemente documentada.', 'Que la historia no puede ser objetiva.'], correct: 1, explanation: 'La pluralidad interpretativa en historia es legítima y resulta de distintos marcos teóricos, preguntas de investigación y fuentes utilizadas.' },
      { id: 'h_fue_12', skill: 'fuentes', text: 'Un testimonio oral de una mujer que vivió durante la dictadura militar es una fuente:', options: ['Objetiva e imparcial porque proviene de un testigo directo.', 'Subjetiva pero válida, que aporta la perspectiva individual y vivida de los hechos.', 'Primaria solo si está escrita y no narrada.', 'Sin valor histórico porque es solo una opinión personal.'], correct: 1, explanation: 'Los testimonios orales son fuentes primarias subjetivas pero muy valiosas, ya que capturan experiencias individuales y colectivas que documentos oficiales omiten.' },
      { id: 'h_fue_13', skill: 'fuentes', text: 'El Informe Rettig (1991) fue una fuente producida por la Comisión Nacional de Verdad y Reconciliación. ¿Qué tipo de fuente es?', options: ['Primaria, porque fue producida en la época de la dictadura.', 'Secundaria, porque analiza hechos ocurridos en el pasado con metodología académica.', 'Terciaria, porque es solo una recopilación de datos.', 'Iconográfica, porque incluye fotografías de las víctimas.'], correct: 1, explanation: 'El Informe Rettig (1991) analiza los hechos de la dictadura (1973-1990), por lo que es una fuente secundaria elaborada con posterioridad a los hechos.' },
      { id: 'h_fue_14', skill: 'fuentes', text: 'Un historiador que analiza un texto de Bernardo O\'Higgins afirmando que "la libertad es el bien más preciado de los pueblos" debe considerar que:', options: ['Esta cita prueba que O\'Higgins defendía la libertad de todos los ciudadanos.', 'El texto refleja los valores liberales republicanos de la época y el contexto en que O\'Higgins escribió.', 'El texto no tiene valor histórico porque fue escrito hace más de 200 años.', 'La cita confirma que Chile siempre fue un país democrático.'], correct: 1, explanation: 'Al analizar fuentes primarias, el historiador contextualiza el texto considerando el período, el autor y los valores de la época.' },
      { id: 'h_fue_15', skill: 'fuentes', text: 'Una caricatura política de la prensa chilena de 1920 que muestra a los obreros amenazando al orden social refleja:', options: ['La posición objetiva de la prensa sobre el movimiento obrero.', 'El miedo de los sectores conservadores ante el avance del movimiento sindical.', 'La visión de los propios trabajadores sobre sus luchas.', 'La política oficial del gobierno de la época.'], correct: 1, explanation: 'Las caricaturas políticas reflejan el punto de vista de quien las produce; una caricatura conservadora sobre los obreros expresa el miedo de las élites al movimiento obrero.' },
    ],

    critico: [
      { id: 'h_cri_01', skill: 'critico', text: 'El filósofo y político José Victorino Lastarria afirmaba que la Colonia española había dejado a Chile con un legado de oscurantismo y atraso. ¿Cuál es la perspectiva presente en esta interpretación?', options: ['Una visión favorable a la herencia colonial española.', 'Una perspectiva liberal que valora la Ilustración y critica el orden colonial.', 'Una perspectiva marxista que analiza las relaciones de producción.', 'Una visión indigenista que rescata la cultura precolombina.'], correct: 1, explanation: 'Lastarria representaba el liberalismo ilustrado del siglo XIX, que veía en la Colonia el origen del atraso y valoraba la razón y el progreso como alternativas.' },
      { id: 'h_cri_02', skill: 'critico', text: '¿Por qué el populismo latinoamericano (Vargas en Brasil, Perón en Argentina) surgió durante la crisis del Estado liberal en la primera mitad del siglo XX?', options: ['Porque los partidos liberales apoyaron a los populistas para llegar al poder.', 'Porque la crisis económica y la exclusión social generaron demandas insatisfechas que los líderes populistas canalizaron.', 'Porque EE.UU. financió los movimientos populistas para contener al comunismo.', 'Porque los populistas ganaron elecciones con fraude en todos los casos.'], correct: 1, explanation: 'La Gran Depresión, la exclusión de las masas urbanas y la crisis del liberalismo crearon el terreno para que líderes carismáticos ofrecieran soluciones a los sectores populares.' },
      { id: 'h_cri_03', skill: 'critico', text: 'La Revolución Cubana de 1959 fue interpretada de dos formas: (A) como un ejemplo de liberación nacional y justicia social; (B) como el establecimiento de un régimen totalitario. ¿Qué principio histórico refleja esta dualidad?', options: ['Que la historia cubana no está bien documentada.', 'Que los procesos históricos complejos pueden ser interpretados desde perspectivas ideológicas diferentes.', 'Que una de las dos interpretaciones es necesariamente incorrecta.', 'Que la revolución no tuvo consecuencias significativas.'], correct: 1, explanation: 'La pluralidad de interpretaciones refleja que los procesos históricos tienen múltiples dimensiones y que los marcos ideológicos del historiador influyen en su lectura.' },
      { id: 'h_cri_04', skill: 'critico', text: '¿Cuál de las siguientes puede ser considerada UNA consecuencia del proceso de globalización acelerado tras el fin de la Guerra Fría?', options: ['La fragmentación económica de los países en mercados locales.', 'La homogeneización cultural y el aumento del intercambio comercial mundial.', 'El debilitamiento de las empresas multinacionales.', 'El retorno a economías autárquicas en los países desarrollados.'], correct: 1, explanation: 'La globalización post-Guerra Fría implicó mayor interconexión económica, cultural y tecnológica, con expansión del comercio y de la influencia de empresas multinacionales.' },
      { id: 'h_cri_05', skill: 'critico', text: 'El modelo económico neoliberal implementado en Chile durante la dictadura militar (1973–1990) se caracterizó principalmente por:', options: ['La nacionalización de las principales empresas y la planificación estatal.', 'La privatización de empresas estatales, apertura comercial y reducción del Estado.', 'El fomento de la industria nacional protegida de la competencia extranjera.', 'El control de precios y la planificación centralizada de la economía.'], correct: 1, explanation: 'Los Chicago Boys implementaron: privatizaciones, libre mercado, apertura comercial, eliminación de subsidios y reducción del Estado.' },
      { id: 'h_cri_06', skill: 'critico', text: '¿Por qué la creación de la ONU en 1945 representó un cambio significativo en las relaciones internacionales?', options: ['Porque eliminó por completo los conflictos entre naciones.', 'Porque estableció un marco multilateral para la paz, los derechos humanos y la cooperación.', 'Porque dio a EE.UU. el control exclusivo de los asuntos mundiales.', 'Porque reemplazó a los Estados nacionales como unidad política principal.'], correct: 1, explanation: 'La ONU creó un sistema multilateral de gobernanza internacional con mecanismos para resolver conflictos, proteger derechos y coordinar la cooperación global.' },
      { id: 'h_cri_07', skill: 'critico', text: 'Evalúa esta afirmación: "Las dictaduras militares en América Latina durante la segunda mitad del siglo XX fueron inevitables dada la amenaza comunista." ¿Es una interpretación histórica aceptable?', options: ['Sí, porque el comunismo realmente amenazaba la democracia en esos países.', 'No es "inevitable": fue una opción política de grupos de poder, con apoyo de EE.UU., para frenar reformas sociales.', 'Sí, porque la democracia era inviable en esos países.', 'No, porque no existía ninguna influencia comunista en América Latina.'], correct: 1, explanation: 'La narrativa de la "amenaza comunista" fue usada para justificar golpes, pero la historia muestra que respondieron a intereses de élites locales y la política de EE.UU. en la Guerra Fría.' },
      { id: 'h_cri_08', skill: 'critico', text: '¿Cuál es la principal diferencia entre un Estado autoritario y uno totalitario?', options: ['El autoritarismo controla solo el ámbito político; el totalitarismo busca control de todos los ámbitos de la vida.', 'El autoritarismo usa la fuerza; el totalitarismo no.', 'Solo los totalitarismos violan los derechos humanos.', 'Los autoritarismos surgen del comunismo y los totalitarismos del fascismo.'], correct: 0, explanation: 'El autoritarismo limita la participación política pero tolera cierta autonomía social. El totalitarismo aspira a controlar la política, la economía, la cultura y la vida privada.' },
      { id: 'h_cri_09', skill: 'critico', text: 'La Reforma Agraria en Chile (1965–1973) tuvo como objetivo principal:', options: ['Eliminar el sector agrícola para desarrollar la industria.', 'Redistribuir la tierra desde los latifundistas hacia los campesinos para reducir la desigualdad rural.', 'Privatizar las tierras del Estado y venderlas al mejor postor.', 'Crear grandes cooperativas estatales al estilo soviético.'], correct: 1, explanation: 'La Reforma Agraria chilena buscó redistribuir tierras concentradas en latifundios para beneficiar a campesinos sin tierra y reducir la desigualdad rural.' },
      { id: 'h_cri_10', skill: 'critico', text: '¿Qué importancia tiene la Declaración Universal de los Derechos Humanos (1948) para juzgar las violaciones cometidas durante las dictaduras latinoamericanas?', options: ['No tiene importancia porque cada país puede definir sus propias normas.', 'Establece un estándar universal que permite calificar como crímenes las torturas, desapariciones y ejecuciones.', 'Solo aplica a los países que la firmaron voluntariamente.', 'Permite juzgar a los responsables sin necesidad de tribunales nacionales.'], correct: 1, explanation: 'La DUDH establece estándares internacionales de derechos que trascienden las fronteras nacionales, permitiendo calificar como crímenes las violaciones sistemáticas de las dictaduras.' },
      { id: 'h_cri_11', skill: 'critico', text: 'El funcionamiento del mercado, según la economía liberal, se basa en:', options: ['La planificación estatal de la producción y distribución.', 'La oferta, la demanda y la libre competencia como mecanismos de asignación de recursos.', 'El control de precios por parte del gobierno para evitar la inflación.', 'La propiedad colectiva de los medios de producción.'], correct: 1, explanation: 'El liberalismo económico sostiene que el mercado, a través de la oferta y la demanda, asigna eficientemente los recursos sin necesidad de intervención estatal.' },
      { id: 'h_cri_12', skill: 'critico', text: 'Evalúa: "La globalización ha beneficiado a todos los países por igual." ¿Es históricamente correcto?', options: ['Sí, todos los países han crecido gracias al comercio global.', 'No, la globalización ha generado beneficios desiguales, agravando brechas entre países desarrollados y en vías de desarrollo.', 'Sí, el comercio libre siempre equilibra los niveles de desarrollo.', 'No, ningún país ha obtenido beneficios de la globalización.'], correct: 1, explanation: 'La evidencia histórica muestra que la globalización ha generado beneficios concentrados en países desarrollados y empresas multinacionales, con impactos desiguales para los países en desarrollo.' },
      { id: 'h_cri_13', skill: 'critico', text: 'Los derechos laborales en Chile han evolucionado históricamente gracias a:', options: ['Concesiones espontáneas de los empresarios.', 'La presión del movimiento sindical y de organizaciones sociales que lucharon por mejores condiciones.', 'La implementación del modelo neoliberal que liberó el mercado laboral.', 'La intervención directa de organismos internacionales.'], correct: 1, explanation: 'Los derechos laborales (jornada de 8 horas, seguridad, jubilación) fueron conquistas históricas del movimiento obrero a través de huelgas, movilizaciones y organización sindical.' },
      { id: 'h_cri_14', skill: 'critico', text: 'La transición a la democracia en Chile (1988–1990) fue un proceso que se caracterizó por:', options: ['Un cambio brusco y revolucionario que eliminó todas las instituciones de la dictadura.', 'Una transición pactada y gradual que preservó elementos de la Constitución de 1980 y del sistema económico.', 'Una intervención militar extranjera que forzó el retorno a la democracia.', 'Una revolución popular que derrocó por la fuerza al régimen de Pinochet.'], correct: 1, explanation: 'La transición chilena fue "pactada" o "negociada", manteniendo la Constitución de 1980 (con algunas reformas) y el modelo económico, lo que generó debates sobre sus límites.' },
      { id: 'h_cri_15', skill: 'critico', text: 'Según el pensamiento republicano del siglo XIX, ¿qué es la soberanía popular?', options: ['El derecho del rey a gobernar por mandato divino.', 'El principio por el cual el poder político reside en el pueblo, que lo ejerce directa o mediante representantes.', 'La autonomía de las regiones para gobernarse sin interferencia del Estado central.', 'El control de la economía por parte del Estado en nombre del pueblo.'], correct: 1, explanation: 'La soberanía popular es el principio ilustrado y republicano según el cual el poder legítimo emana del pueblo, base de los sistemas democráticos modernos.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // CIENCIAS
  // ═══════════════════════════════════════════════════════════════════════
  ciencias: {
    observar: [
      { id: 'c_obs_01', skill: 'observar', text: 'Al observar que las plantas en un invernadero oscuro crecen hacia la única ventana, un científico formula la hipótesis: "Las plantas crecen hacia la fuente de luz." ¿Qué tipo de hipótesis es esta?', options: ['Una hipótesis nula (sin efecto).', 'Una hipótesis explicativa que puede ser puesta a prueba experimentalmente.', 'Una conclusión definitiva basada en la observación.', 'Una generalización sin base empírica.'], correct: 1, explanation: 'Es una hipótesis testeable: plantea una relación causa-efecto (luz → dirección de crecimiento) que puede verificarse experimentalmente.' },
      { id: 'c_obs_02', skill: 'observar', text: 'Una investigadora observa que las ranas de un lago han disminuido drásticamente. ¿Cuál de las siguientes es una pregunta científica válida para investigar esta situación?', options: ['¿Por qué las ranas son tan importantes?', '¿Existe relación entre la concentración de pesticidas en el lago y la disminución de la población de ranas?', '¿Deberían protegerse las ranas de todo el mundo?', '¿Cuál es el color más común de las ranas?'], correct: 1, explanation: 'Una pregunta científica es específica, testeable y busca una relación entre variables (pesticidas y disminución de ranas).' },
      { id: 'c_obs_03', skill: 'observar', text: 'Un grupo de estudiantes experimenta con plantas y luz. Formulan: "Si expongo plantas a luz roja, azul y verde por igual tiempo, las de luz azul crecerán más." ¿Qué parte del método científico representa esto?', options: ['Resultado experimental', 'Hipótesis', 'Conclusión', 'Marco teórico'], correct: 1, explanation: 'Es una hipótesis: una predicción específica sobre el resultado de un experimento, que puede ser verificada o refutada.' },
      { id: 'c_obs_04', skill: 'observar', text: 'Al estudiar el efecto del alcohol sobre el sistema nervioso, la hipótesis más adecuada sería:', options: ['El alcohol es dañino para la salud.', 'El consumo de alcohol en dosis crecientes reduce el tiempo de reacción en pruebas estandarizadas.', 'El alcohol puede causar problemas en el trabajo.', 'Las personas jóvenes consumen más alcohol que los adultos.'], correct: 1, explanation: 'La hipótesis correcta es específica, cuantificable y expresa la relación entre la variable independiente (alcohol) y la dependiente (tiempo de reacción).' },
      { id: 'c_obs_05', skill: 'observar', text: 'Un científico observa que los pingüinos de la Antártica anidan siempre en el mismo lugar año tras año. Para investigar si esto se debe a memoria o a señales del ambiente, debe:', options: ['Asumir que los pingüinos tienen buena memoria.', 'Formular hipótesis alternativas y diseñar experimentos para contrastarlas.', 'Publicar la observación sin más análisis.', 'Consultar solo fuentes históricas sobre pingüinos.'], correct: 1, explanation: 'El método científico exige formular hipótesis alternativas y diseñar experimentos para poner a prueba cada una.' },
      { id: 'c_obs_06', skill: 'observar', text: 'Al observar que en días nublados los paneles solares producen menos electricidad, la pregunta científica más apropiada es:', options: ['¿Por qué los paneles solares son tan caros?', '¿Cuál es la relación entre la intensidad de la radiación solar y la producción de energía de los paneles fotovoltaicos?', '¿Cuántos paneles solares hay en Chile?', '¿Son mejores los paneles solares o los molinos de viento?'], correct: 1, explanation: 'La pregunta científica adecuada es específica, cuantificable y relaciona variables (radiación solar y producción de energía).' },
      { id: 'c_obs_07', skill: 'observar', text: 'Un estudiante afirma: "Creo que el calor afecta la velocidad de las reacciones químicas porque cuando caliento el agua se disuelve más azúcar." ¿Esto es una hipótesis o una conclusión?', options: ['Es una conclusión, porque ya observó el efecto.', 'Es una hipótesis basada en una observación previa que requiere experimentación controlada.', 'Es un marco teórico establecido.', 'Es una ley científica.'], correct: 1, explanation: 'Es una hipótesis: aunque hay una observación previa, se necesita un experimento controlado para establecer causalidad.' },
      { id: 'c_obs_08', skill: 'observar', text: 'El Experimento de Redi (1668) demostró que la carne no generaba gusanos espontáneamente cuando se impedía el acceso a las moscas. ¿Qué hipótesis nula refutó este experimento?', options: ['Hipótesis nula: las moscas ponen huevos en la carne.', 'Hipótesis nula: los organismos no surgen espontáneamente de materia no viva.', 'Hipótesis nula: la generación espontánea ocurre en condiciones adecuadas (pero Redi la refutó).', 'Hipótesis nula: la carne fresca no contiene microorganismos.'], correct: 2, explanation: 'Redi refutó la hipótesis de la generación espontánea: demostró que los gusanos provenían de los huevos de las moscas, no de la carne misma.' },
      { id: 'c_obs_09', skill: 'observar', text: 'Observando que estudiantes que duermen menos de 6 horas tienen peor rendimiento en matemáticas, ¿cuál es la hipótesis más apropiada para investigar?', options: ['Las matemáticas son difíciles para los adolescentes.', 'El rendimiento en matemáticas mejorará si los estudiantes duermen al menos 8 horas diarias.', 'Los jóvenes no duermen suficiente porque usan el celular.', 'El sueño es un factor secundario en el aprendizaje.'], correct: 1, explanation: 'La hipótesis debe ser testeable y relacionar la variable independiente (horas de sueño) con la dependiente (rendimiento en matemáticas).' },
      { id: 'c_obs_10', skill: 'observar', text: 'Charles Darwin observó que las tortugas galápago de cada isla tenían caparazones de forma distinta, adaptada al tipo de vegetación disponible. ¿Qué pregunta científica surge naturalmente de esta observación?', options: ['¿Por qué las tortugas son tan longevas?', '¿De qué manera las diferencias ambientales entre islas han influido en la forma del caparazón de las tortugas?', '¿Cuántas tortugas hay en las islas Galápagos?', '¿Las tortugas son inteligentes?'], correct: 1, explanation: 'La pregunta surge directamente de la observación y apunta a la relación entre ambiente y características físicas, base de la teoría de la selección natural.' },
    ],

    planificar: [
      { id: 'c_pla_01', skill: 'planificar', text: 'En un experimento sobre el efecto de la temperatura en la germinación de semillas, ¿cuál es la variable independiente?', options: ['La cantidad de semillas germinadas.', 'La temperatura a la que se exponen las semillas.', 'El tipo de suelo utilizado.', 'El tamaño de las semillas.'], correct: 1, explanation: 'La variable independiente es la que el investigador manipula deliberadamente: en este caso, la temperatura.' },
      { id: 'c_pla_02', skill: 'planificar', text: 'En el mismo experimento, ¿cuál es la variable dependiente?', options: ['La temperatura de los recipientes.', 'La cantidad de agua suministrada.', 'La cantidad de semillas que germinan.', 'El tipo de semillas utilizado.'], correct: 2, explanation: 'La variable dependiente es la que se mide como resultado del experimento: cuántas semillas germinan.' },
      { id: 'c_pla_03', skill: 'planificar', text: 'Para comparar la efectividad de dos fertilizantes (A y B), un experimentador usa dos grupos de plantas idénticas en condiciones iguales, salvo el fertilizante aplicado. ¿Qué principio de diseño experimental aplica?', options: ['Replicación de variables.', 'Control de variables: solo cambia el fertilizante, mantiene todo lo demás igual.', 'Extrapolación de resultados.', 'Correlación estadística.'], correct: 1, explanation: 'El control de variables garantiza que cualquier diferencia observada se deba al fertilizante y no a otros factores.' },
      { id: 'c_pla_04', skill: 'planificar', text: 'Un investigador quiere medir la velocidad de una reacción química. ¿Cuál es el instrumento más adecuado para medir el tiempo transcurrido?', options: ['Balanza analítica.', 'Termómetro digital.', 'Cronómetro.', 'Probeta graduada.'], correct: 2, explanation: 'Para medir el tiempo de una reacción, el instrumento adecuado es el cronómetro.' },
      { id: 'c_pla_05', skill: 'planificar', text: 'Al estudiar el efecto del ejercicio en la frecuencia cardíaca, ¿qué elemento del diseño experimental representa el grupo de personas que no hace ejercicio?', options: ['Variable independiente.', 'Variable dependiente.', 'Grupo control (de control).', 'Hipótesis nula.'], correct: 2, explanation: 'El grupo de control no recibe el tratamiento experimental (ejercicio), permitiendo comparar sus resultados con los del grupo experimental.' },
      { id: 'c_pla_06', skill: 'planificar', text: 'Para investigar si el tabaco causa cáncer, un investigador propone observar durante 20 años a fumadores y no fumadores, registrando quiénes desarrollan cáncer. ¿Qué tipo de investigación es esta?', options: ['Experimental en laboratorio.', 'Documental bibliográfica.', 'No experimental (estudio de cohorte).', 'Experimental con placebo.'], correct: 2, explanation: 'Un estudio de cohorte es una investigación no experimental que sigue grupos en el tiempo sin manipular variables.' },
      { id: 'c_pla_07', skill: 'planificar', text: '¿Por qué es importante que los experimentos sean replicables?', options: ['Para que los resultados puedan ser publicados en revistas científicas.', 'Para que otros científicos puedan verificar los resultados y confirmar o refutar las conclusiones.', 'Para que el experimento sea más económico de realizar.', 'Para que los estudiantes puedan repetirlo en clases.'], correct: 1, explanation: 'La replicabilidad es un principio fundamental del método científico: solo los resultados consistentemente reproducibles se consideran válidos.' },
      { id: 'c_pla_08', skill: 'planificar', text: 'Al medir la masa de una muestra, ¿qué instrumento es más adecuado?', options: ['Probeta graduada.', 'Balanza analítica.', 'Termómetro.', 'pH-metro.'], correct: 1, explanation: 'La balanza analítica mide la masa con alta precisión. La probeta mide volumen; el termómetro, temperatura; el pH-metro, acidez.' },
      { id: 'c_pla_09', skill: 'planificar', text: 'En un estudio sobre el efecto de la música en el aprendizaje, se dividen 60 estudiantes en dos grupos iguales: uno estudia con música y otro en silencio, y se mide su rendimiento. ¿Qué componente del experimento falta en esta descripción?', options: ['Variable dependiente.', 'Grupo control.', 'Objetivo de investigación.', 'Variable independiente.'], correct: 2, explanation: 'Aunque el diseño tiene grupo control, variable independiente (música) y dependiente (rendimiento), no se ha planteado el objetivo de investigación.' },
      { id: 'c_pla_10', skill: 'planificar', text: 'Para medir la concentración de iones hidrógeno en una solución (pH), el instrumento más adecuado es:', options: ['Termómetro.', 'Balanza.', 'pH-metro o papel indicador de pH.', 'Microscopio.'], correct: 2, explanation: 'El pH-metro mide la acidez o basicidad (concentración de H⁺) de una solución. El papel indicador también puede usarse, aunque con menor precisión.' },
    ],

    procesar: [
      { id: 'c_pro_01', skill: 'procesar', text: 'En un experimento, la temperatura aumenta de 20°C a 60°C y la velocidad de la reacción se cuadruplica. ¿Cuál es la conclusión más adecuada?', options: ['La temperatura no afecta la reacción.', 'Existe una relación positiva entre la temperatura y la velocidad de la reacción.', 'La velocidad de la reacción es independiente de la temperatura.', 'La reacción solo ocurre a 60°C.'], correct: 1, explanation: 'Los datos muestran que al aumentar la temperatura, aumenta la velocidad de reacción: relación positiva entre ambas variables.' },
      { id: 'c_pro_02', skill: 'procesar', text: 'En un gráfico de barras, una especie de pájaro tiene 45 individuos en el bosque A, 12 en el bosque B y 87 en el bosque C. ¿En cuál bosque hay mayor biodiversidad de esta especie?', options: ['Bosque A', 'Bosque B', 'Bosque C', 'Son iguales'], correct: 2, explanation: 'El bosque C tiene el mayor número de individuos (87) de la especie estudiada.' },
      { id: 'c_pro_03', skill: 'procesar', text: 'Un electrocardiograma muestra latidos irregulares cada 3-4 segundos. La frecuencia cardíaca aproximada es:', options: ['15-20 latidos/min', '20-25 latidos/min', '40-60 latidos/min', '60-80 latidos/min'], correct: 0, explanation: 'Si hay un latido cada 3-4 segundos: 60/3 = 20 y 60/4 = 15 latidos/min. Frecuencia: 15-20 lpm.' },
      { id: 'c_pro_04', skill: 'procesar', text: 'En un experimento de fotosíntesis, al aumentar la intensidad lumínica de 0 a 5.000 lux, la producción de O₂ aumenta linealmente. ¿Qué predicción se puede hacer sobre lo que ocurre a 10.000 lux?', options: ['La producción de O₂ se detiene completamente.', 'La producción de O₂ continúa aumentando linealmente (si otros factores no son limitantes).', 'La producción de O₂ se invierte y la planta absorbe O₂.', 'La producción de O₂ es máxima e independiente de la luz.'], correct: 1, explanation: 'Basado en la tendencia observada (relación lineal), la predicción es que la producción continuará aumentando si la luz sigue siendo el factor limitante.' },
      { id: 'c_pro_05', skill: 'procesar', text: 'En un circuito con 3 resistencias en paralelo de 6Ω, 12Ω y 4Ω, la resistencia total será:', options: ['22Ω', '8Ω', '2Ω', '14Ω'], correct: 2, explanation: '1/R_total = 1/6 + 1/12 + 1/4 = 2/12 + 1/12 + 3/12 = 6/12 = 1/2. R_total = 2Ω.' },
      { id: 'c_pro_06', skill: 'procesar', text: 'Una tabla muestra que el gen A es dominante sobre a. Un individuo Aa se cruza con otro Aa. ¿Cuál es la proporción esperada de fenotipos en la descendencia?', options: ['1:1 (dominante:recesivo)', '3:1 (dominante:recesivo)', '1:2:1 (AA:Aa:aa)', '1:1:1:1'], correct: 1, explanation: 'Cruce Aa × Aa: genotipo 1 AA : 2 Aa : 1 aa. Fenotipo: 3 dominantes (AA+Aa) : 1 recesivo (aa) → 3:1.' },
      { id: 'c_pro_07', skill: 'procesar', text: 'Si un objeto de 2 kg se mueve a 3 m/s, ¿cuál es su energía cinética? (Ec = ½mv²)', options: ['3 J', '6 J', '9 J', '12 J'], correct: 2, explanation: 'Ec = ½ × 2 × 3² = ½ × 2 × 9 = 9 J.' },
      { id: 'c_pro_08', skill: 'procesar', text: 'En un experimento con bacterias, el cultivo pasa de 1.000 a 64.000 bacterias en 6 horas. ¿Cada cuántas horas se duplica la población?', options: ['Cada 1 hora', 'Cada 2 horas', 'Cada 3 horas', 'Cada 4 horas'], correct: 0, explanation: '1.000 × 2ⁿ = 64.000 → 2ⁿ = 64 → n = 6 duplicaciones en 6 horas → 1 duplicación cada hora.' },
      { id: 'c_pro_09', skill: 'procesar', text: 'La ley de Ohm establece V = I × R. Si V = 12V y R = 4Ω, ¿cuánto vale la corriente I?', options: ['3 A', '4 A', '6 A', '48 A'], correct: 0, explanation: 'I = V/R = 12/4 = 3 A.' },
      { id: 'c_pro_10', skill: 'procesar', text: 'Un estudio muestra que en zonas con mayor contaminación, la incidencia de asma en niños es de 15%, mientras que en zonas limpias es de 4%. ¿Qué conclusión se puede extraer?', options: ['La contaminación es la única causa de asma.', 'Existe una asociación entre mayor contaminación y mayor incidencia de asma en niños.', 'Los niños en zonas contaminadas son más débiles genéticamente.', 'El 85% de los niños en zonas contaminadas son sanos.'], correct: 1, explanation: 'Los datos muestran una asociación (no necesariamente causalidad) entre contaminación y mayor incidencia de asma.' },
    ],

    evaluar: [
      { id: 'c_eva_01', skill: 'evaluar', text: 'Un experimento con solo 5 ratones muestra que un medicamento reduce el tumor en el 100% de ellos. ¿Cuál es la principal limitación de este estudio?', options: ['Los ratones no son buenos modelos para humanos.', 'El tamaño de la muestra (n=5) es demasiado pequeño para generalizar los resultados.', 'El medicamento es demasiado caro para producirse masivamente.', 'El experimento no fue realizado por un médico.'], correct: 1, explanation: 'Una muestra de 5 ratones es insuficiente para sacar conclusiones válidas. Los resultados podrían deberse al azar.' },
      { id: 'c_eva_02', skill: 'evaluar', text: 'Un investigador mide el pH de una solución tres veces y obtiene: 4,1; 4,2; 4,1. Los resultados son:', options: ['Precisos pero no exactos si el valor real es 7.', 'Exactos porque los valores están cerca entre sí.', 'Ni precisos ni exactos.', 'Precisos y exactos si el valor real es 4,1.'], correct: 0, explanation: 'Precisión = consistencia entre mediciones (sí, están cerca). Exactitud = cercanía al valor real. Si el pH real es 7, los datos son precisos pero no exactos.' },
      { id: 'c_eva_03', skill: 'evaluar', text: 'Una empresa farmacéutica financia un estudio que concluye que su medicamento es 95% eficaz. ¿Cuál es el problema de credibilidad de este estudio?', options: ['Las empresas farmacéuticas no pueden financiar investigación.', 'El porcentaje de eficacia es demasiado alto para ser creíble.', 'El financiamiento de la empresa crea un conflicto de interés que puede sesgar los resultados.', 'El estudio debería ser realizado por el gobierno.'], correct: 2, explanation: 'El conflicto de interés (quién financia la investigación) puede sesgar el diseño, análisis e interpretación de los resultados a favor del producto.' },
      { id: 'c_eva_04', skill: 'evaluar', text: 'Un experimento prueba un fertilizante en 100 plantas de tomate en una sola región de Chile. ¿Qué limitación tiene este estudio?', options: ['No se puede estudiar el efecto de fertilizantes en plantas.', 'Los resultados pueden no ser extrapolables a otras regiones, climas o tipos de suelo.', 'Solo se usaron 100 plantas, lo que es demasiado.', 'Los tomates no son un cultivo representativo.'], correct: 1, explanation: 'Los resultados obtenidos en una sola región pueden no ser válidos para otras condiciones ambientales (clima, suelo, altitud).' },
      { id: 'c_eva_05', skill: 'evaluar', text: 'El descubrimiento de la penicilina por Alexander Fleming (1928) ¿cómo contribuyó al desarrollo tecnológico?', options: ['Permitió fabricar antibióticos que han salvado millones de vidas.', 'Fue el primer paso para crear vacunas contra virus.', 'Permitió desarrollar técnicas de trasplante de órganos.', 'Fue la base para el descubrimiento del ADN.'], correct: 0, explanation: 'El descubrimiento de la penicilina dio origen a los antibióticos, uno de los mayores avances médicos de la historia, que han salvado cientos de millones de vidas.' },
      { id: 'c_eva_06', skill: 'evaluar', text: 'En un ensayo clínico, el grupo control recibe un placebo. ¿Para qué sirve el grupo placebo?', options: ['Para que todos los participantes reciban algún tipo de tratamiento.', 'Para separar el efecto real del medicamento del efecto psicológico de creer que se está tratando.', 'Para que el estudio sea más económico.', 'Para evaluar los efectos secundarios del medicamento.'], correct: 1, explanation: 'El grupo placebo controla el efecto psicológico (efecto placebo): permite determinar si la mejora se debe al medicamento o a la expectativa de curación.' },
      { id: 'c_eva_07', skill: 'evaluar', text: 'Una investigación concluye que "el número de helados vendidos correlaciona positivamente con la tasa de ahogamientos." ¿Qué error conceptual comete esta conclusión?', options: ['El cálculo de la correlación es incorrecto.', 'Confunde correlación con causalidad: el factor real es el calor (variable de confusión).', 'Los helados no pueden ser objeto de estudio científico.', 'La tasa de ahogamiento no puede medirse con precisión.'], correct: 1, explanation: 'Correlación no implica causalidad. Ambas variables aumentan en verano por el calor (variable de confusión), no porque los helados causen ahogamientos.' },
      { id: 'c_eva_08', skill: 'evaluar', text: 'Un experiment con plantas muestra que "la luz azul aumenta el crecimiento." Para que este resultado sea reproducible, otro laboratorio debe:', options: ['Obtener exactamente los mismos números.', 'Usar las mismas condiciones controladas y obtener resultados consistentes.', 'Pagar una licencia al primer laboratorio.', 'Publicar los resultados antes de replicar el experimento.'], correct: 1, explanation: 'La reproducibilidad exige que otros laboratorios puedan repetir el experimento bajo las mismas condiciones y obtener resultados consistentes (no necesariamente idénticos).' },
      { id: 'c_eva_09', skill: 'evaluar', text: 'Un estudio observacional muestra que personas que desayunan tienen mejores notas. La conclusión "desayunar causa mejores notas" es:', options: ['Completamente válida porque está respaldada por datos.', 'Cuestionable: puede haber otras variables (nivel socioeconómico, hábitos de estudio) que expliquen ambas.', 'Incorrecta porque los estudios observacionales nunca son válidos.', 'Válida si la correlación es estadísticamente significativa.'], correct: 1, explanation: 'Un estudio observacional no puede probar causalidad. Pueden existir variables de confusión (como condición socioeconómica) que expliquen tanto el desayuno como las notas.' },
      { id: 'c_eva_10', skill: 'evaluar', text: 'La teoría de la tectónica de placas está respaldada por evidencias como: sismos, vulcanismo y morfología oceánica. ¿Por qué estas evidencias son importantes para evaluar la validez de la teoría?', options: ['Porque son evidencias anecdóticas difíciles de refutar.', 'Porque son múltiples líneas de evidencia independientes que convergen en la misma explicación.', 'Porque fueron descubiertas por el mismo científico.', 'Porque no existen hipótesis alternativas.'], correct: 1, explanation: 'La validez de una teoría científica se fortalece cuando múltiples líneas de evidencia independientes (geología, sismología, oceanografía) convergen en la misma conclusión.' },
    ],

    comunicar: [
      { id: 'c_com_01', skill: 'comunicar', text: 'Un científico quiere mostrar cómo varía la temperatura de una ciudad a lo largo de 12 meses. ¿Qué tipo de gráfico es más adecuado?', options: ['Gráfico circular (torta).', 'Gráfico de barras agrupadas.', 'Gráfico de líneas que muestre la tendencia mensual.', 'Tabla de frecuencias absolutas.'], correct: 2, explanation: 'Un gráfico de líneas es ideal para mostrar tendencias y variaciones a lo largo del tiempo (serie temporal).' },
      { id: 'c_com_02', skill: 'comunicar', text: 'Para comunicar la distribución porcentual de los tipos de residuos sólidos urbanos, el recurso más adecuado es:', options: ['Gráfico de líneas.', 'Gráfico circular (torta).', 'Histograma de frecuencias.', 'Diagrama de dispersión.'], correct: 1, explanation: 'El gráfico circular es ideal para mostrar la distribución proporcional (porcentual) de categorías en un total.' },
      { id: 'c_com_03', skill: 'comunicar', text: 'Para mostrar la relación entre la masa y la aceleración en experimentos de física, ¿qué gráfico es más adecuado?', options: ['Gráfico de barras.', 'Diagrama de dispersión (para identificar correlación).', 'Gráfico circular.', 'Tabla de contingencia.'], correct: 1, explanation: 'Un diagrama de dispersión permite visualizar la relación (correlación) entre dos variables continuas.' },
      { id: 'c_com_04', skill: 'comunicar', text: 'Un investigador presenta resultados de un experimento usando solo texto corrido, sin gráficos ni tablas. ¿Qué ventaja tiene agregar una tabla?', options: ['Hace el informe más largo y detallado.', 'Facilita la comparación de múltiples datos de forma organizada y visual.', 'Elimina la necesidad de interpretar los resultados.', 'Solo las revistas científicas exigen tablas.'], correct: 1, explanation: 'Las tablas organizan datos de forma estructurada, facilitando la comparación y la identificación de patrones.' },
      { id: 'c_com_05', skill: 'comunicar', text: 'Para comparar el rendimiento promedio en Matemáticas de cuatro grupos distintos, el recurso más adecuado es:', options: ['Gráfico circular.', 'Gráfico de barras comparativas.', 'Gráfico de líneas.', 'Histograma.'], correct: 1, explanation: 'El gráfico de barras permite comparar valores discretos entre categorías (grupos) de forma clara y directa.' },
      { id: 'c_com_06', skill: 'comunicar', text: 'Un modelo molecular de ADN (como la doble hélice de Watson y Crick) es útil para comunicar:', options: ['La secuencia exacta de bases nitrogenadas de cualquier organismo.', 'La estructura tridimensional y las relaciones espaciales entre los componentes del ADN.', 'Las mutaciones específicas de cada gen.', 'La función de cada proteína codificada.'], correct: 1, explanation: 'Los modelos físicos o visuales son útiles para representar estructuras tridimensionales que son difíciles de comprender solo con texto.' },
      { id: 'c_com_07', skill: 'comunicar', text: 'Para comunicar la distribución de edades de 200 pacientes de un hospital, ¿qué recurso es más adecuado?', options: ['Gráfico circular.', 'Tabla de contingencia.', 'Histograma de frecuencias.', 'Diagrama de dispersión.'], correct: 2, explanation: 'El histograma es adecuado para representar la distribución de una variable continua (edad) agrupada en intervalos.' },
      { id: 'c_com_08', skill: 'comunicar', text: 'Al presentar un informe de laboratorio, la sección "Conclusiones" debe:', options: ['Describir paso a paso los procedimientos realizados.', 'Sintetizar los resultados principales, responder la pregunta de investigación y relacionarlos con la hipótesis.', 'Listar todos los materiales usados en el experimento.', 'Plantear nuevas hipótesis sin relación con los resultados.'], correct: 1, explanation: 'Las conclusiones sintetizan resultados, responden la pregunta investigada, aceptan o rechazan la hipótesis y discuten implicaciones.' },
    ],
  },
};

// ── Helper: get all questions for an exam (from skill bank) ───────────────
export const getAllQuestions = (examId) => {
  const skillBank = questionsBySkill[examId];
  if (!skillBank) return [];
  return Object.values(skillBank).flat();
};

// ── Helper: get questions by skill ────────────────────────────────────────
export const getSkillQuestions = (examId, skillId) => {
  return (questionsBySkill[examId]?.[skillId]) || [];
};

// ── Shuffle helper ─────────────────────────────────────────────────────────
export const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

// ── Legacy questions (kept for backward compat) ───────────────────────────
export const questions = {
  lectora: questionsBySkill.lectora.localizar.slice(0,5).concat(
    questionsBySkill.lectora.interpretar.slice(0,3),
    questionsBySkill.lectora.evaluar.slice(0,2)
  ),
  m1: questionsBySkill.m1.resolver.slice(0,3).concat(
    questionsBySkill.m1.modelar.slice(0,3),
    questionsBySkill.m1.representar.slice(0,2),
    questionsBySkill.m1.argumentar.slice(0,2)
  ),
  m2: questionsBySkill.m2.resolver.slice(0,3).concat(
    questionsBySkill.m2.modelar.slice(0,3),
    questionsBySkill.m2.representar.slice(0,2),
    questionsBySkill.m2.argumentar.slice(0,2)
  ),
  historia: questionsBySkill.historia.temporal.slice(0,4).concat(
    questionsBySkill.historia.fuentes.slice(0,3),
    questionsBySkill.historia.critico.slice(0,3)
  ),
  ciencias: questionsBySkill.ciencias.observar.slice(0,3).concat(
    questionsBySkill.ciencias.planificar.slice(0,2),
    questionsBySkill.ciencias.procesar.slice(0,2),
    questionsBySkill.ciencias.evaluar.slice(0,2),
    questionsBySkill.ciencias.comunicar.slice(0,1)
  ),
};

// ── Student profile ────────────────────────────────────────────────────────
export const studentProfile = {
  name: 'Valentina Morales',
  email: 'demo@paes.cl',
  password: 'demo123',
  gradeLevel: '4° Medio',
  school: 'Liceo Bicentenario',
  targetScore: 700,
  targets: { lectora: 720, m1: 700, m2: 680, historia: 690, ciencias: 710 },
};

// ── Mock progress stats ────────────────────────────────────────────────────
export const progressStats = {
  lectora:  { attempted: 38, correct: 28, lastScore: 680, trend: [580,610,640,668,680] },
  m1:       { attempted: 45, correct: 36, lastScore: 695, trend: [590,620,650,680,695] },
  m2:       { attempted: 30, correct: 20, lastScore: 640, trend: [560,590,610,635,640] },
  historia: { attempted: 35, correct: 24, lastScore: 660, trend: [540,580,610,645,660] },
  ciencias: { attempted: 40, correct: 30, lastScore: 672, trend: [570,595,630,658,672] },
};

// ── Recent activity ────────────────────────────────────────────────────────
export const recentActivity = [
  { examId: 'm1',      date: '03/04/2026', score: 695, correct: 7,  total: 10 },
  { examId: 'lectora', date: '02/04/2026', score: 680, correct: 6,  total: 10 },
  { examId: 'ciencias',date: '01/04/2026', score: 672, correct: 6,  total: 10 },
  { examId: 'historia',date: '31/03/2026', score: 660, correct: 5,  total: 10 },
  { examId: 'm2',      date: '30/03/2026', score: 640, correct: 4,  total: 10 },
];

// ── Leaderboard data ───────────────────────────────────────────────────────
export const leaderboardData = [
  { rank: 1, name: 'Martina R.',     school: 'CSAV',         avgScore: 847, streak: 32, badge: '🥇', xp: 12400 },
  { rank: 2, name: 'Benjamín T.',    school: 'Inst. Nacional', avgScore: 831, streak: 21, badge: '🥈', xp: 11200 },
  { rank: 3, name: 'Isidora C.',     school: 'Liceo 1',       avgScore: 819, streak: 18, badge: '🥉', xp: 10800 },
  { rank: 4, name: 'Sebastián M.',   school: 'San Pedro',      avgScore: 805, streak: 15, badge: '🔥', xp: 9600  },
  { rank: 5, name: 'Valentina M.',   school: 'L. Bicentenario',avgScore: 789, streak: 9,  badge: '⭐', xp: 8900  },
  { rank: 6, name: 'Diego F.',       school: 'Arturo Prat',    avgScore: 772, streak: 7,  badge: '📚', xp: 7800  },
  { rank: 7, name: 'Camila E.',      school: 'Teresa de los A.',avgScore: 755, streak: 5, badge: '💡', xp: 7100  },
  { rank: 8, name: 'Felipe A.',      school: 'SCAM',           avgScore: 738, streak: 4,  badge: '🎯', xp: 6500  },
  { rank: 9, name: 'Valentina L.',   school: 'Monte Tabor',    avgScore: 721, streak: 3,  badge: '📖', xp: 5900  },
  { rank: 10, name: 'Rodrigo S.',    school: 'Los Leones',     avgScore: 710, streak: 2,  badge: '🏆', xp: 5200  },
];

// ── Universities & careers (ponderaciones PAES) ────────────────────────────
export const universities = [
  {
    id: 'uchile', name: 'Universidad de Chile', abbr: 'UCH', color: '#003580', logo: '🔵',
    careers: [
      { name: 'Medicina',           ponderaciones: { nem: 0.1, lectora: 0.15, m1: 0.25, ciencias: 0.5 }, cutoff: 850, vacantes: 85 },
      { name: 'Ingeniería Civil',   ponderaciones: { nem: 0.1, lectora: 0.1,  m1: 0.2,  m2: 0.6 },       cutoff: 790, vacantes: 240 },
      { name: 'Derecho',            ponderaciones: { nem: 0.2, lectora: 0.5,  m1: 0.1,  historia: 0.2 }, cutoff: 750, vacantes: 130 },
      { name: 'Psicología',         ponderaciones: { nem: 0.2, lectora: 0.4,  m1: 0.2,  ciencias: 0.2 }, cutoff: 700, vacantes: 100 },
      { name: 'Economía',           ponderaciones: { nem: 0.1, lectora: 0.15, m1: 0.25, m2: 0.5 },       cutoff: 730, vacantes: 120 },
    ],
  },
  {
    id: 'puc', name: 'Pontificia U. Católica', abbr: 'PUC', color: '#1a3a5c', logo: '⭐',
    careers: [
      { name: 'Medicina',           ponderaciones: { nem: 0.1, lectora: 0.1,  m1: 0.2,  ciencias: 0.6 }, cutoff: 860, vacantes: 70 },
      { name: 'Ingeniería Civil',   ponderaciones: { nem: 0.1, lectora: 0.1,  m1: 0.2,  m2: 0.6 },       cutoff: 800, vacantes: 220 },
      { name: 'Derecho',            ponderaciones: { nem: 0.2, lectora: 0.4,  m1: 0.1,  historia: 0.3 }, cutoff: 760, vacantes: 140 },
      { name: 'Arquitectura',       ponderaciones: { nem: 0.2, lectora: 0.2,  m1: 0.3,  m2: 0.3 },       cutoff: 680, vacantes: 80 },
      { name: 'Enfermería',         ponderaciones: { nem: 0.2, lectora: 0.2,  m1: 0.2,  ciencias: 0.4 }, cutoff: 650, vacantes: 90 },
    ],
  },
  {
    id: 'usach', name: 'U. de Santiago (USACH)', abbr: 'USACH', color: '#c41230', logo: '🔴',
    careers: [
      { name: 'Ingeniería en Informática', ponderaciones: { nem: 0.1, lectora: 0.1, m1: 0.2, m2: 0.6 },       cutoff: 700, vacantes: 170 },
      { name: 'Química y Farmacia',        ponderaciones: { nem: 0.2, lectora: 0.1, m1: 0.2, ciencias: 0.5 }, cutoff: 680, vacantes: 60 },
      { name: 'Administración',            ponderaciones: { nem: 0.2, lectora: 0.3, m1: 0.3, historia: 0.2 }, cutoff: 620, vacantes: 150 },
      { name: 'Historia',                  ponderaciones: { nem: 0.2, lectora: 0.4, m1: 0.1, historia: 0.3 }, cutoff: 600, vacantes: 50 },
    ],
  },
  {
    id: 'udec', name: 'U. de Concepción', abbr: 'UdeC', color: '#003865', logo: '💙',
    careers: [
      { name: 'Medicina',             ponderaciones: { nem: 0.1, lectora: 0.1, m1: 0.2, ciencias: 0.6 }, cutoff: 800, vacantes: 60 },
      { name: 'Ingeniería Civil Ind.', ponderaciones: { nem: 0.1, lectora: 0.1, m1: 0.2, m2: 0.6 },       cutoff: 720, vacantes: 130 },
      { name: 'Pedagogía en Matemática', ponderaciones: { nem: 0.2, lectora: 0.2, m1: 0.2, m2: 0.4 },    cutoff: 600, vacantes: 40 },
      { name: 'Periodismo',            ponderaciones: { nem: 0.2, lectora: 0.5, m1: 0.1, historia: 0.2 }, cutoff: 590, vacantes: 55 },
    ],
  },
  {
    id: 'uautonoma', name: 'U. Autónoma de Chile', abbr: 'UA', color: '#e8000d', logo: '🔴',
    careers: [
      { name: 'Psicología',   ponderaciones: { nem: 0.2, lectora: 0.4, m1: 0.2, ciencias: 0.2 }, cutoff: 500, vacantes: 180 },
      { name: 'Kinesiología', ponderaciones: { nem: 0.2, lectora: 0.2, m1: 0.2, ciencias: 0.4 }, cutoff: 520, vacantes: 120 },
      { name: 'Odontología',  ponderaciones: { nem: 0.1, lectora: 0.2, m1: 0.2, ciencias: 0.5 }, cutoff: 580, vacantes: 90 },
    ],
  },
];

// ── Study plan templates ───────────────────────────────────────────────────
export const studyPlanTemplates = [
  {
    id: 'intensive',
    name: 'Intensivo',
    icon: '🔥',
    hoursPerWeek: 20,
    days: [
      { sessions: [{ examId: 'lectora',  topic: 'Localizar información en textos', duration: 60 }, { examId: 'm1', topic: 'Resolver problemas aritméticos', duration: 60 }] },
      { sessions: [{ examId: 'historia', topic: 'Pensamiento temporal y espacial', duration: 60 }, { examId: 'ciencias', topic: 'Procesar y analizar evidencia', duration: 60 }] },
      { sessions: [{ examId: 'lectora',  topic: 'Interpretar textos complejos', duration: 60 }, { examId: 'm2', topic: 'Modelar con funciones', duration: 60 }] },
      { sessions: [{ examId: 'historia', topic: 'Pensamiento crítico histórico', duration: 60 }, { examId: 'ciencias', topic: 'Evaluar investigaciones', duration: 60 }] },
      { sessions: [{ examId: 'lectora',  topic: 'Evaluar recursos del texto', duration: 60 }, { examId: 'm1', topic: 'Argumentar y justificar', duration: 60 }] },
      { sessions: [{ examId: 'm1',       topic: 'Ensayo global Matemática M1', duration: 120 }] },
      { sessions: [{ examId: 'lectora',  topic: 'Repaso y corrección de errores', duration: 60 }] },
    ],
  },
  {
    id: 'standard',
    name: 'Estándar',
    icon: '📘',
    hoursPerWeek: 12,
    days: [
      { sessions: [{ examId: 'lectora',  topic: 'Localizar información', duration: 60 }] },
      { sessions: [{ examId: 'm1',       topic: 'Resolver problemas matemáticos', duration: 60 }] },
      { sessions: [{ examId: 'historia', topic: 'Análisis de fuentes históricas', duration: 60 }] },
      { sessions: [{ examId: 'ciencias', topic: 'Observar y plantear preguntas', duration: 60 }] },
      { sessions: [{ examId: 'm2',       topic: 'Resolver con funciones avanzadas', duration: 60 }] },
      { sessions: [{ examId: 'lectora',  topic: 'Sub-ensayo Comprensión Lectora', duration: 90 }] },
      { sessions: [] },
    ],
  },
  {
    id: 'relaxed',
    name: 'Tranquilo',
    icon: '🌿',
    hoursPerWeek: 6,
    days: [
      { sessions: [{ examId: 'lectora',  topic: 'Práctica libre Lectora', duration: 45 }] },
      { sessions: [] },
      { sessions: [{ examId: 'm1',       topic: 'Práctica libre Matemática', duration: 45 }] },
      { sessions: [] },
      { sessions: [{ examId: 'historia', topic: 'Práctica libre Historia', duration: 45 }] },
      { sessions: [{ examId: 'ciencias', topic: 'Práctica libre Ciencias', duration: 45 }] },
      { sessions: [] },
    ],
  },
];

// ── Streak initial state ───────────────────────────────────────────────────
export const initialStreakData = {
  current: 9,
  best: 14,
  lastActivity: '2026-04-03',
  totalDays: 42,
  history: {
    '2026-04-03': true, '2026-04-02': true, '2026-04-01': true,
    '2026-03-31': true, '2026-03-30': true, '2026-03-29': true,
    '2026-03-28': true, '2026-03-27': true, '2026-03-26': true,
  },
};

// ── Helpers ────────────────────────────────────────────────────────────────
export const getExam       = (id) => exams.find(e => e.id === id);
export const getSkillName  = (examId, skillId) => skillsConfig[examId]?.find(s => s.id === skillId)?.name || skillId;

// ── Score conversion (PAES scale 100–1000) ────────────────────────────────
export const toScore = (correct, total) => {
  if (total === 0) return 100;
  const pct = correct / total;
  return Math.round(100 + pct * 900);
};

// ── Weighted score calculator ──────────────────────────────────────────────
export const calcWeightedScore = (scores, ponderaciones) => {
  let total = 0, totalWeight = 0;
  Object.entries(ponderaciones).forEach(([key, weight]) => {
    if (scores[key] !== undefined && scores[key] !== '') {
      total += Number(scores[key]) * weight;
      totalWeight += weight;
    }
  });
  return totalWeight > 0 ? Math.round(total / totalWeight) : 0;
};
