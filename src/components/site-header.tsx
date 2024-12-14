"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { AuthMenu } from "@/components/auth-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { SearchBar } from "@/components/search-bar";
import { Navigation } from "@/components/navigation";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function SiteHeader() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Logo URL'sini belirle
  const logoUrl = mounted && theme === "dark" ? "/logo-icon-white.png" : "/logo-icon.png";

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          {/* Logo - Sol taraf */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <img 
                src={logoUrl}
                alt="MetaBlog Icon" 
                className="h-8" 
              />
              <div className="flex items-center">
                <span className="text-xl font-light text-foreground">Meta</span>
                <span className="text-xl font-bold text-foreground">Blog</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <Navigation />

          {/* Actions - Sağ taraf */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden lg:flex">
              <SearchBar />
            </div>

            {/* Theme Toggle */}
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>

            {/* Auth Menu */}
            <AuthMenu />

            {/* Mobile Menu Button */}
            <MobileMenu logoUrl={logoUrl} />
          </div>
        </div>
      </div>
    </header>
  );
}

// Mobile Menu Component
function MobileMenu({ logoUrl }: { logoUrl: string }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <nav className="flex flex-col space-y-4">
          <Link href="/" className="text-sm font-medium">Home</Link>
          <Link href="/blog" className="text-sm font-medium">Blog</Link>
          <Link href="/pages" className="text-sm font-medium">Pages</Link>
          <Link href="/contact" className="text-sm font-medium">Contact</Link>
          <SearchBar />
          <ThemeToggle />
        </nav>
      </SheetContent>
    </Sheet>
  );
}