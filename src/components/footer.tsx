"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { NewsletterForm } from "@/components/newsletter-form";
import { useState, useEffect } from "react";

export function Footer() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoUrl = mounted && theme === "dark" ? "/logo-icon-white.png" : "/logo-icon-blue.png";

  return (
    <footer className="bg-[#F6F6F7] dark:bg-[#141624] mt-16 py-16">
      <div className="container max-w-7xl mx-auto px-6">
        {/* Üst Bölüm */}
        <div className="grid grid-cols-12 gap-8 mb-16">
          {/* About */}
          <div className="col-span-12 md:col-span-4 md:mr-8">
            <div className="max-w-[85%]">
              <h3 className="font-semibold mb-4">About</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
              </p>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Email: </span>
                  <span className="text-muted-foreground">info@jstemplate.net</span>
                </p>
                <p className="text-sm">
                  <span className="font-medium">Phone: </span>
                  <span className="text-muted-foreground">880 123 456 789</span>
                </p>
              </div>
            </div>
          </div>

          {/* Quick Link ve Category */}
          <div className="col-span-12 md:col-span-4 grid grid-cols-2 gap-8">
            {/* Quick Link */}
            <div>
              <h3 className="font-semibold mb-4">Quick Link</h3>
              <ul className="space-y-2">
                {["Home", "About", "Blog", "Archived", "Author", "Contact"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Category */}
            <div>
              <h3 className="font-semibold mb-4">Category</h3>
              <ul className="space-y-2">
                {["Lifestyle", "Technology", "Travel", "Business", "Economy", "Sports"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Weekly Newsletter */}
          <div className="col-span-12 md:col-span-4 flex justify-center md:justify-start">
            <div className="bg-background dark:bg-[#242535] p-6 rounded-xl max-w-[90%] md:max-w-full">
              <h3 className="text-lg font-medium mb-2 text-center">Weekly Newsletter</h3>
              <p className="text-sm text-muted-foreground mb-4 text-center">
                Get blog articles and offers via email
              </p>
              <NewsletterForm />
            </div>
          </div>
        </div>

        {/* Alt Bölüm */}
        <div className="pt-8 border-t border-border grid grid-cols-12 gap-4 items-center">
          {/* Logo ve Copyright */}
          <div className="col-span-12 md:col-span-6">
            <div className="flex items-start">
              <img 
                src={logoUrl}
                alt="MetaBlog Icon" 
                className="h-10" 
              />
              <div className="flex flex-col ml-2 items-start -mt-1">
                <div className="flex">
                  <span className="text-lg font-light text-foreground">Meta</span>
                  <span className="text-lg font-bold text-foreground">Blog</span>
                </div>
                <p className="text-sm text-[#696A75]">
                  © JS Template 2023. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>

          {/* Policy Links */}
          <div className="col-span-12 md:col-span-6 flex justify-end">
            <div className="flex items-center space-x-4">
              {["Terms of Use", "Privacy Policy", "Cookie Policy"].map((item, index, array) => (
                <div key={item} className="flex items-center">
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item}
                  </Link>
                  {index !== array.length - 1 && (
                    <span className="text-muted-foreground border-r border-border h-4 mx-4"></span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 