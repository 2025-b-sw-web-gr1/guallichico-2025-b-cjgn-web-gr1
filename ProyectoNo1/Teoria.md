# 📚 Teoría: APIs RESTful y Relaciones 1 a Muchos

**Proyecto:** API de Biblioteca - Autores y Libros  
**Estudiante:** Javier Guallichico  
**Curso:** Aplicaciones Web - EPN 2025  
**Fecha:** Diciembre 2025

---

## 🧭 Parte 1: ¿Qué es el estándar RESTful?

### Definición

**REST** (Representational State Transfer) es un **estilo arquitectónico** para diseñar servicios web creado por Roy Fielding en el año 2000. No es un protocolo ni un estándar, sino un conjunto de principios y restricciones arquitectónicas.

Una **API RESTful** es una interfaz de programación de aplicaciones que implementa los principios REST.

### Principios Fundamentales de REST

#### 1️⃣ **Arquitectura Cliente-Servidor**
- **Separación de responsabilidades:** El cliente maneja la interfaz de usuario, el servidor maneja los datos y la lógica de negocio
- **Independencia:** Cliente y servidor pueden evolucionar independientemente
- **Escalabilidad:** Permite escalar horizontalmente el servidor sin afectar a los clientes

**Ejemplo en nuestro proyecto:**
```
Cliente (Frontend)          Servidor (Backend)
    📱 App Web      ←→      🖥️ API Biblioteca
    - UI/UX                 - Base de datos
    - Presentación          - Lógica de negocio
    - Interacción           - Autenticación
```

---

#### 2️⃣ **Stateless (Sin Estado)**
- **Cada petición contiene toda la información necesaria** para ser procesada
- El servidor **NO guarda contexto** de peticiones anteriores del cliente
- **No se usan sesiones** en el servidor
- Toda la información de sesión está en el cliente o en tokens (JWT)

**Ventajas:**
- Mayor escalabilidad (cualquier servidor puede manejar cualquier petición)
- Simplicidad en el servidor
- Facilita load balancing

**Ejemplo:**
```http
❌ MAL (Stateful):
GET /books/next   # Requiere que el servidor recuerde cuál fue el anterior

✅ BIEN (Stateless):
GET /books/2      # La petición contiene toda la info necesaria
Authorization: Bearer <token>  # Token incluye identidad del usuario
```

---

#### 3️⃣ **Recursos Identificados por URLs**
- Cada recurso tiene una **URI única** (Uniform Resource Identifier)
- Las URLs deben ser **descriptivas y jerárquicas**
- Representan **sustantivos (entidades)**, no verbos

**Estructura de URLs en nuestro proyecto:**
```
Recursos principales (colecciones):
/authors          → Colección de autores
/books            → Colección de libros

Recursos individuales:
/authors/{id}     → Un autor específico
/books/{id}       → Un libro específico

Relaciones (recursos anidados):
/authors/{id}/books     → Libros de un autor
/books/{id}/author      → Autor de un libro
```

**Mejores prácticas para URLs:**
```
✅ BIEN:
/authors          (sustantivo plural)
/authors/1        (ID numérico)
/authors/1/books  (relación jerárquica)

❌ MAL:
/getAuthors       (verbo en URL)
/author           (singular inconsistente)
/authorId=1       (query param innecesario)
/authors/1/getAllBooks  (verbo redundante)
```

---

#### 4️⃣ **Métodos HTTP Estándar**

REST usa los métodos HTTP para definir operaciones CRUD:

| Método | Operación | Descripción | Idempotente | Seguro |
|--------|-----------|-------------|-------------|--------|
| **GET** | Read (Leer) | Obtener recursos | ✅ Sí | ✅ Sí |
| **POST** | Create (Crear) | Crear nuevo recurso | ❌ No | ❌ No |
| **PUT** | Update (Actualizar) | Actualizar completo | ✅ Sí | ❌ No |
| **PATCH** | Update (Actualizar) | Actualizar parcial | ❌ No | ❌ No |
| **DELETE** | Delete (Eliminar) | Eliminar recurso | ✅ Sí | ❌ No |

**Definiciones:**
- **Idempotente:** Ejecutar la operación N veces produce el mismo resultado que ejecutarla 1 vez
- **Seguro:** No modifica el estado del servidor

**Ejemplos con nuestro proyecto:**

```http
GET /authors
→ Obtener lista de autores (seguro, idempotente)

GET /authors/1
→ Obtener autor con ID 1 (seguro, idempotente)

POST /authors
Body: {"name": "Isabel Allende", "country": "Chile"}
→ Crear nuevo autor (NO idempotente: cada vez crea uno nuevo)

PUT /authors/1
Body: {"name": "Gabriel García Márquez", "country": "Colombia", ...}
→ Actualizar autor 1 completo (idempotente: siempre queda igual)

PATCH /authors/1
Body: {"email": "nuevo@email.com"}
→ Actualizar solo email del autor 1

DELETE /authors/1
→ Eliminar autor 1 (idempotente: eliminarlo 2 veces = eliminarlo 1 vez)
```

