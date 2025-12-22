import { supabase } from '@/lib/supabase'

async function uploadCosplayImage(file: File, cosplayName: string) {
  // 1. Crear un nombre de archivo único
  const fileExt = file.name.split('.').pop()
  const fileName = `${cosplayName}-${Math.random()}.${fileExt}`
  const filePath = `uploads/${fileName}`

  // 2. Subir el archivo al bucket 'cosplay-media'
  const { data, error } = await supabase.storage
    .from('cosplay-media')
    .upload(filePath, file)

  if (error) {
    console.error('Error subiendo imagen:', error)
    return null
  }

  // 3. Obtener la URL pública
  const { data: { publicUrl } } = supabase.storage
    .from('cosplay-media')
    .getPublicUrl(filePath)

  return publicUrl
}