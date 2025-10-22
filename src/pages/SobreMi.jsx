import { useEffect } from "react";
import banner from "../assets/banner-landscape.jpg";
import tornPaper from "../assets/torn-paper.png";
import luciana from "../assets/luciana.jpg";
import austria from "../assets/austria.jpg";
import eslovenia from "../assets/Eslovenia.jpg"
import madrid from "../assets/MadridRibadumia.jpg"

const PINE = "#465245";

function Container({ className = "", children }) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

function Polaroid({ src, alt = "", caption = "", className = "", imgClass = "" }) {
  return (
    <div className={`relative bg-gray-200 p-3 rounded-md shadow-md ${className}`}>
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-5 bg-white/70 backdrop-blur-sm rounded-sm shadow-sm border border-white/30" />
      <img src={src} alt={alt} className={`object-cover rounded-sm ${imgClass}`} />
      {caption && <p className="text-center text-xs text-gray-700 mt-2">{caption}</p>}
    </div>
  );
}

export default function SobreMi() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.15 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="text-gray-900 bg-white overflow-hidden">
      {/* ============== Banner ============== */}
      <header className="relative text-white overflow-hidden">
        <div
          className="w-full bg-cover bg-center h-[60vh] min-h-[420px] max-h-[700px]"
          style={{ backgroundImage: `url(${banner})` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,.42),rgba(0,0,0,.18))]" />

        {/* Contenido del banner */}
          <Container className="absolute inset-0 flex items-center">
      <div className="w-full grid grid-cols-12 items-center pb-24">
        {/* Título centrado en mobile */}
        <div className="col-span-12 md:col-span-6 text-center md:text-left">
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold drop-shadow-lg"
            style={{ fontFamily: "var(--font-lacquer)" }}
          >
            Sobre Mi
          </h1>
        </div>

        {/* Polaroids solo en desktop */}
        <div className="col-span-6 relative hidden md:block z-20">
          <div className="absolute right-0 -top-20 rotate-[-6deg]">
            <Polaroid
              src={austria}
              caption="Austria"
              imgClass="w-47 h-47"
            />
          </div>
          <div className="absolute right-[14rem] -top-10 rotate-[5deg]">
            <Polaroid
              src={eslovenia}
              caption="Eslovenia"
              imgClass="w-47 h-47"
            />
          </div>
          <div className="absolute right-[7rem] top-38 rotate-[-2deg]">
            <Polaroid
              src={madrid}
              caption="Madrid / Ribadumia"
              imgClass="w-47 h-47"
            />
          </div>
        </div>
      </div>
          </Container>


        {/* Papel rasgado del borde inferior del banner */}
        <img
          src={tornPaper}
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute -bottom-px left-0 w-full block"
        />
      </header>

      {/* ============== Contenido centrado ============== */}
      <section className="relative z-0 bg-white pt-14 sm:pb-85">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-3xl sm:text-4xl font-extrabold mb-6 text-center"
              style={{ fontFamily: "var(--font-mansalva)" }}
            >
              Un poco más de mi viaje
            </h2>

            <p className="text-lg leading-relaxed text-gray-700 font-quicksand mb-5">
              Soy Luciana y pedaleo para mirar el mundo a otra velocidad. Este proyecto es mi
              bitácora: rutas, personas y lugares que me transforman mientras avanzo. Me gusta
              registrar lo cotidiano —un café compartido, una subida eterna, el viento a favor— y
              convertirlo en historias que animen a más personas a salir a rodar. Aquí vas a encontrar
              relatos, consejos prácticos y recursos que me sirven en la ruta: planificación, equipo
              minimalista y aprendizajes de viajar sola.
            </p>

            <p className="text-lg leading-relaxed text-gray-700 font-quicksand mb-10">
              Mi idea no es llegar “rápido”, sino llegar conectada con el camino. Cuando puedo,
              documento en video y subo clips a redes; cuando no, escribo a la antigua en una libreta
              y lo vuelco acá. Si querés acompañar el viaje en tiempo real, te dejo mis redes acá abajo.
            </p>

            {/* Redes */}
            <div className="flex items-center justify-center gap-6 mb-10 text-black">
              <a href="https://www.instagram.com/lulazabal" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:opacity-80 transition">
                <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="5"></rect>
                  <circle cx="12" cy="12" r="3.8"></circle>
                  <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" stroke="none"></circle>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@luenbicicleta" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="hover:opacity-80 transition">
                <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor" aria-hidden="true">
                  <path d="M21 8.3a6.8 6.8 0 01-4-1.3v7.2A6.9 6.9 0 1110.3 7a5 5 0 00-.6 2.4A3.9 3.9 0 0012 15.3a3.9 3.9 0 003.9-3.9V2h2.1a6.8 6.8 0 003 4.3V8.3z" />
                </svg>
              </a>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:opacity-80 transition">
                <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor" aria-hidden="true">
                  <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.6-.1-1.3-.1-1.9-.1-2.8 0-4.1 1.4-4.1 3.8V11H8v3h2.4v7h3.1z" />
                </svg>
              </a>
              <a href="https://www.youtube.com/@luenbicicleta" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:opacity-80 transition">
                <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <rect x="2.6" y="5.2" width="18.8" height="13.6" rx="3.4"></rect>
                  <path d="M10 9.5v5l4.8-2.5L10 9.5z" fill="currentColor" stroke="none"></path>
                </svg>
              </a>
            </div>

            {/* Firma + Polaroid */}
            <div className="flex items-start justify-center gap-6">
              <div className="max-w-md">
                <p className="italic text-gray-700 font-quicksand text-center md:text-left">
                  Gracias por pasar por aquí. 
                  ¡Nos vemos en la ruta!
                </p>
                <p
                  className="mt-2 text-2xl text-center md:text-left"
                  style={{ fontFamily: "var(--font-mansalva)", color: PINE }}
                >
                  — Luciana
                </p>
              </div>
              <div className="shrink-0">
                <Polaroid src={luciana} alt="Retrato de Luciana" caption="Lu en Bicicleta" imgClass="w-47 h-47" />
              </div>
            </div>

            {/* Espaciador invisible para que el papel del footer se vea entero */}
            <div className="h-[180px]" aria-hidden />
          </div>
        </Container>
      </section>
    </div>
  );
}
