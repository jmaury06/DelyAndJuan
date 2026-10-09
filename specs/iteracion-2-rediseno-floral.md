# Spec: Invitación Delia & Juan — Iteración 2 (rediseño floral)

Estado: implementado.

## Requisitos
- **R1. Paleta** blanco, dorado, azul cielo claro, beige y arena (tokens `ivory`, `gold`, `celeste`, `beige`, `sand` en `tailwind.config.ts`). Estilo moderno-vintage minimalista: Cormorant Garamond + Great Vibes + Jost.
- **R2. Una sola foto** (portada en arco, `src/assets/portada.webp`). Se elimina la galería (`/photo_collage`, carrusel, subida de imágenes).
- **R3. Imágenes locales.** Nada de Supabase Storage; Supabase queda solo para `invitados` y `/admin`.
- **R4. Contador** rodeado de corona floral animada (SVG propio). Flores y pétalos en movimiento en toda la página.
- **R5. Contenido** de los novios (`src/config/wedding.ts`): mensaje al invitado, frase de los novios, lugar (Salón de eventos Dayder, Calle 76 # 44 - 45, 6:30 PM), etiqueta formal (vestido largo / smoking negro), tonos reservados, sin niños, lluvia de sobres + QR, agradecimiento.
- **R6. Fecha** viernes 20 de noviembre de 2026, 6:30 PM (UTC-5). Contador y calendario apuntan a esa hora.

## Pendientes
1. QR real del regalo (hoy `qr-regalo.svg` es placeholder).
2. Horarios del itinerario: estimados a partir de las 6:30 PM, confirmar con los novios.
3. Canción: se mantiene la de YouTube `_QWZQh0YYWA` de la iteración 1; confirmar.
4. "Sin fotos" se interpretó como "sin sección de fotos". Si significa ceremonia sin celulares, agregar aviso.