---

#### 5️⃣ **Uso de Formatos Estándar**

REST utiliza formatos de datos estándar para intercambiar información:

**JSON (JavaScript Object Notation)** - Más común
```json
{
  "id": 1,
  "name": "Gabriel García Márquez",
  "country": "Colombia",
  "books": [
    {"id": 1, "title": "Cien años de soledad"},
    {"id": 2, "title": "El amor en los tiempos del cólera"}
  ]
}
```

**XML (eXtensible Markup Language)** - Menos común actualmente
```xml
<author>
  <id>1</id>
  <name>Gabriel García Márquez</name>
  <country>Colombia</country>
</author>
```

**Nuestro proyecto usa JSON** porque:
- Más ligero (menos bytes)
- Más fácil de parsear en JavaScript
- Más legible para humanos
- Estándar de facto en APIs modernas

---

#### 6️⃣ **Códigos de Estado HTTP**

REST usa códigos HTTP estándar para comunicar el resultado de las operaciones:

**Códigos 2xx - Éxito:**
- **200 OK:** Petición exitosa (GET, PUT, PATCH)
- **201 Created:** Recurso creado exitosamente (POST)
- **204 No Content:** Exitoso pero sin contenido en respuesta (DELETE)

**Códigos 4xx - Errores del cliente:**
- **400 Bad Request:** Datos inválidos en la petición
- **401 Unauthorized:** No autenticado (falta token)
- **403 Forbidden:** Autenticado pero sin permisos
- **404 Not Found:** Recurso no encontrado
- **409 Conflict:** Conflicto (ej: email duplicado)

**Códigos 5xx - Errores del servidor:**
- **500 Internal Server Error:** Error no manejado en el servidor
- **503 Service Unavailable:** Servidor no disponible

**Ejemplos en nuestro proyecto:**
```http
GET /authors/999
→ 404 Not Found (autor no existe)

POST /authors
Body: {"country": "Colombia"}  # Falta "name" requerido
→ 400 Bad Request

POST /authors
Body: {"name": "Gabo", "country": "Colombia"}
→ 201 Created

DELETE /authors/1
→ 204 No Content (eliminado, sin respuesta body)
```

---

## 🏗️ Parte 2: Diseño de Endpoints RESTful

### Modelo de Datos: Biblioteca

Nuestro proyecto implementa una **relación 1 a muchos (1:N)**:

```
┌─────────────┐        1        ┌─────────────┐
│   AUTOR     │◄────────────────│    LIBRO    │
│             │     escribe     │             │
│ - id        │                 │ - id        │
│ - name      │                 │ - title     │
│ - biography │        N        │ - isbn      │
│ - country   │◄────────────────│ - authorId  │
│ - email     │                 │ - price     │
└─────────────┘                 └─────────────┘
    1 autor                         muchos libros
```

**Relación:**
- 1 Autor puede tener **MUCHOS** Libros (0, 1, 2, 3, ... N libros)
- 1 Libro pertenece a **UN SOLO** Autor

**Ejemplos reales:**
- Gabriel García Márquez → Cien años de soledad, El amor en los tiempos del cólera, etc.
- Isabel Allende → La casa de los espíritus, Paula, etc.

---

### Endpoints de Autores

#### 📖 Colección de Autores

**1. GET /authors - Obtener todos los autores**
```http
GET /authors?country=Colombia&limit=10

Response 200 OK:
[
  {
    "id": 1,
    "name": "Gabriel García Márquez",
    "biography": "Escritor colombiano...",
    "birthDate": "1927-03-06",
    "country": "Colombia",
    "email": "gabo@example.com"
  },
  {
    "id": 2,
    "name": "Álvaro Mutis",
    "country": "Colombia",
    ...
  }
]
```

**Query Parameters:**
- `country`: Filtrar por país
- `limit`: Limitar número de resultados (paginación)

**Uso:** Mostrar lista de autores en la UI, llenar selects, etc.

---

**2. POST /authors - Crear nuevo autor**
```http
POST /authors
Content-Type: application/json

Body:
{
  "name": "Gabriel García Márquez",
  "biography": "Escritor colombiano, premio Nobel 1982",
  "birthDate": "1927-03-06",
  "country": "Colombia",
  "email": "gabo@example.com",
  "website": "https://gabrielgarciamarquez.com"
}

Response 201 Created:
{
  "id": 1,  ← ID generado por el servidor
  "name": "Gabriel García Márquez",
  "biography": "Escritor colombiano, premio Nobel 1982",
  "birthDate": "1927-03-06",
  "country": "Colombia",
  "email": "gabo@example.com",
  "website": "https://gabrielgarciamarquez.com"
}
```

