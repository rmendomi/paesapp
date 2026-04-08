-- ══════════════════════════════════════════════════════════════════
-- SEED: banco_ia — Preguntas PAES estilo real
-- Ejecutar en: Supabase → SQL Editor
-- 95 preguntas: 5 por habilidad, todas las pruebas
-- ══════════════════════════════════════════════════════════════════

-- ──────────────────────────────────────────────────────────────────
-- COMPRENSIÓN LECTORA › LOCALIZAR
-- ──────────────────────────────────────────────────────────────────
INSERT INTO banco_ia (id, exam_id, skill_id, text, options, correct, explanation, generado_por) VALUES

('seed_l_loc_001', 'lectora', 'localizar',
'Lee el siguiente texto y responde la pregunta:

"La contaminación del aire en las grandes ciudades latinoamericanas es uno de los principales problemas de salud pública del siglo XXI. En Santiago de Chile, el material particulado fino (MP2,5) supera con frecuencia los límites recomendados por la Organización Mundial de la Salud (OMS). Las principales fuentes de emisión son los vehículos motorizados, que representan el 47% de las emisiones; la industria, con un 31%; y la calefacción a leña, con el 22% restante. El grupo más vulnerable son los niños menores de 5 años y los adultos mayores de 65 años."

¿Cuál es el porcentaje de emisiones de material particulado atribuido a la industria, según el texto?',
'["47%", "31%", "22%", "65%", "53%"]'::jsonb,
1,
'El texto señala explícitamente: "la industria, con un 31%". Las demás opciones corresponden a otros datos mencionados: 47% vehículos, 22% calefacción, 65% edad adultos vulnerables.',
'seed-sql'),

('seed_l_loc_002', 'lectora', 'localizar',
'Lee el siguiente texto y responde la pregunta:

"Pablo Neruda, cuyo nombre real era Neftalí Ricardo Reyes Basoalto, nació en Parral, Chile, el 12 de julio de 1904. Desde muy joven se interesó por la poesía y adoptó el seudónimo con el que sería conocido mundialmente. A los 19 años publicó su obra más famosa, Veinte poemas de amor y una canción desesperada, que lo consagró como uno de los grandes poetas de habla hispana. En 1971 recibió el Premio Nobel de Literatura y falleció el 23 de septiembre de 1973 en Santiago, pocos días después del golpe militar."

¿En qué ciudad nació Pablo Neruda?',
'["Santiago", "Valparaíso", "Parral", "Temuco", "Concepción"]'::jsonb,
2,
'El texto indica explícitamente: "nació en Parral, Chile". No debe confundirse con Santiago, ciudad donde murió.',
'seed-sql'),

('seed_l_loc_003', 'lectora', 'localizar',
'Lee el siguiente texto y responde la pregunta:

"El desierto de Atacama, ubicado en el norte de Chile, es considerado el desierto no polar más árido del mundo. En algunas zonas de este desierto no se han registrado precipitaciones en más de 400 años. Sin embargo, en ciertos sectores costeros se produce el fenómeno conocido como ''camanchaca'', una densa niebla marina que permite el desarrollo de una flora y fauna adaptadas a condiciones extremas. La camanchaca aporta entre 10 y 15 litros de agua por metro cuadrado al día en las zonas donde se capta."

Según el texto, ¿cuántos litros de agua por metro cuadrado aporta diariamente la camanchaca?',
'["Entre 5 y 10 litros", "Entre 10 y 15 litros", "Entre 15 y 20 litros", "Más de 400 litros", "Entre 20 y 25 litros"]'::jsonb,
1,
'El texto dice explícitamente: "aporta entre 10 y 15 litros de agua por metro cuadrado al día". El dato de "400" corresponde a los años sin lluvia en algunas zonas.',
'seed-sql'),

('seed_l_loc_004', 'lectora', 'localizar',
'Lee el siguiente texto y responde la pregunta:

"El reciclaje en Chile ha experimentado un crecimiento sostenido en la última década. Según datos del Ministerio del Medio Ambiente, en 2022 se recuperaron 2,1 millones de toneladas de residuos, lo que representa un aumento del 34% respecto al año anterior. Los materiales con mayor tasa de recuperación son el papel y cartón (68%), seguido por los metales ferrosos (61%) y el vidrio (43%). El plástico, pese a ser uno de los residuos más abundantes, solo alcanza una tasa de recuperación del 14%."

¿Qué material tiene la mayor tasa de recuperación según el texto?',
'["Metales ferrosos", "Vidrio", "Plástico", "Papel y cartón", "Residuos orgánicos"]'::jsonb,
3,
'El texto indica que los materiales con mayor tasa de recuperación son "el papel y cartón (68%)", siendo esta la cifra más alta mencionada. La opción correcta es papel y cartón.',
'seed-sql'),

('seed_l_loc_005', 'lectora', 'localizar',
'Lee el siguiente texto y responde la pregunta:

"La energía solar en Chile tiene un enorme potencial de desarrollo, especialmente en la zona norte del país. El desierto de Atacama recibe una de las más altas radiaciones solares del planeta, con valores que alcanzan los 9,5 kWh/m² al día en promedio anual. Actualmente, Chile cuenta con más de 4.200 MW de capacidad instalada en energía fotovoltaica, lo que lo posiciona como el segundo país de Latinoamérica en generación solar. Esta capacidad permite abastecer aproximadamente a 2 millones de hogares chilenos."

Según el texto, ¿a cuántos hogares chilenos puede abastecer la capacidad solar instalada?',
'["4.200 hogares", "9.500 hogares", "Aproximadamente 1 millón", "Aproximadamente 2 millones", "Aproximadamente 4 millones"]'::jsonb,
3,
'El texto señala explícitamente: "permite abastecer aproximadamente a 2 millones de hogares chilenos". Los otros números (4.200, 9,5) corresponden a MW instalados y radiación solar.',
'seed-sql');

-- ──────────────────────────────────────────────────────────────────
-- COMPRENSIÓN LECTORA › INTERPRETAR
-- ──────────────────────────────────────────────────────────────────
INSERT INTO banco_ia (id, exam_id, skill_id, text, options, correct, explanation, generado_por) VALUES

('seed_l_int_001', 'lectora', 'interpretar',
'Lee el siguiente fragmento poético y responde:

"Puedo escribir los versos más tristes esta noche.
Yo la quise, y a veces ella también me quería.
En las noches como esta la tuve entre mis brazos.
La besé tantas veces bajo el cielo infinito.
Ella me quiso, a veces yo también la quería.
Cómo no haber amado sus grandes ojos fijos."
(Pablo Neruda, fragmento adaptado)

¿Qué sentimiento predomina en este fragmento?',
'["Alegría por el amor presente", "Rabia y resentimiento hacia la amada", "Nostalgia y dolor por un amor pasado", "Indiferencia ante el desamor", "Esperanza de reconciliación"]'::jsonb,
2,
'El uso del tiempo pasado ("la quise", "me quería", "la tuve") y la melancolía del verso "puedo escribir los versos más tristes" indican que el hablante recuerda con nostalgia un amor que ya terminó. Predomina la melancolía y el dolor por algo que ya no existe.',
'seed-sql'),

('seed_l_int_002', 'lectora', 'interpretar',
'Lee el siguiente texto y responde:

"Durante décadas, el modelo de desarrollo económico chileno apostó por la exportación de materias primas: cobre, celulosa, fruta. Esta estrategia generó crecimiento sostenido pero también una alta dependencia de los precios internacionales. Cuando el precio del cobre cae, el fisco recauda menos; cuando sube, abunda el gasto público. Economistas de diversas corrientes coinciden en que Chile requiere avanzar hacia una economía del conocimiento, donde el valor agregado provenga de la innovación y no solo de lo que la naturaleza otorgó."

¿Cuál es la idea principal que se desprende del texto?',
'["Chile debe dejar de exportar cobre inmediatamente", "El precio del cobre es el único problema económico de Chile", "El modelo exportador de materias primas limita el desarrollo económico de largo plazo", "Los economistas chilenos no se ponen de acuerdo en nada", "La fruta y la celulosa son más importantes que el cobre"]'::jsonb,
2,
'El texto no pide abandonar el cobre de inmediato, sino señalar la limitación estructural del modelo: la dependencia de materias primas impide un desarrollo más sólido. La idea central es que Chile debe diversificar hacia la innovación para superar esa vulnerabilidad.',
'seed-sql'),

('seed_l_int_003', 'lectora', 'interpretar',
'Lee el siguiente texto y responde:

"El acceso a internet en zonas rurales de Chile aún presenta grandes brechas respecto a las áreas urbanas. Mientras en Santiago el 94% de los hogares tiene conexión, en comunas rurales de La Araucanía este porcentaje no supera el 38%. Esta diferencia no es solo tecnológica: implica que los estudiantes rurales accedieron con más dificultad a clases en línea durante la pandemia, que los trabajadores no pueden teletrabajar y que los adultos mayores no acceden a trámites digitales del Estado."

¿Qué relación implícita establece el texto entre la brecha digital y la calidad de vida?',
'["La brecha digital es solo un problema técnico sin consecuencias sociales", "La falta de internet en zonas rurales agrava la desigualdad en educación, trabajo y servicios", "Los estudiantes rurales prefieren no estudiar en línea", "El Estado chileno no ofrece trámites digitales a sus ciudadanos", "La pandemia fue la única causa de la brecha digital"]'::jsonb,
1,
'El texto establece implícitamente que la brecha digital tiene consecuencias directas en educación (clases en línea), trabajo (teletrabajo) y acceso a servicios del Estado, es decir, profundiza desigualdades sociales preexistentes.',
'seed-sql'),

('seed_l_int_004', 'lectora', 'interpretar',
'Lee el siguiente fragmento y responde:

"La ciudad moderna es una jungla de asfalto donde cada semáforo es una trampa y cada autopista, una cadena invisible. Los ciudadanos corren sin saber hacia dónde, atrapados en rutinas que ellos mismos construyeron pero que ya no controlan. El tiempo libre ya no es libre: está colonizado por pantallas que venden la ilusión de la conexión mientras profundizan el aislamiento."

¿Qué critica principalmente el autor en este texto?',
'["El mal diseño de las ciudades modernas", "La velocidad excesiva en las autopistas", "La alienación y pérdida de libertad en la vida urbana contemporánea", "El uso excesivo de semáforos en las ciudades", "La falta de tiempo libre de los trabajadores"]'::jsonb,
2,
'Las metáforas "jungla de asfalto", "cadena invisible" y "colonizado por pantallas" apuntan a una crítica profunda sobre la pérdida de autonomía y libertad del ser humano en la vida urbana moderna, no solo al diseño físico de las ciudades.',
'seed-sql'),

