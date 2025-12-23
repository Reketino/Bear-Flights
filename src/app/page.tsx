export default function HomePage() {
  return (
    <main className="
    min-h-[calc(100vh-3.5rem)]
    flex items-center
    justify-center px-6
    ">
      <section className="
      max-w-3xl text-center
      ">
      <h1 className="text-5xl font-extrabold mb-6">
       🐻 Bear Flight Tracking ✈️
        </h1>

      <p className="text-neutral-500 text-lg mb-8">
        Overview of flights crossing the airspace
        in Sykkylven, Norway - updates every 5 minutes.
        </p>
      </section>
    </main>
  );
}