**Campos requeridos:** `name`, `country`  
**Campos opcionales:** `biography`, `birthDate`, `email`, `website`

---

#### 📖 Recurso Individual de Autor

**3. GET /authors/{id} - Obtener un autor específico**
```http
GET /authors/1

Response 200 OK:
{
  "id": 1,
  "name": "Gabriel García Márquez",
  "biography": "Escritor colombiano...",
  "country": "Colombia",
  ...
}

Response 404 Not Found:
{
  "code": 404,
  "message": "Autor con ID 1 no encontrado"
}
```

**Uso:** Mostrar perfil del autor, editar formulario, etc.

---

**4. PUT /authors/{id} - Actualizar autor completo**
```http
PUT /authors/1
Content-Type: application/json

Body (TODOS los campos):
{
  "name": "Gabriel García Márquez",
  "biography": "Escritor colombiano, premio Nobel 1982. Autor de Cien años de soledad.",
  "birthDate": "1927-03-06",
  "country": "Colombia",
  "email": "gabo@example.com",
  "website": "https://gabrielgarciamarquez.com"
}

Response 200 OK:
{
  "id": 1,
  "name": "Gabriel García Márquez",
  "biography": "Escritor colombiano, premio Nobel 1982. Autor de Cien años de soledad.",
  ...
}
```

**PUT requiere objeto completo:** Todos los campos deben enviarse, incluso los que no cambian.

---

**5. PATCH /authors/{id} - Actualizar parcialmente**
```http
PATCH /authors/1
Content-Type: application/json

Body (SOLO campos a actualizar):
{
  "biography": "Escritor colombiano, premio Nobel 1982. Creador del realismo mágico.",
  "email": "nuevo@email.com"
}

Response 200 OK:
{
  "id": 1,
  "name": "Gabriel García Márquez",  ← No cambió
  "biography": "Escritor colombiano, premio Nobel 1982. Creador del realismo mágico.",  ← Actualizado
  "country": "Colombia",  ← No cambió
  "email": "nuevo@email.com",  ← Actualizado
  ...
}
```

**PATCH permite actualizar solo algunos campos:** Más flexible que PUT.

**Diferencia PUT vs PATCH:**
```
PUT:
✅ Reemplaza TODO el recurso
❌ Requiere enviar todos los campos
✅ Idempotente

PATCH:
✅ Actualiza SOLO campos específicos
✅ Más eficiente (menos datos)
❌ Menos predecible (puede no ser idempotente)
```

---

**6. DELETE /authors/{id} - Eliminar autor**
```http
DELETE /authors/1

Response 204 No Content
(sin body)

Response 404 Not Found:
{
  "code": 404,
  "message": "Autor con ID 1 no encontrado"
}

Response 409 Conflict:
{
  "code": 409,
  "message": "No se puede eliminar el autor porque tiene 5 libros asociados"
}
```

**⚠️ Consideraciones:**
- Decisión de diseño: ¿Qué pasa con los libros del autor eliminado?
  - **Opción A:** Eliminarlos también (CASCADE DELETE)
  - **Opción B:** Retornar error 409 Conflict
  - **Opción C:** Dejar libros "huérfanos" (authorId = null)

---

### Endpoints de Libros

#### 📚 Colección de Libros

**7. GET /books - Obtener todos los libros**
```http
GET /books?genre=Ficción&language=Español&minPrice=10&maxPrice=50&limit=20

Response 200 OK:
[
  {
    "id": 1,
    "title": "Cien años de soledad",
    "isbn": "978-0307474728",
    "publishedYear": 1967,
    "genre": "Ficción",
    "pages": 417,
    "language": "Español",
    "price": 25.99,
    "description": "La obra maestra de Gabriel García Márquez...",
    "authorId": 1
  },
  {
    "id": 2,
    "title": "El amor en los tiempos del cólera",
    "isbn": "978-0307389732",
    "publishedYear": 1985,
    "genre": "Romance",
    "pages": 368,
    "language": "Español",
    "price": 22.50,
    "authorId": 1
  }
]
```

**Query Parameters:**
- `genre`: Filtrar por género literario
- `language`: Filtrar por idioma
- `minPrice`, `maxPrice`: Rango de precios
- `limit`: Limitar resultados

---

