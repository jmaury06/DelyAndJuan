import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useImageUpload } from '@/hooks/useImageUpload'
import { cn } from '@/lib/utils'

interface ImageUploaderProps {
  onUploadComplete?: (urls: string[]) => void
  folder?: string
  multiple?: boolean
  maxFiles?: number
  className?: string
}

export function ImageUploader({ 
  onUploadComplete, 
  folder = 'gallery', 
  multiple = true, 
  maxFiles = 10,
  className 
}: ImageUploaderProps) {
  const { uploading, uploadMultiple, uploadSingle, progress } = useImageUpload()
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([])

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return

    try {
      let results
      if (multiple) {
        results = await uploadMultiple(acceptedFiles.slice(0, maxFiles), folder)
      } else {
        const result = await uploadSingle(acceptedFiles[0], folder)
        results = [result]
      }

      const successfulUrls = results
        .filter(result => result.success && result.url)
        .map(result => result.url!)

      setUploadedUrls(prev => [...prev, ...successfulUrls])
      onUploadComplete?.(successfulUrls)
    } catch (error) {
      console.error('Error uploading files:', error)
    }
  }, [uploadMultiple, uploadSingle, multiple, maxFiles, folder, onUploadComplete])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple,
    maxFiles,
    disabled: uploading
  })

  const removeUploadedImage = (indexToRemove: number) => {
    setUploadedUrls(prev => prev.filter((_, index) => index !== indexToRemove))
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:border-gray-400",
          uploading && "pointer-events-none opacity-50"
        )}
      >
        <input {...getInputProps()} />
        
        {uploading ? (
          <div className="space-y-4">
            <Loader2 className="h-12 w-12 mx-auto animate-spin text-primary" />
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Subiendo imágenes...</p>
              <Progress value={progress} className="w-full max-w-xs mx-auto" />
              <p className="text-xs text-gray-500">{Math.round(progress)}%</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <Upload className="h-12 w-12 mx-auto text-gray-400" />
            <div>
              <p className="text-lg font-medium">
                {isDragActive ? 'Suelta las imágenes aquí' : 'Arrastra imágenes aquí'}
              </p>
              <p className="text-sm text-gray-500">
                o <span className="text-primary font-medium">haz clic para seleccionar</span>
              </p>
              <p className="text-xs text-gray-400 mt-2">
                {multiple ? `Máximo ${maxFiles} archivos` : 'Solo 1 archivo'} • PNG, JPG, GIF hasta 50MB
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Preview de imágenes subidas */}
      {uploadedUrls.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Imágenes subidas:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {uploadedUrls.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  alt={`Uploaded ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg border"
                />
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeUploadedImage(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
