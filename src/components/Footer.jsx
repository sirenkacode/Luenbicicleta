// src/components/Footer.jsx

export default function Footer() {
  return (
    <footer
      className="py-10 text-white mt-20"
      style={{
        backgroundColor: "#465245", // gris ocre oscuro
        borderTop: "4px solid #465245", // línea superior verde pino
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 text-center md:text-left">

        {/* Columna izquierda: información de contacto */}
        <div className="space-y-2 text-sm font-quicksand">
          <h3 className="text-lg font-semibold mb-2 font-mansalva">Contacto</h3>
          <p>
            📧{" "}
            <a href="mailto:contacto@luenbici.com" className="hover:underline">
              contacto@luenbici.com
            </a>
          </p>
          <p>
            📞{" "}
            <a href="tel:+59800000000" className="hover:underline">
              +598 000 000 000
            </a>
          </p>
        </div>

        {/* Columna central: frase o recordatorio */}
        <div className="text-sm font-quicksand opacity-90 max-w-sm">
          <p>
            Gracias por acompañarme en este viaje 🌍🚴‍♀️.  
            Seguí mis rutas y descubrí el mundo conmigo, una pedalada a la vez.
          </p>
        </div>

        {/* Columna derecha: créditos */}
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

      {/* Línea de cierre inferior opcional */}
      <div className="mt-10 text-center text-xs text-white/60 font-quicksand">
        © {new Date().getFullYear()} Lu en Bici — Todos los derechos reservados.
      </div>
    </footer>
  );
}