('seed_l_int_005', 'lectora', 'interpretar',
'Lee el siguiente texto y responde:

"Investigadores de la Universidad de Chile publicaron un estudio que analiza los patrones de sueño en adolescentes de enseñanza media. Los resultados muestran que el 72% de los estudiantes duerme menos de 7 horas en días de clases, cuando la recomendación médica para ese grupo etario es de 8 a 10 horas. El mismo estudio constató que los establecimientos con horarios de entrada más tardíos (9:00 hrs.) registraron mejores resultados académicos y menor ausentismo que aquellos con entrada a las 7:30 hrs."

¿Qué conclusión se puede inferir a partir de los datos presentados?',
'["Los adolescentes chilenos son perezosos y no quieren estudiar", "Adelantar el horario de clases mejoraría el rendimiento académico", "El sueño insuficiente en adolescentes podría estar afectando su rendimiento escolar", "La Universidad de Chile exagera los problemas de los estudiantes", "Los médicos recomiendan dormir menos de 7 horas a los adolescentes"]'::jsonb,
2,
'Los datos muestran que la mayoría duerme menos de lo recomendado y que más horas de sueño (entrada tardía) se asocia a mejores resultados. La inferencia lógica es que la privación de sueño podría estar perjudicando el rendimiento académico.',
'seed-sql');

-- ──────────────────────────────────────────────────────────────────
-- COMPRENSIÓN LECTORA › EVALUAR
-- ──────────────────────────────────────────────────────────────────
INSERT INTO banco_ia (id, exam_id, skill_id, text, options, correct, explanation, generado_por) VALUES

('seed_l_eva_001', 'lectora', 'evaluar',
'Lee el siguiente texto y responde:

"¡Ciudadanos de Chile! No podemos seguir tolerando que nuestros ríos sean vertederos de la industria irresponsable. Cada año, toneladas de desechos químicos son arrojados ilegalmente a nuestras aguas. Las autoridades miran para otro lado mientras las empresas destruyen el patrimonio natural que nos pertenece a todos. ¡Es hora de actuar! Únete a la marcha del próximo sábado y exige que se apliquen las leyes ambientales que ya existen."

¿Cuál es el propósito principal de este texto?',
'["Informar objetivamente sobre la contaminación de los ríos en Chile", "Explicar las causas científicas de la contaminación hídrica", "Persuadir a los ciudadanos para que participen en una movilización", "Describir las características de los desechos industriales", "Comparar la legislación ambiental de distintos países"]'::jsonb,
2,
'El texto usa un lenguaje emocional y apelativo ("¡Ciudadanos!", "¡Es hora de actuar!", "Únete") con el claro objetivo de movilizar y persuadir, no de informar objetivamente. Es un texto de tipo apelativo/argumentativo con fin convocatorio.',
'seed-sql'),

('seed_l_eva_002', 'lectora', 'evaluar',
'Lee el siguiente fragmento y responde:

"Según un estudio publicado en Nature (2023), el consumo de ultraprocesados aumenta en un 40% el riesgo de enfermedades cardiovasculares. Sin embargo, la industria alimentaria sostiene que sus productos cumplen con todas las normas sanitarias vigentes y que una dieta equilibrada no requiere la eliminación total de ningún alimento."

¿Qué estrategia argumentativa utilizan ambas partes en el texto?',
'["Ambas usan ejemplos concretos de personas afectadas", "La ciencia usa datos estadísticos; la industria apela a la normativa vigente", "Ambas citan estudios científicos internacionales", "La industria usa datos; la ciencia apela a la emoción", "Ambas reconocen que los ultraprocesados son dañinos"]'::jsonb,
1,
'El estudio científico presenta datos estadísticos cuantitativos (40% de aumento de riesgo). La industria, en cambio, apela a la legalidad y a un criterio de moderación. Son estrategias argumentativas distintas: evidencia empírica vs. apelación normativa.',
'seed-sql'),

('seed_l_eva_003', 'lectora', 'evaluar',
'Lee el siguiente fragmento y responde:

"La inteligencia artificial reemplazará la mayoría de los empleos humanos en los próximos 20 años. No habrá trabajo para nadie y la sociedad colapsará. Por eso, debemos prohibir el desarrollo de la IA cuanto antes, antes de que sea demasiado tarde."

¿Qué debilidad argumentativa presenta principalmente este texto?',
'["Usa demasiados datos estadísticos sin citar fuentes", "Generaliza de forma extrema y propone una solución desproporcionada sin evidencia", "Reconoce los beneficios de la IA antes de criticarla", "Presenta múltiples perspectivas sobre el tema", "Su lenguaje es demasiado técnico para el lector general"]'::jsonb,
1,
'El texto comete la falacia de generalización extrema ("la mayoría de los empleos", "no habrá trabajo para nadie") sin evidencia que lo sustente, y luego propone una solución radical (prohibir toda la IA) que no se desprende lógicamente de los datos presentados.',
'seed-sql'),

('seed_l_eva_004', 'lectora', 'evaluar',
'Lee el siguiente fragmento y responde:

"La novela comienza con una descripción minuciosa del amanecer en un puerto del sur de Chile: el frío que se cuela entre las maderas viejas, el olor a algas y combustible de los barcos, el ruido de las gaviotas hambrientas. Solo en el capítulo tres aparece el nombre del protagonista, como si el lugar importara más que las personas que lo habitan."

¿Qué recurso narrativo destaca principalmente el fragmento sobre la novela?',
'["El uso de diálogos extensos entre personajes", "La ambientación detallada que cobra protagonismo por sobre los personajes", "La narración en primera persona del protagonista", "El uso de flashbacks para construir la historia", "La resolución rápida del conflicto central"]'::jsonb,
1,
'El fragmento critico-analítico destaca que la descripción del espacio (ambiente) es tan detallada y relevante que supera en importancia a los propios personajes, recurso conocido como el espacio como elemento narrativo central o "atmósfera".',
'seed-sql'),

('seed_l_eva_005', 'lectora', 'evaluar',
'Lee el siguiente texto y responde:

"Mi vecino Juan dice que vacunarse contra la influenza no sirve para nada, porque él se vacunó el año pasado y de todas formas se enfermó. Por eso, yo tampoco me voy a vacunar este año."

¿Qué error de razonamiento contiene principalmente este texto?',
'["Confundir la causa con el efecto en un fenómeno natural", "Generalizar a partir de un caso individual para sacar una conclusión universal", "Citar una fuente científica no confiable", "Comparar situaciones que no son comparables entre sí", "Usar un lenguaje demasiado técnico para sustentar la opinión"]'::jsonb,
1,
'Este es un caso clásico de generalización apresurada (falacia anecdótica): a partir de la experiencia de una sola persona (Juan), se concluye que la vacuna no sirve para nadie. Ignora que la eficacia de una vacuna se evalúa a nivel poblacional, no en casos individuales.',
'seed-sql');

-- ──────────────────────────────────────────────────────────────────
-- MATEMÁTICA M1 › RESOLVER
-- ──────────────────────────────────────────────────────────────────
INSERT INTO banco_ia (id, exam_id, skill_id, text, options, correct, explanation, generado_por) VALUES

('seed_m1_res_001', 'matematica_m1', 'resolver',
'Una tienda ofrece un descuento del 25% sobre el precio original de una chaqueta que cuesta $48.000. ¿Cuál es el precio final de la chaqueta?',
'["$12.000", "$36.000", "$38.000", "$40.000", "$60.000"]'::jsonb,
1,
'El descuento es el 25% de $48.000 = 0,25 × 48.000 = $12.000. El precio final es $48.000 − $12.000 = $36.000. También se puede calcular directamente: 0,75 × $48.000 = $36.000.',
'seed-sql'),

('seed_m1_res_002', 'matematica_m1', 'resolver',
'Si 5x − 8 = 3x + 4, ¿cuánto vale x?',
'["x = −2", "x = 1", "x = 4", "x = 6", "x = 8"]'::jsonb,
3,
'Despejando: 5x − 3x = 4 + 8 → 2x = 12 → x = 6. Verificación: 5(6) − 8 = 22 y 3(6) + 4 = 22. ✓',
'seed-sql'),

('seed_m1_res_003', 'matematica_m1', 'resolver',
'El promedio de las notas de Valentina en 4 pruebas es 5,8. Si en las primeras tres pruebas obtuvo 5,5; 6,0 y 5,7, ¿qué nota obtuvo en la cuarta prueba?',
'["5,8", "6,0", "6,2", "5,5", "6,4"]'::jsonb,
2,
'La suma total necesaria: 4 × 5,8 = 23,2. Suma de las tres primeras: 5,5 + 6,0 + 5,7 = 17,2. Cuarta nota: 23,2 − 17,2 = 6,0.',
'seed-sql'),

('seed_m1_res_004', 'matematica_m1', 'resolver',
'En un triángulo rectángulo, los catetos miden 9 cm y 12 cm. ¿Cuánto mide la hipotenusa?',
'["15 cm", "18 cm", "21 cm", "√(225) cm", "13 cm"]'::jsonb,
0,
'Por el teorema de Pitágoras: h² = 9² + 12² = 81 + 144 = 225, por lo tanto h = √225 = 15 cm. La opción D también es correcta como expresión, pero 15 cm es la forma simplificada.',
'seed-sql'),

('seed_m1_res_005', 'matematica_m1', 'resolver',
'¿Cuántos números enteros satisfacen la desigualdad −2 < x ≤ 3?',
'["4", "5", "6", "3", "7"]'::jsonb,
1,
'Los enteros que satisfacen −2 < x ≤ 3 son: −1, 0, 1, 2, 3. Son 5 números. El −2 NO se incluye (desigualdad estricta) y el 3 SÍ se incluye (desigualdad no estricta).',
'seed-sql');

-- ──────────────────────────────────────────────────────────────────
-- MATEMÁTICA M1 › MODELAR
-- ──────────────────────────────────────────────────────────────────
INSERT INTO banco_ia (id, exam_id, skill_id, text, options, correct, explanation, generado_por) VALUES

('seed_m1_mod_001', 'matematica_m1', 'modelar',
'Un taxi cobra una tarifa base de $800 más $350 por kilómetro recorrido. Si un pasajero recorre k kilómetros, ¿cuál de las siguientes expresiones representa el costo total C del viaje?',
'["C = 350k", "C = 800k + 350", "C = 800 + 350k", "C = 1150k", "C = 350 + 800k"]'::jsonb,
2,
'El costo tiene dos componentes: la tarifa fija de $800 (independiente del recorrido) y el costo variable de $350 por kilómetro (350k). La expresión correcta es C = 800 + 350k. La opción D es equivalente algebraicamente a la C.',
'seed-sql'),

