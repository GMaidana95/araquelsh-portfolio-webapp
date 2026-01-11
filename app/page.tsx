"use client"

import { Card } from "@/components/ui/card"
import { AwardIcon, Gamepad2, Mic2Icon,Users, MapPin } from "lucide-react"
import { CosplayPortfolio } from "@/components/cosplay-portfolio"
import { Participaciones } from "@/components/participaciones"
import { ContactForm } from "@/components/contact-form"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useState, useEffect, useRef } from "react"

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isAboutVisible, setIsAboutVisible] = useState(false)
  const aboutSectionRef = useRef<HTMLDivElement>(null)

  // Mouse spotlight effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Intersection Observer for "Sobre Mí" fade-in
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsAboutVisible(true)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (aboutSectionRef.current) {
      observer.observe(aboutSectionRef.current)
    }

    return () => {
      if (aboutSectionRef.current) {
        observer.unobserve(aboutSectionRef.current)
      }
    }
  }, [])

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <Navbar />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(160,80,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(160,80,255,0.1)_1px,transparent_1px)] bg-size-[50px_50px] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      {/* Mouse Spotlight Effect */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(160, 80, 255, 0.15), transparent 80%)`,
        }}
      />

      <div className="absolute top-20 right-20 w-96 h-96 bg-neon-primary/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-neon-secondary/20 rounded-full blur-[100px] animate-pulse delay-1000" />

      <div id="hero" className="relative z-10 container mx-auto px-4 py-12 lg:py-20 pt-32">
        <div ref={aboutSectionRef} className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`order-2 lg:order-1 transition-all duration-1000 ease-out ${
            isAboutVisible 
              ? "opacity-100 translate-x-0" 
              : "opacity-0 -translate-x-[100px]"
          }`}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />
              <div className="relative neon-border rounded-2xl overflow-hidden bg-background">
                <img
                  src="https://zriubvwzoutaoefoxzdh.supabase.co/storage/v1/object/public/cosplay-media/Cosplays/LynetteAboutme.jpeg"
                  alt="Araquelsh Cosplayer"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          <div className={`order-1 lg:order-2 space-y-8 transition-all duration-1000 ease-out ${
            isAboutVisible 
              ? "opacity-100 translate-x-0" 
              : "opacity-0 translate-x-[100px]"
          }`}>
            <div className="space-y-4">
              <h1 className="text-6xl lg:text-7xl font-bold tracking-tight font-orbitron neon-text text-primary">
                Araquelsh
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-lg lg:text-xl text-primary-foreground/80">
                <span className="flex items-center gap-2">
                  <AwardIcon className="w-5 h-5 text-primary" />
                  Cosplayer
                </span>
                <span className="text-border">|</span>
                <span className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Jurado
                </span>
                <span className="text-border">|</span>
                <span className="flex items-center gap-2">
                  <Mic2Icon className="w-5 h-5 text-primary" />
                  Conductora
                </span>
              </div>

              <div className="flex items-center gap-2 text-primary-foreground/80">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-lg">Bahia Blanca, Argentina</span>
              </div>
            </div>

            <Card id="sobre-mi" className="glass-card neon-border border-glass-border bg-transparent">
              <div className="p-6 lg:p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-neon-primary/30 neon-glow">
                    <Gamepad2 className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold font-orbitron text-primary-foreground">
                    Sobre Mí
                  </h2>
                </div>

                <p className="text-foreground/90 leading-relaxed text-lg">
                  Mi nombre es Lucia, tengo 25 años y mi primer cosplay fue a los 15 años, a partir de ahí me sumergí en
                  todo el mundo "friki" con pasión genuina, compartiendo contenido que mezcla lo lúdico, lo estético, lo
                  escénico y lo emocional: cosplay, juegos, cultura japonesa, y todo lo que me inspira.
                </p>

                <p className="text-foreground/90 leading-relaxed text-lg">
                  Como gamer, entiendo la emoción que hay detrás de cada fandom y evento. Sé lo que significa esperar
                  una final, conocer a tus creadores favoritos o sentirse parte de algo más grande. Puedo conectar con
                  el público porque yo también soy ese público.
                </p>

                <p className="text-foreground/90 leading-relaxed text-lg">
                  Como cosplayer y fan del anime, disfruto expresarme a través de personajes, las artes escénicas son algo que me mueve desde pequeña, el universo otaku y referencias que nos unen como comunidad. Me encanta hablar con la gente, escuchar historias y generar espacios donde todos se sientan vistos y bienvenidos.
                </p>

                <div className="flex gap-4 pt-4 border-t border-glass-border">
                  <div className="flex items-center gap-2 text-primary-foreground/80">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-sm font-orbitron">Gaming</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary-foreground/80">
                    <div className="w-2 h-2 rounded-full bg-neon-secondary animate-pulse delay-300" />
                    <span className="text-sm font-orbitron">Anime</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary-foreground/80">
                    <div className="w-2 h-2 rounded-full bg-neon-accent animate-pulse delay-700" />
                    <span className="text-sm font-orbitron">Cosplay</span>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex gap-3">
              <div className="h-1 w-20 bg-gradient-to-r from-violet-600 to-transparent rounded-full" />
              <div className="h-1 w-12 bg-gradient-to-r from-purple-600 to-transparent rounded-full" />
              <div className="h-1 w-8 bg-gradient-to-r from-pink-600 to-transparent rounded-full" />
            </div>
          </div>
        </div>

        <CosplayPortfolio />
      </div>

      <Participaciones />

      <ContactForm />
      
      <Footer />
    </main>
  )
}
