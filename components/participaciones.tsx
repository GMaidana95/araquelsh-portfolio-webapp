"use client"

import { Card } from "@/components/ui/card"
import { Calendar, MapPin, Award, Sparkles, MicVocal, LucideTrophy, HelpingHand } from "lucide-react"

import { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'

interface Participacion {
  id?: string
  lugar: string
  fecha: string
  nombreEvento: string
  tipoParticipacion: string | string[]
  cosplayName?: string
}

// Optional fallback while loading
const FALLBACK: Participacion[] = [
  {
    lugar: 'Buenos Aires, Argentina',
    fecha: '15-17 Nov 2024',
    nombreEvento: 'Comic-Con Argentina 2024',
    tipoParticipacion: 'Concurso',
  },
  {
    lugar: 'Bahía Blanca, Argentina',
    fecha: '22 Sep 2024',
    nombreEvento: 'Anime Fest BB',
    tipoParticipacion: 'Conductora',
  },
]

export function Participaciones() {
  const [participaciones, setParticipaciones] = useState<Participacion[]>(FALLBACK)
  const [loading, setLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const tableRef = useRef<HTMLTableSectionElement>(null)

  useEffect(() => {
    const fetchEventos = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('eventos')
          .select('id, place, date, event_name, type, cosplay')
          .order('date', { ascending: false })

        if (error) throw error

        // Resolve cosplay relationships (eventos.cosplay -> cosplays.name)
        const cosplayIds = Array.from(new Set((data || []).map((e: any) => e.cosplay).filter(Boolean)))
        let cosplayMap: Record<string, string> = {}
        if (cosplayIds.length > 0) {
          const { data: cosplaysData, error: cosplaysError } = await supabase
            .from('cosplays')
            .select('id, name')
            .in('id', cosplayIds)

          if (cosplaysError) throw cosplaysError
          cosplayMap = Object.fromEntries((cosplaysData || []).map((c: any) => [c.id, c.name]))
        }

        // Normalize type field: parse JSON string to array, handle legacy string values
        const mapped = (data || []).map((e: any) => {
          let tipos: string[] = []
          if (typeof e.type === 'string' && e.type) {
            try {
              const parsed = JSON.parse(e.type)
              tipos = Array.isArray(parsed) ? parsed : [e.type]
            } catch {
              // Si no es JSON válido, tratar como string simple (compatibilidad con datos antiguos)
              tipos = [e.type]
            }
          } else if (Array.isArray(e.type)) {
            tipos = e.type
          }
          
          return {
            id: e.id,
            lugar: e.place || '',
            fecha: e.date || '',
            nombreEvento: e.event_name || '',
            tipoParticipacion: tipos.length > 0 ? tipos : ['Concurso'],
            cosplayName: e.cosplay && typeof e.cosplay === 'string' ? (cosplayMap[e.cosplay] || '') : (e.cosplay?.name || ''),
          }
        })

        setParticipaciones(mapped)
      } catch (err) {
        console.error('Error fetching eventos:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchEventos()
  }, [])

  // Intersection Observer for table animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (tableRef.current) {
      observer.observe(tableRef.current)
    }

    return () => {
      if (tableRef.current) {
        observer.unobserve(tableRef.current)
      }
    }
  }, [])


  const getParticipacionColor = (tipo: string) => {
    switch (tipo) {
      case 'Jurado':
        return 'border-amber-400 text-amber-300 bg-amber-600/10'
      case 'Conductora':
        return 'border-green-400 text-green-300 bg-green-600/10'
      case 'Invitada':
        return 'border-blue-400 text-blue-300 bg-blue-600/10'
      case 'Participante':
        return 'border-pink-400 text-pink-300 bg-blue-600/10'
      case 'Colaboracion':
        return 'border-violet-400 text-violet-300 bg-blue-600/10'
      default:
        return 'border-gray-400 text-gray-300'
    }
  }

  const getParticipacionIcon = (tipo: string) => {
    switch (tipo) {
      case 'Jurado':
        return <Award className="w-4 h-4 text-amber-300" />
      case 'Conductora':
        return <MicVocal className="w-4 h-4 text-green-300" />
      case 'Invitada':
        return <Sparkles className="w-4 h-4 text-blue-300" />
      case 'Participante':
        return <LucideTrophy className="w-4 h-4 text-pink-300" />
      case 'Colaboracion':
        return <HelpingHand className="w-4 h-4 text-violet-300" />
      default:
        return null
    }
  }

  return (
    <section id="participaciones" className="relative z-10 container mx-auto px-4 py-24">
      {/* Section Title */}
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-5xl lg:text-6xl font-bold font-orbitron neon-text text-violet-300">
          Eventos
        </h2>
        <p className="text-violet-200/80 text-lg max-w-2xl mx-auto">
          Actividades donde he participado y próximas apariciones
        </p>
      </div>

      {/* Table Card */}
      <Card className="glass-card neon-border border-violet-500/60 bg-transparent overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-violet-500/30 bg-violet-950/30">
                <th className="px-6 py-4 text-left text-sm font-bold font-orbitron text-violet-300 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Lugar
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold font-orbitron text-violet-300 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Fecha
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold font-orbitron text-violet-300 uppercase tracking-wider">
                  Evento
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold font-orbitron text-violet-300 uppercase tracking-wider">
                  Cosplay
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold font-orbitron text-violet-300 uppercase tracking-wider">
                  Participación
                </th>
              </tr>
            </thead>
            <tbody ref={tableRef}>
              {loading ? (
                <tr>
                  <td className="px-6 py-6 text-center text-violet-200/60" colSpan={5}>
                    Cargando participaciones...
                  </td>
                </tr>
              ) : participaciones.length === 0 ? (
                <tr>
                  <td className="px-6 py-6 text-center text-violet-200/60" colSpan={5}>
                    No hay participaciones registradas
                  </td>
                </tr>
              ) : (
                participaciones.map((participacion, index) => (
                  <tr
                    key={participacion.id ?? index}
                    className={`border-b border-violet-500/20 hover:bg-violet-950/20 transition-all duration-500 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-5"
                    }`}
                    style={{
                      transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
                    }}
                  >
                    <td className="px-6 py-4 text-violet-100/90">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                        {participacion.lugar}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-violet-100/80 font-mono text-sm">{participacion.fecha}</td>
                    <td className="px-6 py-4 text-violet-100 font-semibold">{participacion.nombreEvento}</td>
                    <td className="px-6 py-4 text-violet-100/80">{participacion.cosplayName}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {(Array.isArray(participacion.tipoParticipacion) 
                          ? participacion.tipoParticipacion 
                          : [participacion.tipoParticipacion]
                        ).map((tipo, idx) => (
                          <span
                            key={idx}
                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-orbitron uppercase tracking-wider border ${getParticipacionColor(
                              tipo
                            )}`}
                          >
                            {getParticipacionIcon(tipo)}
                            {tipo}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </section>
  )
}

