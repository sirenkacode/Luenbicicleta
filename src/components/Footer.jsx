// src/components/Footer.jsx
import tornPaperGreenTop from "../assets/torn-paper-green-top.png";

export default function Footer() {
  return (
    <footer
      className="relative overflow-visible py-10 text-white mt-20"
      style={{
        backgroundColor: "#465245", // verde pino
        borderTop: "4px solid #465245",
      }}
    >
      {/* Borde superior: por detrás del contenido de la página */}
      <img
        src={tornPaperGreenTop}
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute top-0 left-0 w-full -translate-y-full -z-10 block"
      />

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 text-center md:text-left">
        <div className="space-y-2 text-sm font-quicksand">
          <h3 className="text-lg font-semibold mb-2 font-mansalva">Contacto</h3>
          <p>
            <a href="mailto:contacto@luenbici.com" className="hover:underline">
              contacto@luenbici.com
            </a>
          </p>
          <p>
            <a href="tel:+59800000000" className="hover:underline">
              +598 000 000 000
            </a>
          </p>
        </div>

        <div className="text-sm font-quicksand opacity-90 max-w-sm">
          <p>
            Gracias por acompañarme en este viaje.  
            Seguí mis rutas y descubrí el mundo conmigo, una pedalada a la vez.
          </p>
        </div>

        <div className="text-sm font-quicksand opacity-90">
          <p>
            diseño web por{" "}
            <a
              href="https://github.com/sirenkacode"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              🧜‍♀️💻
            </a>
          </p>
        </div>
      </div>

      <div className="mt-10 text-center text-xs text-white/60 font-quicksand">
        © {new Date().getFullYear()} Lu en Bici — Todos los derechos reservados.
      </div>
    </footer>
  );
}
