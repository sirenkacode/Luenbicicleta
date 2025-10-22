import { useState } from "react";

export default function Contacto() {
  const [status, setStatus] = useState("idle");
  const onSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = await fetch("https://formspree.io/f/TU_ID", {
      method: "POST",
      body: fd,
      headers: { Accept: "application/json" },
    });
    setStatus(res.ok ? "sent" : "idle");
    if (res.ok) e.currentTarget.reset();
  };

  return (
    <div className="pt-16">
      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold">Contacto</h1>
            <p className="text-gray-600 mt-2">Trabajemos juntas</p>
          </header>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="prose max-w-none">
              <p>¿Colaboraciones con marcas, cobertura de rutas, charlas? Escribime y te respondo.</p>
              <ul className="list-disc pl-6">
                <li>Marcas outdoor y turismo</li>
                <li>Rutas y destinos</li>
                <li>Charlas y talleres de cicloviaje</li>
              </ul>
            </div>
            <form onSubmit={onSubmit} className="rounded-3xl border border-gray-200 p-6 shadow-sm grid gap-4">
              <div>
                <label className="block text-sm font-medium">Nombre</label>
                <input name="nombre" required className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input type="email" name="email" required className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium">Mensaje</label>
                <textarea name="mensaje" rows={5} required className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500" />
              </div>
              <button type="submit" className="rounded-xl bg-emerald-600 px-4 py-2 font-semibold text-white hover:bg-emerald-700">
                {status === "sent" ? "¡Enviado!" : "Enviar"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
