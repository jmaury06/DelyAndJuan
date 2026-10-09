import { useState, useCallback } from 'react'
import { uploadImage, uploadMultipleImages, getImagesFromFolder, UploadResult } from '@/lib/storage'

export interface UseImageUploadReturn {
  uploading: boolean
  uploadSingle: (file: File, folder?: string) => Promise<UploadResult>
  uploadMultiple: (files: File[], folder?: string) => Promise<UploadResult[]>
  loadImages: (folder?: string) => Promise<string[]>
  progress: number
}

export function useImageUpload(): UseImageUploadReturn {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const uploadSingle = useCallback(async (file: File, folder = 'gallery'): Promise<UploadResult> => {
    setUploading(true)
    setProgress(0)
    
    try {
      const result = await uploadImage(file, folder)
      setProgress(100)
      return result
    } finally {
      setUploading(false)
      setTimeout(() => setProgress(0), 1000)
    }
  }, [])

  const uploadMultiple = useCallback(async (files: File[], folder = 'gallery'): Promise<UploadResult[]> => {
    setUploading(true)
    setProgress(0)
    
    try {
      const results: UploadResult[] = []
      const totalFiles = files.length
      
      for (let i = 0; i < files.length; i++) {
        const result = await uploadImage(files[i], folder)
        results.push(result)
        setProgress(((i + 1) / totalFiles) * 100)
      }
      
      return results
    } finally {
      setUploading(false)
      setTimeout(() => setProgress(0), 1000)
    }
  }, [])

  const loadImages = useCallback(async (folder = 'gallery'): Promise<string[]> => {
    return await getImagesFromFolder(folder)
  }, [])

  return {
    uploading,
    uploadSingle,
    uploadMultiple,
    loadImages,
    progress
  }
}
