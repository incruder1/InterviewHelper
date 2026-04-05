"use client";
import { useState } from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SITE_NAME, DASHBOARD_NAV_LINKS } from "@/constants/site";

const Header = ({ logo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname();

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{ background: "rgba(13,14,20,0.85)", backdropFilter: "blur(20px)", borderColor: "rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <Image src={logo} width={26} height={26} alt="logo" className="rounded-md" />
          <span className="hidden md:block text-sm font-semibold text-white tracking-tight">{SITE_NAME}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-0.5">
          {DASHBOARD_NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-4 py-1.5 rounded-lg text-sm transition-all duration-150 ${
                path === href ? "bg-white/10 text-white font-medium" : "text-[#7070a0] hover:text-white hover:bg-white/5"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <UserButton />
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-[#7070a0] hover:text-white transition-colors p-1">
            {isOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t px-4 py-3 space-y-0.5" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          {DASHBOARD_NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setIsOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm transition-colors ${path === href ? "bg-white/10 text-white font-medium" : "text-[#7070a0] hover:text-white hover:bg-white/5"}`}>
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
