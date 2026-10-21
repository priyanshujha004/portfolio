"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { Container } from "@/components/foundation/Container";
import { navItems } from "@/data/navigation";
import { cn } from "@/utils/cn";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close menu when Escape is pressed
  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <Container>
        <nav className="flex h-16 items-center justify-between font-mono text-xs uppercase tracking-wide">
          <Link
            href="/"
            className="font-semibold text-text-primary"
            onClick={() => setOpen(false)}
          >
            Priyanshu Jha
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className={cn(
                      "link-underline flex items-center gap-1 transition-colors duration-200",
                      isActive
                        ? "text-accent"
                        : "text-text-muted hover:text-accent"
                    )}
                  >
                    <span>{item.index}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile menu button */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
            className="text-text-primary md:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </Container>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border md:hidden">
          <Container>
            <ul className="flex flex-col gap-1 py-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 py-3 font-mono text-xs uppercase text-text-muted hover:text-accent"
                  >
                    <span>{item.index}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </div>
      )}
    </header>
  );
}