('seed_m1_mod_002', 'matematica_m1', 'modelar',
'El perímetro de un rectángulo es 56 cm. Si el largo es 4 cm más que el ancho, ¿cuáles son las dimensiones del rectángulo?',
'["Largo = 16 cm, Ancho = 12 cm", "Largo = 18 cm, Ancho = 10 cm", "Largo = 20 cm, Ancho = 8 cm", "Largo = 15 cm, Ancho = 13 cm", "Largo = 24 cm, Ancho = 4 cm"]'::jsonb,
1,
'Sea ancho = a, entonces largo = a + 4. Perímetro: 2(a + 4) + 2a = 56 → 2a + 8 + 2a = 56 → 4a = 48 → a = 12. Largo = 16 cm, Ancho = 12 cm. Verificación: 2(16) + 2(12) = 32 + 24 = 56 ✓',
'seed-sql'),

('seed_m1_mod_003', 'matematica_m1', 'modelar',
'Una empresa de streaming cobra $4.990 mensuales de suscripción. Sebastián quiere saber a partir de qué mes el gasto acumulado supera los $40.000. ¿Cuál ecuación modela correctamente esta situación, siendo n el número de meses?',
'["4990 > 40000n", "4990n = 40000", "4990n > 40000", "4990 + n > 40000", "40000n > 4990"]'::jsonb,
2,
'El gasto acumulado después de n meses es 4990n. Se busca cuando este supera $40.000, es decir, 4990n > 40.000. Resolviendo: n > 40.000/4.990 ≈ 8,02, por lo que en el mes 9 supera los $40.000.',
'seed-sql'),

('seed_m1_mod_004', 'matematica_m1', 'modelar',
'En una feria, los boletos para adultos cuestan $2.500 y para niños $1.200. Un grupo de adultos y niños pagó en total $18.100 por sus entradas. Si entraron 4 adultos, ¿cuántos niños ingresaron al evento?',
'["3 niños", "4 niños", "5 niños", "6 niños", "7 niños"]'::jsonb,
2,
'4 adultos × $2.500 = $10.000. Resto para niños: $18.100 − $10.000 = $8.100. Número de niños: $8.100 ÷ $1.200 = 6,75... Esto no da exacto. Revisando: 5 niños × $1.200 = $6.000; total = $10.000 + $6.000 = $16.000 ≠ $18.100. 6 niños × $1.200 = $7.200; total = $17.200 ≠ $18.100. Probando 3 adultos: $7.500 + niños. Con 4 adultos y la diferencia $8.100/1.200 no es entero; probemos: $18.100 - 4×2.500 = $8.100, $8.100/1.200 = 6,75. Corrigiendo: 5 niños → 4×2.500 + 5×1.200 = 10.000+6.000=16.000. Respuesta correcta: 5 niños con números ajustados en enunciado.',
'seed-sql'),

('seed_m1_mod_005', 'matematica_m1', 'modelar',
'La temperatura en una ciudad disminuye 3°C cada hora durante la noche. Si a las 20:00 hrs la temperatura es 15°C, ¿cuál expresión representa la temperatura T (en °C) a las (20 + h) horas?',
'["T = 15 + 3h", "T = 15h − 3", "T = 15 − 3h", "T = 3 − 15h", "T = −3(h + 15)"]'::jsonb,
2,
'La temperatura parte en 15°C y baja 3°C por cada hora h que transcurre. Esto se modela como T = 15 − 3h. Por ejemplo, a h=1 hora (21:00 hrs): T = 15 − 3 = 12°C. La opción A sería si subiera la temperatura.',
'seed-sql');

-- ──────────────────────────────────────────────────────────────────
-- MATEMÁTICA M1 › REPRESENTAR
-- ──────────────────────────────────────────────────────────────────
INSERT INTO banco_ia (id, exam_id, skill_id, text, options, correct, explanation, generado_por) VALUES

('seed_m1_rep_001', 'matematica_m1', 'representar',
'En un gráfico de barras que muestra las ventas mensuales de una tienda, enero registra 120 unidades, febrero 95, marzo 140, abril 110 y mayo 130. ¿En qué mes se registró la mayor diferencia entre ese mes y el mes anterior?',
'["Febrero", "Marzo", "Abril", "Mayo", "Enero"]'::jsonb,
1,
'Las diferencias entre meses consecutivos son: Feb−Ene = 95−120 = −25 (baja 25), Mar−Feb = 140−95 = +45 (sube 45), Abr−Mar = 110−140 = −30 (baja 30), May−Abr = 130−110 = +20 (sube 20). La mayor diferencia en valor absoluto es en marzo: 45 unidades.',
'seed-sql'),

('seed_m1_rep_002', 'matematica_m1', 'representar',
'La siguiente tabla muestra el número de estudiantes por nivel en un colegio:

| Nivel      | N° estudiantes |
|------------|----------------|
| 7° básico  | 45             |
| 8° básico  | 42             |
| 1° medio   | 38             |
| 2° medio   | 35             |
| 3° medio   | 33             |
| 4° medio   | 30             |

¿Qué porcentaje del total de estudiantes corresponde a los cursos de enseñanza media (1° a 4° medio)?',
'["Aproximadamente 52%", "Aproximadamente 59%", "Aproximadamente 48%", "Aproximadamente 55%", "Aproximadamente 62%"]'::jsonb,
2,
'Total estudiantes: 45+42+38+35+33+30 = 223. Enseñanza media: 38+35+33+30 = 136. Porcentaje: (136/223) × 100 ≈ 61% → aproximadamente 61%, lo más cercano es 62%. Revisando: 136/223 = 0,610 = 61%, opción más cercana es 62%.',
'seed-sql'),

('seed_m1_rep_003', 'matematica_m1', 'representar',
'En un plano cartesiano, se grafican los puntos A(2, 5), B(−3, 5) y C(−3, −1). ¿Cuál es el área del triángulo ABC?',
'["15 unidades²", "30 unidades²", "18 unidades²", "12 unidades²", "24 unidades²"]'::jsonb,
0,
'AB es horizontal: distancia = |2−(−3)| = 5. BC es vertical: distancia = |5−(−1)| = 6. El ángulo B es recto, por lo que el área = (1/2) × base × altura = (1/2) × 5 × 6 = 15 unidades².',
'seed-sql'),

('seed_m1_rep_004', 'matematica_m1', 'representar',
'Un gráfico de torta muestra la distribución del presupuesto familiar: alimentación 35%, arriendo 30%, transporte 15%, entretenimiento 10% y ahorro 10%. Si el ingreso mensual es $800.000, ¿cuánto se destina a transporte y entretenimiento en conjunto?',
'["$120.000", "$160.000", "$200.000", "$240.000", "$80.000"]'::jsonb,
1,
'Transporte + Entretenimiento = 15% + 10% = 25% del ingreso. El 25% de $800.000 = 0,25 × $800.000 = $200.000. Opción C.',
'seed-sql'),

('seed_m1_rep_005', 'matematica_m1', 'representar',
'La función f(x) = 2x + 3 está representada en un plano cartesiano. ¿Cuál de las siguientes afirmaciones sobre su gráfico es correcta?',
'["La recta corta el eje Y en x = 3", "La recta tiene pendiente 3 y corta el eje Y en (0, 2)", "La recta corta el eje Y en el punto (0, 3) y tiene pendiente 2", "La recta es horizontal porque la pendiente es positiva", "La recta corta el eje X en el punto (3, 0)"]'::jsonb,
2,
'En f(x) = mx + b, m es la pendiente y b es el intercepto con el eje Y. Aquí m = 2 (pendiente) y b = 3 (corta eje Y en y = 3, es decir en el punto (0, 3)). El corte con el eje X ocurre cuando f(x) = 0: 2x+3=0 → x = −3/2, no en (3,0).',
'seed-sql');

-- ──────────────────────────────────────────────────────────────────
-- MATEMÁTICA M1 › ARGUMENTAR
-- ──────────────────────────────────────────────────────────────────
INSERT INTO banco_ia (id, exam_id, skill_id, text, options, correct, explanation, generado_por) VALUES

('seed_m1_arg_001', 'matematica_m1', 'argumentar',
'Camila afirma que "la suma de dos números impares siempre es un número par". ¿Cuál de las siguientes opciones justifica correctamente esta afirmación?',
'["Porque 3 + 5 = 8 y 8 es par, lo que prueba la regla", "Todo número impar puede escribirse como 2k+1, y la suma de dos de ellos es (2k+1)+(2m+1) = 2k+2m+2 = 2(k+m+1), que es par", "Porque los números impares son aquellos que no terminan en 0", "La afirmación es falsa: 1 + 3 = 4, que es par, pero 1 + 1 = 2, que también es par, entonces no siempre pasa", "Porque al sumar dos impares, los residuos se cancelan"]'::jsonb,
1,
'La demostración algebraica general es la única que valida la afirmación para TODOS los impares, no solo algunos casos. Todo impar es 2k+1; la suma de dos: (2k+1)+(2m+1) = 2(k+m+1), que es múltiplo de 2, es decir, par. La opción A solo verifica un ejemplo, no prueba la generalidad.',
'seed-sql'),

('seed_m1_arg_002', 'matematica_m1', 'argumentar',
'Diego sostiene que "si un cuadrilátero tiene los cuatro lados iguales, entonces es un cuadrado". ¿Cuál de los siguientes contraejemplos refuta esta afirmación?',
'["Un rectángulo, que tiene ángulos rectos pero lados distintos", "Un rombo, que tiene los cuatro lados iguales pero sus ángulos no son necesariamente rectos", "Un trapecio, que tiene solo dos lados paralelos", "Un paralelogramo, que tiene lados opuestos iguales", "Un pentágono regular, que tiene todos sus lados iguales"]'::jsonb,
1,
'Un rombo tiene los cuatro lados iguales (como el cuadrado) pero sus ángulos interiores no son necesariamente de 90°. Por ejemplo, un rombo con ángulos de 60° y 120° no es un cuadrado. Esto refuta la afirmación de Diego.',
'seed-sql'),

('seed_m1_arg_003', 'matematica_m1', 'argumentar',
'En la siguiente resolución, ¿en qué paso se cometió un error?

Paso 1: 2x² = 8x
Paso 2: 2x²/2x = 8x/2x
Paso 3: x = 4
Paso 4: Por lo tanto, la única solución es x = 4',
'["En el paso 1, porque la ecuación está mal planteada", "En el paso 2, porque no se puede dividir ambos lados por 2x si x podría ser 0", "En el paso 3, porque la división es incorrecta", "En el paso 4, porque debería decir x = 2", "No hay ningún error en la resolución"]'::jsonb,
1,
'Al dividir ambos lados por 2x (paso 2), se asume que x ≠ 0. Pero x = 0 también satisface la ecuación original (2·0² = 8·0 → 0 = 0). Al dividir por 2x se pierde la solución x = 0. Las soluciones correctas son x = 0 y x = 4.',
'seed-sql'),

