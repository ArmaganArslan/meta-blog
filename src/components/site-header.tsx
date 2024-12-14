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
import Image from "next/image";
import { useRouter } from "next/navigation";

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
              <div className="relative h-8 w-8">
                <Image 
                  src={logoUrl}
                  alt="MetaBlog Icon"
                  fill
                  sizes="32px"
                  priority
                  className="object-contain"
                />
              </div>
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
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleRandomPost = async () => {
    try {
      const response = await fetch("/api/posts/random");
      const post = await response.json();
      
      if (post.id) {
        router.push(`/blog/${post.id}`);
        setOpen(false); // Menüyü kapat
      }
    } catch (error) {
      console.error("Rastgele post getirilirken hata oluştu:", error);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent title="Mobil Menü" side="right">
        <div className="flex items-center mb-6">
          <div className="relative h-8 w-8">
            <Image 
              src={logoUrl}
              alt="MetaBlog Icon"
              fill
              sizes="32px"
              priority
              className="object-contain"
            />
          </div>
          <div className="flex items-center ml-2">
            <span className="text-xl font-light">Meta</span>
            <span className="text-xl font-bold">Blog</span>
          </div>
        </div>
        <nav className="flex flex-col space-y-4">
          <Link href="/" className="text-sm font-medium" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/blog" className="text-sm font-medium" onClick={() => setOpen(false)}>Blog</Link>
          <button 
            onClick={handleRandomPost}
            className="text-sm font-medium text-left hover:text-primary transition-colors"
          >
            Single Post
          </button>
          <Link href="/pages" className="text-sm font-medium" onClick={() => setOpen(false)}>Pages</Link>
          <Link href="/contact" className="text-sm font-medium" onClick={() => setOpen(false)}>Contact</Link>
          <SearchBar />
          <ThemeToggle />
        </nav>
      </SheetContent>
    </Sheet>
  );
}