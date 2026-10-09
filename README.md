# Deli & Juan - Invitación de Boda Digital

Invitación de boda interactiva con cuenta regresiva floral, detalles del evento y confirmación de asistencia.

Basado originalmente en la estructura de [jessyyjairo_wedding](https://github.com/jmaury06/jessyyjairo_wedding), usado únicamente como referencia de arquitectura.

## 🚀 Instalación y Desarrollo

### Requisitos previos

- Node.js & npm instalado - [instalar con nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- Un proyecto de Supabase (ver sección "Supabase" abajo)

### Pasos para desarrollo local

```sh
# Instalar dependencias
npm i

# Copiar variables de entorno y completarlas con tus credenciales de Supabase
cp .env.example .env

# Iniciar servidor de desarrollo
npm run dev
```

El servidor de desarrollo estará disponible en `http://localhost:8080`

## 🛠️ Tecnologías

Este proyecto está construido con:

- **Vite** - Build tool y dev server
- **TypeScript** - Tipado estático
- **React** - Framework UI
- **shadcn-ui** - Componentes UI
- **Tailwind CSS** - Estilos
- **Supabase** - Backend y base de datos
- **Framer Motion** - Animaciones

## 📦 Scripts disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter

## 🗄️ Supabase

El esquema completo (tabla `invitados`, políticas RLS y buckets de Storage) está en [`supabase/schema.sql`](./supabase/schema.sql). Córrelo una sola vez en el SQL Editor de tu proyecto de Supabase.

Variables de entorno requeridas (ver `.env.example`):

| Variable | Dónde obtenerla |
|---|---|
| `VITE_SUPABASE_URL` | Project Settings → API → Project URL |
| `VITE_SUPABASE_ANON_KEY` | Project Settings → API → Project API keys → `anon` `public` |
| `VITE_ADMIN_EMAIL` / `VITE_ADMIN_PASSWORD` | Las define quien administra `/admin` (no es Supabase Auth) |

### Imágenes (locales, no Supabase)

Supabase se usa **solo** para la tabla `invitados` (RSVP y panel `/admin`). Todas las imágenes viven en el repo:

- `src/assets/portada.webp` — foto principal (portada en arco).
- `src/assets/qr-regalo.png` — QR Bre-B del regalo (llave en `src/config/wedding.ts`).
- Las flores animadas son SVG en código: `src/components/wedding/floral/`.

### Contenido

Todos los textos y datos de la boda (fecha, lugar, mensajes, dress code) están en `src/config/wedding.ts`.

## 🚢 Deployment

El proyecto puede ser desplegado en plataformas como Vercel, Netlify o cualquier servicio que soporte aplicaciones React/Vite. Recuerda configurar las mismas variables de entorno en el dashboard del proveedor.
# DelyAndJuan
