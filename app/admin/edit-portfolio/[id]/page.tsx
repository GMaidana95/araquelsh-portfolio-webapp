import { supabase } from "@/lib/supabase"
import CosplayForm from "@/components/cosplay-form" // Asegúrate de que la ruta coincida
import AdminLayout from "@/components/admin-layout"
import { notFound } from "next/navigation"

export default async function EditPage({ params }: { params: { id: string } | Promise<{ id: string }> }) {
  // Unwrap params safely — next can pass params as a Promise in some environments
  const resolvedParams = (await params) as { id?: string }
  const rawId = resolvedParams?.id

  // Si no viene parametro 'id', mostramos un mensaje amigable en vez de romper
  if (!rawId) {
    return (
      <AdminLayout>
        <div className="p-6">
          <h2 className="text-xl font-semibold">ID faltante</h2>
          <p className="text-sm text-muted-foreground mt-2">No se recibió un identificador en la URL.</p>
        </div>
      </AdminLayout>
    )
  }

  // Decodificamos y recortamos por si viene URL-encoded o con espacios. decodeURIComponent puede lanzar si el valor está mal formado,
  // así que lo protegemos en un try/catch y mostramos un mensaje claro al usuario.
  let id: string
  try {
    id = decodeURIComponent(rawId).trim()
  } catch (e) {
    console.error('Error decoding id param:', e, 'rawId=', rawId)
    return (
      <AdminLayout>
        <div className="p-6">
          <h2 className="text-xl font-semibold">ID inválido</h2>
          <p className="text-sm text-muted-foreground mt-2">El identificador en la URL está mal codificado.</p>
        </div>
      </AdminLayout>
    )
  }

  // UUID v4 like: 3fd9bd81-2df1-47e9-9c0e-816f70115986
  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/

  // Logueamos para ayudar a depurar (ver en consola del servidor)
  console.log(`EditPage param rawId="${rawId}" parsedId="${id}"`)

  // 1. Buscamos el cosplay específico en Supabase (usando string UUID). Si el id no coincide con el patrón UUID,
  // emitimos una advertencia y aún así intentamos la búsqueda (por compatibilidad con otros formatos)
  if (!uuidRegex.test(id)) {
    console.warn(`EditPage: id no parece un UUID, intentando buscar de todas formas: "${id}"`)
  }

  try {
    const { data: cosplay, error } = await supabase
      .from('cosplays')
      .select('*')
      .eq('id', id)
      .single() // Solo queremos un resultado

    if (error || !cosplay) {
      return (
        <AdminLayout>
          <div className="p-6">
            <h2 className="text-xl font-semibold">Cosplay no encontrado</h2>
            <p className="text-sm text-muted-foreground mt-2">No se encontró ningún registro con ese ID.</p>
          </div>
        </AdminLayout>
      )
    }

    return (
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold font-[family-name:var(--font-orbitron)] neon-text text-violet-300">
              Editar Cosplay: {cosplay.name}
            </h1>
            <p className="text-muted-foreground mt-2">Modifica los detalles de tu proyecto</p>
          </div>

          {/* 3. Pasamos los datos al formulario como 'initialData' */}
          <CosplayForm initialData={cosplay} />
        </div>
      </AdminLayout>
    )
  } catch (err) {
    console.error('Error fetching cosplay by id:', err)
    return (
      <AdminLayout>
        <div className="p-6">
          <h2 className="text-xl font-semibold">Ocurrió un error</h2>
          <p className="text-sm text-muted-foreground mt-2">No se pudieron cargar los datos. Revisa la consola del servidor.</p>
        </div>
      </AdminLayout>
    )
  }
}