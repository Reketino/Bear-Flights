import Link from "next/link";
import Image from "next/image";

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
     <Image
     src="/bearflights.png"
     alt="Bearflights logo- a wild bear in the sky"
     width={600}
     height={600}
     priority
     className="mx-auto"
     />


      <p className="text-neutral-500 text-lg mb-8">
        Overview of flights crossing the airspace
        in Sykkylven, Norway - updates every 5 minutes.
        </p>

       
      <nav className=" 
      flex flex-col
      justify-center gap-4
      ">
      <Link
      href="/flights"
      className="
      px-6 py-3 rounded-xl
      text-black font-semibold
      bg-amber-500 hover:bg-amber-400
      transition
      ">
        Take a look at flights today!✈️
      </Link>


      <a
      href="https://opensky-network.org"
      target="_blank"
      className="
      px-3 py-3 rounded-xl
      text-neutral-200 font-semibold
      
      border border-amber-500/50
      hover:bg-white/10 transition
      ">
      Datasource: Opensky
      </a>
      </nav>


      <p className="
      text-xs text-neutral-500 mt-10
      ">
        Buildt using Next.js, Supabase & Opensky API 
      </p>
      </section>
    </main>
  );
}
