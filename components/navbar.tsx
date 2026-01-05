"use client"

import { useState } from "react"
import { Menu, X, ChevronDown, Instagram, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
    setMobileMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-violet-500/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            className="text-2xl font-bold font-orbitron neon-text text-violet-300 hover:text-violet-200 transition-colors"
          >
            ARAQUELSH
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("sobre-mi")}
              className="text-violet-200 hover:text-violet-300 transition-colors font-medium"
            >
              Sobre Mí
            </button>
            <button
              onClick={() => scrollToSection("portfolio")}
              className="text-violet-200 hover:text-violet-300 transition-colors font-medium"
            >
              Portafolio
            </button>
            <button
              onClick={() => scrollToSection("participaciones")}
              className="text-violet-200 hover:text-violet-300 transition-colors font-medium"
            >
              Participaciones
            </button>
            <button
              onClick={() => scrollToSection("contacto")}
              className="text-violet-200 hover:text-violet-300 transition-colors font-medium"
            >
              Contacto
            </button>

            {/* Social Media Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-violet-200 hover:text-violet-300 hover:bg-violet-500/10 transition-colors font-medium"
                >
                  Redes
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-black/95 backdrop-blur-xl border border-violet-500/30 min-w-[180px]"
              >
                <DropdownMenuItem
                  className="text-violet-200 hover:text-violet-300 hover:bg-violet-500/10 cursor-pointer"
                  asChild
                >
                  <a
                    href="https://instagram.com/araquelshh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Instagram className="h-4 w-4" />
                    Instagram
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-violet-200 hover:text-violet-300 hover:bg-violet-500/10 cursor-pointer"
                  asChild
                >
                  <a
                    href="https://tiktok.com/@araquelshh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    </svg>
                    TikTok
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-violet-200 hover:text-violet-300 hover:bg-violet-500/10 cursor-pointer"
                  asChild
                >
                  <a
                    href="https://twitter.com/araquelsh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Twitter className="h-4 w-4" />X (Twitter)
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-violet-300 hover:text-violet-200 transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-violet-500/30">
            <button
              onClick={() => scrollToSection("sobre-mi")}
              className="block w-full text-left text-violet-200 hover:text-violet-300 transition-colors font-medium py-2"
            >
              Sobre Mí
            </button>
            <button
              onClick={() => scrollToSection("portfolio")}
              className="block w-full text-left text-violet-200 hover:text-violet-300 transition-colors font-medium py-2"
            >
              Portafolio
            </button>
            <button
              onClick={() => scrollToSection("participaciones")}
              className="block w-full text-left text-violet-200 hover:text-violet-300 transition-colors font-medium py-2"
            >
              Participaciones
            </button>
            <button
              onClick={() => scrollToSection("contacto")}
              className="block w-full text-left text-violet-200 hover:text-violet-300 transition-colors font-medium py-2"
            >
              Contacto
            </button>

            <div className="pt-2 border-t border-violet-500/30">
              <p className="text-violet-400 text-sm font-medium mb-2">Redes</p>
              <div className="space-y-2 pl-4">
                <a
                  href="https://instagram.com/araquelshh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-violet-200 hover:text-violet-300 transition-colors py-2"
                >
                  <Instagram className="h-4 w-4" />
                  Instagram
                </a>
                <a
                  href="https://tiktok.com/@araquelshh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-violet-200 hover:text-violet-300 transition-colors py-2"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                  TikTok
                </a>
                <a
                  href="https://twitter.com/araquelsh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-violet-200 hover:text-violet-300 transition-colors py-2"
                >
                  <Twitter className="h-4 w-4" />X (Twitter)
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
