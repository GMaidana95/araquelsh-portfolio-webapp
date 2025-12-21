"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Heart, MapPin, ChevronLeft, ChevronRight } from "lucide-react"

type MediaItem = {
  type: "image" | "video"
  src: string
}

type CosplayProject = {
  id: number
  media: MediaItem[]
  character: string
  series: string
  category: string
  description: string
}

const cosplayProjects: CosplayProject[] = [
  {
    id: 1,
    media: [
      { type: "image", src: "/anime-character-cyberpunk-violet-armor.jpg" },
      { type: "image", src: "/2b-cosplay-front-view.jpg" },
      { type: "video", src: "/2b-cosplay-video-showcase.jpg" },
    ],
    character: "2B",
    series: "NieR: Automata",
    category: "Videojuegos",
    description: "Comic-Con Argentina 2023 - Mejor Armadura",
  },
  {
    id: 2,
    media: [
      { type: "image", src: "/kuromi-gothic-lolita-dark-aesthetic.jpg" },
      { type: "image", src: "/kuromi-cosplay-details.jpg" },
    ],
    character: "Kuromi",
    series: "Sanrio",
    category: "Anime",
    description: "Bahía Blanca Anime Fest - Fan Favorite",
  },
  {
    id: 3,
    media: [
      { type: "image", src: "/jinx-league-of-legends-violet-hair-cyberpunk.jpg" },
      { type: "video", src: "/jinx-cosplay-performance-video.jpg" },
      { type: "image", src: "/jinx-weapons-detail.jpg" },
    ],
    character: "Jinx",
    series: "League of Legends",
    category: "Videojuegos",
    description: "La Plata Gaming Convention 2024 - Best in Show",
  },
  {
    id: 4,
    media: [
      { type: "image", src: "/marin-kitagawa-dress-elegant-anime.jpg" },
      { type: "image", src: "/marin-cosplay-dress-detail.jpg" },
    ],
    character: "Marin Kitagawa",
    series: "My Dress-Up Darling",
    category: "Anime",
    description: "Buenos Aires Anime Expo - Concurso Principal",
  },
  {
    id: 5,
    media: [
      { type: "image", src: "/cyberpunk-edgerunner-lucy-netrunner-suit.jpg" },
      { type: "video", src: "/lucy-cosplay-led-effects-video.jpg" },
      { type: "image", src: "/lucy-suit-tech-details.jpg" },
    ],
    character: "Lucy",
    series: "Cyberpunk: Edgerunners",
    category: "Anime",
    description: "Cosplay Fest Patagonia - Mejor Construcción",
  },
  {
    id: 6,
    media: [
      { type: "image", src: "/vi-arcane-pink-hair-punk-fighter.jpg" },
      { type: "image", src: "/vi-gauntlets-cosplay.jpg" },
      { type: "video", src: "/vi-cosplay-action-video.jpg" },
    ],
    character: "Vi",
    series: "Arcane",
    category: "Videojuegos",
    description: "Argentina Game Show - Mejor Performance",
  },
]

function MediaCarousel({ media }: { media: MediaItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const minSwipeDistance = 50

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % media.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      goToNext()
    } else if (isRightSwipe) {
      goToPrevious()
    }
  }

  return (
    <div
      className="relative aspect-[3/4] overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Media Items */}
      {media.map((item, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {item.type === "image" ? (
            <img
              src={item.src || "/placeholder.svg"}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <video src={item.src} className="w-full h-full object-cover" autoPlay loop muted playsInline />
          )}
        </div>
      ))}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

      {/* Navigation Arrows - Only show if more than 1 media item */}
      {media.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation()
              goToPrevious()
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-glow-bg backdrop-blur-sm border border-glass-border rounded-full p-2 text-primary hover:text-primary-foreground hover:bg-primary/40 hover:border-primary transition-all duration-300 hover:scale-110"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              goToNext()
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-glow-bg backdrop-blur-sm border border-glass-border rounded-full p-2 text-primary hover:text-primary-foreground hover:bg-primary/40 hover:border-primary transition-all duration-300 hover:scale-110"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Pagination Dots - Only show if more than 1 media item */}
      {media.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {media.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation()
                goToSlide(index)
              }}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? "w-8 h-2 bg-primary shadow-[0_0_10px_var(--color-primary)]"
                  : "w-2 h-2 bg-primary/60 hover:bg-primary/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function CosplayPortfolio() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos")

  const categories = ["Todos", "Videojuegos", "Anime"]

  const filteredProjects =
    selectedCategory === "Todos"
      ? cosplayProjects
      : cosplayProjects.filter((project) => project.category === selectedCategory)

  return (
    <section id="portfolio" className="mt-32 space-y-12">
      {/* Section Title */}
      <div className="text-center space-y-4">
        <h2 className="text-5xl lg:text-6xl font-bold font-[family-name:var(--font-orbitron)] neon-text text-primary">
          Mi Portfolio
        </h2>
        <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
          Una colección de mis trabajos favoritos, cada uno con su propia historia y pasión
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex justify-center">
        <div className="glass-card neon-border border-glass-border bg-glow-bg p-2 rounded-2xl inline-flex gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-xl font-[family-name:var(--font-orbitron)] font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground neon-glow shadow-[0_0_20px_var(--color-primary)]"
                  : "text-primary hover:text-primary-foreground hover:bg-primary/20"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <Card
            key={project.id}
            className="group relative overflow-hidden bg-glow-bg border-glass-border neon-border-subtle hover:border-primary transition-all duration-500 hover:scale-[1.02] cursor-pointer"
          >
            {/* Neon Glow Effect on Hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500" />

            <div className="relative">
              <MediaCarousel media={project.media} />

              {/* Category Badge */}
              <div className="absolute top-4 left-4 z-20">
                <Badge className="bg-glow-bg border-primary/60 text-primary backdrop-blur-sm font-[family-name:var(--font-orbitron)] text-xs">
                  {project.category}
                </Badge>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Character Info */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold font-[family-name:var(--font-orbitron)] text-primary-foreground group-hover:text-foreground transition-colors flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    {project.character}
                  </h3>
                  <p className="text-primary-foreground/80 text-sm flex items-center gap-2">
                    <Heart className="w-4 h-4 text-neon-accent" />
                    {project.series}
                  </p>
                </div>

                {/* Description */}
                <div className="pt-4 border-t border-glass-border space-y-2">
                  <p className="text-xs text-primary font-[family-name:var(--font-orbitron)] uppercase tracking-wider flex items-center gap-2">
                    <MapPin className="w-3 h-3" />
                    Descripción
                  </p>
                  <p className="text-sm text-primary-foreground/90 leading-relaxed">{project.description}</p>
                </div>

                {/* Animated Indicator */}
                <div className="flex gap-2 pt-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-neon-secondary animate-pulse delay-300" />
                  <div className="w-2 h-2 rounded-full bg-neon-accent animate-pulse delay-700" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