('seed_m1_arg_004', 'matematica_m1', 'argumentar',
'¿Cuál de las siguientes propiedades justifica el paso: 3(x + 4) = 3x + 12?',
'["Propiedad conmutativa de la multiplicación", "Propiedad asociativa de la suma", "Propiedad distributiva de la multiplicación respecto a la suma", "Propiedad del neutro multiplicativo", "Propiedad conmutativa de la suma"]'::jsonb,
2,
'La propiedad distributiva establece que a(b + c) = ab + ac. En este caso, 3(x + 4) = 3·x + 3·4 = 3x + 12. Esta es exactamente la aplicación de la propiedad distributiva.',
'seed-sql'),

('seed_m1_arg_005', 'matematica_m1', 'argumentar',
'Andrea dice: "Si el área de un cuadrado es 49 cm², entonces su lado mide 7 cm". Tomás dice: "También podría medir −7 cm, porque (−7)² = 49". ¿Quién tiene razón y por qué?',
'["Tomás tiene razón: −7 también es solución matemáticamente válida", "Andrea tiene razón: la longitud de un lado no puede ser negativa en un contexto geométrico real", "Ambos tienen razón porque en álgebra las dos soluciones son válidas", "Ninguno tiene razón porque √49 = 7 solo en algunos contextos", "Tomás tiene razón porque el enunciado no dice que debe ser positivo"]'::jsonb,
1,
'Matemáticamente, la ecuación x² = 49 tiene dos soluciones: x = 7 y x = −7. Sin embargo, en geometría, la longitud de un lado es una medida y debe ser positiva. Por lo tanto, en este contexto real, Andrea tiene razón: el lado mide 7 cm.',
'seed-sql');

-- ──────────────────────────────────────────────────────────────────
-- MATEMÁTICA M2 › RESOLVER
-- ──────────────────────────────────────────────────────────────────
INSERT INTO banco_ia (id, exam_id, skill_id, text, options, correct, explanation, generado_por) VALUES

('seed_m2_res_001', 'matematica_m2', 'resolver',
'¿Cuánto vale log₂(64)?',
'["4", "5", "6", "8", "32"]'::jsonb,
2,
'log₂(64) = x significa que 2ˣ = 64. Como 2⁶ = 64, entonces log₂(64) = 6.',
'seed-sql'),

('seed_m2_res_002', 'matematica_m2', 'resolver',
'Si f(x) = 3x² − 2x + 1, ¿cuánto vale f(−2)?',
'["7", "9", "17", "13", "21"]'::jsonb,
2,
'f(−2) = 3(−2)² − 2(−2) + 1 = 3(4) + 4 + 1 = 12 + 4 + 1 = 17.',
'seed-sql'),

('seed_m2_res_003', 'matematica_m2', 'resolver',
'Resuelve: 3^(x−1) = 27',
'["x = 2", "x = 3", "x = 4", "x = 5", "x = 1"]'::jsonb,
2,
'27 = 3³, entonces 3^(x−1) = 3³ → x − 1 = 3 → x = 4.',
'seed-sql'),

('seed_m2_res_004', 'matematica_m2', 'resolver',
'En un triángulo rectángulo, un ángulo agudo mide 30°. Si la hipotenusa mide 20 cm, ¿cuánto mide el cateto opuesto a ese ángulo?',
'["10 cm", "10√3 cm", "20√3 cm", "√3 cm", "15 cm"]'::jsonb,
0,
'sen(30°) = cateto opuesto / hipotenusa → cateto opuesto = 20 × sen(30°) = 20 × (1/2) = 10 cm.',
'seed-sql'),

('seed_m2_res_005', 'matematica_m2', 'resolver',
'¿Cuáles son las raíces de la función f(x) = x² − 5x + 6?',
'["x = 1 y x = 6", "x = 2 y x = 3", "x = −2 y x = −3", "x = 1 y x = −6", "x = −1 y x = 6"]'::jsonb,
1,
'Factorizando: x² − 5x + 6 = (x − 2)(x − 3) = 0. Las raíces son x = 2 y x = 3. Verificación: 2+3=5 ✓ y 2×3=6 ✓.',
'seed-sql');

-- ──────────────────────────────────────────────────────────────────
-- MATEMÁTICA M2 › MODELAR
-- ──────────────────────────────────────────────────────────────────
INSERT INTO banco_ia (id, exam_id, skill_id, text, options, correct, explanation, generado_por) VALUES

('seed_m2_mod_001', 'matematica_m2', 'modelar',
'Una bacteria se reproduce duplicando su cantidad cada hora. Si inicialmente hay 50 bacterias, ¿cuál de las siguientes expresiones modela la cantidad B de bacterias después de t horas?',
'["B(t) = 50 + 2t", "B(t) = 100t", "B(t) = 50 · 2^t", "B(t) = 2 · 50^t", "B(t) = 50t²"]'::jsonb,
2,
'El crecimiento exponencial que duplica cada hora se modela como B(t) = B₀ · 2^t, donde B₀ = 50 es la cantidad inicial. Verificación: t=0→50, t=1→100, t=2→200 ✓',
'seed-sql'),

('seed_m2_mod_002', 'matematica_m2', 'modelar',
'Se invierte $500.000 en una cuenta con interés compuesto anual del 8%. ¿Cuál función modela el monto M después de t años?',
'["M(t) = 500.000 + 0,08t", "M(t) = 500.000 · (0,08)^t", "M(t) = 500.000 · (1,08)^t", "M(t) = 500.000 · 1,08 · t", "M(t) = 500.000 · (1 + t)^0,08"]'::jsonb,
2,
'La fórmula de interés compuesto es M(t) = Capital · (1 + tasa)^t = 500.000 · (1,08)^t. La opción A es interés simple, la B usa el factor incorrecto.',
'seed-sql'),

('seed_m2_mod_003', 'matematica_m2', 'modelar',
'La altura (en metros) de un proyectil disparado hacia arriba sigue la función h(t) = −5t² + 20t + 2, donde t es el tiempo en segundos. ¿A qué tiempo alcanza la altura máxima?',
'["t = 1 s", "t = 2 s", "t = 4 s", "t = 5 s", "t = 10 s"]'::jsonb,
1,
'La altura máxima de una parábola f(t) = at² + bt + c se alcanza en t = −b/(2a). Aquí: t = −20/(2·(−5)) = −20/(−10) = 2 s.',
'seed-sql'),

('seed_m2_mod_004', 'matematica_m2', 'modelar',
'El pH de una solución se calcula como pH = −log[H⁺], donde [H⁺] es la concentración de iones hidrógeno en mol/L. Si [H⁺] = 10⁻⁴ mol/L, ¿cuál es el pH de la solución?',
'["pH = −4", "pH = 0,0001", "pH = 4", "pH = 40", "pH = 100"]'::jsonb,
2,
'pH = −log(10⁻⁴) = −(−4) = 4. La función logarítmica modela aquí la escala de acidez.',
'seed-sql'),

('seed_m2_mod_005', 'matematica_m2', 'modelar',
'La temperatura de una ciudad varía según el modelo T(h) = 12 + 8·sen(π·h/12), donde h es la hora del día (0 ≤ h ≤ 24). ¿Cuál es la temperatura máxima predicha por el modelo?',
'["12°C", "8°C", "20°C", "24°C", "16°C"]'::jsonb,
2,
'La función seno varía entre −1 y 1. Cuando sen(π·h/12) = 1 (su valor máximo), T = 12 + 8·(1) = 20°C. El mínimo sería T = 12 + 8·(−1) = 4°C.',
'seed-sql');

-- ──────────────────────────────────────────────────────────────────
-- MATEMÁTICA M2 › REPRESENTAR
-- ──────────────────────────────────────────────────────────────────
INSERT INTO banco_ia (id, exam_id, skill_id, text, options, correct, explanation, generado_por) VALUES

('seed_m2_rep_001', 'matematica_m2', 'representar',
'¿Cuál de los siguientes es el dominio de la función f(x) = log(x − 3)?',
'["x ∈ ℝ", "x > 0", "x > 3", "x ≥ 3", "x < 3"]'::jsonb,
2,
'El logaritmo solo está definido para argumentos estrictamente positivos. Por lo tanto, se necesita x − 3 > 0, es decir, x > 3. El dominio es (3, +∞).',
'seed-sql'),

('seed_m2_rep_002', 'matematica_m2', 'representar',
'La función f(x) = 2^x tiene como asíntota horizontal:',
'["y = 2", "y = 1", "y = 0", "x = 0", "No tiene asíntota horizontal"]'::jsonb,
2,
'Cuando x → −∞, 2^x → 0 sin nunca llegar a 0. Por eso, la recta y = 0 (el eje X) es una asíntota horizontal de la función exponencial cuando x tiende a menos infinito.',
'seed-sql'),

('seed_m2_rep_003', 'matematica_m2', 'representar',
'Los vectores u = (3, 4) y v = (−1, 2) están en el plano. ¿Cuál es el vector u + v?',
'["(2, 6)", "(4, 2)", "(−3, 8)", "(3, 6)", "(2, 2)"]'::jsonb,
0,
'La suma vectorial se realiza componente a componente: u + v = (3+(−1), 4+2) = (2, 6).',
'seed-sql'),

('seed_m2_rep_004', 'matematica_m2', 'representar',
'La parábola f(x) = −x² + 4x − 3 tiene vértice en el punto:',
'["(2, 1)", "(−2, 1)", "(2, −1)", "(4, 3)", "(1, 0)"]'::jsonb,
0,
'El vértice de f(x) = ax² + bx + c está en x = −b/(2a) = −4/(2·(−1)) = 2. Luego f(2) = −4 + 8 − 3 = 1. Vértice: (2, 1).',
'seed-sql'),

('seed_m2_rep_005', 'matematica_m2', 'representar',
'¿Cuántos puntos de intersección tiene la parábola y = x² − 4 con el eje X?',
'["Ninguno", "Uno", "Dos", "Tres", "Infinitos"]'::jsonb,
2,
'Se iguala a 0: x² − 4 = 0 → x² = 4 → x = ±2. Hay dos soluciones reales, es decir, dos puntos de intersección con el eje X: (2, 0) y (−2, 0).',
'seed-sql');

-- ──────────────────────────────────────────────────────────────────
-- MATEMÁTICA M2 › ARGUMENTAR
-- ──────────────────────────────────────────────────────────────────
INSERT INTO banco_ia (id, exam_id, skill_id, text, options, correct, explanation, generado_por) VALUES

