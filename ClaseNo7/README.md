# 🎮 Taller: Motor de Renderizado - TechGamer Store

**Curso:** Aplicaciones Web - EPN 2025  
**Estudiante:** Javier Guallichico  
**Motor Elegido:** Handlebars

---

## 📋 Contenido del Taller

1. [¿Por qué elegí Handlebars?](#por-qué-elegí-handlebars)
2. [Diferencias con EJS](#diferencias-con-ejs)
3. [Ventajas y Desventajas](#ventajas-y-desventajas)
4. [Configuración e Instalación](#configuración-e-instalación)
5. [Estructura del Proyecto](#estructura-del-proyecto)
6. [Características Implementadas](#características-implementadas)

---

## 🎯 ¿Por qué elegí Handlebars?

### 1. **Filosofía "Logic-less" (Sin lógica compleja)**

Handlebars promueve una separación estricta entre la lógica del negocio y la presentación. Esto significa que NO puedes ejecutar código JavaScript arbitrario en las plantillas.

**Ejemplo en EJS (lo que estábamos acostumbrados):**
```ejs
<% 
    const precioFinal = producto.precio - (producto.precio * producto.descuento / 100);
    const mensaje = precioFinal > 100 ? "Producto Premium" : "Oferta";
%>
<h3><%= mensaje %></h3>
<p>$<%= precioFinal.toFixed(2) %></p>
```

**En Handlebars (cómo lo hago ahora):**
```handlebars
<!-- En la plantilla: SOLO presentación -->
<h3>{{productoTipo}}</h3>
<p>{{formatPrice precioFinal}}</p>
```

```javascript
// En el servidor: TODA la lógica
app.get('/producto', (req, res) => {
    const precioFinal = producto.precio - (producto.precio * producto.descuento / 100);
    const productoTipo = precioFinal > 100 ? "Producto Premium" : "Oferta";
    
    res.render('producto', { 
        productoTipo,
        precioFinal 
    });
});
```

**¿Por qué esto es mejor?**
- ✅ El código del backend es más fácil de testear
- ✅ Las plantillas son más limpias y fáciles de leer
- ✅ Los diseñadores pueden trabajar en las plantillas sin saber JavaScript

### 2. **Sistema de Helpers Potente**

Handlebars permite crear funciones reutilizables (helpers) que puedo usar en cualquier plantilla:

```javascript
helpers: {
    // Helper para formatear precios
    formatPrice: function(price) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    },
    
    // Helper para calcular descuentos
    calcDiscount: function(price, discount) {
        return price - (price * discount / 100);
    },
    
    // Helper para rating de estrellas
    stars: function(rating) {
        let stars = '';
        for(let i = 1; i <= 5; i++) {
            stars += i <= rating ? '★' : '☆';
        }
        return stars;
    }
}
```

**Uso en las plantillas:**
```handlebars
<div class="precio">{{formatPrice precio}}</div>
<div class="descuento">{{formatPrice (calcDiscount precio descuento)}}</div>
<div class="rating">{{stars 4}}</div>
```

**Resultado:**
- `$1,599.99`
- `$1,439.99` (con 10% de descuento)
- `★★★★☆`

### 3. **Sistema de Layouts Nativo**

Con EJS, tenías que usar `include()` manualmente para el header y footer:

```ejs
<%- include('partials/header') %>
<main>
    <!-- contenido -->
</main>
<%- include('partials/footer') %>
```

Con Handlebars, tienes layouts automáticos:

```handlebars
<!-- layouts/main.handlebars -->
<!DOCTYPE html>
<html>
<head>
    <title>{{title}}</title>
</head>
<body>
    {{> navbar}}
    {{{body}}}  <!-- Aquí se inyecta cada página -->
    {{> footer}}
</body>
</html>
```

Cada página solo tiene su contenido único:

```handlebars
<!-- home.handlebars -->
<h1>Bienvenido</h1>
<p>Este es el contenido de la página home</p>
```

### 4. **Amplia Adopción en la Industria**

- **LinkedIn** usa Handlebars en su frontend
- **Walmart** usa Handlebars para sus emails transaccionales
- **Uber** usa Handlebars en varias partes de su stack
- Más de **21 millones de descargas semanales** en npm

### 5. **Curiosidad Profesional**

Quería experimentar con un motor diferente a EJS para:
- 🎓 Ampliar mi conocimiento de tecnologías web
- 💼 Estar preparado para diferentes proyectos en mi carrera
- 🔍 Entender las trade-offs entre diferentes herramientas

---

## 🔄 Diferencias con EJS

### Tabla Comparativa General

| Aspecto | EJS | Handlebars |
|---------|-----|------------|
| **Sintaxis** | `<% %>` (JavaScript) | `{{ }}` (Mustache) |
| **Lógica** | JavaScript completo | Helpers limitados |
| **Filosofía** | Flexible | Logic-less |
| **Layouts** | Manual (includes) | Nativos |
| **Curva aprendizaje** | Fácil (si sabes JS) | Media |
| **Helpers** | No tiene | Sistema robusto |
| **Performance** | Rápido | Muy rápido |
| **Tamaño** | 10KB | 23KB |
| **Popularidad** | Alta | Muy alta |

### Diferencia 1: Sintaxis Básica

**EJS:**
```ejs
<h1><%= producto.nombre %></h1>
<p><%= producto.descripcion %></p>

<% if (producto.enStock) { %>
    <button>Comprar Ahora</button>
<% } else { %>
    <p>Agotado</p>
<% } %>
```

**Handlebars:**
```handlebars
<h1>{{producto.nombre}}</h1>
<p>{{producto.descripcion}}</p>

{{#if producto.enStock}}
    <button>Comprar Ahora</button>
{{else}}
    <p>Agotado</p>
{{/if}}
```

**Análisis:**
- EJS usa `<% %>` para código y `<%= %>` para output
- Handlebars usa `{{ }}` para output y `{{# }}` para bloques
- En EJS escribes JavaScript puro
- En Handlebars usas una sintaxis específica

### Diferencia 2: Iteración

**EJS:**
```ejs
<div class="productos">
    <% productos.forEach(function(p) { %>
        <div class="card">
            <h3><%= p.nombre %></h3>
            <p>$<%= p.precio %></p>
        </div>
    <% }); %>
</div>
```

**Handlebars:**
```handlebars
<div class="productos">
    {{#each productos}}
        <div class="card">
            <h3>{{nombre}}</h3>
            <p>{{formatPrice precio}}</p>
        </div>
    {{/each}}
</div>
```

**Análisis:**
- EJS usa `forEach()` de JavaScript
- Handlebars usa `{{#each}}` built-in
- En Handlebars dentro del `each` accedes directamente a las propiedades
- Handlebars es más conciso y legible

### Diferencia 3: Condicionales Complejos

**EJS:**
```ejs
<% 
    const descuentoGrande = producto.descuento > 20;
    const esCaro = producto.precio > 1000;
%>

<% if (descuentoGrande && esCaro) { %>
    <span class="super-oferta">¡MEGA OFERTA!</span>
<% } else if (descuentoGrande) { %>
    <span class="oferta">Gran Descuento</span>
<% } else { %>
    <span class="normal">Precio Regular</span>
<% } %>
```

**Handlebars:**

Primero creo un helper:
```javascript
helpers: {
    tipoOferta: function(descuento, precio) {
        if (descuento > 20 && precio > 1000) return 'MEGA OFERTA';
        if (descuento > 20) return 'Gran Descuento';
        return 'Precio Regular';
    },
    claseTipo: function(descuento, precio) {
        if (descuento > 20 && precio > 1000) return 'super-oferta';
        if (descuento > 20) return 'oferta';
        return 'normal';
    }
}
```

Luego en la plantilla:
```handlebars
<span class="{{claseTipo producto.descuento producto.precio}}">
    {{tipoOferta producto.descuento producto.precio}}
</span>
```

**Análisis:**
- EJS: Lógica directa en la plantilla (rápido pero "sucio")
- Handlebars: Lógica en helpers (más código inicial pero más limpio)
- EJS es más flexible para lógica compleja
- Handlebars fuerza mejor arquitectura

### Diferencia 4: Operaciones Matemáticas

**EJS:**
```ejs
<p>Precio original: $<%= producto.precio %></p>
<p>Descuento: <%= producto.descuento %>%</p>
<p>Precio final: $<%= (producto.precio * (1 - producto.descuento/100)).toFixed(2) %></p>
<p>Ahorras: $<%= (producto.precio * producto.descuento/100).toFixed(2) %></p>
```

**Handlebars:**
```handlebars
<p>Precio original: {{formatPrice producto.precio}}</p>
<p>Descuento: {{producto.descuento}}%</p>
<p>Precio final: {{formatPrice (calcDiscount producto.precio producto.descuento)}}</p>
<p>Ahorras: {{formatPrice (calcAhorro producto.precio producto.descuento)}}</p>
```

Con helpers definidos:
```javascript
helpers: {
    calcDiscount: (precio, descuento) => precio * (1 - descuento/100),
    calcAhorro: (precio, descuento) => precio * descuento/100
}
```

**Análisis:**
- EJS: Matemáticas directas en la plantilla
- Handlebars: Requiere crear helpers para cada operación
- EJS es más directo para cálculos simples
- Handlebars es más consistente y reutilizable

### Diferencia 5: Acceso a Objetos Anidados

**EJS:**
```ejs
<h2><%= producto.fabricante.nombre %></h2>
<p><%= producto.fabricante.pais.toUpperCase() %></p>
<p><%= producto.specs.gpu.vram %>GB VRAM</p>
```

**Handlebars:**
```handlebars
<h2>{{producto.fabricante.nombre}}</h2>
<p>{{uppercase producto.fabricante.pais}}</p>
<p>{{producto.specs.gpu.vram}}GB VRAM</p>
```

**Análisis:**
- Ambos acceden igual a propiedades anidadas con `.`
- EJS puede llamar métodos como `.toUpperCase()`
- Handlebars necesita helpers para transformaciones

---

## ⚖️ Ventajas y Desventajas

### ✅ Ventajas de Handlebars

#### 1. **Separación Clara de Responsabilidades**

**Ventaja:** Toda la lógica está en el servidor, las plantillas solo muestran datos.

```javascript
// ✅ SERVIDOR: Toda la lógica aquí
app.get('/producto/:id', (req, res) => {
    const producto = obtenerProducto(req.params.id);
    const precioFinal = calcularPrecioConDescuento(producto);
    const enStock = producto.stock > 0;
    const envioGratis = precioFinal > 50;
    
    res.render('producto', {
        producto,
        precioFinal,
        enStock,
        envioGratis
    });
});
```

```handlebars
<!-- ✅ PLANTILLA: Solo presentación -->
<h1>{{producto.nombre}}</h1>
<p>{{formatPrice precioFinal}}</p>
{{#if enStock}}
    <button>Comprar</button>
{{/if}}
{{#if envioGratis}}
    <span>🚚 Envío Gratis</span>
{{/if}}
```

**Beneficio:** El código es más fácil de mantener y testear.

#### 2. **Helpers Reutilizables**

Una vez que creas un helper, lo usas en todas partes:

```javascript
// Defino una vez
helpers: {
    formatPrice: (price) => `$${price.toFixed(2)}`,
    formatDate: (date) => new Date(date).toLocaleDateString('es-ES'),
    truncate: (text, length) => text.substring(0, length) + '...'
}
```

```handlebars
<!-- Uso en múltiples lugares -->
<p>Precio: {{formatPrice 1599.99}}</p>
<p>Fecha: {{formatDate "2025-11-17"}}</p>
<p>{{truncate descripcion 100}}</p>
```

#### 3. **Sistema de Layouts Elegante**

No repites HTML base en cada página:

```handlebars
<!-- layouts/main.handlebars: Define una vez -->
<!DOCTYPE html>
<html>
<head>
    <title>{{title}}</title>
    <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
    {{> navbar}}
    <main>{{{body}}}</main>
    {{> footer}}
</body>
</html>
```

Cada página solo tiene su contenido único.

#### 4. **Sintaxis Limpia y Legible**

Las plantillas son más fáciles de leer:

```handlebars
{{#each productos}}
    <div class="card">
        <h3>{{nombre}}</h3>
        <p>{{descripcion}}</p>
        {{#if destacado}}
            <span class="badge">⭐ Destacado</span>
        {{/if}}
    </div>
{{/each}}
```

Vs EJS que mezcla HTML con JavaScript:

```ejs
<% productos.forEach(p => { %>
    <div class="card">
        <h3><%= p.nombre %></h3>
        <p><%= p.descripcion %></p>
        <% if (p.destacado) { %>
            <span class="badge">⭐ Destacado</span>
        <% } %>
    </div>
<% }); %>
```

#### 5. **Seguridad por Defecto**

Handlebars escapa HTML automáticamente:

```handlebars
<!-- Si descripcion = "<script>alert('xss')</script>" -->
<p>{{descripcion}}</p>
<!-- Resultado: "&lt;script&gt;alert('xss')&lt;/script&gt;" -->
```

Para HTML confiable usas triple llave:
```handlebars
<div>{{{contenidoHTML}}}</div>
```

#### 6. **Pre-compilación para Performance**

Handlebars puede pre-compilar plantillas en producción para mejor rendimiento.

#### 7. **Amplio Ecosistema**

- 21+ millones de descargas semanales
- Gran comunidad
- Muchos plugins y extensiones

### ⚠️ Desventajas de Handlebars

#### 1. **No Puedes Ejecutar JavaScript Arbitrario**

**Problema:** Operaciones simples requieren helpers.

```handlebars
<!-- ❌ Esto NO funciona -->
{{producto.nombre.toUpperCase()}}
{{precio * 1.12}}
{{productos.length}}
```

**Solución:** Crear helpers o preparar datos en el servidor:

```javascript
helpers: {
    uppercase: (str) => str.toUpperCase(),
    multiply: (a, b) => a * b,
    length: (arr) => arr.length
}
```

**Impacto:** Más código inicial, pero mejor arquitectura.

#### 2. **Curva de Aprendizaje**

Si ya sabes JavaScript, EJS es inmediato. Handlebars requiere aprender:
- Sintaxis de helpers
- Bloque condicionales `{{#if}}`, `{{#each}}`
- Diferencia entre `{{}}`, `{{{}}}`, `{{#}}`
- Sistema de partials y layouts

#### 3. **Verbosidad para Lógica Compleja**

**En EJS (simple):**
```ejs
<% if (user.role === 'admin' || user.role === 'moderator') { %>
    <button>Panel Admin</button>
<% } %>
```

**En Handlebars (requiere helper):**
```javascript
helpers: {
    isStaff: (role) => role === 'admin' || role === 'moderator'
}
```

```handlebars
{{#if (isStaff user.role)}}
    <button>Panel Admin</button>
{{/if}}
```

#### 4. **Debugging Menos Intuitivo**

Errores en Handlebars son menos descriptivos:
```
Error: Missing helper: "formatDate"
```

Vs errores JavaScript más detallados en EJS.

#### 5. **Operadores de Comparación Limitados**

No tienes operadores como `>`, `<`, `===` directamente:

```handlebars
<!-- ❌ NO funciona -->
{{#if precio > 100}}
    <span>Producto caro</span>
{{/if}}
```

Necesitas crear helpers:
```javascript
helpers: {
    gt: (a, b) => a > b,
    lt: (a, b) => a < b,
    eq: (a, b) => a === b
}
```

```handlebars
<!-- ✅ Así funciona -->
{{#if (gt precio 100)}}
    <span>Producto caro</span>
{{/if}}
```

#### 6. **Más Archivos y Configuración Inicial**

Con EJS solo necesitas:
```javascript
app.set('view engine', 'ejs');
```

Con Handlebars necesitas configurar:
```javascript
app.engine('handlebars', engine({
    defaultLayout: 'main',
    layoutsDir: './views/layouts',
    partialsDir: './views/partials',
    helpers: { /* ... */ }
}));
app.set('view engine', 'handlebars');
```

---

## ⚙️ Configuración e Instalación

### Paso 1: Instalar Dependencias

```bash
npm install express express-handlebars
```

### Paso 2: Configurar en server.js

```javascript
const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');

const app = express();

// Configurar Handlebars
app.engine('handlebars', engine({
    defaultLayout: 'main',                    // Layout por defecto
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    helpers: {
        // Tus helpers personalizados aquí
        formatPrice: function(price) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            }).format(price);
        }
    }
}));

app.set('view engine', 'handlebars');
app.set('views', './views');

// Middleware
app.use(express.static('public'));
```

### Paso 3: Estructura de Carpetas

```
proyecto/
├── views/
│   ├── layouts/
│   │   └── main.handlebars          # Layout principal
│   ├── partials/
│   │   ├── navbar.handlebars        # Componentes reutilizables
│   │   └── footer.handlebars
│   ├── home.handlebars              # Páginas
│   └── productos.handlebars
├── public/
│   └── css/
└── server.js
```

---

## 📁 Estructura del Proyecto TechGamer

```
ClaseNo7/
├── views/
│   ├── layouts/
│   │   └── main.handlebars           # Layout con navbar y footer
│   ├── home.handlebars               # Página inicio
│   ├── productos.handlebars          # Catálogo con filtros
│   ├── detalle.handlebars            # Detalle de producto
│   ├── carrito.handlebars            # Carrito de compras
│   └── 404.handlebars                # Página de error
│
├── server.js                          # Servidor Express + Handlebars
├── package.json                       # Dependencias
└── README.md                          # Este archivo
```

---

## 🎨 Características Implementadas

### 1. **10 Productos Gaming Realistas**

- NVIDIA GeForce RTX 4090 ($1,599.99 - 10% OFF)
- AMD Ryzen 9 7950X ($699.99 - 15% OFF)
- Corsair Vengeance RGB 32GB ($189.99)
- Samsung 990 PRO 2TB ($199.99 - 20% OFF)
- ASUS ROG Strix Motherboard ($329.99)
- Cooler Master Liquid 360 ($149.99)
- Corsair RM1000x PSU ($179.99)
- NZXT H7 Flow Case ($129.99)
- Logitech G Pro X Mouse ($159.99)
- Razer BlackWidow Keyboard ($229.99)

### 2. **9 Categorías de Productos**

- Tarjetas Gráficas (GPU)
- Procesadores (CPU)
- Memoria RAM
- Almacenamiento (SSD/HDD)
- Motherboards
- Refrigeración
- Fuentes de Poder (PSU)
- Gabinetes (Cases)
- Periféricos

### 3. **Helpers Personalizados**

```javascript
formatPrice()        // Formatea precios: $1,599.99
calcDiscount()       // Calcula precio con descuento
inStock()            // Verifica si hay stock
hasDiscount()        // Verifica si tiene descuento
stars()              // Genera rating visual: ★★★★☆
isCategory()         // Compara categorías
eq()                 // Comparación de igualdad
```

### 4. **Sistema de Filtros**

- Filtrar por categoría desde la URL: `/productos?categoria=gpu`
- Botones de filtro visual en la página
- Contador de productos filtrados

### 5. **Páginas Implementadas**

- **Home (`/`)**: Hero section, stats, categorías, productos destacados
- **Catálogo (`/productos`)**: Todos los productos con filtros
- **Detalle (`/producto/:id`)**: Información completa del producto
- **Carrito (`/carrito`)**: Página de carrito (simulado)
- **404**: Página de error personalizada

### 6. **Diseño Gaming Moderno**

- Paleta de colores: Rosa (#ff0080) + Cian (#00f0ff) + Morado (#7928ca)
- Gradientes en todos los elementos principales
- Animaciones suaves (hover, float, glow)
- Efectos de sombra con colores neón
- Totalmente responsive

### 7. **Datos Realistas**

Cada producto incluye:
- Nombre completo y descripción
- Precio con descuentos reales
- Stock disponible
- Rating de 1-5 estrellas
- Especificaciones técnicas detalladas (5 specs por producto)
- Categoría y productos relacionados

---

## 🚀 Cómo Ejecutar

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor
npm start

# 3. Abrir navegador
# http://localhost:3000
```

---

## 📊 Conclusión del Taller

### Lo que Aprendí

1. **Handlebars es diferente a EJS:** No puedes ejecutar JavaScript directo, lo que al principio parece limitante pero termina forzándote a escribir mejor código.

2. **La filosofía "logic-less" tiene sentido:** Separar lógica de presentación hace el código más mantenible a largo plazo.

3. **Los helpers son poderosos:** Una vez que entiendes cómo funcionan, puedes crear código muy reutilizable.

4. **Los layouts nativos son superiores:** No tener que repetir HTML base en cada página es una gran ventaja.

5. **Cada herramienta tiene su lugar:** EJS es genial para prototipos rápidos, Handlebars es mejor para proyectos grandes.

### Cuándo Usar Cada Motor

**Usa EJS si:**
- ✅ Necesitas desarrollo rápido
- ✅ El equipo ya sabe JavaScript
- ✅ Proyecto pequeño o prototipo
- ✅ Necesitas mucha lógica en plantillas

**Usa Handlebars si:**
- ✅ Proyecto grande y complejo
- ✅ Valoras arquitectura limpia
- ✅ Quieres reutilizar código
- ✅ Necesitas layouts robustos
- ✅ Prefieres seguridad por defecto

### Mi Recomendación

Para este proyecto de tienda gamer, **Handlebars fue la elección correcta** porque:
1. La lógica es simple (mostrar productos, filtrar)
2. Los helpers de formateo son muy útiles
3. El sistema de layouts simplificó mucho el código
4. La sintaxis limpia hace las plantillas más legibles

---

**Proyecto desarrollado para el curso de Aplicaciones Web - EPN 2025**  
**Motor:** Handlebars 7.1.2  
**Framework:** Express 4.18.2
