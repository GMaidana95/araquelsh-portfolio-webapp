"use client"

import { Instagram, TicketIcon as TikTok, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative bg-[#0a0a0a] overflow-hidden">
      {/* Subtle futuristic grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(160,80,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(160,80,255,0.05)_1px,transparent_1px)] bg-size-[40px_40px]" />

      {/* Scanline texture effect */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(160,80,255,0.02)_50%)] bg-size-[100%_4px]" />


      {/* Top neon gradient border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-violet-500 to-pink-500 shadow-[0_0_15px_rgba(160,80,255,0.6)]" />

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Main 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-12">
          {/* Left Column - Branding */}
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-3xl lg:text-4xl font-bold font-orbitron text-violet-300 neon-text">
              ARAQUELSH
            </h3>
            <p className="text-violet-400/80 text-sm tracking-wider">Cosplayer • Jurado • Conductora • Creadora de contenido</p>
          </div>

          {/* Middle Column - Social Hub */}
          <div className="flex items-center justify-center">
            <div className="flex gap-6">
              <a
                href="https://instagram.com/araquelshh"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-4 rounded-lg bg-violet-600/10 border border-violet-500/30 hover:border-pink-500/60 transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-600 to-pink-600 opacity-0 group-hover:opacity-20 blur transition-opacity duration-300" />
                <Instagram className="w-6 h-6 text-violet-300 group-hover:text-pink-400 transition-colors relative z-10" />
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_20px_rgba(236,72,153,0.6)]" />
              </a>

              <a
                href="https://tiktok.com/@araquelshh"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-4 rounded-lg bg-violet-600/10 border border-violet-500/30 hover:border-pink-500/60 transition-all duration-300 hover:scale-110"
                aria-label="TikTok"
              >
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-600 to-pink-600 opacity-0 group-hover:opacity-20 blur transition-opacity duration-300" />
                <TikTok className="w-6 h-6 text-violet-300 group-hover:text-pink-400 transition-colors relative z-10" />
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_20px_rgba(236,72,153,0.6)]" />
              </a>
            </div>
          </div>

          {/* Right Column - Quick Info */}
          <div className="space-y-2 text-center md:text-right">
            <h4 className="text-sm font-bold font-orbitron text-violet-300 uppercase tracking-widest">
              Disponibilidad
            </h4>
            <p className="text-violet-400/70 text-sm">Eventos internacionales y locales</p>
          </div>
        </div>

        {/* Thin divider line */}
        <div className="h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent mb-8" />

        {/* Bottom copyright bar */}
        <div className="text-center">
          <p className="text-violet-400/50 text-xs lg:text-sm">
            © 2026 Araquelsh. Todos los derechos reservados. | Developed by{" "}
            <a href="https://instagram.com/meihou_" target="_blank" rel="noopener noreferrer" className="text-violet-300 font-orbitron">Meihou</a>
          </p>
        </div>
      </div>
    </footer>
  )
}