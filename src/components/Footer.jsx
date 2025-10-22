// src/components/Footer.jsx
import tornPaperGreenTop from "../assets/torn-paper-green-top.png";
import { FaTiktok } from "react-icons/fa";
import { Instagram, Facebook, Youtube } from "lucide-react";

export default function Footer() {
  return (
        <footer
        className="relative z-[1] overflow-visible py-10 text-white mt-0"  // ✅ sin margen negativo
        style={{ backgroundColor: "#465245", borderTop: "4px solid #465245" }}
        >
        <img
    src={tornPaperGreenTop}
    alt=""
    aria-hidden="true"
    className="pointer-events-none select-none absolute top-0 left-0 w-full -translate-y-full z-10 block"  // ✅ z-10
  />

      <div
        className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between
                   items-center md:items-end text-center md:text-left gap-8"
      >
        {/* Columna izquierda: contacto */}
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

          {/* Redes */}
          <div className="flex gap-4 pt-3 justify-center md:justify-start">
            <a href="https://www.instagram.com/lulazabal" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300 transition-colors" aria-label="Instagram">
              <Instagram size={22} />
            </a>
            <a href="https://www.tiktok.com/@luenbicicleta" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300 transition-colors" aria-label="TikTok">
              <FaTiktok size={22} />
            </a>
            <a href="https://www.facebook.com/p/Luciana-Olazábal-100086542695263" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300 transition-colors" aria-label="Facebook">
              <Facebook size={22} />
            </a>
            <a href="https://www.youtube.com/@" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300 transition-colors" aria-label="YouTube">
              <Youtube size={22} />
            </a>
          </div>
        </div>

        {/* Centro */}
        <div className="text-sm font-quicksand opacity-90 max-w-sm">
          <p>
            Gracias por acompañarme en este viaje. Seguí mis rutas y descubrí el mundo conmigo, una pedalada a la vez.
          </p>
        </div>

        {/* Derecha */}
        <div className="text-sm font-quicksand opacity-90">
          <p>
            diseño web por{" "}
            <a href="https://github.com/sirenkacode" target="_blank" rel="noopener noreferrer" className="hover:underline">
              🧜‍♀️💻
            </a>
          </p>
        </div>
      </div>

      <div className="mt-10 text-center text-xs text-white/60 font-quicksand">
        © {new Date().getFullYear()} Lu en Bicicleta — Todos los derechos reservados.
      </div>
    </footer>
  );
}
