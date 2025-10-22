// src/pages/Home.jsx
import { useEffect, useRef, useState } from "react";
import posts from "../data/posts.json";
// import press from "../data/press.json";
import banner from "../assets/banner-landscape.jpg";
import polaroidPortrait from "../assets/polaroid-portrait.jpg";
import polaroidSquare from "../assets/polaroid-square.jpg";
import socialBg from "../assets/social-bg.jpg";
import Footer from "../components/Footer";
import tornPaper from "../assets/torn-paper.png";
import introBg from "../assets/rippedpaper-mid.png";
import tornPaperTop from "../assets/torn-paper-top.png"

// helpers UI
function Container({ className = "", children }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}
function Section({ id, title, subtitle, children, className = "" }) {
  return (
    <section id={id} className={`py-16 sm:py-20 ${className}`}>
      <Container>
        {(title || subtitle) && (
          <header className="mb-10 reveal">
            {subtitle && <p className="uppercase tracking-widest text-xs font-semibold text-gray-500">{subtitle}</p>}
            {title && (
              <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold" style={{ fontFamily: "var(--font-mansalva)" }}>
                {title}
              </h2>
            )}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}

function CountUp({ end, duration = 1.8, className = "", decimals = 0, formatter }) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);
  const rafRef = useRef(0);
  const elRef = useRef(null);

  const prefersReduced = typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const start = () => {
      if (startedRef.current) return;
      startedRef.current = true;

      if (prefersReduced) {
        setValue(end);
        return;
      }

      const startTs = performance.now();
      const d = Math.max(0.4, duration) * 1000; // ms

      const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

      const tick = (ts) => {
        const p = Math.min(1, (ts - startTs) / d);
        const eased = easeOutCubic(p);
        const current = end * eased;
        const factor = Math.pow(10, decimals);
        setValue(Math.round(current * factor) / factor);
        if (p < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setValue(end);
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    };

    // Arranca al entrar en viewport
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.isIntersecting && start()),
      { threshold: 0.2 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [end, duration, decimals, prefersReduced]);

  const defaultFormat = (n) => new Intl.NumberFormat("es-ES", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);

  const fmt = formatter || defaultFormat;

  return (
    <span ref={elRef} className={className}>
      {fmt(value)}
    </span>
  );
}


/* ========================= Hero ========================= */
function Hero() {
  const NAV_H = 64;
  const tornRef = useRef(null);

  useEffect(() => {
    const updateTornH = () => {
      if (tornRef.current) {
        const h = Math.round(tornRef.current.getBoundingClientRect().height);
        document.documentElement.style.setProperty("--tornH", `${h}px`);
      }
    };
    updateTornH();
    window.addEventListener("resize", updateTornH);

    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setVh();
    window.addEventListener("resize", setVh);
    window.addEventListener("orientationchange", setVh);

    return () => {
      window.removeEventListener("resize", setVh);
      window.removeEventListener("orientationchange", setVh);
      window.removeEventListener("resize", updateTornH);
    };
  }, []);

  const scrollToContent = () => {
    const el = document.getElementById("sobre-mi");
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - NAV_H;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <header id="inicio" className="relative text-white" style={{ height: "calc(var(--vh, 1vh) * 100)" }}>
      {/* Fondo del banner (sin parallax) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${banner})` }}
        aria-hidden
      />
      {/* Filtro oscuro */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

      {/* Contenido principal */}
      <Container className="relative h-full flex flex-col justify-center pt-10 sm:pt-12 md:pt-0">
        {/* Grid principal con dos bloques y línea central */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center md:text-left">
          {/* Bloque 1: título + descripción */}
          <div className="flex flex-col items-center justify-center text-center md:items-start md:text-left reveal">
            <h1
              className="text-4xl sm:text-6xl font-extrabold drop-shadow-lg"
              style={{ fontFamily: "var(--font-lacquer)" }}
            >
              ¡Bienvenid@s a mi diario de ruta!
            </h1>
            <p className="mt-4 max-w-md text-base sm:text-lg text-white/90 font-quicksand">
              Viajes en bicicleta por Europa, Latinoamerica y próximamente el mundo.  
              Paisajes, relatos y consejos en tiempo real.
            </p>
          </div>

          {/* Separador punteado */}
          <div className="hidden md:flex justify-center">
            <div className="h-40 border-l-2 border-dotted border-white/50 animate-pulse-line" />
          </div>

          
         {/* Métricas: centradas en mobile, derecha en desktop */}
          <div className="reveal font-quicksand flex flex-col items-center md:items-end space-y-4 text-center md:text-right">
            {/* 16 países visitados */}
            <div className="flex flex-col items-center md:items-end leading-none w-full">
              <CountUp
                end={16}
                duration={1.4}
                className="block text-3xl sm:text-4xl font-extrabold text-white text-center md:text-right"
              />
              <span className="mt-1 text-sm sm:text-base text-white/95 text-center md:text-right">
                países visitados
              </span>
            </div>

            {/* 5000 km recorridos */}
            <div className="flex flex-col items-center md:items-end leading-none w-full">
              <CountUp
                end={5000}
                duration={1.6}
                className="block text-3xl sm:text-4xl font-extrabold text-white text-center md:text-right"
                formatter={(n) => new Intl.NumberFormat('es-ES').format(Math.round(n))}
              />
              <span className="mt-1 text-sm sm:text-base text-white/95 text-center md:text-right">
                km recorridos
              </span>
            </div>

            {/* 543 días en la ruta */}
            <div className="flex flex-col items-center md:items-end leading-none w-full">
              <CountUp
                end={543}
                duration={1.2}
                className="block text-3xl sm:text-4xl font-extrabold text-white text-center md:text-right"
              />
              <span className="mt-1 text-sm sm:text-base text-white/95 text-center md:text-right">
                días en la ruta
              </span>
            </div>

            {/* Próximo destino */}
            <p className="mt-3 text-base sm:text-lg text-white/95 italic text-center md:text-right">
              Próximo destino: <span className="font-semibold text-white">Patagonia Argentina</span>
            </p>
          </div>



        </div>

        <div className="mt-16 sm:mt-24 md:mt-40 flex justify-center">
          <button
            onClick={scrollToContent}
            className="border-2 border-white text-white px-8 py-3 font-semibold hover:bg-[#465245] hover:border-[#465245] transition-colors duration-300 animate-float"
          >
            Explorar
          </button>
        </div>
      </Container>

      <img
        ref={tornRef}
        src={tornPaper}
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute bottom-0 left-0 w-full block z-20" 
      />
    </header>
  );
}

/* ========================= Intro ========================= */
function Intro() {
  return (
    <section
      id="sobre-mi"
      className="relative py-16 scroll-mt-16 sm:scroll-mt-20 -mt-1 text-gray-900"
    >
      {/* Fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${introBg})` }}
        aria-hidden
      />
      {/* Overlay para legibilidad (podés ajustar opacidad/color) */}
      <div className="absolute inset-0 bg-white/70" aria-hidden />

      {/* Contenido */}
      <div className="relative max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-10">
        {/* Polaroid izquierda (retrato) */}
        <div className="relative bg-gray-200 p-3 rounded-md shadow-md rotate-[-2deg] group transition-transform">
          <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-16 h-5 bg-white/40 backdrop-blur-sm rounded-sm shadow-sm border border-white/20 rotate-[1deg] transition-transform duration-300 group-hover:rotate-[3deg]" />
          <img
            src={polaroidPortrait}
            alt="Luciana en bicicleta"
            className="h-80 w-60 object-cover rounded-sm transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:rotate-1"
          />
          <p className="text-center text-xs text-gray-700 mt-2">Francia 2024</p>
        </div>

        {/* Texto central */}
        <div className="relative max-w-md text-center md:text-left reveal">
          <h2 className="font-mansalva text-4xl text-gray-800 mb-2 font-extrabold">¡Hola! Soy Luciana</h2>
          <p className="font-quicksand text-gray-700 text-lg leading-relaxed">
            Ando en bicicleta por el mundo compartiendo rutas, experiencias y paisajes. Este espacio es mi bitácora de
            viaje: historias de camino, fotos y anécdotas de cada aventura sobre dos ruedas.
          </p>
        </div>

        {/* Polaroid derecha (cuadrada) */}
        <div className="relative bg-gray-200 p-3 rounded-md shadow-md rotate-[3deg] group transition-transform">
          <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-16 h-5 bg-white/40 backdrop-blur-sm rounded-sm shadow-sm border border-white/20 rotate-[-2deg] transition-transform duration-300 group-hover:rotate-[-5deg]" />
          <img
            src={polaroidSquare}
            alt="Luciana viajando"
            className="h-64 w-64 object-cover rounded-sm transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:-rotate-1"
          />
          <p className="text-center text-xs text-gray-700 mt-2">Península Ibérica 2025</p>
        </div>
      </div>
    </section>
  );
}


/* ========================= Blog (Carrusel) ========================= */
const PINE = "#465245"; // verde pino, saturación media-baja

function Tag({ children }) {
  return (
    <span
      className="inline-flex items-center px-2 py-1 text-[11px] font-semibold"
      style={{ background: "rgba(255,255,255,.08)", borderColor: "rgba(255,255,255,.18)", color: "rgba(255,255,255,.9)" }}
    >
      {children}
    </span>
  );
}

function BlogCardPine({ post }) {
  return (
    <article className="overflow-hidden flex flex-col h-full bg-[rgba(0,0,0,.15)] border border-white/10 shadow-sm transition-transform duration-300 hover:-translate-y-1">
      <div className="relative">
        <a href={post.url}>
          <img src={post.cover} alt="" className="h-44 w-full object-cover" />
        </a>
        {/* Tag arriba */}
        {post.category && (
          <div className="absolute top-3 left-3">
            <Tag>{post.category === "personal" ? "Personal" : post.category}</Tag>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1 text-white">
        <h3 className="font-mansalva text-xl leading-snug">
          <a href={post.url} className="hover:opacity-90">
            {post.title}
          </a>
        </h3>
        <p className="mt-2 text-sm opacity-90 flex-1 font-quicksand">{post.excerpt}</p>
        <div className="pt-4 text-xs opacity-80">{new Date(post.date).toLocaleDateString()}</div>
      </div>
    </article>
  );
}

function BlogCarousel() {
  const railRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true); // asumimos más contenido que una pantalla

  // Solo "personal" por ahora (podés cambiar a otra categoría luego)
  const personal = posts.filter((p) => p.category === "personal").slice(0, 50);

  const updateArrows = () => {
    const rail = railRef.current;
    if (!rail) return;
    const maxScrollLeft = rail.scrollWidth - rail.clientWidth;
    setCanLeft(rail.scrollLeft > 4); // margen para evitar parpadeo
    setCanRight(rail.scrollLeft < maxScrollLeft - 4); // margen
  };

  const scrollByCards = (dir) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector("article");
    const step = card ? card.clientWidth + 24 : 320; // ancho card + gap aprox
    rail.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  useEffect(() => {
    updateArrows();
    const rail = railRef.current;
    if (!rail) return;
    rail.addEventListener("scroll", updateArrows);
    window.addEventListener("resize", updateArrows);
    return () => {
      rail.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  return (
  <section
    id="blog-home"
    className="relative py-16 sm:py-20 reveal"
    style={{ background: PINE }}
  >
    {/* Borde superior tipo papel */}
    <img
      src={tornPaperTop}
      alt=""
      aria-hidden="true"
      className="pointer-events-none select-none absolute top-0 left-0 w-full block z-10"
    />

    <div className="relative mx-auto w-full max-w-7xl pt-24 px-4 sm:px-6 lg:px-8 text-white z-20">
      <header className="mb-8">
        <p className="uppercase tracking-widest text-xs font-semibold text-white/80">Blog</p>
        <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold font-mansalva">
          Últimas actualizaciones
        </h2>
      </header>

      <div className="relative">
        {/* Flecha izquierda */}
        <button
          aria-label="Anterior"
          onClick={() => scrollByCards(-1)}
          className={`hidden md:flex absolute top-1/2 -translate-y-1/2 -left-10 lg:-left-12 z-10 h-11 w-11 items-center justify-center border backdrop-blur-sm transition active:scale-95
            ${canLeft ? "border-white/30 bg-white/10 hover:bg-white/20" : "opacity-0 pointer-events-none border-transparent bg-transparent"}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Rail */}
        <div
          ref={railRef}
          className="hide-scrollbar flex gap-6 overflow-x-auto snap-x snap-mandatory py-2 pr-2"
          aria-label="Carrusel de posts personales"
        >
          {personal.map((p) => (
            <div key={p.id} className="snap-start shrink-0 w-80">
              <BlogCardPine post={p} />
            </div>
          ))}
        </div>

        {/* Flecha derecha */}
        <button
          aria-label="Siguiente"
          onClick={() => scrollByCards(1)}
          className={`hidden md:flex absolute top-1/2 -translate-y-1/2 -right-10 lg:-right-12 z-10 h-11 w-11 items-center justify-center border backdrop-blur-sm transition active:scale-95
            ${canRight ? "border-white/30 bg-white/10 hover:bg-white/20" : "opacity-0 pointer-events-none border-transparent bg-transparent"}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

    <style>{`.hide-scrollbar{scrollbar-width:none}.hide-scrollbar::-webkit-scrollbar{display:none}`}</style>
  </section>

  );
}

/* ========================= Social (con estrellas custom) ========================= */
function SocialLive() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const roRef = useRef(null);
  const starsRef = useRef([]);
  const lastTsRef = useRef(0);

  // Carga de scripts de Instagram / TikTok (tu lógica original)
  useEffect(() => {
    // Instagram
    if (!document.querySelector("#instgrm-script")) {
      const s = document.createElement("script");
      s.id = "instgrm-script";
      s.src = "https://www.instagram.com/embed.js";
      s.async = true;
      document.body.appendChild(s);
    } else if (window.instgrm) {
      setTimeout(() => window.instgrm?.Embeds?.process?.(), 50);
    }
    // TikTok
    if (!document.querySelector("#tiktok-script")) {
      const t = document.createElement("script");
      t.id = "tiktok-script";
      t.src = "https://www.tiktok.com/embed.js";
      t.async = true;
      document.body.appendChild(t);
    }
  }, []);

  // === Estrellas personalizadas con <canvas> ===
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });

    // ---------- Configurable ----------
    const BASE_DENSITY = 0.12;
    const SPEED_MIN = 18;
    const SPEED_MAX = 48;
    const SIZE_MIN = 0.6;
    const SIZE_MAX = 2.2;
    const GLOW = 3;
    const COLORS = ["#ffffff", "#cfe9ff"];
    const TWINKLE_SPEED = 1.5;
    // ----------------------------------

    const DPR = Math.max(1, Math.floor(window.devicePixelRatio || 1));
    const parent = canvas.parentElement;
    const state = { w: 0, h: 0 };

    function rand(min, max) { return min + Math.random() * (max - min); }

    function reseedStars() {
      const area = (state.w * state.h) / 1000;
      const target = Math.max(40, Math.floor(area * BASE_DENSITY));
      const arr = [];
      for (let i = 0; i < target; i++) {
        arr.push({
          x: Math.random() * state.w,
          y: Math.random() * state.h,
          r: rand(SIZE_MIN, SIZE_MAX),
          v: rand(SPEED_MIN, SPEED_MAX),
          aBase: rand(0.4, 0.9),
          aAmp: rand(0.15, 0.35),
          aOff: Math.random() * Math.PI * 2,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }
      starsRef.current = arr;
    }

    function resize() {
      const w = parent.clientWidth || window.innerWidth;
      const h = parent.clientHeight || 520;
      state.w = w; state.h = h;

      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.width = Math.max(1, Math.floor(w * DPR));
      canvas.height = Math.max(1, Math.floor(h * DPR));
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      reseedStars();
    }

    function draw(ts) {
      const dt = lastTsRef.current ? (ts - lastTsRef.current) / 1000 : 0;
      lastTsRef.current = ts;

      ctx.clearRect(0, 0, state.w, state.h);
      ctx.shadowBlur = GLOW;

      for (const s of starsRef.current) {
        const a = s.aBase + Math.sin(ts / 1000 * TWINKLE_SPEED + s.aOff) * s.aAmp;
        ctx.shadowColor = s.color;
        ctx.fillStyle = s.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, a));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();

        s.y -= s.v * dt;
        if (s.y < -4) { s.y = state.h + 4; s.x = Math.random() * state.w; }
      }
      ctx.globalAlpha = 1;

      rafRef.current = requestAnimationFrame(draw);
    }

    resize();
    rafRef.current = requestAnimationFrame(draw);

    roRef.current = new ResizeObserver(resize);
    roRef.current.observe(parent);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      if (roRef.current) { try { roRef.current.disconnect(); } catch { // Ignorar error de desconexión del observer
      } roRef.current = null; }
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  return (
    <section id="social" className="relative py-16 sm:py-20 text-white reveal min-h-[520px]">
      {/* Fondo con foto (capa base) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${socialBg})` }}
        aria-hidden
      />
      {/* Overlay (debajo de las estrellas) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,.60),rgba(0,0,0,.25))] z-[5]" aria-hidden />

      {/* Estrellas: por encima del overlay y por debajo del contenido */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none block" aria-hidden="true" />

      {/* Contenido */}
      <Container className="relative z-20">
        <header className="mb-8">
          <p className="uppercase tracking-widest text-xs font-semibold text-white/80">
            Instagram + YouTube + TikTok
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold font-mansalva">En tiempo real</h2>
        </header>

        {/* 3 columnas en desktop: Instagram | YouTube | TikTok */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Instagram card */}
          <div className="border border-white/15 bg-white/10 backdrop-blur-sm shadow-[0_8px_24px_rgba(0,0,0,.25)] overflow-hidden reveal">
            <div className="p-4 flex items-center justify-between">
              <h3 className="font-semibold font-mansalva text-xl">Instagram</h3>
              <a
                href="https://www.instagram.com/lulazabal"
                className="text-sm text-white/90 hover:text-white underline font-quicksand"
                target="_blank" rel="noopener noreferrer"
              >
                @lulazabal
              </a>
            </div>
            <div
              className="instagram-embed-container"
              dangerouslySetInnerHTML={{
                __html: `
                  <blockquote 
                    class="instagram-media" 
                    data-instgrm-permalink="https://www.instagram.com/reel/C7rrXUhojTY/?utm_source=ig_embed&amp;utm_campaign=loading" 
                    data-instgrm-version="14" 
                    style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin:1px auto; max-width:540px; min-width:326px; padding:0; width:99.375%;">
                  </blockquote>
                `,
              }}
            />
          </div>

          {/* YouTube card (nueva) */}
          <div className="border border-white/15 bg-white/10 backdrop-blur-sm shadow-[0_8px_24px_rgba(0,0,0,.25)] overflow-hidden reveal">
            <div className="p-4 flex items-center justify-between">
              <h3 className="font-semibold font-mansalva text-xl">YouTube</h3>
              <a
                href="https://www.youtube.com/@"
                className="text-sm text-white/90 hover:text-white underline font-quicksand"
                target="_blank" rel="noopener noreferrer"
              >
                @luenbicicleta
              </a>
            </div>
            <div className="bg-black/20 p-2">
              <div className="aspect-video w-full overflow-hidden">
                <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/VIDEO_ID_AQUI"
                  title="Último video de YouTube"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          {/* TikTok card */}
          <div className="border border-white/15 bg-white/10 backdrop-blur-sm shadow-[0_8px_24px_rgba(0,0,0,.25)] overflow-hidden reveal">
            <div className="p-4 flex items-center justify-between">
              <h3 className="font-semibold font-mansalva text-xl">TikTok</h3>
              <a
                href="https://www.tiktok.com/@luciana.en.bici"
                className="text-sm text-white/90 hover:text-white underline font-quicksand"
                target="_blank" rel="noopener noreferrer"
              >
                @luenbicicleta
              </a>
            </div>
            <div className="bg-black/20 p-2">
              <div
                dangerouslySetInnerHTML={{
                  __html: `
                    <blockquote 
                      class="tiktok-embed" 
                      cite="https://www.tiktok.com/@luenbicicleta" 
                      data-unique-id="luenbicicleta" 
                      data-embed-type="creator" 
                      style="max-width:780px;min-width:288px;"
                    >
                      <section>
                        <a target="_blank" href="https://www.tiktok.com/@luenbicicleta?refer=creator_embed">@luenbicicleta</a>
                      </section>
                    </blockquote>
                  `,
                }}
              />

              <script async src="https://www.tiktok.com/embed.js"></script>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}


/* ========================= Prensa  ========================= */
function PressCarousel() {
  return (
    <Section
      id="prensa"
      title="En los medios"
      subtitle="Notas y entrevistas"
      className="reveal pb-24 sm:pb-40"
    >
      <div className="flex justify-center">
        <div className="overflow-hidden shadow-lg border border-gray-200 bg-white/50 backdrop-blur-sm p-2 max-w-3xl w-full reveal">
          <div className="aspect-video w-full overflow-hidden">
            <iframe
              src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fprogramaanuestramanera%2Fvideos%2F800684968037236%2F&show_text=false&width=560&t=0"
              width="100%"
              height="314"
              style={{ border: "none", overflow: "hidden" }}
              scrolling="no"
              frameBorder="0"
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              title="Entrevista en A Nuestra Manera"
            />
          </div>
          <p className="text-center text-sm text-gray-700 mt-3 font-quicksand">
            Entrevista para el programa <span className="font-semibold">A Nuestra Manera</span>
          </p>
        </div>
      </div>
    </Section>
  );
}


/* ========================= Scroll To Top ========================= */
function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      if (window.scrollY > 400) setVisible(true);
      else setVisible(false);
    };
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Volver arriba"
      className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 h-11 w-11 flex items-center justify-center border backdrop-blur-sm transition duration-300
        ${
          visible
            ? "opacity-100 border-white/30 bg-white/10 hover:bg-white/20"
            : "opacity-0 pointer-events-none"
        }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}

/* ========================= Página Home ========================= */
export default function Home() {
  // Reveal on scroll (activa .reveal)
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div>
      <Hero />
      <Intro />
      <BlogCarousel />
      <SocialLive />
      <PressCarousel />
      {/* <Footer /> */}
      <ScrollToTopButton />
    </div>
  );
}