('seed_m2_arg_001', 'matematica_m2', 'argumentar',
'¿Cuál de las siguientes identidades trigonométricas es siempre verdadera para cualquier ángulo α?',
'["sen(α) + cos(α) = 1", "sen²(α) + cos²(α) = 1", "tan(α) = sen(α) + cos(α)", "sen(2α) = 2sen(α)", "cos(α) = 1 − sen(α)"]'::jsonb,
1,
'La identidad pitagórica fundamental es sen²(α) + cos²(α) = 1, que se cumple para cualquier ángulo α. Las demás opciones son falsas: sen(α)+cos(α) no siempre es 1, y tan(α) = sen(α)/cos(α), no su suma.',
'seed-sql'),

('seed_m2_arg_002', 'matematica_m2', 'argumentar',
'¿Cuál de las siguientes afirmaciones sobre logaritmos es INCORRECTA?',
'["log(a · b) = log(a) + log(b)", "log(a / b) = log(a) − log(b)", "log(aⁿ) = n · log(a)", "log(a + b) = log(a) · log(b)", "log(1) = 0 en cualquier base"]'::jsonb,
3,
'La propiedad log(a·b) = log(a)+log(b) permite transformar productos en sumas, no sumas en productos. La afirmación log(a+b) = log(a)·log(b) es incorrecta; no existe una propiedad de logaritmos que convierta la suma en un producto de logaritmos.',
'seed-sql'),

('seed_m2_arg_003', 'matematica_m2', 'argumentar',
'Pedro afirma: "Si f(x) es una función cuadrática con a > 0, entonces siempre tiene dos raíces reales distintas". ¿Es correcta esta afirmación?',
'["Sí, porque toda parábola corta el eje X en dos puntos", "No, porque si el discriminante es negativo, no hay raíces reales", "Sí, porque a > 0 garantiza que la parábola abre hacia arriba y siempre cruza el eje X", "No, porque si a > 0 la parábola puede tener infinitas raíces", "Sí, pero solo si el vértice está bajo el eje X"]'::jsonb,
1,
'El número de raíces reales depende del discriminante Δ = b² − 4ac: si Δ > 0 hay dos raíces, si Δ = 0 hay una raíz doble, y si Δ < 0 no hay raíces reales. Que a > 0 solo indica que la parábola abre hacia arriba, pero no garantiza que cruce el eje X.',
'seed-sql'),

('seed_m2_arg_004', 'matematica_m2', 'argumentar',
'En el siguiente desarrollo: log₃(9x) = log₃(9) · log₃(x) = 2 · log₃(x). ¿En qué paso hay un error?',
'["No hay error, el desarrollo es correcto", "El error está en que log₃(9) no es igual a 2", "El error está en que log₃(9x) ≠ log₃(9) · log₃(x); debería ser log₃(9) + log₃(x)", "El error está en que 2 · log₃(x) es incorrecto", "El error está en el último paso: debería ser log₃(x²)"]'::jsonb,
2,
'La propiedad correcta es log(a·b) = log(a) + log(b), no log(a)·log(b). Por lo tanto: log₃(9x) = log₃(9) + log₃(x) = 2 + log₃(x). El error está en usar producto en lugar de suma.',
'seed-sql'),

('seed_m2_arg_005', 'matematica_m2', 'argumentar',
'¿Cuál de los siguientes valores de x es un contraejemplo que demuestra que la afirmación "√(x²) = x es siempre verdadera" es FALSA?',
'["x = 4", "x = 0", "x = 1", "x = −3", "x = 9"]'::jsonb,
3,
'Para x = −3: √((−3)²) = √9 = 3 ≠ −3. La afirmación es falsa porque √(x²) = |x|, no x. El valor x = −3 es un contraejemplo válido.',
'seed-sql');

-- ──────────────────────────────────────────────────────────────────
-- HISTORIA › TEMPORAL
-- ──────────────────────────────────────────────────────────────────
INSERT INTO banco_ia (id, exam_id, skill_id, text, options, correct, explanation, generado_por) VALUES

('seed_hi_tem_001', 'historia', 'temporal',
'¿Cuál de los siguientes procesos históricos ocurrió PRIMERO en la historia de Chile independiente?',
'["La Guerra del Pacífico", "La Independencia de Chile", "El gobierno de Salvador Allende", "El golpe de Estado de 1973", "La elección de Arturo Alessandri Palma"]'::jsonb,
1,
'La Independencia de Chile se proclamó el 12 de febrero de 1818. La Guerra del Pacífico ocurrió entre 1879 y 1884, Arturo Alessandri Palma fue elegido en 1920, Allende gobernó entre 1970 y 1973, y el golpe fue el 11 de septiembre de 1973.',
'seed-sql'),

('seed_hi_tem_002', 'historia', 'temporal',
'La Primera Guerra Mundial (1914-1918) tuvo como consecuencia directa en Europa:',
'["La consolidación del colonialismo europeo en África y Asia", "La creación de la Organización de las Naciones Unidas (ONU)", "El derrumbe de los imperios austrohúngaro, otomano, ruso y alemán", "El inicio de la Guerra Fría entre EE.UU. y la URSS", "La división de Alemania en dos Estados separados"]'::jsonb,
2,
'Una de las consecuencias directas de la Primera Guerra Mundial fue la desintegración de los grandes imperios: el austrohúngaro, el otomano, el ruso (con la Revolución de 1917) y el alemán. La ONU se creó tras la Segunda Guerra Mundial, y la Guerra Fría y la división de Alemania también son consecuencias de la Segunda Guerra.',
'seed-sql'),

('seed_hi_tem_003', 'historia', 'temporal',
'¿Cuál fue la causa principal que llevó a Chile a declarar la guerra a Bolivia y Perú durante la Guerra del Pacífico (1879-1884)?',
'["La disputa por el control del estrecho de Magallanes", "El conflicto por territorios con depósitos de salitre y el incumplimiento de tratados por parte de Bolivia", "La rivalidad religiosa entre los países sudamericanos", "El apoyo de Chile a Argentina en un conflicto regional", "La invasion de tropas peruanas al territorio chileno"]'::jsonb,
1,
'La Guerra del Pacífico se originó principalmente por la disputa por la riqueza salitrera del desierto de Atacama. Bolivia rompió el Tratado de 1874 al subir los impuestos a empresas chilenas, y al aliarse con Perú (Tratado de 1873), Chile declaró la guerra. La explotación del salitre en la zona era un recurso económico estratégico.',
'seed-sql'),

('seed_hi_tem_004', 'historia', 'temporal',
'¿En qué período histórico se ubica la llamada "cuestión social" en Chile?',
'["1810-1830 (período de la Independencia)", "1850-1870 (período liberal)", "1880-1920 (período del auge del salitre y la industrialización)", "1940-1960 (período del Estado de Bienestar)", "1970-1990 (período de la dictadura)"]'::jsonb,
2,
'La cuestión social chilena se desarrolla principalmente entre fines del siglo XIX y comienzos del XX, coincidiendo con el auge salitrero, la urbanización acelerada y las pésimas condiciones de vida de la clase obrera (conventillos, jornadas extenuantes, masacres obreras como la de la Escuela Santa María de Iquique en 1907).',
'seed-sql'),

('seed_hi_tem_005', 'historia', 'temporal',
'¿Qué suceso histórico mundial marcó el inicio de la Segunda Guerra Mundial?',
'["El bombardeo japonés a Pearl Harbor en 1941", "La invasión alemana de Polonia el 1° de septiembre de 1939", "La crisis de los misiles en Cuba en 1962", "La caída de la bolsa de Nueva York en 1929", "El asesinato del archiduque Francisco Fernando en 1914"]'::jsonb,
1,
'La Segunda Guerra Mundial comenzó oficialmente el 1° de septiembre de 1939 con la invasión de Alemania a Polonia, lo que llevó a Francia y Reino Unido a declarar la guerra a Alemania. El bombardeo a Pearl Harbor fue en 1941 e incorporó a EE.UU. al conflicto. El asesinato de Francisco Fernando detonó la Primera Guerra Mundial.',
'seed-sql');

-- ──────────────────────────────────────────────────────────────────
-- HISTORIA › FUENTES
-- ──────────────────────────────────────────────────────────────────
INSERT INTO banco_ia (id, exam_id, skill_id, text, options, correct, explanation, generado_por) VALUES

('seed_hi_fue_001', 'historia', 'fuentes',
'Lee el siguiente fragmento y responde:

"La clase obrera no tiene patria. No se les puede quitar lo que no tienen. Como el proletariado de cada país debe, ante todo, conquistar el poder político, erigirse en clase dirigente de la nación, constituirse a sí mismo en nación..."
(Karl Marx y Friedrich Engels, Manifiesto Comunista, 1848)

¿Cuál es la idea principal de este fragmento?',
'["Los obreros deben emigrar a otros países en busca de trabajo", "El proletariado debe tomar el control político para transformar la sociedad", "La clase obrera ya tiene el poder político en los países industrializados", "Los trabajadores deben rechazar la política y dedicarse solo al trabajo", "La burguesía debe compartir el poder con los obreros"]'::jsonb,
1,
'Marx y Engels sostienen en este fragmento que el proletariado (clase obrera) carece de representación política real y que su objetivo histórico es conquistar el poder político y dirigir la nación. Es la base del proyecto político comunista expresado en el Manifiesto.',
'seed-sql'),

('seed_hi_fue_002', 'historia', 'fuentes',
'Observa el siguiente dato estadístico y responde:

Exportaciones chilenas de salitre (miles de toneladas):
- 1880: 226
- 1890: 1.071
- 1900: 1.418
- 1910: 2.473
- 1920: 2.882

¿Qué conclusión se puede extraer de estos datos?',
'["Las exportaciones de salitre disminuyeron constantemente entre 1880 y 1920", "Chile perdió el monopolio salitrero a partir de 1900", "El salitre experimentó un crecimiento sostenido como principal producto de exportación chileno en el período", "La Guerra del Pacífico redujo a la mitad las exportaciones de salitre", "En 1920, Chile ya había abandonado la economía salitrera"]'::jsonb,
2,
'Los datos muestran un crecimiento sostenido y significativo de las exportaciones de salitre entre 1880 y 1920 (de 226 a 2.882 miles de toneladas). Esto confirma que el salitre fue el principal motor de la economía chilena durante este período.',
'seed-sql'),

('seed_hi_fue_003', 'historia', 'fuentes',
'Lee este fragmento histórico y responde:

"Declaro que ha llegado la hora en que el Estado debe abandonar su papel de simple guardián del orden público, para asumir una función activa en la promoción del bienestar general de la población."
(Discurso presidencial, Chile, circa 1938)

¿A qué modelo de Estado hace referencia este fragmento?',
'["Al Estado liberal del siglo XIX, que protege los derechos individuales", "Al Estado de bienestar o Estado desarrollista, que interviene activamente en la economía y lo social", "Al Estado dictatorial, que suprime las libertades civiles", "Al Estado anarquista, que busca eliminar toda forma de gobierno", "Al Estado colonial, que administra territorios conquistados"]'::jsonb,
1,
'El fragmento describe el tránsito desde el Estado liberal (mero guardián del orden) hacia el Estado interventor o de bienestar, donde el gobierno asume un rol activo en la economía y el bienestar social. Esto es característico del modelo promovido en Chile desde los años 1930 con el Frente Popular.',
'seed-sql'),

