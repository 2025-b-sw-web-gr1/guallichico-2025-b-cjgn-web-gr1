# 📚 Proyecto 001: API de Biblioteca - Autores y Libros

**Relación:** 1 Autor → Muchos Libros (1:N)  
**Estudiante:** Javier Guallichico  
**Curso:** Aplicaciones Web - EPN 2025  
**Fecha:** Diciembre 2025

---

## 📌 Descripción del Proyecto

API RESTful completa para gestionar una biblioteca digital con dos entidades principales:

- **Autores** (Authors)
- **Libros** (Books)

**Relación del modelo:**
- 1 Autor puede escribir MUCHOS Libros
- 1 Libro pertenece a UN SOLO Autor

Este proyecto incluye:
✅ Documentación completa en Swagger (OpenAPI 3.0)  
✅ 14 archivos Bruno para testing de endpoints  
✅ Documentación teórica sobre REST  
✅ Ejemplos de uso y mejores prácticas  

---

## 🎯 Objetivos del Proyecto

1. Implementar una API RESTful siguiendo estándares de la industria
2. Documentar todos los endpoints usando OpenAPI 3.0 (Swagger)
3. Crear tests automatizados con Bruno
4. Demostrar relación 1 a muchos (1:N) entre entidades
5. Aplicar mejores prácticas de diseño de APIs

---

## 🏗️ Arquitectura

### Modelo de Datos

```
┌─────────────────────┐        1:N        ┌──────────────────────┐
│       AUTOR         │◄──────────────────│       LIBRO          │
│  (Author)           │     escribe       │  (Book)              │
├─────────────────────┤                   ├──────────────────────┤
│ id (PK)             │                   │ id (PK)              │
│ name                │                   │ title                │
│ biography           │         N         │ isbn                 │
│ birthDate           │◄──────────────────│ publishedYear        │
│ country             │                   │ genre                │
│ email               │                   │ pages                │
│ website             │                   │ language             │
└─────────────────────┘                   │ price                │
                                          │ description          │
                                          │ authorId (FK)        │
                                          └──────────────────────┘
```

### Endpoints Implementados

#### 📖 Autores (6 endpoints)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/authors` | Obtener todos los autores |
| GET | `/authors/{id}` | Obtener autor específico |
| POST | `/authors` | Crear nuevo autor |
| PUT | `/authors/{id}` | Actualizar autor completo |
| PATCH | `/authors/{id}` | Actualizar parcialmente |
| DELETE | `/authors/{id}` | Eliminar autor |

#### 📚 Libros (6 endpoints)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/books` | Obtener todos los libros |
| GET | `/books/{id}` | Obtener libro específico |
| POST | `/books` | Crear nuevo libro |
| PUT | `/books/{id}` | Actualizar libro completo |
| PATCH | `/books/{id}` | Actualizar parcialmente |
| DELETE | `/books/{id}` | Eliminar libro |

#### 🔗 Relaciones (2 endpoints)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/authors/{id}/books` | ⭐ Obtener todos los libros de un autor |
| GET | `/books/{id}/author` | Obtener el autor de un libro |

**Total: 14 endpoints completamente documentados**

---

## 📁 Estructura del Proyecto

```
Proyecto001/
│
├── swagger.yaml                    # ⭐ Documentación OpenAPI 3.0 completa
│
├── bruno/                          # 🧪 Colección de tests Bruno
│   ├── bruno.json                  # Configuración de la colección
│   │
│   ├── GET All Authors.bru         # Tests de Autores
│   ├── GET Author by ID.bru
│   ├── POST Create Author.bru
│   ├── PUT Update Author.bru
│   ├── PATCH Update Author Partial.bru
│   ├── DELETE Author.bru
│   │
│   ├── GET All Books.bru           # Tests de Libros
│   ├── GET Book by ID.bru
│   ├── POST Create Book.bru
│   ├── PUT Update Book.bru
│   ├── PATCH Update Book Partial.bru
│   ├── DELETE Book.bru
│   │
│   ├── GET Books by Author.bru     # ⭐ Relación 1:N principal
│   └── GET Author of Book.bru      # Relación inversa
│
├── Teoria.md                       # 📚 Fundamentos de REST y diseño de APIs
│
└── README.md                       # 📖 Este archivo
```

---

## 🚀 Cómo Usar

### 1️⃣ Ver la Documentación Swagger

**Opción A: Swagger Editor Online (Recomendado)**

