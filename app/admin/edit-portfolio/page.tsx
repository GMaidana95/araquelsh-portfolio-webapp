"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, Loader2 } from "lucide-react"

import { supabase } from "@/lib/supabase"

export default function EditPortfolioPage() {
  const [cosplays, setCosplays] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // 3. Función para cargar los datos (Client-side fetch)
  const fetchCosplays = async () => {
    try {
      const { data, error } = await supabase
        .from('cosplays')
        .select('id, name, series, category, order_index, media_urls')
        .order('order_index', { ascending: true })

      if (error) throw error
      setCosplays(data || [])
    } catch (err) {
      console.error('Error fetching:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCosplays()
  }, [])

  // 4. FUNCIÓN PARA ELIMINAR
  const handleDelete = async (id: string, name: string) => {
    // Confirmación de seguridad básica
    if (!confirm(`¿Estás seguro de que quieres eliminar el cosplay de "${name}"?`)) return

    try {
      const { error } = await supabase
        .from('cosplays')
        .delete()
        .eq('id', id)

      if (error) throw error

      // Actualizar la lista localmente (Filtramos el borrado)
      setCosplays(cosplays.filter(c => c.id !== id))
      alert("Eliminado correctamente")
      
    } catch (err: any) {
      alert("Error al eliminar: " + err.message)
    }
  }

  const router = useRouter()

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-orbitron neon-text text-violet-300">
            Editar Portafolio
          </h1>
          <p className="text-muted-foreground mt-2">Gestiona tus proyectos existentes</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-10"><Loader2 className="animate-spin text-violet-500" /></div>
        ) : (
          <div className="space-y-4">
            {cosplays.map((cosplay) => (
              <Card key={cosplay.id} className="glass-card border-violet-500/30">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-violet-300">{cosplay.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{cosplay.series}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-violet-500/30 hover:bg-violet-600/20 bg-transparent"
                        onClick={() => {
                          if (confirm(`¿Deseas editar el cosplay de "${cosplay.name}"?`)) {
                            router.push(`/admin/edit-portfolio/${encodeURIComponent(cosplay.id)}`)
                          }
                        }}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      
                      {/* BOTÓN DE ELIMINAR CONECTADO */}
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-red-500/30 hover:bg-red-600/20 text-red-400 bg-transparent"
                        onClick={() => handleDelete(cosplay.id, cosplay.name)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
