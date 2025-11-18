# 📚 Documentación Swagger - JSONPlaceholder API Examen 1

**Curso:** Aplicaciones Web - EPN 2025  
**Estudiante:** Javier Guallichico  
**Fecha:** 17 de Noviembre de 2025

---

## 🎯 Objetivo del Taller

Documentar completamente los endpoints de la API REST de JSONPlaceholder usando OpenAPI 3.0 (Swagger), generando una interfaz interactiva para pruebas.

---

## 📦 Contenido

- **swagger.yaml** - Documentación completa de la API en formato OpenAPI 3.0

---

## 🚀 Cómo Usar

### Opción 1: Swagger Editor Online

1. Abre [Swagger Editor](https://editor.swagger.io/)
2. Borra el contenido por defecto
3. Copia y pega el contenido de `swagger.yaml`
4. La documentación se visualizará automáticamente en el panel derecho

### Opción 2: Swagger UI Local

```bash
# Instalar Swagger UI globalmente
npm install -g swagger-ui-watcher

# Ejecutar en esta carpeta
swagger-ui-watcher swagger.yaml
```

### Opción 3: VSCode con extensión

1. Instala la extensión "Swagger Viewer"
2. Abre `swagger.yaml`
3. Presiona `Shift + Alt + P` para previsualizar

---

## 📋 Endpoints Documentados

### 🔹 Posts (6 endpoints)
- `GET /posts` - Obtener todos los posts
- `POST /posts` - Crear un nuevo post
- `GET /posts/{id}` - Obtener un post específico
- `PUT /posts/{id}` - Actualizar un post completo
- `PATCH /posts/{id}` - Actualizar parcialmente un post
- `DELETE /posts/{id}` - Eliminar un post
- `GET /posts/{id}/comments` - Obtener comentarios de un post

### 💬 Comments (2 endpoints)
- `GET /comments` - Obtener todos los comentarios
- `GET /comments/{id}` - Obtener un comentario específico
- Query param: `?postId=1` para filtrar por post

### 📸 Albums (3 endpoints)
- `GET /albums` - Obtener todos los álbumes
- `GET /albums/{id}` - Obtener un álbum específico
- `GET /albums/{id}/photos` - Obtener fotos de un álbum
- Query param: `?userId=1` para filtrar por usuario

### 🖼️ Photos (2 endpoints)
- `GET /photos` - Obtener todas las fotos
- `GET /photos/{id}` - Obtener una foto específica
- Query param: `?albumId=1` para filtrar por álbum

### ✅ Todos (2 endpoints)
- `GET /todos` - Obtener todas las tareas
- `GET /todos/{id}` - Obtener una tarea específica
- Query param: `?userId=1` para filtrar por usuario

### 👤 Users (5 endpoints)
- `GET /users` - Obtener todos los usuarios
- `GET /users/{id}` - Obtener un usuario específico
- `GET /users/{id}/posts` - Obtener posts de un usuario
- `GET /users/{id}/albums` - Obtener álbumes de un usuario
- `GET /users/{id}/todos` - Obtener tareas de un usuario

**Total: 27 endpoints documentados**

---

## 🎨 Características Implementadas

### ✅ Información General
- Título y descripción de la API
- Versión (1.0.0)
- Información de contacto
- Licencia MIT
- Servidor de producción configurado

### ✅ Organización
- **6 Tags** para agrupar endpoints:
  - Posts
  - Comments
  - Albums
  - Photos
  - Todos
  - Users

### ✅ Documentación Detallada
- Descripción de cada endpoint
- Parámetros de path requeridos
- Parámetros de query opcionales
- Request body con ejemplos
- Respuestas HTTP con ejemplos
- Códigos de estado (200, 201, 404)

### ✅ Esquemas de Datos (Components)
- `Post` - Estructura de publicación
- `PostInput` - Datos para crear/actualizar post
- `Comment` - Estructura de comentario
- `Album` - Estructura de álbum
- `Photo` - Estructura de foto con URLs
- `Todo` - Estructura de tarea
- `User` - Estructura completa de usuario
- `Address` - Dirección del usuario
- `Geo` - Coordenadas geográficas
- `Company` - Información de compañía

### ✅ Ejemplos Incluidos
- Ejemplos de request body
- Ejemplos de response
- Valores por defecto
- Formatos especificados (email, uri)

### ✅ Validaciones
- Campos requeridos marcados
- Tipos de datos especificados
- Formatos de email y URI

---

## 🧪 Probar los Endpoints

Desde Swagger UI puedes:

1. **Ver la documentación** de cada endpoint
2. **Expandir un endpoint** haciendo clic en él
3. **Hacer clic en "Try it out"**
4. **Llenar los parámetros** requeridos
5. **Hacer clic en "Execute"**
6. **Ver la respuesta** real de la API

### Ejemplo de Prueba

**GET /posts/1**
1. Expande el endpoint `GET /posts/{id}`
2. Clic en "Try it out"
3. Ingresa `1` en el campo `id`
4. Clic en "Execute"
5. Verás la respuesta:

```json
{
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident",
  "body": "quia et suscipit..."
}
```

---

## 📖 Aprendizajes del Taller

### 1. **Estructura de OpenAPI 3.0**
- `openapi`: Versión de la especificación (3.0.0)
- `info`: Metadatos de la API
- `servers`: URLs de los servidores
- `tags`: Categorías de endpoints
- `paths`: Definición de endpoints
- `components`: Esquemas reutilizables

### 2. **Documentar Endpoints**
```yaml
paths:
  /posts:
    get:
      summary: Resumen breve
      description: Descripción detallada
      parameters: [...]
      responses: [...]
```

### 3. **Parámetros**
- **Path parameters** (requeridos): `/posts/{id}`
- **Query parameters** (opcionales): `?userId=1`
- **Request body**: Para POST, PUT, PATCH

### 4. **Respuestas**
```yaml
responses:
  '200':
    description: Éxito
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/Post'
```

### 5. **Esquemas Reutilizables**
```yaml
components:
  schemas:
    Post:
      type: object
      properties:
        id:
          type: integer
        title:
          type: string
```

### 6. **Referencias ($ref)**
Evitan duplicación de código:
```yaml
$ref: '#/components/schemas/Post'
```

---

## 🎯 Diferencias con Bruno

| Aspecto | Bruno | Swagger |
|---------|-------|---------|
| **Propósito** | Testing de APIs | Documentación de APIs |
| **Archivo** | `.bru` (formato propio) | `.yaml` o `.json` (estándar) |
| **Ejecución** | Cliente de escritorio | Visualización web |
| **Tests** | Código JavaScript | No ejecuta tests |
| **Documentación** | No genera docs | Genera UI interactiva |
| **Colaboración** | Individual | Compartible (URL) |
| **Ejemplos** | Responses guardados | Ejemplos en YAML |

**Conclusión:** Bruno es para **probar**, Swagger es para **documentar**.

---

## 💡 Mejores Prácticas Aplicadas

1. ✅ **Usar tags** para organizar endpoints
2. ✅ **Incluir descripciones** claras y concisas
3. ✅ **Definir esquemas reutilizables** en `components`
4. ✅ **Usar `$ref`** para evitar duplicación
5. ✅ **Incluir ejemplos** en requests y responses
6. ✅ **Especificar códigos HTTP** correctos
7. ✅ **Marcar campos requeridos** con `required`
8. ✅ **Definir formatos** (email, uri, date)
9. ✅ **Documentar parámetros** con descripciones
10. ✅ **Incluir metadatos** (autor, licencia, contacto)

---

## 🔗 Enlaces Útiles

- **JSONPlaceholder:** https://jsonplaceholder.typicode.com/
- **Swagger Editor:** https://editor.swagger.io/
- **OpenAPI Spec:** https://swagger.io/specification/
- **Swagger UI:** https://swagger.io/tools/swagger-ui/

---

## 📊 Resumen de Completitud

- ✅ **27 endpoints** completamente documentados
- ✅ **10 esquemas** de datos definidos
- ✅ **6 categorías** organizadas con tags
- ✅ **Ejemplos** en todos los endpoints principales
- ✅ **Parámetros** documentados con tipos y descripciones
- ✅ **Respuestas HTTP** con códigos de estado
- ✅ **Metadata completa** (info, contacto, licencia)

---

**¡Documentación Swagger lista para usar!** 🎉

Copia el contenido de `swagger.yaml` en https://editor.swagger.io/ y explora la API interactivamente.
