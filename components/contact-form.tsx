"use client"

import type React from "react"
import { toast } from "sonner"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, Sparkles, Heart } from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    surename: "",
    email: "",
    eventName: "",
    date: "",
    message: "",
  })

  const notify = () => toast("Mensaje enviado!")

  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert("¡Mensaje enviado con éxito! Araquelsh te contactará pronto.")
        setFormData({ name: "",surename: "", email: "", eventName: "", date: "", message: "" }) // Limpiar form
      } else {
        throw new Error()
      }
    } catch (error) {
      alert("Hubo un error al enviar. Por favor, intenta de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section className="relative py-20 lg:py-32" id="contacto">
      {/* Violet Grid Background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(160,80,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(160,80,255,0.15)_1px,transparent_1px)] bg-size-[40px_40px]" />
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px] animate-pulse delay-700" />

      {/* Anime Decorations - Kuromi Style */}
      <div className="absolute top-10 right-10 opacity-20 animate-bounce-slow">
        <Heart className="w-16 h-16 text-violet-400 fill-violet-400" />
      </div>
      <div className="absolute bottom-10 left-10 opacity-20 flex gap-2">
        <Sparkles className="w-12 h-12 text-pink-400 animate-pulse" />
        <Sparkles className="w-8 h-8 text-violet-400 animate-pulse delay-300" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-5xl lg:text-6xl font-bold font-orbitron neon-text text-violet-300">
              Contacto Profesional
            </h2>
            <p className="text-xl text-violet-200/80">¿Organizas un evento? Trabajemos juntos</p>
            <div className="flex justify-center gap-2">
              <div className="h-1 w-20 bg-gradient-to-r from-transparent via-violet-500 to-transparent rounded-full" />
            </div>
          </div>

          {/* Contact Form Card */}
          <Card className="glass-card neon-border border-violet-500/60 bg-transparent relative overflow-hidden">
            <form onSubmit={handleSubmit} className="relative p-8 lg:p-12 space-y-6">
              {/* Name/Company */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-orbitron text-violet-300 uppercase tracking-wider flex items-center gap-2"
                >
                  <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                  Nombre / Empresa
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-black/50 border-violet-500/40 focus:border-violet-400 text-violet-100 placeholder:text-violet-400/50 h-12 neon-border-subtle"
                  placeholder="Tu nombre o empresa"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-orbitron text-violet-300 uppercase tracking-wider flex items-center gap-2"
                >
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse delay-300" />
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-black/50 border-violet-500/40 focus:border-violet-400 text-violet-100 placeholder:text-violet-400/50 h-12 neon-border-subtle"
                  placeholder="tu@email.com"
                />
              </div>

              {/* Event Name */}
              <div className="space-y-2">
                <label
                  htmlFor="eventName"
                  className="text-sm font-orbitron text-violet-300 uppercase tracking-wider flex items-center gap-2"
                >
                  <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse delay-500" />
                  Nombre del Evento
                </label>
                <Input
                  id="eventName"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleChange}
                  required
                  className="bg-black/50 border-violet-500/40 focus:border-violet-400 text-violet-100 placeholder:text-violet-400/50 h-12 neon-border-subtle"
                  placeholder="Comic-Con, Convención de Anime, etc."
                />
              </div>

              {/* Date (Optional) */}
              <div className="space-y-2">
                <label
                  htmlFor="date"
                  className="text-sm font-orbitron text-violet-300 uppercase tracking-wider flex items-center gap-2"
                >
                  <div className="w-2 h-2 rounded-full bg-violet-300 animate-pulse delay-700" />
                  Fecha del Evento
                  <span className="text-xs text-violet-400/60 normal-case">(Opcional)</span>
                </label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="bg-black/50 border-violet-500/40 focus:border-violet-400 text-violet-100 h-12 neon-border-subtle"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-orbitron text-violet-300 uppercase tracking-wider flex items-center gap-2"
                >
                  <div className="w-2 h-2 rounded-full bg-purple-300 animate-pulse delay-1000" />
                  Mensaje
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="bg-black/50 border-violet-500/40 focus:border-violet-400 text-violet-100 placeholder:text-violet-400/50 resize-none neon-border-subtle"
                  placeholder="Cuéntame sobre tu evento, el rol que buscas (jurado, conductora, invitada especial), y cualquier detalle relevante..."
                />
              </div>

              <div className="opacity-0 absolute -z-10 h-0 w-0 overflow-hidden" aria-hidden="true">
                <label htmlFor="address">Dirección (No completar)</label>
                <Input
                  id="address"
                  name="address"
                  tabIndex={-1}
                  value={formData.surename}
                  onChange={handleChange}
                  placeholder="Tu apellido"
                />
              </div>              

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                onClick={()=>notify}
                className="w-full h-14 bg-gradient-to-r from-violet-600 via-purple-600 to-violet-600 hover:from-violet-500 hover:via-purple-500 hover:to-violet-500 text-white font-orbitron text-lg uppercase tracking-wider neon-border border-violet-400 relative overflow-hidden group/btn"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 opacity-0 group-hover/btn:opacity-100 animate-pulse-neon" />
                <span className="relative flex items-center justify-center gap-3">
                  <Send className="w-5 h-5" />
                  {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                </span>
              </Button>

              {/* Decorative Elements */}
              <div className="flex justify-center gap-3 pt-6">
                <div className="h-1 w-16 bg-gradient-to-r from-transparent via-violet-500 to-transparent rounded-full animate-pulse" />
                <div className="h-1 w-12 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full animate-pulse delay-300" />
                <div className="h-1 w-8 bg-gradient-to-r from-transparent via-pink-500 to-transparent rounded-full animate-pulse delay-700" />
              </div>
            </form>
          </Card>
        </div>
      </div>
    </section>
  )
}
