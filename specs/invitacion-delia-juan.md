# Spec: Invitación Delia & Juan — Iteración 1

Estado: aprobado para implementar (Spec Driven: el spec se escribe antes del código).

## 1. Contexto

`deliayjuan` nace a partir de la invitación de Jessy & Jairo (repo de referencia). Se reutiliza:
- La base de código (Vite + React + TS + Tailwind + shadcn + framer-motion).
- Supabase existente (proyecto `txkmzryllvjgceyrphxp`), **tabla `invitados` compartida** (decisión del cliente).

Esta iteración cambia textos, fecha, paleta, flujo de entrada y reproducción de música. El rediseño completo (tarjeta tipo mockup, curvas para fotos, flores nuevas) se hace en iteraciones posteriores.

## 2. Requisitos

### R1. Eliminar la pantalla de entrada (sobre)
- Al abrir `/invitacion/:token` se muestra **directamente** la invitación.
- Se elimina el componente `InvitationEnvelope` y su uso.
- Criterio de aceptación: no existe ningún paso intermedio entre cargar la página y ver el contenido.

### R2. Música al cargar
- La canción (YouTube `_QWZQh0YYWA`, hoy hardcodeada) debe iniciar **después de que la página termine de cargar** (evento `load` + reproductor de YouTube listo), es decir, lo último en arrancar.
- Restricción del navegador: Chrome, Safari y iOS bloquean audio con sonido sin interacción del usuario. Por eso el comportamiento es:
  1. Intento de reproducción con sonido al cargar.
  2. Si el navegador lo bloquea, se reproduce **silenciada** y se activa con el **primer toque/clic/tecla** del invitado (desmutea y sube volumen).
- Criterio de aceptación: la música empieza sola cuando el navegador lo permite; si no, arranca (silenciada) al cargar y suena con el primer toque en la página.
- El botón flotante de música se mantiene visible para pausar/reanudar.

### R3. Nombres de los novios
- Reemplazar **"Jessy & Jairo"** por **"Delia & Juan"** en todas las vistas del invitado (hero, footer, título del evento de calendario, descripción, texto de contacto, itinerario, login/admin, meta `author`).
- Criterio de aceptación: `grep -ri "jessy\|jairo"` no encuentra textos visibles al invitado.

### R4. Fecha de la boda
- **Sábado 21 de noviembre de 2026**.
- Cuenta regresiva (`CountdownTimer`) apunta a `2026-11-21T17:00:00` (hora local, misma hora de la invitación original: 5:00 PM).
- Sección "Cuándo": "Sábado, 21 de Noviembre de 2026" / "Ceremonia | 5:30 PM" (hora original sin cambios).
- Footer: "21 • Noviembre • 2026", evento de calendario 21-nov-2026 17:00 (UTC-5), copyright "© 2026".
- Criterio de aceptación: no quedan referencias a "5 de Diciembre" o "2025" en vistas del invitado.

### R5. Nueva paleta de colores
- Dejar atrás el look colorido (coral/rosa/verde/amarillo) y pasar a una paleta **lavanda, malva y crema**, más sobria, inspirada en la plantilla "lavanda" de fixdate.
- Definición (tokens en `tailwind.config.ts`):
  - `mauve` (nuevo, acento principal de textos, botones y divisores): escala lavanda-malva.
  - `cream` (nuevo, fondo de la invitación): `#FBF8F3`.
  - `sage` (ya existe, para botón de "Sí, asistiré" y acentos secundarios).
  - `lavender` (ya existe, fondos suaves).
- Se reemplazan en vistas del invitado: `coral-*` → `mauve-*`, `spring-*` → `sage-*`, `rose-*`/`pink-*` → `mauve-*`, fondos `bg-lavender-50`/`bg-[#FFF9F0]` → `bg-cream`.
- Criterio de aceptación: las vistas del invitado solo usan la paleta nueva (lavanda/malva/crema/sage).

## 3. Fuera de alcance (iteraciones siguientes)
- Reemplazar flores e iconos (`icons` bucket y `src/assets/*.svg`): siguen siendo los de Jessy & Jairo hasta que se suban nuevos assets.
- Layout tipo tarjeta con curvas para fotos (mockup fixdate).
- Paneles `/admin` y `/login` (son vistas internas; solo se cambia el nombre).
- Textos de dress code ("Coral, Verde, Amarillo…") y el versículo/mensaje: son contenido, se confirman con Delia & Juan.
- Cambiar la sede (Hotel Faranda Express, Barranquilla) y la hora de ceremonia: se mantienen hasta confirmación.

## 4. Preguntas abiertas
1. ¿Confirman la hora de la ceremonia (5:30 PM) y la sede?
2. ¿Quieren cambiar los textos de dress code que mencionan colores?
3. Credenciales del panel `/admin` (`VITE_ADMIN_EMAIL`, `VITE_ADMIN_PASSWORD`).
4. Imágenes del mockup para afinar colores exactos (el enlace de fixdate no entrega códigos hex).

## 5. Riesgos conocidos
- **Autoplay con sonido** puede ser bloqueado (ver R2). No es posible garantizarlo sin interacción del usuario.
- **Tabla compartida**: el `/admin` de Delia & Juan muestra y permite editar/eliminar los 95 invitados existentes de la otra boda.
