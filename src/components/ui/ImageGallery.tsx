import React from 'react'

interface ImageGalleryProps {
  refreshKey?: number
}

export function ImageGallery({ refreshKey }: ImageGalleryProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      <div className="text-center text-gray-500">
        Galería de imágenes - Funcionalidad básica
      </div>
    </div>
  )
}
