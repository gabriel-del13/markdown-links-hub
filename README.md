# 🔗 Markdown Links Hub

Generador de micrositios estilo "Linktree" desde un archivo Markdown con front-matter. Responsive, accesible (WCAG AA), con SEO optimizado y 7 temas listos para usar.

## ✨ Características

- 📝 **Contenido desde Markdown**: Define tu perfil completo en un único archivo `.md`
- 🎨 **7 Temas Incluidos**: light, dark, gradient, minimal, neon, card, photo
- 🎯 **100% Responsive**: Mobile-first, toques grandes (44px), optimizado para todos los dispositivos
- ♿ **Accesible WCAG AA**: Navegación por teclado, aria-labels, contraste AA
- 🚀 **Performance**: Lighthouse score 90+ en Performance, Accessibility y Best Practices
- 🔍 **SEO Optimizado**: Meta tags, OpenGraph, Twitter Cards
- 📦 **Export Estático**: Sin necesidad de servidor, deploy en Netlify/Vercel/GitHub Pages
- 🎨 **Color Personalizable**: Override de color de acento por tema
- 📱 **Íconos Incluidos**: 7 íconos para links + 10 redes sociales

## 🚀 Inicio Rápido

### Instalación

```bash
# Clonar el repositorio
git clone <repo-url>
cd markdown-links-hub

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Personalizar tu Perfil

1. Edita el archivo `content/profile.md` con tu información:

```yaml
---
name: "Tu Nombre"
handle: "@tuusuario"
bio: "Tu biografía en 1-2 líneas"
avatar: "https://tu-avatar.jpg"
theme: "light"
accentColor: "#5B8CFF"
social:
  - type: "github"
    url: "https://github.com/tuusuario"
  - type: "x"
    url: "https://x.com/tuusuario"
links:
  - label: "Mi Blog"
    url: "https://tu-blog.com"
    icon: "book"
    description: "Artículos y tutoriales"
  - label: "Portafolio"
    url: "https://tu-portafolio.com"
    icon: "star"
    badge: "Nuevo"
footer: "© 2025 Tu Nombre"
---

## Contenido Adicional (Opcional)

Puedes agregar secciones en Markdown como FAQ, información extra, etc.
```

2. Guarda los cambios y el sitio se actualizará automáticamente.

## 📐 Esquema del Front-Matter

### Campos Requeridos

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `name` | string | Nombre completo |
| `handle` | string | Usuario o handle (ej: @usuario) |
| `links` | array | Array de enlaces (mínimo 1) |

### Campos Opcionales

| Campo | Tipo | Valores | Descripción |
|-------|------|---------|-------------|
| `bio` | string | - | Biografía corta (1-2 líneas) |
| `avatar` | string (URL) | - | URL de imagen de perfil |
| `theme` | string | `light`, `dark`, `gradient`, `minimal`, `neon`, `card`, `photo` | Tema visual (default: `light`) |
| `accentColor` | string | HEX (#RRGGBB) | Color de acento personalizado |
| `social` | array | - | Array de redes sociales |
| `footer` | string | - | Texto del footer |

### Estructura de Links

```yaml
links:
  - label: "Texto del enlace"      # Requerido
    url: "https://ejemplo.com"     # Requerido
    icon: "book"                   # Opcional
    badge: "Nuevo"                 # Opcional
    description: "Descripción"     # Opcional
```

**Íconos disponibles**: `link`, `star`, `sparkles`, `book`, `play`, `code`, `calendar`

### Estructura de Social

```yaml
social:
  - type: "github"                 # Requerido
    url: "https://github.com/..."  # Requerido
```

**Tipos disponibles**: `x`, `instagram`, `linkedin`, `github`, `tiktok`, `youtube`, `website`, `email`, `whatsapp`, `telegram`

## 🎨 Temas

### Temas Disponibles

1. **light**: Fondo blanco, texto oscuro, sombras suaves
2. **dark**: Fondo negro, texto claro, alta elevación
3. **gradient**: Gradiente suave de azul a blanco
4. **minimal**: Diseño limpio, tipografía monospace, sin sombras
5. **neon**: Fondo oscuro con acentos brillantes y efecto glow
6. **card**: Tarjetas con sombras, espaciado generoso
7. **photo**: Header con imagen, overlay oscuro

### Personalizar Color de Acento

```yaml
theme: "light"
accentColor: "#FF6B6B"  # Tu color preferido
```

El sistema calculará automáticamente:
- Color hover (oscurecido 10-12%)
- Focus ring con transparencia
- Estados de interacción

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Ejecutar tests en modo watch
npm run test:watch
```

Los tests cubren:
- ✅ Parseo de front-matter
- ✅ Validación de esquema
- ✅ Normalización de URLs
- ✅ Sistema de temas
- ✅ Generación de variables CSS

## 📦 Build & Deploy

### Build para Producción

```bash
# Generar export estático
npm run build
```

Esto genera una carpeta `/out` con archivos estáticos listos para deploy.

### Deploy en Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy en Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

```bash
# Build command
npm run build

# Publish directory
out
```

### Deploy en GitHub Pages

1. Agrega esto a `next.config.js`:

```js
const nextConfig = {
  output: 'export',
  basePath: '/tu-repositorio',
  images: {
    unoptimized: true,
  },
}
```

