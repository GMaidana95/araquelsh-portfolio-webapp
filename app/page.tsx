import { Card } from "@/components/ui/card"
import { Sparkles, Gamepad2, Users, MapPin } from "lucide-react"
import { CosplayPortfolio } from "@/components/cosplay-portfolio"
import { ContactForm } from "@/components/contact-form"

export default function Home() {
  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(160,80,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(160,80,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      <div className="absolute top-20 right-20 w-96 h-96 bg-violet-600/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-700/20 rounded-full blur-[100px] animate-pulse delay-1000" />

      <div className="relative z-10 container mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />
              <div className="relative neon-border rounded-2xl overflow-hidden bg-black">
                <img
                  src="/gothic-cyberpunk-female-cosplayer-with-violet-neon.jpg"
                  alt="Araquelsh Cosplayer"
                  className="w-full h-auto object-cover aspect-[3/4]"
                />
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-8">
            <div className="space-y-4">
              <h1 className="text-6xl lg:text-7xl font-bold tracking-tight font-[family-name:var(--font-orbitron)] neon-text text-violet-300">
                Araquelsh
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-lg lg:text-xl text-violet-200">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-violet-400" />
                  Cosplayer
                </span>
                <span className="text-violet-500">|</span>
                <span className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-violet-400" />
                  Jurado
                </span>
                <span className="text-violet-500">|</span>
                <span className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-violet-400" />
                  Anfitriona
                </span>
              </div>

              <div className="flex items-center gap-2 text-violet-300">
                <MapPin className="w-5 h-5 text-violet-400" />
                <span className="text-lg">Bahia Blanca, Argentina</span>
              </div>
            </div>

            <Card className="glass-card neon-border border-violet-500/60 bg-transparent">
              <div className="p-6 lg:p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-violet-600/30 neon-glow">
                    <Gamepad2 className="w-6 h-6 text-violet-300" />
                  </div>
                  <h2 className="text-2xl font-bold font-[family-name:var(--font-orbitron)] text-violet-200">
                    Sobre Mí
                  </h2>
                </div>

                <p className="text-violet-100/90 leading-relaxed text-lg">
                  Gamer y cosplayer desde los 15 años, he dedicado mi vida a fusionar mi pasión por los videojuegos y el
                  anime con el arte del cosplay. Cada personaje que interpreto es una expresión de mi amor por estas
                  culturas, y me encanta compartir esta experiencia con la comunidad.
                </p>

                <p className="text-violet-100/90 leading-relaxed text-lg">
                  Como jurado y anfitriona, tengo el honor de apoyar y celebrar el talento de otros cosplayers, ayudando
                  a crear espacios donde la creatividad y la pasión se encuentran.
                </p>

                <div className="flex gap-4 pt-4 border-t border-violet-500/30">
                  <div className="flex items-center gap-2 text-violet-300">
                    <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                    <span className="text-sm font-[family-name:var(--font-orbitron)]">Gaming</span>
                  </div>
                  <div className="flex items-center gap-2 text-violet-300">
                    <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse delay-300" />
                    <span className="text-sm font-[family-name:var(--font-orbitron)]">Anime</span>
                  </div>
                  <div className="flex items-center gap-2 text-violet-300">
                    <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse delay-700" />
                    <span className="text-sm font-[family-name:var(--font-orbitron)]">Cosplay</span>
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

      <ContactForm />
    </main>
  )
}
