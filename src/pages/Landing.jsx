import { useState } from 'react';
import { ArrowRight, GraduationCap, ChevronDown, CheckCircle, Target, BookOpen, TrendingUp, Star, BarChart2, Zap, Shield } from 'lucide-react';
import WaveDecor, { BookStackIcon } from '../components/Decor';
import { exams } from '../data/mockData';

const features = [
  { icon: '📖', title: 'Comprensión Lectora', desc: 'Entrena inferencia, vocabulario contextual, tipos de texto y recursos literarios.' },
  { icon: '📐', title: 'Matemática M1 y M2', desc: 'Álgebra, geometría, estadística, cálculo y trigonometría con retroalimentación inmediata.' },
  { icon: '🌎', title: 'Historia y Cs. Sociales', desc: 'Desde la prehistoria hasta la actualidad: Chile, mundo, geografía y ciudadanía.' },
  { icon: '🧬', title: 'Ciencias', desc: 'Biología, Física y Química con preguntas estilo PAES real y explicaciones detalladas.' },
];

const steps = [
  { n: '01', title: 'Elige tu prueba', desc: 'Selecciona la prueba que quieres practicar y el número de preguntas.' },
  { n: '02', title: 'Responde preguntas', desc: 'Cada pregunta incluye retroalimentación inmediata con la explicación correcta.' },
  { n: '03', title: 'Revisa tu puntaje', desc: 'Al finalizar ves tu puntaje estimado y qué preguntas fallaste.' },
  { n: '04', title: 'Supera tu meta', desc: 'Sigue tu progreso en el tiempo y llega a la PAES con confianza.' },
];

const testimonials = [
  { name: 'Sofía Riquelme', role: '4° Medio, Santiago', text: 'Subí 80 puntos en M1 en solo tres semanas. Las explicaciones de cada pregunta son increíbles.', rating: 5 },
  { name: 'Matías Contreras', role: 'Ex alumno 2025', text: 'El mejor simulador que usé para prepararme. Pasé de 620 a 710 en Comprensión Lectora.', rating: 5 },
  { name: 'Camila Rojas', role: '4° Medio, Temuco', text: 'Me ayudó a identificar exactamente dónde tenía mis puntos débiles. ¡Totalmente recomendado!', rating: 5 },
];

