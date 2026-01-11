import Link from "next/link";
import {  NavItems } from "./NavItems";
import { isActiveRoute } from "./navUtils";


export default function DesktopNav ({ pathname }: { pathname: string }) {
    return (

        // Nav w/ mapping
        <nav className="
        hidden items-center
        gap-1 md:flex
        ">
            {NavItems.map((item)=> {
                const Active = isActiveRoute(pathname, item.href);
                const Icon = item.icon;
                
                // Return Link
                return (
                    <Link
                    key={item.href}
                    href={item.href}
                    className={[
                    "flex items-center rounded-2xl gap-2 px-3 py-2 text-sm font-medium transition",
                    Active
                    ? "bg-sky-50 text-sky-900 ring-1 ring-sky-100"
                    : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950",
                    ].join(" ")}
                    >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                    </Link>
                );
            })}
        </nav>
    )
}