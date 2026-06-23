# Landing React de tinajas

Landing en React + Vite con Tailwind CSS y estilos orientados a tinaja/sauna.

## Uso local

```bash
npm install
npm run dev
```

Luego abre la URL que entrega Vite.

## Antes de publicar

- En Netlify usa build command `npm run build` y publish directory `dist`.
- Cambia `https://tu-sitio.netlify.app/` en `robots.txt` y `sitemap.xml` por la URL real de Netlify o tu dominio propio.
- Si tienes nombre comercial, comuna y cobertura exacta, agrégalos al texto y al JSON-LD de `index.html`.
- Mantén el enlace de WhatsApp como `https://wa.me/56974820423`; el formato con `+` o sin `:` en `https` puede fallar.
- Las fotos y videos usados por la app están en `public/assets`; Vite los publica como `/assets/...`.
- Los archivos originales de WhatsApp quedaron guardados fuera del deploy en `source-assets/whatsapp-originals`.

## SEO incluido

- Título y descripción orientados a venta.
- Etiquetas Open Graph para compartir en redes.
- JSON-LD de negocio local, contacto y producto.
- Contenido visible con palabras clave: tinajas de madera, tinajas a medida, hot tubs, terraza y quincho.
- Imágenes con `alt`, carga diferida y versiones JPEG optimizadas.