export default function Landing({ onEnter }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen grain" style={{ background: '#f8faff' }}>

      {/* ── Navbar ── */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
        style={{ background: 'rgba(248,250,255,0.93)', borderBottom: '1px solid rgba(12,31,61,0.07)' }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap size={20} style={{ color: '#1d4ed8' }} />
            <span className="font-display font-semibold text-lg" style={{ color: '#0c1f3d' }}>PAES Prep</span>
            <span className="hidden sm:inline text-xs font-medium px-2 py-0.5 rounded-full ml-1"
              style={{ background: 'rgba(59,130,246,0.1)', color: '#1d4ed8' }}>2026</span>
          </div>
          <nav className="hidden md:flex items-center gap-7">
            {['Pruebas', 'Cómo funciona', 'Testimonios'].map(s => (
              <a key={s} href={`#${s.toLowerCase().replace(' ','-')}`}
                className="text-sm font-medium transition-colors"
                style={{ color: 'rgba(12,31,61,0.5)', textDecoration: 'none' }}
                onMouseEnter={e => e.target.style.color = '#1d4ed8'}
                onMouseLeave={e => e.target.style.color = 'rgba(12,31,61,0.5)'}>
                {s}
              </a>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-2">
            <button onClick={onEnter}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #0c1f3d, #1d4ed8)' }}>
              Comenzar gratis
              <ArrowRight size={14} />
            </button>
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <ChevronDown size={22} style={{ color: '#0c1f3d' }} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden px-6 pb-4 space-y-2 border-t" style={{ borderColor: 'rgba(12,31,61,0.06)', background: '#f8faff' }}>
            {['Pruebas', 'Cómo funciona', 'Testimonios'].map(s => (
              <a key={s} href={`#${s.toLowerCase().replace(' ','-')}`}
                onClick={() => setMenuOpen(false)}
                className="block py-2 text-sm font-medium" style={{ color: '#0c1f3d', textDecoration: 'none' }}>
                {s}
              </a>
            ))}
            <button onClick={onEnter}
              className="w-full py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #0c1f3d, #1d4ed8)' }}>
              Comenzar gratis
            </button>
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-0 overflow-hidden" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
        <div className="absolute top-10 right-0 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 65%)', transform: 'translate(20%, -20%)' }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 65%)', transform: 'translate(-25%, 30%)' }} />

        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex flex-wrap gap-2 mb-6 fade-up delay-1">
                {['Comprensión Lectora', 'Matemática', 'Historia', 'Ciencias'].map(g => (
                  <span key={g} className="text-xs font-semibold px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(59,130,246,0.09)', border: '1px solid rgba(59,130,246,0.18)', color: '#1d4ed8' }}>
                    {g}
                  </span>
                ))}
              </div>

              <h1 className="font-display text-5xl md:text-6xl font-light leading-tight mb-5 fade-up delay-2"
                style={{ color: '#0c1f3d' }}>
                Prepárate para<br />
                <em className="font-semibold not-italic" style={{ color: '#1d4ed8' }}>la PAES 2026</em><br />
                <span style={{ fontSize: '0.85em', fontWeight: 300 }}>con confianza real</span>
              </h1>

              <p className="text-base leading-relaxed mb-8 fade-up delay-3 max-w-lg"
                style={{ color: 'rgba(12,31,61,0.55)' }}>
                Practica preguntas estilo PAES con explicaciones detalladas en cada respuesta. Mide tu puntaje estimado, identifica tus debilidades y llega preparado el día de la prueba.
              </p>

              <div className="flex flex-wrap gap-3 fade-up delay-4">
                <button onClick={onEnter}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-white transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #0c1f3d, #1d4ed8)' }}>
                  Comenzar a practicar
                  <ArrowRight size={16} />
                </button>
                <a href="#cómo-funciona"
                  className="flex items-center gap-2 px-7 py-3.5 rounded-2xl font-semibold transition-all hover:scale-105"
                  style={{ color: '#1d4ed8', border: '1.5px solid rgba(29,78,216,0.25)', background: 'transparent', textDecoration: 'none' }}>
                  ¿Cómo funciona?
                </a>
              </div>

              <div className="flex gap-8 mt-10 fade-up delay-5">
                {[['5', 'pruebas PAES', '#1d4ed8'], ['50', 'preguntas banco', '#0891b2'], ['100%', 'gratis', '#f59e0b']].map(([n, l, c]) => (
                  <div key={n}>
                    <p className="font-display text-3xl font-semibold" style={{ color: c }}>{n}</p>
                    <p className="text-xs mt-0.5 max-w-[90px]" style={{ color: 'rgba(12,31,61,0.4)' }}>{l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative hidden md:flex justify-center fade-up delay-3">
              <div className="relative w-[360px] h-[480px]">
                <div className="absolute inset-0 rounded-5xl overflow-hidden"
                  style={{ background: 'linear-gradient(160deg, #0c1f3d, #1d4ed8)', boxShadow: '0 25px 60px rgba(12,31,61,0.35)' }}>
                  <div className="absolute top-8 right-8 w-28 h-28 rounded-full"
                    style={{ background: 'rgba(59,130,246,0.25)' }} />
                  <div className="absolute bottom-12 left-6 w-20 h-20 rounded-full"
                    style={{ background: 'rgba(245,158,11,0.15)' }} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8">
                    <div className="w-full p-4 rounded-2xl text-left"
                      style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
                      <p className="text-white/50 text-xs mb-1">🎯 Tu meta PAES</p>
                      <p className="font-display text-white text-3xl font-semibold">700 pts</p>
                      <div className="mt-2 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
                        <div className="h-2 rounded-full" style={{ width: '72%', background: 'linear-gradient(90deg, #93c5fd, #f59e0b)' }} />
                      </div>
                      <p className="text-white/40 text-xs mt-1">680 pts actuales · 72% del camino</p>
                    </div>
                    <BookStackIcon className="w-36 h-8" color="rgba(147,197,253,0.6)" />
                    <div className="flex flex-wrap gap-2 justify-center">
                      {['M1','M2','Lectora','Historia','Ciencias'].map(t => (
                        <span key={t} className="text-xs font-semibold px-3 py-1.5 rounded-full"
                          style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.12)' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating cards */}
                <div className="absolute -left-16 top-24 px-4 py-3 rounded-2xl"
                  style={{ background: 'white', boxShadow: '0 8px 30px rgba(12,31,61,0.12)', minWidth: 155 }}>
                  <p className="text-xs font-semibold mb-1" style={{ color: '#0c1f3d' }}>Última práctica</p>
                  <p className="font-display text-base" style={{ color: '#1d4ed8' }}>Matemática M1</p>
                  <p className="text-xs" style={{ color: 'rgba(12,31,61,0.4)' }}>695 pts · 7/10 ✓</p>
                </div>

                <div className="absolute -right-14 bottom-28 px-4 py-3 rounded-2xl"
                  style={{ background: 'white', boxShadow: '0 8px 30px rgba(12,31,61,0.12)', minWidth: 140 }}>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="#f59e0b" stroke="none" />)}
                  </div>
                  <p className="text-xs font-semibold" style={{ color: '#0c1f3d' }}>Racha activa</p>
                  <p className="font-display text-xl" style={{ color: '#f59e0b' }}>🔥 5 días</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <WaveDecor className="absolute bottom-0 left-0 right-0" color="#1d4ed8" opacity={0.05} height={90} />
      </section>

      {/* ── Exams ── */}
      <section id="pruebas" className="py-20" style={{ background: '#eff6ff' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#1d4ed8' }}>Banco de preguntas</p>
            <h2 className="font-display text-4xl font-light" style={{ color: '#0c1f3d' }}>
              Practica las <em>5 pruebas PAES</em>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {exams.map((exam) => (
              <div key={exam.id} className="p-5 rounded-3xl card-lift text-center"
                style={{ background: 'white', boxShadow: '0 2px 20px rgba(12,31,61,0.06)' }}>
                <div className="text-3xl mb-3">{exam.icon}</div>
                <h3 className="font-semibold text-sm mb-1" style={{ color: '#0c1f3d' }}>{exam.name}</h3>
                <p className="text-xs" style={{ color: exam.color }}>{exam.totalQ} preguntas</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="cómo-funciona" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#1d4ed8' }}>Metodología</p>
            <h2 className="font-display text-5xl font-light" style={{ color: '#0c1f3d' }}>
              Simple, directo <em>y efectivo</em>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {steps.map((s, i) => (
              <div key={i} className="p-6 rounded-3xl card-lift"
                style={{ background: 'white', boxShadow: '0 2px 20px rgba(12,31,61,0.06)' }}>
                <p className="font-display text-4xl font-bold mb-3" style={{ color: 'rgba(29,78,216,0.15)' }}>{s.n}</p>
                <h3 className="font-semibold text-base mb-2" style={{ color: '#0c1f3d' }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(12,31,61,0.55)' }}>{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Features highlight */}
          <div className="p-8 md:p-10 rounded-4xl"
            style={{ background: 'linear-gradient(135deg, #0c1f3d, #1d4ed8)' }}>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#93c5fd' }}>Retroalimentación real</span>
                <h3 className="font-display text-3xl font-light text-white mt-2 mb-4">
                  📊 Cada respuesta te enseña
                </h3>
                <p className="text-white/65 text-sm leading-relaxed mb-6">
                  No solo te decimos si acertaste. Cada pregunta incluye una <strong className="text-white/90">explicación completa</strong> del por qué la respuesta es correcta, para que puedas aprender de tus errores.
                </p>
                <div className="space-y-2">
                  {['Puntaje estimado en escala PAES real', 'Revisión detallada de cada pregunta', 'Progreso histórico por prueba', 'Identificación de áreas débiles'].map(f => (
                    <div key={f} className="flex items-center gap-2">
                      <CheckCircle size={14} style={{ color: '#93c5fd', flexShrink: 0 }} />
                      <span className="text-sm text-white/70">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                {[['📖 Lectora','rgba(59,130,246,0.3)','#93c5fd'],['📐 M1','rgba(8,145,178,0.3)','#67e8f9'],['∑ M2','rgba(124,58,237,0.3)','#c4b5fd'],['🌎 Historia','rgba(180,83,9,0.3)','#fcd34d'],['🧬 Ciencias','rgba(21,128,61,0.3)','#6ee7b7']].map(([tag, bg, color]) => (
                  <span key={tag} className="px-4 py-2.5 rounded-xl text-sm font-semibold"
                    style={{ background: bg, color, border: `1px solid ${color}30` }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonios" className="py-24"
        style={{ background: 'linear-gradient(135deg, #0c1f3d, #1d4ed8)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#93c5fd' }}>Estudiantes</p>
            <h2 className="font-display text-4xl font-light text-white">Lo que dicen <em>quienes ya lo usaron</em></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="p-6 rounded-3xl card-lift"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)' }}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1">
                    {[...Array(t.rating)].map((_, j) => <Star key={j} size={12} fill="#f59e0b" stroke="none" />)}
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}>
                    {t.role}
                  </span>
                </div>
                <p className="font-display text-lg italic leading-relaxed mb-4 text-white/80">&ldquo;{t.text}&rdquo;</p>
                <p className="text-sm font-semibold" style={{ color: '#93c5fd' }}>{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#1d4ed8' }}>Empieza hoy</p>
          <h2 className="font-display text-5xl font-light mb-4" style={{ color: '#0c1f3d' }}>
            ¿Listo para <em>superar tu meta</em>?
          </h2>
          <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(12,31,61,0.55)' }}>
            Sin costo. Sin registro complicado. Solo practica y mejora tu puntaje desde hoy.
          </p>
          <button onClick={onEnter}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #0c1f3d, #1d4ed8)' }}>
            Comenzar a practicar gratis
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 border-t" style={{ borderColor: 'rgba(12,31,61,0.08)' }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap size={17} style={{ color: '#1d4ed8' }} />
            <span className="font-display font-semibold" style={{ color: '#0c1f3d' }}>PAES Prep</span>
            <span className="text-xs" style={{ color: 'rgba(12,31,61,0.35)' }}>· Plataforma de práctica</span>
          </div>
          <p className="text-xs" style={{ color: 'rgba(12,31,61,0.3)' }}>© 2026 · Chile</p>
          <button onClick={onEnter}
            className="flex items-center gap-1.5 text-xs font-semibold hover:underline"
            style={{ color: '#1d4ed8' }}>
            <Shield size={11} />
            Área de estudiantes →
          </button>
        </div>
      </footer>
    </div>
  );
}
