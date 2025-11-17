# AmazonPrimeVideo Clone - Aplicaciones Web

![Amazon Prime Video](https://img.shields.io/badge/Amazon-Prime%20Video-00A8E1?style=for-the-badge&logo=amazon&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 📋 Descripción

Réplica completa de la interfaz de **Amazon Prime Video** desarrollada como proyecto educativo para la materia de Aplicaciones Web. Este proyecto demuestra el uso avanzado de **CSS Grid**, **Flexbox** y diseño **responsive** para crear una experiencia de usuario moderna y adaptable a cualquier dispositivo.

## ✨ Características

- 🎬 Interfaz fiel a Amazon Prime Video
- 📱 **100% Responsive** - Funciona en todos los dispositivos
- 🎨 Diseño moderno con efectos hover y transiciones suaves
- 🖼️ Imágenes reales de películas y series (TMDB API)
- ⚡ Animaciones fluidas y optimizadas
- 🎯 Código limpio y bien documentado
- 📦 Todo en un solo archivo HTML (CSS y JS inline)

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Estilos y diseño responsive
- **JavaScript (Vanilla)** - Interactividad
- **Font Awesome 6.4** - Iconos

### Técnicas de CSS
- **CSS Grid** - Layout de tarjetas de contenido
- **Flexbox** - Alineación y distribución de elementos
- **CSS Variables** - Sistema de colores personalizado
- **Media Queries** - Diseño responsive
- **CSS Animations** - Efectos y transiciones

## 📚 Aprendizajes Clave

### 1. **CSS Grid** 🎯
CSS Grid se utilizó para crear layouts de múltiples columnas que se adaptan automáticamente:

```css
.content-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
}
```

**Aplicaciones:**
- ✅ Grilla de tarjetas de películas/series
- ✅ Layout del footer (columnas)
- ✅ Distribución de enlaces del footer
- ✅ Sistema responsive automático con `auto-fill`

**Ventajas de Grid:**
- Crea layouts bidimensionales (filas y columnas)
- Adapta automáticamente el número de columnas según el espacio disponible
- Control preciso del espaciado con `gap`
- Ideal para galerías y grids de contenido

### 2. **Flexbox** 💪
Flexbox se utilizó para alineación y distribución de elementos en una dimensión:

```css
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
```

**Aplicaciones:**
- ✅ Header/Navegación horizontal
- ✅ Botones con iconos y texto
- ✅ Hero section - alineación de contenido
- ✅ Search box (input + icono)
- ✅ Card actions (botones de overlay)
- ✅ Iconos de redes sociales en footer

**Ventajas de Flexbox:**
- Perfecto para layouts unidimensionales (horizontal o vertical)
- Alineación fácil de elementos (`align-items`, `justify-content`)
- Distribución de espacio con `gap`
- Ideal para navegación, botones y componentes pequeños

### 3. **Diseño Responsive** 📱

El proyecto implementa un diseño **mobile-first** con 5 breakpoints:

| Breakpoint | Dispositivo | Cambios principales |
|------------|-------------|---------------------|
| 1200px | Tablets grandes | Ajuste de grilla a 220px |
| 992px | Tablets | Footer en 2 columnas |
| 768px | Móviles grandes | Menú oculto, botones verticales |
| 480px | Móviles pequeños | Grilla de 2 columnas |
| 360px | Móviles muy pequeños | Texto más pequeño |

```css
@media (max-width: 768px) {
    .nav-menu { display: none; }
    .hero-buttons { flex-direction: column; }
    .content-grid { grid-template-columns: repeat(2, 1fr); }
}
```

### 4. **CSS Variables** 🎨
Sistema de colores centralizado para fácil mantenimiento:

```css
:root {
    --primary-color: #00a8e1;
    --secondary-color: #1a98ff;
    --bg-color: #0f171e;
    --text-color: #ffffff;
}
```

### 5. **Animaciones y Transiciones** ✨

- **Hover Effects**: Escala de tarjetas (scale 1.05)
- **Scroll Effect**: Header con fondo blur al hacer scroll
- **Fade In**: Animación de entrada para categorías
- **Smooth Transitions**: Todas las interacciones son fluidas

### 6. **JavaScript Interactivo** ⚡

- Event listeners para scroll
- Intersection Observer API para animaciones
- Manipulación del DOM
- Event delegation para performance

## 🎯 Conceptos Aplicados

### **Grid vs Flexbox - ¿Cuándo usar cada uno?**

#### Usa **CSS Grid** cuando:
- ✅ Necesitas un layout bidimensional (filas Y columnas)
- ✅ Quieres control sobre posicionamiento exacto
- ✅ Trabajas con galerías o grids de tarjetas
- ✅ Necesitas alineación compleja

#### Usa **Flexbox** cuando:
- ✅ Necesitas un layout unidimensional (solo fila O columna)
- ✅ Quieres distribución dinámica de elementos
- ✅ Trabajas con navegación o menús
- ✅ Necesitas alineación simple de elementos

### **Diseño Responsive - Estrategias**

1. **Mobile First**: Diseñar primero para móviles
2. **Fluid Layouts**: Usar porcentajes y unidades relativas
3. **Media Queries**: Adaptar diseño según tamaño de pantalla
4. **Flexible Images**: `max-width: 100%` para imágenes
5. **Touch Targets**: Botones mínimo 44x44px en móvil

## 📁 Estructura del Proyecto

```
AmazonPrimeVideo/
│
├── AmazonPrimeVideo.html    # Archivo principal (HTML + CSS + JS)
├── index.html               # Versión con archivos separados
├── styles.css               # Estilos CSS (versión separada)
├── script.js                # JavaScript (versión separada)
└── README.md                # Documentación del proyecto
```

## 🚀 Cómo Ejecutar

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/2025-b-sw-web-gr1/guallichico-2025-b-cjgn-web-gr1.git
   ```

2. **Navegar a la carpeta:**
   ```bash
   cd guallichico-2025-b-cjgn-web-gr1/AmazonPrimeVideo
   ```

3. **Abrir en el navegador:**
   - Opción 1: Doble clic en `AmazonPrimeVideo.html`
   - Opción 2: Abrir con Live Server en VS Code
   - Opción 3: Arrastrar el archivo al navegador

## 🎓 Conceptos de CSS Aprendidos

### Layout
- `display: grid` y `display: flex`
- `grid-template-columns` con `repeat()` y `auto-fill`
- `justify-content`, `align-items`, `gap`
- `flex-direction`, `flex-wrap`

### Responsive
- `@media queries`
- Unidades relativas (`rem`, `em`, `%`, `vw`, `vh`)
- `min()`, `max()`, `clamp()` functions
- Viewport meta tag

### Efectos Visuales
- `transform: scale()`
- `transition` y `animation`
- `box-shadow` y `text-shadow`
- `backdrop-filter` para efectos de blur
- Gradientes con `linear-gradient()`

### Posicionamiento
- `position: fixed` para header
- `position: absolute` para overlays
- `z-index` para capas
- `overflow` control

## 🔧 Características Técnicas

### Performance
- ✅ Código optimizado
- ✅ Uso de CSS Variables
- ✅ Animaciones con `transform` y `opacity`
- ✅ Lazy loading concepts

### Accesibilidad
- ✅ Etiquetas semánticas HTML5
- ✅ Alt text en imágenes
- ✅ Contraste de colores adecuado
- ✅ Tamaños de click target apropiados

### SEO Básico
- ✅ Meta tags correctos
- ✅ Estructura semántica
- ✅ Títulos jerárquicos (h1, h2, h3)

## 🎨 Paleta de Colores

```css
Primary:    #00a8e1  /* Azul Prime Video */
Secondary:  #1a98ff  /* Azul claro */
Background: #0f171e  /* Azul oscuro */
Text:       #ffffff  /* Blanco */
Text-Alt:   #b3b3b3  /* Gris claro */
```

## 📝 Notas de Desarrollo

### Grid Auto-Fill vs Auto-Fit
- **auto-fill**: Crea todas las columnas posibles (aunque queden vacías)
- **auto-fit**: Colapsa columnas vacías y expande las existentes

### Flexbox Gap vs Margin
- **gap**: Espacio entre elementos (no en los bordes)
- **margin**: Espacio alrededor de cada elemento

### CSS Variables Scope
- Definidas en `:root` son globales
- Pueden ser sobreescritas en elementos específicos

## 🤝 Contribuciones

Este es un proyecto educativo. Las sugerencias y mejoras son bienvenidas.

## 👨‍💻 Autor

**Javier Guallichico**
- Universidad: EPN
- Materia: Aplicaciones Web
- Año: 2025

## 📄 Licencia

Este proyecto es de uso educativo. Todas las imágenes y marcas pertenecen a Amazon Prime Video y sus respectivos propietarios.

## 🔗 Referencias

- [CSS Grid Layout - MDN](https://developer.mozilla.org/es/docs/Web/CSS/CSS_Grid_Layout)
- [CSS Flexbox - MDN](https://developer.mozilla.org/es/docs/Web/CSS/CSS_Flexible_Box_Layout)
- [Responsive Design - MDN](https://developer.mozilla.org/es/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [The Movie Database API](https://www.themoviedb.org/)

---

⭐ **Si te gustó este proyecto, dale una estrella en GitHub!**

🎬 **Happy Coding!** 🚀
