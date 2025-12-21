"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Sparkles } from "lucide-react"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login
    setTimeout(() => {
      console.log("Login attempt:", { email, password })
      setIsLoading(false)
      // Redirect to admin dashboard
      window.location.href = "/admin"
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-4">
      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(160, 80, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(160, 80, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Scanline Effect */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          background: "repeating-linear-gradient(0deg, rgba(160, 80, 255, 0.03) 0px, transparent 2px, transparent 4px)",
          animation: "scanlines 8s linear infinite",
        }}
      />

      {/* Animated Glow Orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />

      {/* Login Card */}
      <Card className="relative w-full max-w-md glass-card border-0">
        {/* Neon Border Glow */}
        <div className="absolute -inset-[1px] bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 rounded-xl opacity-40 blur-sm" />

        <div className="relative p-8 lg:p-10 space-y-8">
          {/* Kuromi-style Anime Decorations */}
          <div className="absolute -top-3 -right-3 flex gap-1">
            <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
            <Sparkles className="w-3 h-3 text-violet-400 animate-pulse delay-300" />
          </div>

          <div className="absolute -bottom-3 -left-3 flex flex-col gap-1">
            <div className="w-6 h-6 rounded-full bg-violet-600/30 border-2 border-violet-400/50" />
            <div className="w-4 h-4 rounded-full bg-pink-600/30 border-2 border-pink-400/50 ml-2" />
          </div>

          {/* Kuromi Skull Icon (Anime Style) */}
          <div className="absolute top-8 left-8 opacity-20">
            <svg className="w-16 h-16 text-violet-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
          </div>

          {/* Title */}
          <div className="text-center space-y-2 pt-8">
            <h1 className="text-4xl font-bold font-[family-name:var(--font-orbitron)] neon-text text-violet-300">
              Bienvenido
            </h1>
            <p className="text-sm text-violet-300/60">Panel de Administración</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-violet-300 block">
                Email
              </label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-black/40 border-violet-500/50 text-violet-100 placeholder:text-violet-400/40 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-violet-300 block">
                Contraseña
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-black/40 border-violet-500/50 text-violet-100 placeholder:text-violet-400/40 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30 transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-violet-400 hover:text-violet-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-[family-name:var(--font-orbitron)] uppercase tracking-wider relative overflow-hidden group transition-all duration-300"
            >
              {/* Neon Pulse Effect */}
              <div className="absolute inset-0 bg-violet-400/30 animate-pulse-neon" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

              <span className="relative z-10">{isLoading ? "Ingresando..." : "Sign In"}</span>
            </Button>
          </form>

          {/* Footer Link */}
          <div className="text-center pt-4">
            <a href="/" className="text-sm text-violet-400/60 hover:text-violet-400 transition-colors">
              ← Volver al sitio principal
            </a>
          </div>
        </div>
      </Card>

      <style jsx>{`
        @keyframes scanlines {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(4px);
          }
        }
        .delay-300 {
          animation-delay: 300ms;
        }
        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  )
}
