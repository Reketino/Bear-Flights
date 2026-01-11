

export default function StatusChip() {
  return (
    <section className="
    hidden items-center
    rounded-2xl gap-2
    px-3 py-2 sm:flex

    border border-neutral-200
    bg-white shadow-sm
    text-xs text-neutral-200
    ">
        <span className=" 
        h-2 w-2
        rounded-full
        bg-neutral-400
        " />
        <span className="text-neutral-800">Flight log</span>
        <span className="text-neutral-300">•</span>
        <span className="text-neutral-500">Past overflights</span>
    </section>
  )
}
