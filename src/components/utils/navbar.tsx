
"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const Navbar = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Chat", path: "/chat" },
  ];

  const mobileVariants = {
    open: { x: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
    closed: { x: "-100%", opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
  };

  return (
    <motion.nav
      className="sticky top-0 bg-background z-50 shadow-sm"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center space-x-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="Ragify Logo" />
          </Avatar>
          <span className="font-bold text-xl">Ragify</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link key={item.id} href={item.path} className="hover:text-primary transition-colors">
              {item.name}
            </Link>
          ))}
          <Button>Login</Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu className="h-6 w-6 cursor-pointer" />
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-6">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link key={item.id} href={item.path} className="hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                ))}
                <Button>Login</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;