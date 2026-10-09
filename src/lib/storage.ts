import { supabase, WEDDING_PHOTOS_BUCKET } from './supabase'

export interface UploadResult {
  success: boolean
  url?: string
  error?: string
}

export async function uploadImage(file: File, folder: string = 'gallery'): Promise<UploadResult> {
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const { data, error } = await supabase.storage
      .from(WEDDING_PHOTOS_BUCKET)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Error uploading file:', error)
      return { success: false, error: error.message }
    }

    const { data: { publicUrl } } = supabase.storage
      .from(WEDDING_PHOTOS_BUCKET)
      .getPublicUrl(data.path)

    return { success: true, url: publicUrl }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { success: false, error: 'Error inesperado al subir la imagen' }
  }
}

export async function uploadMultipleImages(files: File[], folder: string = 'gallery'): Promise<UploadResult[]> {
  const uploadPromises = files.map(file => uploadImage(file, folder))
  return Promise.all(uploadPromises)
}

export async function getImagesFromFolder(folder: string = 'gallery'): Promise<string[]> {
  try {
    const { data, error } = await supabase.storage
      .from(WEDDING_PHOTOS_BUCKET)
      .list(folder, {
        limit: 100,
        sortBy: { column: 'created_at', order: 'desc' }
      })

    if (error) {
      console.error('Error fetching images:', error)
      return []
    }

    const imageUrls = data
      .filter(file => file.name !== '.emptyFolderPlaceholder')
      .map(file => {
        const { data: { publicUrl } } = supabase.storage
          .from(WEDDING_PHOTOS_BUCKET)
          .getPublicUrl(`${folder}/${file.name}`)
        return publicUrl
      })

    return imageUrls
  } catch (error) {
    console.error('Unexpected error fetching images:', error)
    return []
  }
}


export function getImageUrl(imagePath: string): string {
  const { data: { publicUrl } } = supabase.storage
    .from(WEDDING_PHOTOS_BUCKET)
    .getPublicUrl(imagePath)
  
  return publicUrl
}

export async function imageExists(imagePath: string): Promise<boolean> {
  try {
    const { data, error } = await supabase.storage
      .from(WEDDING_PHOTOS_BUCKET)
      .list('', {
        search: imagePath
      })
    
    return !error && data && data.length > 0
  } catch (error) {
    console.error('Error checking image existence:', error)
    return false
  }
}