**8. POST /books - Crear nuevo libro**
```http
POST /books
Content-Type: application/json

Body:
{
  "title": "Cien años de soledad",
  "isbn": "978-0307474728",
  "publishedYear": 1967,
  "genre": "Ficción",
  "pages": 417,
  "language": "Español",
  "price": 25.99,
  "description": "La obra maestra de García Márquez...",
  "authorId": 1  ← ⚠️ RELACIÓN: ID del autor existente
}

Response 201 Created:
{
  "id": 1,  ← ID generado
  "title": "Cien años de soledad",
  ...
  "authorId": 1
}

Response 404 Not Found (si authorId no existe):
{
  "code": 404,
  "message": "El autor con ID 1 no existe"
}
```

**Campos requeridos:** `title`, `authorId`  
**Validación importante:** `authorId` debe existir en la tabla de autores.

---

**9-12. GET, PUT, PATCH, DELETE /books/{id}**

Funcionan de manera análoga a los endpoints de autores:
- **GET /books/{id}:** Obtener un libro
- **PUT /books/{id}:** Actualizar libro completo
- **PATCH /books/{id}:** Actualizar parcialmente
- **DELETE /books/{id}:** Eliminar libro

---

### Endpoints de Relaciones (1:N)

#### 🔗 Obtener libros de un autor

**13. GET /authors/{id}/books - Relación principal 1:N**
```http
GET /authors/1/books?genre=Ficción

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

**Este es el endpoint más importante de la relación 1:N:**
- Retorna información del autor
- Retorna array de todos sus libros
- Cuenta total de libros
- Permite filtrar por género

**Uso:** Mostrar perfil del autor con su bibliografía completa.

---

#### 🔗 Obtener autor de un libro

**14. GET /books/{id}/author - Relación inversa**
```http
GET /books/1/author

Response 200 OK:
{
  "book": {
    "id": 1,
    "title": "Cien años de soledad",
    "publishedYear": 1967
  },
  "author": {
    "id": 1,
    "name": "Gabriel García Márquez",
    "country": "Colombia",
    "biography": "Escritor colombiano, premio Nobel..."
  }
}
```

**Uso:** Mostrar información del autor en la página de detalle de un libro.

---

## 📊 Parte 3: Comparación de Alternativas de Diseño

### Opción 1: Endpoints Anidados (Elegida)
```
GET /authors/{id}/books
```
✅ Clara relación jerárquica  
✅ Intuitivo: "libros DEL autor"  
❌ URLs más largas  

### Opción 2: Query Parameters
```
GET /books?authorId=1
```
✅ URL más corta  
✅ Reutiliza endpoint existente  
❌ Menos semántico  
❌ No incluye info del autor  

### Opción 3: Incluir Relaciones en GET Individual
```
GET /authors/1?include=books
```
✅ Flexible  
✅ Reduce número de peticiones  
❌ Respuestas pesadas  
❌ Más complejo de implementar  

**Nuestra elección:** Opción 1 (endpoints anidados) por ser más RESTful y explícita.

---

## 🎯 Parte 4: Mejores Prácticas Aplicadas

### ✅ Nomenclatura Consistente
- Sustantivos en plural: `/authors`, `/books`
- Lowercase con guiones: `/book-categories` (si existiera)
- IDs numéricos en path: `/authors/1`

### ✅ Versionado de API
- URL con versión: `https://api.biblioteca.com/v1/authors`
- Facilita evolución sin romper clientes existentes

### ✅ Filtrado y Paginación
- Query params para filtros: `?genre=Ficción&language=Español`
- Límite de resultados: `?limit=20`
- (Futuro) Paginación: `?page=1&limit=20`

### ✅ Validaciones y Errores Claros
- Códigos HTTP apropiados (400, 404, 409)
- Mensajes de error descriptivos en JSON
- Validación de relaciones (authorId existe)

### ✅ Documentación Completa
- OpenAPI 3.0 (Swagger)
- Ejemplos en cada endpoint
- Descripciones detalladas
- Schemas reutilizables

---

## 📚 Conclusiones

### Ventajas de REST
1. **Simplicidad:** Usa HTTP estándar, fácil de entender
2. **Escalabilidad:** Stateless permite escalar horizontalmente
3. **Flexibilidad:** Múltiples formatos (JSON, XML)
4. **Cacheable:** Puede usar caché HTTP
5. **Independencia:** Cliente y servidor pueden evolucionar independientemente

### Cuando usar REST
✅ APIs públicas  
✅ CRUD simples  
✅ Aplicaciones web/móvil  
✅ Microservicios  

### Cuando NO usar REST
❌ Operaciones complejas que no mapean bien a CRUD  
❌ Necesitas operaciones en tiempo real (usar WebSockets)  
❌ Necesitas transacciones complejas  

---

**FIN DE LA TEORÍA**