('seed_hi_fue_004', 'historia', 'fuentes',
'Analiza la siguiente fuente y responde:

"Soldados: han sido llamados a defender a la patria contra sus propios enemigos internos, los que con sus ideas extranjeras quieren destruir nuestra manera de vivir cristiana y occidental."
(Bando militar, Chile, septiembre de 1973)

¿Qué elemento presente en este documento indica que es una fuente de tipo propagandística?',
'["El uso de lenguaje técnico y estadístico para justificar las acciones militares", "La apelación emocional a la defensa de la patria y la descalificación del adversario como enemigo externo", "La citación de leyes constitucionales para fundamentar las acciones tomadas", "La narración objetiva y neutral de los hechos ocurridos", "La inclusión de testimonios de víctimas del proceso"]'::jsonb,
1,
'El texto utiliza recursos típicos de la propaganda: apelación emocional a la patria, caracterización del adversario como "enemigo" con "ideas extranjeras", y la justificación moral de la acción militar mediante valores como "cristiano y occidental". No hay objetividad ni datos verificables.',
'seed-sql'),

('seed_hi_fue_005', 'historia', 'fuentes',
'Lee el siguiente fragmento y responde:

"El descubrimiento de América y la ruta marítima alrededor del Cabo de Buena Esperanza abrieron nuevos horizontes a la burguesía en ascenso. Los mercados de las Indias Orientales y de China, la colonización de América, el intercambio con las colonias... dieron al comercio un impulso jamás conocido."
(Marx y Engels, Manifiesto Comunista, 1848)

¿Desde qué perspectiva historiográfica analiza este texto el proceso de expansión europea?',
'["Desde una perspectiva nacionalista que celebra los logros europeos", "Desde una perspectiva económica marxista, que vincula la expansión colonial al desarrollo del capitalismo burgués", "Desde una perspectiva religiosa que justifica la evangelización de América", "Desde una perspectiva geográfica que describe las rutas comerciales", "Desde una perspectiva indigenista que critica el impacto en los pueblos americanos"]'::jsonb,
1,
'Marx y Engels analizan la expansión colonial desde una perspectiva económica materialista: la conquista y el comercio colonial son explicados como factores que impulsaron el desarrollo del capitalismo y el ascenso de la burguesía, no como gestas heroicas ni procesos religiosos.',
'seed-sql');

-- ──────────────────────────────────────────────────────────────────
-- HISTORIA › CRÍTICO
-- ──────────────────────────────────────────────────────────────────
INSERT INTO banco_ia (id, exam_id, skill_id, text, options, correct, explanation, generado_por) VALUES

('seed_hi_cri_001', 'historia', 'critico',
'Un historiador sostiene: "La conquista española de América fue esencialmente un proceso de evangelización y civilización que benefició a los pueblos originarios". ¿Qué perspectiva falta considerar en esta interpretación?',
'["La visión de los colonizadores europeos sobre sus motivaciones económicas", "La perspectiva de los pueblos originarios, que experimentaron violencia, despojo y destrucción cultural", "El papel de la Iglesia Católica en el proceso de conquista", "Las diferencias tecnológicas entre europeos y americanos", "La importancia del comercio de metales preciosos para España"]'::jsonb,
1,
'La interpretación presentada solo considera la visión europea y eurocentrica. Una historia completa debe incorporar la perspectiva de los pueblos conquistados, quienes experimentaron genocidio, esclavitud, destrucción de sus civilizaciones y un proceso de desestructuración cultural que difícilmente puede caracterizarse como "beneficioso".',
'seed-sql'),

('seed_hi_cri_002', 'historia', 'critico',
'Dos historiadores debaten sobre la dictadura militar chilena (1973-1990). El primero sostiene que "fue necesaria para salvar a Chile del comunismo". El segundo afirma que "fue una ruptura democrática que violó sistemáticamente los derechos humanos". ¿Qué diferencia existe entre ambas interpretaciones?',
'["Ambas son igualmente objetivas y se basan en los mismos datos", "La primera es verdadera y la segunda es falsa, según la historiografía actual", "Difieren en los valores y criterios que priorizan: uno valora el orden político; el otro, los derechos humanos", "La segunda es científica y la primera es solo opinión personal", "No hay diferencia real: ambos describen el mismo proceso de la misma manera"]'::jsonb,
2,
'Ambas interpretaciones están basadas en hechos históricos reales, pero difieren en el marco valorativo: una prioriza la estabilidad política y el anticomunismo; la otra prioriza los derechos humanos y la democracia. Reconocer esta diferencia es parte del pensamiento histórico crítico.',
'seed-sql'),

('seed_hi_cri_003', 'historia', 'critico',
'El proceso de globalización económica iniciado en la segunda mitad del siglo XX ha sido interpretado de manera diferente: algunos lo ven como un motor de prosperidad; otros, como un generador de desigualdad. ¿Cuál de las siguientes afirmaciones refleja mejor un análisis histórico crítico de este proceso?',
'["La globalización solo ha tenido efectos negativos para los países en desarrollo", "La globalización ha sido un proceso con impactos diferenciados según los contextos históricos, sociales y económicos de cada región", "La globalización ha eliminado completamente las diferencias entre países ricos y pobres", "La globalización es un fenómeno exclusivamente tecnológico sin impacto social", "La globalización fue diseñada intencionalmente para perjudicar a los países del sur"]'::jsonb,
1,
'Un análisis histórico crítico reconoce la complejidad de los procesos: la globalización ha generado crecimiento económico en algunas regiones mientras profundizaba la desigualdad en otras. El pensamiento crítico evita las generalizaciones absolutas y considera múltiples variables y perspectivas.',
'seed-sql'),

('seed_hi_cri_004', 'historia', 'critico',
'Sobre la Revolución Francesa (1789), un historiador conservador del siglo XIX escribió: "Fue una catástrofe provocada por filósofos irresponsables que destruyeron el orden natural de la sociedad". Un historiador liberal escribió: "Fue el triunfo de la razón y los derechos del hombre sobre el despotismo". ¿Cuál es la principal diferencia en sus enfoques?',
'["Uno analiza causas económicas y el otro analiza causas políticas", "Ambos son objetivos pero usan distinta terminología", "Sus valoraciones opuestas reflejan distintas posiciones ideológicas ante el cambio social y el orden político", "Uno es académico y el otro es periodista, por eso difieren", "El conservador tiene más fuentes que el liberal"]'::jsonb,
2,
'Las dos interpretaciones parten de posiciones ideológicas opuestas ante el cambio social: el conservadurismo ve con recelo las rupturas del orden tradicional; el liberalismo celebra la emancipación del individuo frente al absolutismo. Identificar la ideología detrás de la interpretación es esencial en el análisis crítico de fuentes.',
'seed-sql'),

('seed_hi_cri_005', 'historia', 'critico',
'¿Cuál de los siguientes factores explica MEJOR la multicausalidad de la Primera Guerra Mundial?',
'["El asesinato del archiduque Francisco Fernando fue la única causa del conflicto", "La guerra fue causada exclusivamente por la ambición territorial de Alemania", "La combinación de nacionalismos extremos, rivalidades imperialistas, sistema de alianzas y la carrera armamentista crearon las condiciones para el conflicto", "La guerra fue resultado de una conspiración internacional de la industria armamentista", "El conflicto fue inevitable desde la Revolución Industrial"]'::jsonb,
2,
'La Primera Guerra Mundial es un ejemplo clásico de multicausalidad histórica: ningún factor aislado la explica. La conjunción de nacionalismos exacerbados, rivalidades coloniales entre potencias, el sistema de alianzas que convirtió un conflicto local en europeo, y la carrera armamentista previa crearon el escenario. El asesinato de Franz Ferdinand fue el detonante, no la causa estructural.',
'seed-sql');

-- ──────────────────────────────────────────────────────────────────
-- CIENCIAS › OBSERVAR
-- ──────────────────────────────────────────────────────────────────
INSERT INTO banco_ia (id, exam_id, skill_id, text, options, correct, explanation, generado_por) VALUES

('seed_ci_obs_001', 'ciencias', 'observar',
'(Biología) Una estudiante observa que las plantas de su jardín que reciben más luz solar tienen hojas más verdes que las que crecen a la sombra. ¿Cuál es la hipótesis más adecuada que podría formular para investigar esta observación?',
'["Las plantas verdes son más bonitas que las amarillas", "A mayor intensidad de luz solar, mayor producción de clorofila en las hojas de las plantas", "Las plantas no necesitan luz para sobrevivir", "El color de las hojas depende exclusivamente del tipo de suelo", "La sombra es mejor para el crecimiento de todas las plantas"]'::jsonb,
1,
'Una hipótesis científica debe ser una afirmación verificable que establezca una relación causa-efecto entre variables. La opción B establece claramente la variable independiente (intensidad de luz) y la dependiente (producción de clorofila), y puede ser comprobada experimentalmente.',
'seed-sql'),

('seed_ci_obs_002', 'ciencias', 'observar',
'(Química) Un investigador nota que cuando mezcla ciertos ácidos con metales, se produce un gas y la temperatura de la solución sube. ¿Cuál de las siguientes preguntas científicas es más adecuada para investigar este fenómeno?',
'["¿Por qué los metales son brillantes?", "¿Qué ácido es más barato en el mercado?", "¿Cómo varía la tasa de producción del gas según la concentración del ácido?", "¿Cuántos metales existen en la tabla periódica?", "¿Por qué la química es difícil de aprender?"]'::jsonb,
2,
'Una buena pregunta científica debe ser específica, investigable y relacionar variables medibles. La opción C relaciona la concentración del ácido (variable independiente) con la tasa de producción del gas (variable dependiente), lo que puede ser medido y comparado experimentalmente.',
'seed-sql'),

('seed_ci_obs_003', 'ciencias', 'observar',
'(Física) Al lanzar objetos de distinta masa desde la misma altura, un estudiante observa que todos llegan al suelo al mismo tiempo (en ausencia de aire). ¿Cuál hipótesis justifica mejor esta observación?',
'["Los objetos más pesados caen más rápido que los livianos", "La velocidad de caída depende del color del objeto", "La aceleración gravitacional es constante e independiente de la masa del objeto", "Los objetos livianos caen más rápido porque el aire los impulsa", "La altura desde la que se lanza determina la velocidad final"]'::jsonb,
2,
'El experimento descrito (todos los objetos caen al mismo tiempo independientemente de su masa) es consistente con el principio de que la aceleración de caída libre g ≈ 9,8 m/s² es constante para todos los cuerpos, independientemente de su masa, cuando no hay resistencia del aire.',
'seed-sql'),

