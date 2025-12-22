import { supabase } from './supabase'

export async function uploadCosplayImage(file: File) {
  // 1. Generamos un nombre único para que no se sobrescriban fotos
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random()}.${fileExt}`
  const filePath = `adminup/${fileName}`

  // 2. Subimos el archivo al bucket que creaste
  const { data, error } = await supabase.storage
    .from('cosplay-media')
    .upload(filePath, file)

  if (error) {
    throw new Error('Error al subir la imagen: ' + error.message)
  }

  // 3. Obtenemos la URL pública para guardarla en la base de datos
  const { data: { publicUrl } } = supabase.storage
    .from('cosplay-media')
    .getPublicUrl(filePath)

  return publicUrl
}