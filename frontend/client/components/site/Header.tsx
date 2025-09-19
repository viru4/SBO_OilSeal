import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
// import Logo from "./Logo";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { getToken } from "@/lib/admin";

const nav = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/industries", label: "Industries" },
  { to: "/quality", label: "Quality" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [isOwner, setIsOwner] = useState<boolean>(() => !!getToken());

  useEffect(() => {
    const update = () => setIsOwner(!!getToken());
    update();
    window.addEventListener("storage", update);
    window.addEventListener("focus", update);
    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener("focus", update);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          {/* Replace Logo with favicon1.png */}
          <img src="/favicon1.jpg" alt="SBO Oil Seals Logo" className="h-8 w-8" />
          <span className="text-lg font-bold tracking-tight">SBO Oil Seals</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${isActive ? "text-primary" : "text-muted-foreground"}`
              }
            >
              {n.label}
            </NavLink>
          ))}
          <Button asChild className="ml-2">
            <Link to="/contact">Request Quote</Link>
          </Button>
          {isOwner && (
            <Button asChild variant="outline">
              <Link to="/admin">Admin</Link>
            </Button>
          )}
        </nav>
        <button
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border hover:bg-accent"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t md:hidden">
          <div className="container py-2 flex flex-col">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-2 text-sm font-medium transition-colors hover:text-primary ${isActive ? "text-primary" : "text-muted-foreground"}`
                }
              >
                {n.label}
              </NavLink>
            ))}
            <Button asChild className="mt-2">
              <Link to="/contact" onClick={() => setOpen(false)}>
                Request Quote
              </Link>
            </Button>
            {isOwner && (
              <Button asChild variant="outline" className="mt-2">
                <Link to="/admin" onClick={() => setOpen(false)}>
                  Admin
                </Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
