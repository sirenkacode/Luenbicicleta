// src/pages/SobreMi.jsx
export default function SobreMi() {
  return (
    <div className="pt-16">
      <PageSection title="Sobre mí" subtitle="Historia">
        <div className="prose max-w-none">
          <p>
            Nací en Uruguay y descubrí el cicloturismo como una forma de viajar lento y consciente.
            Me inspiran las pequeñas historias de ruta: una charla en la estación, un taller que te
            salva con una cámara de repuesto, un mapa mal doblado.
          </p>
          <p>
            En esta web comparto bitácoras, rutas GPX, presupuestos reales y aprendizajes para que
            más personas se animen a viajar en bici. Si querés colaborar o invitarme un café,
            escribime desde el formulario.
          </p>
        </div>
      </PageSection>
    </div>
  );
}

/** Mini helper de sección para esta página **/
function PageSection({ title, subtitle, children }) {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-10">
          {subtitle && (
            <p className="uppercase tracking-widest text-xs font-semibold text-gray-500">{subtitle}</p>
          )}
          {title && <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold font-[var(--font-mansalva)]">{title}</h2>}
        </header>
        {children}
      </div>
    </section>
  );
}
