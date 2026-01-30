# Proyecto 001 – Documentación de Endpoints con Swagger

Este proyecto muestra cómo documentar automáticamente los endpoints RESTful de una API NestJS usando Swagger (OpenAPI), TypeORM y SQLite.

---

## 🚀 Instalación rápida

1. Clona el repositorio y entra a la carpeta `Proyecto-002`.
2. Instala las dependencias:
   ```bash
   npm install
   npm install @nestjs/swagger swagger-ui-express
   ```

---

## ▶️ Ejecución del servidor

```bash
npm run start:dev
```

---

## 📑 Acceso a la documentación Swagger

Abre en tu navegador:

[http://localhost:3000/api](http://localhost:3000/api)

---

## 📚 Endpoints documentados

### Teams
- `GET /teams` — Lista todos los equipos
- `GET /teams/:id` — Obtiene un equipo por ID
- `POST /teams` — Crea un nuevo equipo
- `PUT /teams/:id` — Actualiza un equipo
- `DELETE /teams/:id` — Elimina un equipo
- `GET /teams/:id/players` — Lista los jugadores de un equipo

### Players
- `GET /players` — Lista todos los jugadores
- `GET /players/:id` — Obtiene un jugador por ID
- `POST /players` — Crea un nuevo jugador
- `PUT /players/:id` — Actualiza un jugador
- `DELETE /players/:id` — Elimina un jugador

---

## 🛠️ Ejemplo de decoradores Swagger

### DTO
```typescript
import { ApiProperty } from '@nestjs/swagger';
export class CreateTeamDto {
  @ApiProperty({ example: 'Barcelona FC' })
  name: string;
  @ApiProperty({ example: 'España' })
  country: string;
}
```

### Controlador
```typescript
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
@ApiTags('teams')
@Controller('teams')
export class TeamsController {
  @Get()
  @ApiOperation({ summary: 'Obtener todos los equipos' })
  @ApiResponse({ status: 200, description: 'Lista de equipos' })
  findAll() {
    return this.teamsService.findAll();
  }
}
```

---

## ℹ️ Notas y recomendaciones
- Swagger está disponible en [http://localhost:3000/api](http://localhost:3000/api)
- Todos los endpoints principales están documentados con decoradores de `@nestjs/swagger`.

---

## ✅ Criterios de evaluación
- Proyecto correctamente subido al repositorio.
- Swagger instalado y configurado en `main.ts`.
- Endpoints documentados con decoradores (`@ApiTags`, `@ApiOperation`, `@ApiResponse`).
- DTOs documentados con `@ApiProperty`.
- Documentación accesible en `/api`.
- README claro y completo.
import { ApiProperty } from '@nestjs/swagger';
export class CreateTeamDto {
  @ApiProperty({ example: 'Barcelona FC' })
  name: string;
  @ApiProperty({ example: 'España' })
  country: string;
}
```

```typescript
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
@ApiTags('teams')
@Controller('teams')
export class TeamsController {
  @Get()
  @ApiOperation({ summary: 'Obtener todos los equipos' })
  @ApiResponse({ status: 200, description: 'Lista de equipos' })
  findAll() {
    return this.teamsService.findAll();
  }
}
```

## Notas
- Swagger está disponible en [http://localhost:3000/api](http://localhost:3000/api)
- Todos los endpoints principales están documentados con decoradores de @nestjs/swagger.
```typescript
import { ApiProperty } from '@nestjs/swagger';
export class CreateTeamDto {
  @ApiProperty({ example: 'Barcelona FC' })
  name: string;
  @ApiProperty({ example: 'España' })
  country: string;
}
```

```typescript
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
@ApiTags('teams')
@Controller('teams')
export class TeamsController {
  @Get()
  @ApiOperation({ summary: 'Obtener todos los equipos' })
  @ApiResponse({ status: 200, description: 'Lista de equipos' })
  findAll() {
    return this.teamsService.findAll();
  }
}
```
