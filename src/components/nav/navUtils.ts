export function isActiveRoute(pathname: string, href: string) {
  if (href === "/bearflight") return pathname === href;
  return pathname.startsWith(href);
}
