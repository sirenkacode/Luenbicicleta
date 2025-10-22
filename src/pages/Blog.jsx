import posts from "../data/posts.json";

export default function Blog() {
  return (
    <div className="pt-16">
      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold">Blog</h1>
            <p className="text-gray-600 mt-2">Relatos, rutas y consejos de viaje.</p>
          </header>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((p) => (
              <article key={p.id} className="rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                <img src={p.cover} alt="" className="h-44 w-full object-cover" />
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-semibold text-lg">{p.title}</h3>
                  <p className="text-sm text-gray-600 mt-2 flex-1">{p.excerpt}</p>
                  <div className="text-xs text-gray-500 mt-3">{new Date(p.date).toLocaleDateString()}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
