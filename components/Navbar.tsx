"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemToggle";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const tabs = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/create",
      label: "Create",
    },
    {
      href: "/about",
      label: "About",
    },
  ];
  const currentLocation = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);

  const user = { name: "Alex Johnson", email: "alex@lovoble.com" };

  return (
    <nav className="w-full bg-card border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* left: logo */}
          <div className="flex items-center gap-4">
            <Link href="/" className="text-lg font-bold text-primary">
              <span className="text-red-600">AI </span>
              Dashboard
            </Link>
          </div>

          {/* center: nav links (hidden on small) */}
          <div className="hidden sm:flex sm:flex-1 sm:justify-center">
            <ul
              className="flex gap-6"
              role="menubar"
              aria-label="Main navigation"
            >
              {tabs.map((tab) => (
                <li role="none" key={tab.href}>
                  <Link
                    href={tab.href}
                    role="menuitem"
                    className={cn(
                      "text-sm transition-all px-2 py-1",
                      currentLocation === tab.href ||
                        (tab.href !== "/" &&
                          currentLocation.startsWith(tab.href))
                        ? "text-primary font-semibold border-b-2 border-primary pb-1"
                        : "text-muted-foreground hover:text-primary"
                    )}
                  >
                    {tab.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* right: profile */}
          <div className="flex items-center gap-3">
            {/* mobile menu button */}
            <button
              className="sm:hidden p-2 rounded-md hover:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/30"
              aria-expanded={mobileOpen}
              aria-label="Open menu"
              onClick={() => setMobileOpen((s) => !s)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* profile avatar/button */}
            <div className="relative" ref={profileRef}>
              <button
                className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/30"
                onMouseEnter={() => setProfileOpen(true)}
                onMouseLeave={() => setProfileOpen(false)}
                onFocus={() => setProfileOpen(true)}
                onBlur={() => setProfileOpen(false)}
                aria-haspopup="dialog"
                aria-expanded={profileOpen}
              >
                <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
                  {user.name.split(" ")[0][0]}
                </div>
                <span className="hidden sm:inline text-sm text-foreground">
                  {user.name}
                </span>
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="absolute right-0 mt-2 w-64 z-50"
                    onMouseEnter={() => setProfileOpen(true)}
                    onMouseLeave={() => setProfileOpen(false)}
                  >
                    <Card className="p-3">
                      <CardContent>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                            {user.name.split(" ")[0][0]}
                          </div>
                          <div>
                            <div className="text-sm font-medium">
                              {user.name}
                            </div>
                            <div className="text-xs text-slate-500">
                              {user.email}
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 flex flex-col gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <a href="/profile">View profile</a>
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              /* TODO: wire logout */
                            }}
                          >
                            Logout
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="sm:hidden border-t"
          >
            <div className="px-4 pt-3 pb-4 space-y-1">
              {tabs.map((tab) => (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={cn(
                    "block px-3 py-2 rounded text-base font-medium transition-colors",
                    currentLocation === tab.href ||
                      (tab.href !== "/" && currentLocation.startsWith(tab.href))
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-surface"
                  )}
                  onClick={() => setMobileOpen(false)} // optional: closes menu after click
                >
                  {tab.label}
                </Link>
              ))}

              <div className="pt-2 border-t mt-2">
                <div className="px-3 py-2">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary text-white flex items-center justify-center">
                      {user.name.split(" ")[0][0]}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{user.name}</div>
                      <div className="text-xs text-slate-500">{user.email}</div>
                    </div>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href="/profile">Profile</a>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        /* TODO logout */
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
