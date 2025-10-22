import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import banner from "../assets/banner-landscape.jpg";
import logo from "../assets/logo.png";


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    // en otras rutas (no home) muestra el banner desde el inicio
    setScrolled(pathname !== "/");
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 text-white ${
        scrolled ? "bg-center bg-cover backdrop-blur-sm shadow-[0_2px_10px_rgba(0,0,0,.12)]" : "bg-transparent"
      }`}
      style={
        scrolled
          ? { backgroundImage: `linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.35)), url(${banner})` }
          : undefined
      }
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold font-mansalva text-lg">
          <img src={logo} alt="Logo Lu en Bici" className="h-10 w-10 object-contain" />

          Lu en Bicicleta
        </Link>

        <button
          className="md:hidden p-2 border border-white/40 text-white"
          onClick={() => setOpen(v => !v)}
          aria-label="Abrir menú"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <ul className="hidden md:flex items-center gap-6 text-sm font-semibold">
          {[
            { to: "/sobre-mi", label: "Sobre mí" },
            { to: "/blog", label: "Blog" },
            { to: "/tienda", label: "Tienda" },
            { to: "/contacto", label: "Contacto" },
          ].map(l => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) => `transition-colors ${isActive ? "text-emerald-300" : "hover:text-emerald-300"}`}
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {open && (
        <div className="md:hidden bg-black/80 backdrop-blur-md border-t border-white/10">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <ul className="py-3 grid gap-2">
              {[
                { to: "/sobre-mi", label: "Sobre mí" },
                { to: "/blog", label: "Blog" },
                { to: "/tienda", label: "Tienda" },
                { to: "/contacto", label: "Contacto" },
              ].map(l => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    className="block px-3 py-2 hover:bg-white/10"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}
