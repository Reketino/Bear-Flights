import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { NavItems } from "../NavItems"
import { isActiveRoute } from "../navUtils";

type Props = {
    pathname: string;
    onNavigate: () => void;
}

export default function MobileNav({ pathname, onNavigate }: Props) {
  return (
    <main className="
    border-t border-neutral-200/70
    md:hidden
    ">
        <section className="
        mx-auto max-w-7xl
        px-4 py-3 sm:px-6
        ">
            <div className="
            grid gap-2
            ">
                {NavItems.map((item) => {
                    const Active = isActiveRoute(pathname, item.href)
                    const Icon = item.icon;

                    return (
                        <Link
                        key={item.href}
                        href={item.href}
                        onClick={onNavigate}
                        className={[
                        "flex items-center rounded-2xl gap-2 px-3 py-2 text-sm font-medium transition",
                        Active
                        ? "bg-sky-50 text-sky-900 ring-1 ring-sky-100"
                        : "bg-white text-neutral-800 ring-1 ring-neutral-200 hover:bg-neutral-50",
                        ].join(" ")}
                        >
                            <Icon className="h-4 w-4" />
                            {item.label}
                        </Link>
                    );
                })}

                <Link
                href="https://www.reketino.no/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onNavigate}
                className="
                flex items-center justify-between
                rounded-2xl mt-2 px-3 py-3
                bg-neutral-900
                hover:bg-neutral-800
                text-sm font-medium
                text-white shadow-sm
                transition
                ">
                   Portfolio <ArrowUpRight className="h-4 w-4" /> 
                </Link>
            </div>
        </section>
    </main>
  )
}