2. Build y deploy:

```bash
npm run build
# Sube la carpeta 'out' a la rama gh-pages
```

## 🎯 Criterios de Aceptación (DoD)

- ✅ **Responsive**: Funciona correctamente en móviles (360px+) y desktop
- ✅ **Accesible**: Tab-order predecible, aria-labels, contraste AA
- ✅ **Performance**: Lighthouse score ≥ 90 en Performance, Accessibility, Best Practices
- ✅ **SEO**: Meta tags completos (title, description, OG, Twitter Cards)
- ✅ **Temas**: 7 temas funcionales con tokens configurables
- ✅ **Validación**: Errores legibles para campos faltantes
- ✅ **Fallbacks**: Manejo correcto de campos opcionales vacíos
- ✅ **Sin errores**: Consola limpia, sin warnings

## 🔧 Estructura del Proyecto

```
markdown-links-hub/
├── app/
│   ├── globals.css          # Estilos globales y CSS variables
│   ├── layout.tsx           # Layout raíz de Next.js
│   └── page.tsx             # Página principal
├── components/
│   ├── icons/
│   │   ├── LinkIcons.tsx    # Íconos para links
│   │   └── SocialIcons.tsx  # Íconos para redes sociales
│   ├── Avatar.tsx           # Componente de avatar
│   ├── LinkCard.tsx         # Tarjeta de enlace
│   ├── MarkdownContent.tsx  # Renderizador de markdown extra
│   ├── Profile.tsx          # Componente principal de perfil
│   └── SocialLinks.tsx      # Links de redes sociales
├── lib/
│   ├── parse.ts             # Parser de markdown + validación
│   ├── themes.ts            # Sistema de temas y tokens
│   └── types.ts             # TypeScript types
├── content/
│   └── profile.md           # TU ARCHIVO DE CONTENIDO
├── __tests__/
│   ├── parse.test.ts        # Tests del parser
│   └── themes.test.ts       # Tests de temas
└── public/
    └── favicon.ico          # Favicon
```

## 🛠️ Personalización Avanzada

### Crear un Tema Personalizado

1. Edita `lib/themes.ts`
2. Agrega tu tema al objeto `themes`:

```typescript
customTheme: {
  colors: {
    background: '#...',
    surface: '#...',
    text: '#...',
    subtext: '#...',
    accent: accentColor || '#...',
    accentHover: accentColor ? darkenColor(accentColor, 10) : '#...',
    border: '#...',
  },
  radii: { xs: '8px', sm: '12px', md: '16px', lg: '24px' },
  spacing: { xs: '8px', sm: '12px', md: '16px', lg: '24px', xl: '32px' },
  typography: { titleWeight: 700, bodyWeight: 400 },
  effects: { shadow: '...', glow: '...' },
}
```

3. Agrega el tipo en `lib/types.ts`:

```typescript
export type ThemeName = 'light' | 'dark' | ... | 'customTheme'
```

### Agregar Nuevos Íconos

1. Edita `components/icons/LinkIcons.tsx` o `SocialIcons.tsx`
2. Agrega el componente SVG
3. Registra el ícono en el objeto `icons`
4. Actualiza los tipos en `lib/types.ts`

## 📝 Edge Cases Manejados

- ✅ URLs sin protocolo → normaliza a `https://`
- ✅ Labels muy largos → trunca con ellipsis y muestra tooltip
- ✅ Badges vacíos → no renderiza contenedor
- ✅ Social duplicada → de-duplicate por tipo
- ✅ Avatar faltante → colapsa espacio
- ✅ Bio faltante → no renderiza sección
- ✅ Contenido markdown vacío → no renderiza sección colapsable

## 🌐 Navegadores Soportados

- Chrome/Edge (últimas 2 versiones)
- Firefox (últimas 2 versiones)
- Safari (últimas 2 versiones)
- Mobile Safari (iOS 12+)
- Chrome Android (últimas 2 versiones)

## 📄 Licencia

MIT License - Libre para uso personal y comercial.

## 🤝 Contribuir

1. Fork el repositorio
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -am 'Agrega nueva funcionalidad'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Crea un Pull Request

## 💡 Tips

- Usa imágenes optimizadas para el avatar (max 400x400px, formato WebP)
- Mantén la bio en 1-2 líneas para mejor legibilidad
- Limita los links a 6-8 para evitar scroll excesivo
- Prueba tu sitio en Lighthouse antes de deploy
- Usa `accentColor` para personalizar sin crear un tema completo

## 🆘 Troubleshooting

**Error: "Profile validation failed"**
→ Revisa que `name`, `handle` y al menos un `link` estén presentes en el front-matter.

**Error: Build falla con "Cannot find module"**
→ Ejecuta `npm install` nuevamente.

**Las imágenes no se ven en producción**
→ Verifica que `images: { unoptimized: true }` esté en `next.config.js`.

**El tema no cambia**
→ Asegúrate que el valor de `theme` sea uno de los válidos (ver lista arriba).

## 📞 Soporte

- 🐛 [Reportar un bug](https://github.com/usuario/repo/issues)
- 💬 [Discusiones](https://github.com/usuario/repo/discussions)
- 📧 Email: tu@email.com

---

Hecho con ❤️ usando Next.js 14, React 18, Tailwind CSS