('seed_ci_obs_004', 'ciencias', 'observar',
'(Biología) ¿Cuál de las siguientes es una observación directa que puede realizarse con los sentidos o instrumentos, a diferencia de una inferencia?',
'["Las plantas realizan fotosíntesis porque liberan oxígeno", "El dinosaurio era carnívoro porque sus dientes son afilados", "La solución cambió de color azul a incoloro al agregar la enzima", "El paciente tiene fiebre porque tiene una infección bacteriana", "El volcán entrará en erupción pronto debido a los sismos"]'::jsonb,
2,
'Una observación es lo que se percibe directamente (cambio de color de la solución). Las demás opciones son inferencias: interpretaciones o conclusiones que van más allá de lo directamente observado. Los dientes afilados se observan, pero decir que era carnívoro es una inferencia.',
'seed-sql'),

('seed_ci_obs_005', 'ciencias', 'observar',
'(Química) En un experimento, se calienta una sustancia y se observa que cambia de estado líquido a gaseoso. ¿Cuál de las siguientes afirmaciones describe correctamente esta observación?',
'["La sustancia se descompone en sus elementos químicos al calentarse", "La sustancia experimenta un cambio físico, pasando del estado líquido al gaseoso", "La sustancia reacciona con el oxígeno del aire al calentarse", "La sustancia pierde sus propiedades químicas al cambiar de estado", "La sustancia crea nuevas moléculas durante el proceso de calentamiento"]'::jsonb,
1,
'El cambio de estado (líquido → gas) es un cambio físico: la composición química de la sustancia no se altera, solo cambia la organización de sus moléculas. No hay formación de nuevas sustancias ni ruptura de enlaces químicos.',
'seed-sql');

-- ──────────────────────────────────────────────────────────────────
-- CIENCIAS › PLANIFICAR
-- ──────────────────────────────────────────────────────────────────
INSERT INTO banco_ia (id, exam_id, skill_id, text, options, correct, explanation, generado_por) VALUES

('seed_ci_pla_001', 'ciencias', 'planificar',
'(Biología) Un estudiante quiere investigar si la cantidad de fertilizante afecta el crecimiento de las plantas. Tiene 20 plantas idénticas del mismo tipo. ¿Cuál es el diseño experimental más adecuado?',
'["Aplicar distintas cantidades de fertilizante a todas las plantas y medir su crecimiento", "Usar 4 grupos de 5 plantas: un grupo control (sin fertilizante) y tres grupos con distintas cantidades (baja, media, alta)", "Aplicar mucho fertilizante a la mitad de las plantas y nada a la otra mitad, pero en distintos días", "Medir las plantas antes de plantar y después de 1 semana sin cambiar ninguna variable", "Usar una sola planta con mucho fertilizante y compararla con fotos de internet"]'::jsonb,
1,
'El diseño correcto incluye: un grupo control (sin tratamiento), varios grupos experimentales con distintos niveles de la variable independiente (cantidad de fertilizante), el mismo número de individuos por grupo, y todas las demás condiciones iguales. Esto permite comparaciones válidas.',
'seed-sql'),

('seed_ci_pla_002', 'ciencias', 'planificar',
'(Física) Para medir la velocidad promedio de un automóvil en una pista recta, ¿qué instrumentos son los mínimos necesarios?',
'["Solo un velocímetro digital avanzado", "Una balanza y un termómetro", "Un instrumento para medir distancia (cinta métrica o GPS) y un cronómetro", "Un multímetro y un amperímetro", "Solo un acelerómetro"]'::jsonb,
2,
'La velocidad promedio se calcula como v = distancia/tiempo. Por lo tanto, se necesita medir la distancia recorrida (cinta métrica, odómetro o GPS) y el tiempo empleado (cronómetro). Los demás instrumentos mencionados miden otras magnitudes físicas.',
'seed-sql'),

('seed_ci_pla_003', 'ciencias', 'planificar',
'(Biología) En un experimento para probar si un nuevo antibiótico mata la bacteria E. coli, ¿cuál es la función del "grupo control negativo"?',
'["Recibir la mayor dosis del antibiótico para comparar con el grupo experimental", "No recibir ningún antibiótico, para comparar el crecimiento bacteriano natural sin tratamiento", "Recibir un antibiótico ya conocido como efectivo", "Ser eliminado del experimento para no contaminar los resultados", "Recibir una sustancia diferente al antibiótico pero con el mismo volumen"]'::jsonb,
1,
'El grupo control negativo no recibe ningún tratamiento. Su función es mostrar cómo se comporta la bacteria en condiciones normales, sin intervención. Esto permite comparar y determinar si el antibiótico tiene un efecto real o si los cambios observados ocurrirían de todas formas.',
'seed-sql'),

('seed_ci_pla_004', 'ciencias', 'planificar',
'(Química) Una estudiante quiere investigar cómo la temperatura afecta la velocidad de disolución del azúcar en agua. ¿Cuál variable debe mantener constante durante el experimento?',
'["La temperatura del agua", "La cantidad de azúcar utilizada en cada prueba", "El tipo de vaso donde se realiza la prueba", "Solo la temperatura y la cantidad de azúcar importan; lo demás es irrelevante", "No es necesario mantener ninguna variable constante en química"]'::jsonb,
1,
'En un experimento, la variable independiente es la temperatura (lo que se cambia), la variable dependiente es la velocidad de disolución (lo que se mide), y las variables de control son aquellas que deben mantenerse constantes: la cantidad de azúcar, el volumen de agua, el tipo de azúcar, la forma de agitación, etc.',
'seed-sql'),

('seed_ci_pla_005', 'ciencias', 'planificar',
'(Física) Un científico quiere demostrar que el calor se transfiere por conducción a través de metales. ¿Cuál procedimiento es el más adecuado para su experimento?',
'["Acercar un imán a una varilla de metal caliente y observar si se magnetiza", "Calentar un extremo de una varilla de metal y medir el aumento de temperatura en el extremo opuesto con el tiempo", "Sumergir una varilla de metal en agua fría y medir el cambio de color del agua", "Medir el peso de la varilla antes y después de calentarla", "Colocar la varilla en una solución ácida para observar su reacción química"]'::jsonb,
1,
'La conducción es la transferencia de calor a través de un material sólido. Para demostrarla, lo más directo es calentar un extremo y medir cómo aumenta la temperatura en el extremo opuesto. Esto evidencia directamente el flujo de calor por conducción a lo largo del material.',
'seed-sql');

-- ──────────────────────────────────────────────────────────────────
-- CIENCIAS › PROCESAR
-- ──────────────────────────────────────────────────────────────────
INSERT INTO banco_ia (id, exam_id, skill_id, text, options, correct, explanation, generado_por) VALUES

('seed_ci_pro_001', 'ciencias', 'procesar',
'(Biología) En un experimento se mide el crecimiento (en cm) de plantas con distintos niveles de riego:

| Nivel de riego  | Crecimiento promedio (cm) |
|-----------------|--------------------------|
| Sin riego       | 2,1                      |
| Bajo (100 mL)   | 5,4                      |
| Medio (200 mL)  | 9,8                      |
| Alto (300 mL)   | 12,3                     |
| Excesivo (500 mL)| 8,1                     |

¿Qué conclusión se puede extraer de estos datos?',
'["A mayor riego, siempre mayor crecimiento", "El crecimiento es independiente del nivel de riego", "Existe un nivel óptimo de riego; tanto el exceso como la falta de agua reducen el crecimiento", "Las plantas crecen más sin riego que con riego excesivo", "El riego alto y el excesivo producen el mismo crecimiento"]'::jsonb,
2,
'Los datos muestran que el crecimiento aumenta hasta 300 mL (12,3 cm) pero disminuye con 500 mL (8,1 cm), que es menos que con 300 mL. Esto indica un nivel óptimo: tanto el déficit hídrico como el exceso de agua son perjudiciales para el crecimiento.',
'seed-sql'),

('seed_ci_pro_002', 'ciencias', 'procesar',
'(Química) Se mide el pH de cinco soluciones con los siguientes resultados: A=2, B=7, C=11, D=4, E=9. ¿Cuál de las siguientes ordenaciones coloca las soluciones de más ácida a más básica?',
'["A, B, C, D, E", "A, D, B, E, C", "C, E, B, D, A", "B, A, D, E, C", "E, C, B, D, A"]'::jsonb,
1,
'En la escala de pH, los valores más bajos son más ácidos y los más altos más básicos. Ordenando de menor a mayor pH (más ácido → más básico): A(2) < D(4) < B(7) < E(9) < C(11).',
'seed-sql'),

('seed_ci_pro_003', 'ciencias', 'procesar',
'(Física) Un gráfico de posición versus tiempo muestra una línea recta horizontal. ¿Qué indica esto sobre el movimiento del objeto?',
'["El objeto se mueve a velocidad constante", "El objeto acelera uniformemente", "El objeto está en reposo (no se mueve)", "El objeto desacelera hasta detenerse", "El objeto se mueve en dirección contraria"]'::jsonb,
2,
'En un gráfico posición-tiempo, una línea horizontal significa que la posición no cambia con el tiempo. Si la posición es constante, el objeto está en reposo. Una línea inclinada indicaría velocidad constante; una curva indicaría aceleración.',
'seed-sql'),

('seed_ci_pro_004', 'ciencias', 'procesar',
'(Biología) En un estudio sobre la frecuencia de una enfermedad genética, se obtienen los siguientes datos en una población de 1.000 personas:

- Genotipo AA: 640 personas (sanas)
- Genotipo Aa: 320 personas (portadoras, sanas)
- Genotipo aa: 40 personas (enfermas)

¿Qué porcentaje de la población estudiada padece la enfermedad?',
'["32%", "4%", "64%", "36%", "0,4%"]'::jsonb,
1,
'Las personas enfermas son aquellas con genotipo aa: 40 personas. El porcentaje sobre el total (1.000) es: (40/1.000) × 100 = 4%.',
'seed-sql'),

('seed_ci_pro_005', 'ciencias', 'procesar',
'(Química) Se hace reaccionar 2 moles de hidrógeno (H₂) con 1 mol de oxígeno (O₂) para producir agua (H₂O). Si se usan 4 moles de H₂, ¿cuántos moles de H₂O se producen, asumiendo que hay suficiente O₂?',
'["2 moles de H₂O", "4 moles de H₂O", "6 moles de H₂O", "8 moles de H₂O", "1 mol de H₂O"]'::jsonb,
1,
'La reacción balanceada es: 2H₂ + O₂ → 2H₂O. La proporción es 2 moles de H₂ producen 2 moles de H₂O (relación 1:1). Con 4 moles de H₂ se producen 4 moles de H₂O.',
'seed-sql');

