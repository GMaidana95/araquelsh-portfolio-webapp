"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, X, ImageIcon, Video } from "lucide-react"
import { supabase } from "@/lib/supabase" // Importamos tu conexión
import { uploadCosplayImage } from "@/lib/storage-utils" // La función que creamos antes
import { useRouter } from "next/navigation"
// ... (tus otros imports)
interface CosplayFormProps {
  initialData?: any; // Aquí vendrán los datos de Supabase si es edición
}
export default function CosplayForm({ initialData }: CosplayFormProps) {
  const router = useRouter()

  // 1. Estados para los textos
  const [character, setCharacter] = useState(initialData?.name || "")
  const [series, setSeries] = useState(initialData?.series || "")
  const [category, setCategory] = useState(initialData?.category || "")
  const [orderIndex, setOrderIndex] = useState(initialData?.order_index?.toString() || "1")
  const [description, setDescription] = useState(initialData?.description || "")

  // 2. Modificamos mediaFiles para que guarde el ARCHIVO real (file)
  const [mediaFiles, setMediaFiles] = useState<any[]>(
    initialData?.media_urls?.map((url: string) => ({
      id: Math.random().toString(),
      type: "image",
      preview: url,
      isExisting: true // Marcamos que ya está en Supabase
    })) || []
  )

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newFiles = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      type: file.type.startsWith("video/") ? ("video" as const) : ("image" as const),
      preview: URL.createObjectURL(file),
      file: file, // <-- Guardamos el archivo físico
    }))

    setMediaFiles([...mediaFiles, ...newFiles])
  }

  const [loading, setLoading] = useState(false)

  const removeFile = (id: string) => {
    setMediaFiles((prev) => {
      const toRemove = prev.find((file) => file.id === id)
      if (toRemove && toRemove.file && toRemove.preview) {
        // Revoca la URL creada con URL.createObjectURL para evitar fugas de memoria
        URL.revokeObjectURL(toRemove.preview)
      }
      return prev.filter((file) => file.id !== id)
    })
  }

  const resetForm = () => {
    // Revoca todas las object URLs de los archivos nuevos antes de limpiar
    mediaFiles.forEach((f) => {
      if (f.file && f.preview) {
        URL.revokeObjectURL(f.preview)
      }
    })

    if (initialData) {
      setCharacter(initialData.name || "")
      setSeries(initialData.series || "")
      setCategory(initialData.category || "")
      setOrderIndex(initialData.order_index?.toString() || "1")
      setDescription(initialData.description || "")
      setMediaFiles(
        initialData.media_urls?.map((url: string) => ({
          id: Math.random().toString(),
          type: "image",
          preview: url,
          isExisting: true,
        })) || []
      )
    } else {
      setCharacter("")
      setSeries("")
      setCategory("")
      setOrderIndex("1")
      setDescription("")
      setMediaFiles([])
    }
  }

  const handleSubmit = async () => {
    if (!character || !series) return alert("Nombre y Serie son obligatorios")
    setLoading(true)

    try {
    // 1. Manejo de imágenes (Subir solo las nuevas, mantener las viejas)
    const newFiles = mediaFiles.filter(f => !f.isExisting)
    const existingUrls = mediaFiles.filter(f => f.isExisting).map(f => f.preview)
    
    const uploadPromises = newFiles.map(item => uploadCosplayImage(item.file))
    const newUrls = await Promise.all(uploadPromises)
    
    const allUrls = [...existingUrls, ...newUrls.filter(url => url !== null)]

    const dataToSave = {
      name: character,
      series: series,
      description: description,
      order_index: parseInt(orderIndex),
      category: category,
      media_urls: allUrls,
    }

    if (initialData?.id) {
      // MODO EDICIÓN: Usamos .update()
      const { error } = await supabase
        .from('cosplays')
        .update(dataToSave)
        .eq('id', initialData.id)
      
      if (error) throw error
      alert("¡Cosplay actualizado!")
      // Redirigir de vuelta al listado de edición y forzar recarga para que la lista muestre el cambio
      const ts = Date.now()
      router.push(`/admin/edit-portfolio?updated=${ts}`)
      // fuerza refresco de datos en la nueva ruta
      router.refresh()
    } else {
      // MODO CREACIÓN: Usamos .insert()
      const { error } = await supabase
        .from('cosplays')
        .insert([dataToSave])
      
      if (error) throw error
      alert("¡Cosplay creado!")
      router.push('/admin/edit-portfolio')
    }
  } catch (error: any) {
    alert("Error: " + error.message)
  } finally {
    setLoading(false)
  }
}

  return (
    <Card className="glass-card border-violet-500/30">
      <div className="p-6 lg:p-8 space-y-6">
        {/* Media Upload Section */}
        <div className="space-y-4">
          <Label className="text-lg font-orbitron text-violet-300">Imágenes y Videos</Label>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {/* Upload Button */}
            <label className="relative aspect-square rounded-lg border-2 border-dashed border-violet-500/30 hover:border-violet-500/60 transition-colors cursor-pointer group">
              <input type="file" multiple accept="image/*,video/*" className="sr-only" onChange={handleFileUpload} />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <Upload className="w-8 h-8 text-violet-400 group-hover:text-violet-300 transition-colors" />
                <span className="text-xs text-muted-foreground">Subir Medios</span>
              </div>
            </label>

            {/* Media Previews */}
            {mediaFiles.map((file) => (
              <div key={file.id} className="relative aspect-square rounded-lg overflow-hidden group">
                {file.type === "image" ? (
                  <img src={file.preview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="relative w-full h-full bg-black/60">
                    <video src={file.preview} className="w-full h-full object-cover" muted />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Video className="w-8 h-8 text-violet-400" />
                    </div>
                  </div>
                )}
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeFile(file.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
                <div className="absolute bottom-2 left-2">
                  {file.type === "image" ? (
                    <ImageIcon className="w-4 h-4 text-white" />
                  ) : (
                    <Video className="w-4 h-4 text-white" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm text-muted-foreground">
            Sube múltiples imágenes y videos (MAX 50mb por archivo). El primer medio será la imagen principal.
          </p>
        </div>

        {/* Form Fields */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="character">Nombre del Personaje *</Label>
            <Input
              value={character} 
              onChange={(e) => setCharacter(e.target.value)}
              id="character"
              placeholder="Ej: 2B, Jinx, Kuromi..."
              className="bg-black/40 border-violet-500/30 focus:border-violet-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="series">Serie / Juego *</Label>
            <Input
              value={series} 
              onChange={(e) => setSeries(e.target.value)}
              id="series"
              placeholder="Ej: League of Legends, Naruto..."
              className="bg-black/40 border-violet-500/30 focus:border-violet-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoría</Label>
            <Select onValueChange={setCategory} value={category}>
              <SelectTrigger className="bg-black/40 border-violet-500/30 focus:border-violet-500">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="game">Videojuegos</SelectItem>
                <SelectItem value="anime">Anime</SelectItem>
                <SelectItem value="other">Otros</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="orderIndex">Índice de Orden</Label>
            <Input
              id="orderIndex"
              type="number"
              value={orderIndex}
              onChange={(e) => setOrderIndex(e.target.value)}
              min="1"
              placeholder="1"
              className="bg-black/40 border-violet-500/30 focus:border-violet-500"
            />
            <p className="text-xs text-muted-foreground">Define el orden de aparición en el portafolio</p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            rows={4}
            placeholder="Describe el lugar de presentación, premios ganados, eventos, etc..."
            className="bg-black/40 border-violet-500/30 focus:border-violet-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          
        </div>
        <p className="text-s text-muted-foreground">* Campos obligatorios</p>

        <div className="flex justify-end gap-4 pt-4 border-t border-violet-500/30">
          <Button 
            variant="outline" 
            className="border-violet-500/30 bg-transparent"
            disabled={loading} // Deshabilitar si está cargando
            onClick={() => {
              /* Limpiamos únicamente los estados del formulario */
              if (confirm("¿Seguro que quieres cancelar?")) {
                resetForm()
              }
            }}
          >
            Cancelar
          </Button>
          
          <Button 
            className="bg-violet-600 hover:bg-violet-700 text-white font-orbitron"
            onClick={handleSubmit} // Llamamos a la función que guarda en Supabase
            disabled={loading}    // Evita clics repetidos
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">🌀</span> Guardando...
              </span>
            ) : (
              "Guardar Cosplay"
            )}
          </Button>
        </div>
      </div>
    </Card>
  )
}
