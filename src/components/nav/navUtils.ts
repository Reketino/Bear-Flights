
export function isActiveRoute(pathname: string, href: string) {
    if (href === "/bearsflight") return pathname === href;
    return pathname.startsWith(href);
}