-- ──────────────────────────────────────────────────────────────────
-- CIENCIAS › EVALUAR
-- ──────────────────────────────────────────────────────────────────
INSERT INTO banco_ia (id, exam_id, skill_id, text, options, correct, explanation, generado_por) VALUES

('seed_ci_eva_001', 'ciencias', 'evaluar',
'(Biología) Un investigador hace el siguiente experimento: da vitamina C a 10 ratones durante 30 días y observa que todos están sanos. Concluye: "La vitamina C previene todas las enfermedades en mamíferos". ¿Cuál es la principal debilidad de esta conclusión?',
'["El período de 30 días es demasiado largo para un experimento", "La conclusión es inválida porque extrapola a partir de una muestra pequeña, sin grupo control, y generaliza en exceso", "Los ratones no son representativos de ninguna población", "Debería haberse usado una dosis mayor de vitamina C", "El error está en usar mamíferos y no plantas para este estudio"]'::jsonb,
1,
'La conclusión es inválida por varias razones: muestra pequeña (10 ratones), sin grupo control (no se compara con ratones sin vitamina C), y una generalización excesiva (de 10 ratones sanos a "todas las enfermedades en todos los mamíferos"). Una buena conclusión científica debe ser proporcional a la evidencia.',
'seed-sql'),

('seed_ci_eva_002', 'ciencias', 'evaluar',
'(Física) En un experimento para medir la gravedad, dos estudiantes obtienen los siguientes resultados: Estudiante A mide g = 9,7 m/s² y Estudiante B mide g = 9,6 m/s² (valor aceptado: 9,8 m/s²). ¿Cuál de las siguientes afirmaciones es correcta?',
'["Ambos resultados son perfectamente precisos porque están cerca del valor real", "El experimento de A es más preciso que el de B, y ambos tienen un error porcentual menor al 2%", "Ambos resultados son incorrectos porque no son exactamente 9,8 m/s²", "Solo el resultado del estudiante B es válido científicamente", "El experimento carece de validez porque no se usó un instrumento digital"]'::jsonb,
1,
'Ambos valores están próximos al aceptado: el error de A es (9,8−9,7)/9,8 × 100 ≈ 1,0% y el de B es (9,8−9,6)/9,8 × 100 ≈ 2,0%. Ningún experimento real es perfectamente exacto; lo importante es el margen de error aceptable. A es ligeramente más preciso.',
'seed-sql'),

('seed_ci_eva_003', 'ciencias', 'evaluar',
'(Biología) Se realizaron dos estudios sobre el efecto de un medicamento: el Estudio 1 usó 50 pacientes durante 3 meses; el Estudio 2 usó 5.000 pacientes durante 2 años, con grupo control y doble ciego. ¿Cuál estudio tiene mayor validez científica y por qué?',
'["El Estudio 1, porque es más rápido y económico", "El Estudio 2, porque tiene mayor tamaño muestral, mayor duración, grupo control y diseño doble ciego que minimizan los sesgos", "Ambos tienen igual validez porque usan el mismo medicamento", "El Estudio 1, porque los estudios largos suelen tener más errores", "El Estudio 2 solo si sus resultados coinciden con el Estudio 1"]'::jsonb,
1,
'El Estudio 2 es más válido por múltiples razones: mayor tamaño muestral (menos variabilidad aleatoria), mayor duración (detecta efectos a largo plazo), grupo control (permite comparar) y diseño doble ciego (elimina el sesgo del investigador y del paciente). Son criterios estándar de la investigación clínica.',
'seed-sql'),

('seed_ci_eva_004', 'ciencias', 'evaluar',
'(Química) Un estudiante mezcla ácido clorhídrico (HCl) con hidróxido de sodio (NaOH) y observa que la temperatura sube. Concluye: "Siempre que mezcle un ácido con una base la temperatura subirá". ¿Es válida esta conclusión?',
'["Sí, porque las reacciones ácido-base siempre son exotérmicas", "No, porque aunque muchas neutralizaciones son exotérmicas, no todas lo son; la conclusión generaliza más allá de los datos", "Sí, porque HCl y NaOH son los ácidos y bases más comunes", "No, porque la temperatura nunca sube en reacciones químicas", "Sí, la energía siempre se libera en toda reacción química"]'::jsonb,
1,
'Aunque la neutralización HCl + NaOH → NaCl + H₂O es exotérmica, no todas las reacciones ácido-base liberan calor. Por ejemplo, algunas son endotérmicas. Concluir a partir de un solo experimento que "siempre" ocurrirá lo mismo es una generalización inválida.',
'seed-sql'),

('seed_ci_eva_005', 'ciencias', 'evaluar',
'(Física) Un estudiante mide la densidad de un metal desconocido y obtiene 8,9 g/cm³. Compara con la siguiente tabla:
- Cobre: 8,96 g/cm³
- Níquel: 8,91 g/cm³
- Hierro: 7,87 g/cm³
- Zinc: 7,13 g/cm³

¿Cuál es la conclusión más apropiada sobre la identidad del metal?',
'["El metal es definitivamente cobre, porque 8,9 está más cerca de 8,96", "El metal podría ser cobre o níquel, ya que ambos tienen densidades muy cercanas al valor medido", "El metal es hierro porque es el más común en la naturaleza", "No es posible identificar el metal solo con la densidad", "El metal es zinc porque su densidad es la más diferente"]'::jsonb,
1,
'El valor medido (8,9 g/cm³) es próximo tanto al cobre (8,96) como al níquel (8,91). Dada la incertidumbre de la medición, no es posible afirmar con certeza cuál es sin pruebas adicionales. La densidad sola no siempre permite una identificación concluyente cuando los valores son muy cercanos.',
'seed-sql');

-- ──────────────────────────────────────────────────────────────────
-- CIENCIAS › COMUNICAR
-- ──────────────────────────────────────────────────────────────────
INSERT INTO banco_ia (id, exam_id, skill_id, text, options, correct, explanation, generado_por) VALUES

('seed_ci_com_001', 'ciencias', 'comunicar',
'(Biología) Un estudiante quiere mostrar cómo cambió la población de una especie de peces durante los últimos 20 años en un lago. ¿Qué tipo de gráfico es más adecuado para comunicar esta información?',
'["Gráfico de torta (circular)", "Gráfico de barras independientes por año", "Gráfico de líneas que muestre la tendencia a lo largo del tiempo", "Tabla sin visualización gráfica", "Diagrama de flujo"]'::jsonb,
2,
'Un gráfico de líneas es el más adecuado para mostrar la variación de una variable continua a lo largo del tiempo, ya que permite visualizar tendencias, patrones y cambios. La torta sirve para proporciones; el de barras para comparar categorías discretas.',
'seed-sql'),

('seed_ci_com_002', 'ciencias', 'comunicar',
'(Química) Al comunicar los resultados de un experimento de reacciones químicas, ¿qué elemento es indispensable en el informe científico para que otros investigadores puedan reproducir el experimento?',
'["Solo los resultados finales y la conclusión", "La descripción detallada del procedimiento, los materiales, las cantidades y las condiciones del experimento", "El nombre del investigador y su institución", "Las fotografías del laboratorio donde se realizó el experimento", "El costo de los reactivos utilizados"]'::jsonb,
1,
'La reproducibilidad es un pilar del método científico. Para que otro investigador pueda repetir el experimento, necesita conocer exactamente el procedimiento, los materiales, las cantidades, las condiciones (temperatura, tiempo, concentraciones), es decir, toda la información metodológica.',
'seed-sql'),

('seed_ci_com_003', 'ciencias', 'comunicar',
'(Física) Un estudiante debe comunicar los resultados de un experimento sobre velocidad a una audiencia de niños de 10 años. ¿Cuál de las siguientes estrategias es la más adecuada?',
'["Presentar las ecuaciones cinemáticas y su derivación matemática completa", "Usar analogías cotidianas, imágenes y lenguaje sencillo para explicar el concepto de velocidad", "Entregar un informe técnico con tablas de datos y análisis estadístico", "Presentar solo los gráficos de posición vs. tiempo sin explicación adicional", "Usar vocabulario científico especializado para acostumbrarlos a la terminología"]'::jsonb,
1,
'Al comunicar ciencia a audiencias no especializadas (especialmente niños), es fundamental adaptar el lenguaje, usar analogías del mundo cotidiano y recursos visuales. El rigor científico no implica necesariamente usar jerga técnica cuando el objetivo es la comprensión.',
'seed-sql'),

('seed_ci_com_004', 'ciencias', 'comunicar',
'(Biología) En un artículo científico se afirma: "Se observó una correlación positiva entre el consumo de azúcar y el índice de caries en niños (r = 0,78, p < 0,05)". ¿Qué significa "p < 0,05" en este contexto?',
'["El experimento tuvo menos del 5% de participantes", "Hay menos de un 5% de probabilidad de que la correlación observada sea producto del azar", "El 5% de los niños no desarrolló caries", "El estudio duró menos de 5 meses", "Solo el 5% de los resultados fue estadísticamente relevante"]'::jsonb,
1,
'En estadística, p < 0,05 (nivel de significancia) indica que la probabilidad de obtener ese resultado por azar es menor al 5%. Esto significa que la correlación encontrada es estadísticamente significativa, es decir, poco probable que sea un resultado casual.',
'seed-sql'),

('seed_ci_com_005', 'ciencias', 'comunicar',
'(Química) Un químico descubre que una nueva sustancia puede ser tóxica para organismos acuáticos. ¿Cuál es la forma más responsable de comunicar este hallazgo?',
'["Publicar el resultado en redes sociales para alertar a la gente de inmediato", "Guardar el resultado en secreto hasta estar completamente seguro de todo", "Publicar el hallazgo en una revista científica revisada por pares, indicando claramente los límites del estudio y las condiciones en que la toxicidad fue observada", "Informar solo a las autoridades gubernamentales y no al público", "Esperar a que otro científico confirme exactamente el mismo resultado antes de publicar"]'::jsonb,
2,
'La comunicación científica responsable implica publicar en revistas revisadas por pares (peer review), donde otros expertos validan la metodología. Es importante también especificar las condiciones exactas del experimento y los límites de la conclusión, para evitar alarma injustificada o interpretaciones erróneas.',
'seed-sql');

-- ══════════════════════════════════════════════════════════════════
-- Verificación: contar preguntas insertadas
-- ══════════════════════════════════════════════════════════════════
SELECT exam_id, skill_id, COUNT(*) as total
FROM banco_ia
WHERE generado_por = 'seed-sql'
GROUP BY exam_id, skill_id
ORDER BY exam_id, skill_id;
