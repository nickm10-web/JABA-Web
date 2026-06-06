import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const navItems = ["Home", "Services", "Work", "Process", "Pricing"];

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-4 z-50">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-6">
        <a
          href="#hero"
          className="inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5"
          aria-label="Studio home"
        >
          <img
            src="/images/logo-mark.svg"
            alt=""
            className="h-full w-full object-cover"
          />
        </a>

        <div className="hidden flex-1 justify-center md:flex">
          <nav className="liquid-glass inline-flex items-center gap-1 rounded-full px-3 py-2">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="rounded-full px-4 py-2 font-body text-sm font-medium text-foreground/90 transition hover:bg-white/10 hover:text-white"
              >
                {item}
              </a>
            ))}
            <Button variant="solid" size="default" className="ml-1">
              Get Started
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
