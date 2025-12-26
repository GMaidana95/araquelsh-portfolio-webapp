"use client"

import type React from "react"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pencil, Trash2, Plus, Calendar, MapPin, Award, Users, Sparkles, MicVocal, LucideTrophy, HelpingHand, User } from "lucide-react"


import { supabase } from "@/lib/supabase"

export default function EditParticipacionesPage() {
  type Evento = { id: string; event_name: string; place: string; date: string; type: string; cosplay?: string | null; cosplayName?: string }

  const [eventos, setEventos] = useState<Evento[]>([])
  const [loading, setLoading] = useState(true)

  // Dialog / form state
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ nombreEvento: "", lugar: "", fecha: "", tipoParticipacion: "Concurso", cosplay: "" })

  // Cosplays list for the select
  const [cosplays, setCosplays] = useState<{ id: string; name: string }[]>([])

  const fetchCosplays = async () => {
    try {
      const { data, error } = await supabase
        .from('cosplays')
        .select('id, name')
        .order('name', { ascending: true })

      if (error) throw error
      setCosplays(data || [])
    } catch (err) {
      console.error('Error fetching cosplays:', err)
    }
  }

  // Load eventos from Supabase
  const fetchEventos = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('eventos')
        .select('id, place, date, event_name, type, cosplay')
        .order('date', { ascending: false })

      if (error) throw error

      // Resolve cosplay names for related cosplay ids
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

      const mapped = (data || []).map((e: any) => ({ ...e, cosplayName: e.cosplay && typeof e.cosplay === 'string' ? (cosplayMap[e.cosplay] || '') : (e.cosplay?.name || '') }))
      setEventos(mapped as Evento[])
    } catch (err) {
      console.error('Error fetching eventos:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEventos()
    fetchCosplays()
  }, [])

  // Map repository rows to UI shape
  const participaciones = eventos.map((e) => ({
    id: e.id,
    nombreEvento: e.event_name,
    lugar: e.place,
    fecha: e.date,
    cosplay: e.cosplay,
    cosplayName: (e as any).cosplayName || '',
    tipoParticipacion: e.type || 'Concurso',
  }))

  // Helpers for badge styles/icons
  const getParticipacionColor = (tipo: string) => {
    switch (tipo) {
      case 'Concurso':
        return 'border-amber-400 text-amber-300 bg-amber-600/10'
      case 'Anfitrión':
        return 'border-green-400 text-green-300 bg-green-600/10'
      case 'Invitado':
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
      case 'Concurso':
        return <Award className="w-4 h-4 text-amber-300" />
      case 'Anfitrión':
        return <MicVocal className="w-4 h-4 text-green-300" />
      case 'Invitado':
        return <Sparkles className="w-4 h-4 text-blue-300" />
      case 'Participante':
        return <LucideTrophy className="w-4 h-4 text-pink-300" />
      case 'Colaboracion':
        return <HelpingHand className="w-4 h-4 text-violet-300" />
      default:
        return null
    }
  }

  const handleAdd = () => {
    setFormData({ nombreEvento: '', lugar: '', fecha: '', tipoParticipacion: 'Concurso', cosplay: "" })
    setEditingId(null)
    setIsDialogOpen(true)
  }

  const handleEdit = (participacion: any) => {
    setFormData({ nombreEvento: participacion.nombreEvento, lugar: participacion.lugar, fecha: participacion.fecha, tipoParticipacion: participacion.tipoParticipacion, cosplay: participacion.cosplay })
    setEditingId(participacion.id)
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingId) {
        const { error } = await supabase
          .from('eventos')
          .update({ event_name: formData.nombreEvento, place: formData.lugar, date: formData.fecha, type: formData.tipoParticipacion, cosplay: formData.cosplay || null })
          .eq('id', editingId)

        if (error) throw error

        await fetchEventos()
        setIsDialogOpen(false)
        setEditingId(null)
        setFormData({ nombreEvento: '', lugar: '', fecha: '', tipoParticipacion: 'Concurso', cosplay: '' })
        return
      }

      // Insert nuevo evento
      const { data, error } = await supabase
        .from('eventos')
        .insert({ event_name: formData.nombreEvento, place: formData.lugar, date: formData.fecha, type: formData.tipoParticipacion, cosplay: formData.cosplay || null })
        .select()

      if (error) throw error

      // Refrescar lista
      await fetchEventos()
      setIsDialogOpen(false)
      setFormData({ nombreEvento: '', lugar: '', fecha: '', tipoParticipacion: 'Concurso', cosplay: "" })
    } catch (err: any) {
      alert('Error: ' + (err.message || err))
    }
  }

  const handleDelete = async (id: string, event_name: string) => {
    if (!confirm(`¿Estás seguro de que quieres eliminar el evento "${event_name}"?`)) return

    try {
      const { error } = await supabase
        .from('eventos')
        .delete()
        .eq('id', id)

      if (error) throw error

      setEventos((prev) => prev.filter((c) => c.id !== id))
      alert('Eliminado correctamente')
    } catch (err: any) {
      alert('Error al eliminar: ' + (err.message || err))
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-[family-name:var(--font-orbitron)] neon-text text-violet-300">
              Gestionar Participaciones
            </h1>
            <p className="text-muted-foreground mt-2">Administra los eventos donde participas</p>
          </div>

          {/* Botón para abrir modal */}
          <div>
            <Button onClick={handleAdd} className="bg-violet-600 hover:bg-violet-700 text-white font-[family-name:var(--font-orbitron)]">
              <Plus className="w-4 h-4 mr-2" />
              Nueva Participación
            </Button>

            {/* Modal simple manteniendo estilos */}
            {isDialogOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/60" onClick={() => setIsDialogOpen(false)} />
                <div className="relative w-full max-w-2xl mx-4">
                  <Card className="glass-card border-violet-500/30 bg-black">
                    <div className="p-6">
                      <div className="mb-4">
                        <h2 className="text-2xl font-bold font-[family-name:var(--font-orbitron)] neon-text text-violet-300">
                          {editingId ? 'Editar Participación' : 'Nueva Participación'}
                        </h2>
                        <p className="text-muted-foreground">Completa la información del evento</p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="nombreEvento">Nombre del Evento *</Label>
                          <Input
                            id="nombreEvento"
                            value={formData.nombreEvento}
                            onChange={(e) => setFormData({ ...formData, nombreEvento: e.target.value })}
                            placeholder="Ej: Comic-Con Argentina 2024"
                            className="bg-black/40 border-violet-500/30 focus:border-violet-500"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="lugar">Lugar *</Label>
                          <Input
                            id="lugar"
                            value={formData.lugar}
                            onChange={(e) => setFormData({ ...formData, lugar: e.target.value })}
                            placeholder="Ej: Buenos Aires, Argentina"
                            className="bg-black/40 border-violet-500/30 focus:border-violet-500"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="fecha">Fecha *</Label>
                          <Input
                            id="fecha"
                            name="date"
                            type="date"
                            value={formData.fecha}
                            onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                            placeholder="AAAA-MM-DD"
                            className="bg-black/40 border-violet-500/30 focus:border-violet-500"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="tipoParticipacion">Tipo de Participación *</Label>
                          <Select value={formData.tipoParticipacion} onValueChange={(value: string) => setFormData({ ...formData, tipoParticipacion: value })}>
                            <SelectTrigger className="bg-black/40 border-violet-500/30 focus:border-violet-500">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-black border-violet-500/30">
                              <SelectItem value="Concurso">Concurso</SelectItem>
                              <SelectItem value="Anfitrión">Anfitrión</SelectItem>
                              <SelectItem value="Invitado">Invitado</SelectItem>
                              <SelectItem value="Participante">Participante</SelectItem>
                              <SelectItem value="Colaboracion">Colaboracion</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cosplay">Cosplay</Label>
                          <Select value={formData.cosplay} onValueChange={(value: string) => setFormData({ ...formData, cosplay: value })}>
                            <SelectTrigger className="bg-black/40 border-violet-500/30 focus:border-violet-500">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-black border-violet-500/30">
                              <SelectItem value="-">Ninguno</SelectItem>
                              {cosplays.map((c) => (
                                <SelectItem key={c.id} value={c.id}>
                                  {c.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex justify-end gap-4 pt-4 border-t border-violet-500/30">
                          <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="border-violet-500/30 bg-transparent">
                            Cancelar
                          </Button>
                          <Button type="submit" className="bg-violet-600 hover:bg-violet-700 text-white font-[family-name:var(--font-orbitron)]">
                            {editingId ? 'Guardar Cambios' : 'Crear Participación'}
                          </Button>
                        </div>
                      </form>
                    </div>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {participaciones.map((participacion) => (
            <Card key={participacion.id} className="glass-card border-violet-500/30">
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-bold text-violet-300 font-[family-name:var(--font-orbitron)]">
                        {participacion.nombreEvento}
                      </h3>
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-[family-name:var(--font-orbitron)] uppercase tracking-wider border ${getParticipacionColor(participacion.tipoParticipacion)}`}>
                        {getParticipacionIcon(participacion.tipoParticipacion)}
                        {participacion.tipoParticipacion}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-violet-400" />
                        {participacion.lugar}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-violet-400" />
                        {participacion.fecha}
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-violet-400" />
                        {participacion.cosplayName || (participacion.cosplay ?? '-')}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleEdit(participacion)} className="border-violet-500/30 hover:bg-violet-600/20 bg-transparent">
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleDelete(participacion.id, participacion.nombreEvento)} className="border-red-500/30 hover:bg-red-600/20 text-red-400 bg-transparent">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {participaciones.length === 0 && (
            <Card className="glass-card border-violet-500/30">
              <div className="p-12 text-center">
                <p className="text-muted-foreground">No hay participaciones registradas</p>
                <Button onClick={handleAdd} className="mt-4 bg-violet-600 hover:bg-violet-700 text-white font-[family-name:var(--font-orbitron)]">
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Primera Participación
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