1. Abre [Swagger Editor](https://editor.swagger.io/)
2. Borra el contenido por defecto
3. Copia y pega el contenido de `swagger.yaml`
4. La documentación se visualizará automáticamente a la derecha

**Opción B: VSCode con extensión**

1. Instala la extensión "Swagger Viewer" o "OpenAPI (Swagger) Editor"
2. Abre el archivo `swagger.yaml`
3. Presiona `Shift + Alt + P` para previsualizar

**Opción C: Swagger UI Local**

```bash
# Instalar globalmente
npm install -g swagger-ui-watcher

# Ejecutar en la carpeta Proyecto001
swagger-ui-watcher swagger.yaml
```

---

### 2️⃣ Probar los Endpoints con Bruno

**Paso 1: Instalar Bruno**
- Descarga Bruno desde: https://www.usebruno.com/
- Instala la aplicación de escritorio

**Paso 2: Abrir la colección**
1. Abre Bruno
2. Click en "Open Collection"
3. Selecciona la carpeta `Proyecto001/bruno`
4. Verás los 14 endpoints organizados

**Paso 3: Ejecutar las peticiones**
1. Selecciona un archivo .bru (ej: `GET All Authors.bru`)
2. Click en el botón "Send" o presiona `Ctrl + Enter`
3. Verás la respuesta en el panel inferior
4. Los tests se ejecutarán automáticamente

**⚠️ Nota:** Esta API es ficticia (`https://api.biblioteca.com`). Para probar con datos reales:
- Cambia la URL base en cada archivo .bru
- O implementa el backend con Node.js/Express

---

### 3️⃣ Leer la Teoría

Abre `Teoria.md` para entender:
- Qué es REST y sus principios
- Cómo diseñar endpoints RESTful
- Diferencias entre PUT y PATCH
- Códigos de estado HTTP
- Mejores prácticas

---

## 📋 Ejemplos de Uso

### Crear un Autor

```http
POST https://api.biblioteca.com/v1/authors
Content-Type: application/json

{
  "name": "Gabriel García Márquez",
  "biography": "Escritor colombiano, premio Nobel de Literatura 1982",
  "birthDate": "1927-03-06",
  "country": "Colombia",
  "email": "gabo@example.com",
  "website": "https://gabrielgarciamarquez.com"
}

Response 201 Created:
{
  "id": 1,
  "name": "Gabriel García Márquez",
  "biography": "Escritor colombiano, premio Nobel de Literatura 1982",
  "birthDate": "1927-03-06",
  "country": "Colombia",
  "email": "gabo@example.com",
  "website": "https://gabrielgarciamarquez.com"
}
```

---

### Crear un Libro

```http
POST https://api.biblioteca.com/v1/books
Content-Type: application/json

{
  "title": "Cien años de soledad",
  "isbn": "978-0307474728",
  "publishedYear": 1967,
  "genre": "Ficción",
  "pages": 417,
  "language": "Español",
  "price": 25.99,
  "description": "La obra maestra de Gabriel García Márquez",
  "authorId": 1
}

Response 201 Created:
{
  "id": 1,
  "title": "Cien años de soledad",
  "isbn": "978-0307474728",
  "publishedYear": 1967,
  "genre": "Ficción",
  "pages": 417,
  "language": "Español",
  "price": 25.99,
  "description": "La obra maestra de Gabriel García Márquez",
  "authorId": 1
}
```

---

### Obtener Libros de un Autor (Relación 1:N)

```http
GET https://api.biblioteca.com/v1/authors/1/books

Response 200 OK:
{
  "author": {
    "id": 1,
    "name": "Gabriel García Márquez",
    "country": "Colombia"
  },
  "books": [
    {
      "id": 1,
      "title": "Cien años de soledad",
      "publishedYear": 1967,
      "genre": "Ficción",
      "price": 25.99
    },
    {
      "id": 2,
      "title": "El amor en los tiempos del cólera",
      "publishedYear": 1985,
      "genre": "Romance",
      "price": 22.50
    },
    {
      "id": 3,
      "title": "Crónica de una muerte anunciada",
      "publishedYear": 1981,
      "genre": "Ficción",
      "price": 18.99
    }
  ],
  "totalBooks": 3
}
```

Este endpoint demuestra la **relación 1 a muchos**: un autor (Gabriel García Márquez) tiene múltiples libros asociados.

---

### Filtrar Libros

```http
GET https://api.biblioteca.com/v1/books?genre=Ficción&language=Español&minPrice=20&maxPrice=30

Response 200 OK:
[
  {
    "id": 1,
    "title": "Cien años de soledad",
    "genre": "Ficción",
    "language": "Español",
    "price": 25.99,
    "authorId": 1
  },
  {
    "id": 4,
    "title": "Pedro Páramo",
    "genre": "Ficción",
    "language": "Español",
    "price": 22.00,
    "authorId": 3
  }
]
```

---

### Actualizar Parcialmente un Libro (PATCH)

```http
PATCH https://api.biblioteca.com/v1/books/1
Content-Type: application/json

{
  "price": 29.99,
  "description": "Obra cumbre del realismo mágico latinoamericano"
}

Response 200 OK:
{
  "id": 1,
  "title": "Cien años de soledad",  ← No cambió
  "isbn": "978-0307474728",  ← No cambió
  "publishedYear": 1967,  ← No cambió
  "genre": "Ficción",  ← No cambió
  "pages": 417,  ← No cambió
  "language": "Español",  ← No cambió
  "price": 29.99,  ← ✅ Actualizado
  "description": "Obra cumbre del realismo mágico latinoamericano",  ← ✅ Actualizado
  "authorId": 1  ← No cambió
}
```

**PATCH vs PUT:**
- **PATCH:** Solo envía los campos que cambian (más eficiente)
- **PUT:** Requiere enviar el objeto completo

---

## 🎨 Características Implementadas

### ✅ Documentación Swagger Completa

**Metadata:**
- Título, descripción, versión
- Información de contacto
- Licencia MIT
- Servidores (producción y desarrollo)

**Organización:**
- 3 tags: Autores, Libros, Relaciones
- Endpoints agrupados lógicamente
- Descripciones detalladas

**Schemas:**
- `Author`: Modelo completo de autor
- `AuthorInput`: Datos para crear/actualizar autor
- `Book`: Modelo completo de libro
- `BookInput`: Datos para crear/actualizar libro
- `Error`: Formato estándar de errores

**Validaciones:**
- Campos requeridos identificados
- Tipos de datos especificados
- Formatos (email, uri, date, ISBN)
- Enumeraciones (géneros literarios)
- Valores mínimos/máximos

**Ejemplos:**
- Request bodies con datos realistas
- Response bodies para cada código HTTP
- Query parameters con valores de ejemplo

---

### ✅ Tests Completos en Bruno

**14 archivos .bru con:**
- Metadata (nombre, tipo, secuencia)
- Método HTTP y URL
- Headers apropiados
- Body JSON (cuando aplica)
- Documentación inline
- Tests automatizados con expect()

**Tipos de tests:**
```javascript
// Verificar código de estado
test("Status code es 200", function() {
  expect(res.getStatus()).to.equal(200);
});

// Verificar tipo de respuesta
test("Response es un array", function() {
  expect(res.getBody()).to.be.an('array');
});

// Verificar propiedades
test("Autor tiene todas las propiedades", function() {
  const author = res.getBody();
  expect(author).to.have.property('id');
  expect(author).to.have.property('name');
});

// Verificar valores
test("ID del autor es 1", function() {
  expect(res.getBody().id).to.equal(1);
});
```

---

### ✅ Mejores Prácticas Aplicadas

**1. Diseño RESTful:**
- URLs descriptivas con sustantivos
- Métodos HTTP semánticos
- Códigos de estado apropiados
- Recursos anidados para relaciones

**2. Versionado:**
- URL con versión: `/v1/authors`
- Permite evolución sin romper clientes

**3. Filtrado y Búsqueda:**
- Query parameters opcionales
- Múltiples filtros combinables
- Límite de resultados para paginación

**4. Validación de Datos:**
- Campos requeridos vs opcionales
- Formatos validados (ISBN, email, date)
- Enumeraciones para valores limitados
- Rangos numéricos (años, páginas, precios)

**5. Manejo de Errores:**
- Códigos HTTP correctos (400, 404, 409)
- Mensajes descriptivos en español
- Estructura consistente de errores

**6. Relaciones:**
- Endpoints anidados para 1:N
- Validación de foreign keys
- Respuestas enriquecidas con datos relacionados

---

## 📊 Comparación con el Ejemplo Original

El proyecto original usaba **Equipos de Fútbol y Jugadores**. Nuestro proyecto usa **Autores y Libros**.

| Aspecto | Ejemplo Original | Nuestro Proyecto |
|---------|-----------------|------------------|
| **Entidad 1** | Team (Equipo) | Author (Autor) |
| **Entidad 2** | Player (Jugador) | Book (Libro) |
| **Relación** | 1 equipo → N jugadores | 1 autor → N libros |
| **Dominio** | Deportes | Biblioteca |
| **Endpoints** | ~12 | 14 |
| **Archivos Bruno** | No especificado | 14 completos |
| **Documentación** | Básica | Completa con ejemplos |
| **Validaciones** | Pocas | Extensas (ISBN, email, enum) |
| **Query params** | No | Sí (filtros, paginación) |
| **Schemas** | 4 | 5 (incluye Error) |

---

## 🎯 Casos de Uso

### 1. Catálogo de Biblioteca
- Listar todos los libros disponibles
- Filtrar por género, idioma, precio
- Ver detalles de cada libro
- Conocer al autor

### 2. Perfil de Autor
- Ver información del autor
- Ver bibliografía completa
- Filtrar libros por género
- Estadísticas (total de libros)

### 3. Gestión Administrativa
- Agregar nuevos autores y libros
- Actualizar información (precios, descripciones)
- Eliminar registros obsoletos
- Mantener integridad referencial

### 4. Búsqueda y Descubrimiento
- Buscar libros por género
- Encontrar libros en español
- Filtrar por rango de precios
- Explorar autores por país

---

## 🔍 Validaciones Implementadas

### Autor (Author)

**Campos requeridos:**
- `name` (string, 2-100 caracteres)
- `country` (string, 2-50 caracteres)

**Campos opcionales con validación:**
- `biography` (string, máx 1000 caracteres)
- `birthDate` (formato ISO 8601: YYYY-MM-DD)
- `email` (formato email válido)
- `website` (formato URI válido)

### Libro (Book)

**Campos requeridos:**
- `title` (string, 1-200 caracteres)
- `authorId` (integer, debe existir)

**Campos opcionales con validación:**
- `isbn` (patrón: 978-X-XXXXX-XXX-X o 979-X-XXXXX-XXX-X)
- `publishedYear` (integer, 1000-2100)
- `genre` (enum: 10 opciones)
- `pages` (integer, mínimo 1)
- `language` (string)
- `price` (float, mínimo 0)
- `description` (string, máx 2000 caracteres)

**Géneros disponibles:**
- Ficción
- No Ficción
- Poesía
- Drama
- Ciencia Ficción
- Fantasía
- Romance
- Thriller
- Historia
- Biografía

---

## 🚧 Próximas Mejoras (Roadmap)

### Funcionalidades Pendientes

**1. Paginación completa:**
```http
GET /books?page=2&limit=20
Response:
{
  "data": [...],
  "pagination": {
    "page": 2,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

**2. Búsqueda de texto:**
```http
GET /books?search=realismo+magico
GET /authors?search=garcia
```

**3. Ordenamiento:**
```http
GET /books?sortBy=price&order=asc
GET /books?sortBy=publishedYear&order=desc
```

**4. Autenticación y Autorización:**
- JWT tokens
- Roles (admin, editor, viewer)
- Endpoints protegidos

**5. Relaciones adicionales:**
- Categorías de libros
- Editoriales
- Reseñas de usuarios

**6. Funcionalidades avanzadas:**
- Upload de imágenes de portadas
- Sistema de favoritos
- Recomendaciones basadas en géneros

---

## 📚 Recursos Adicionales

### Documentación de Referencia
- [OpenAPI Specification](https://swagger.io/specification/)
- [REST API Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://httpstatuses.com/)
- [Bruno Documentation](https://docs.usebruno.com/)

### Tutoriales
- [RESTful API Design - Best Practices](https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/)
- [How to Design a REST API](https://www.freecodecamp.org/news/rest-api-design-best-practices-build-a-rest-api/)

### Herramientas
- [Swagger Editor](https://editor.swagger.io/) - Editor online
- [Bruno](https://www.usebruno.com/) - Cliente API
- [Postman](https://www.postman.com/) - Alternativa a Bruno
- [JSON Schema Validator](https://www.jsonschemavalidator.net/) - Validar schemas

---

## 👨‍💻 Autor

**Javier Guallichico**  
- Email: javier.guallichico@epn.edu.ec
- Curso: Aplicaciones Web - EPN 2025
- Repositorio: guallichico-2025-b-cjgn-web-gr1

---

## 📄 Licencia

MIT License

Copyright (c) 2025 Javier Guallichico

Se permite el uso, copia, modificación y distribución de este software con fines educativos.

---

## ✅ Checklist de Entregables

- [x] swagger.yaml completo (900+ líneas)
- [x] 14 archivos .bru con tests
- [x] bruno.json configurado
- [x] Teoria.md con fundamentos REST
- [x] README.md con documentación completa
- [x] Ejemplos de uso
- [x] Validaciones implementadas
- [x] Relación 1:N documentada
- [x] Mejores prácticas aplicadas

---

**FIN DEL README**

Para comenzar, abre `swagger.yaml` en [Swagger Editor](https://editor.swagger.io/) y explora la documentación interactiva. 🚀
