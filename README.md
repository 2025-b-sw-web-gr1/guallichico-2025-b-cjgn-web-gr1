
# Examen Web 001 - API RESTful con NestJS

Este proyecto corresponde al examen práctico de desarrollo web. Implementa una API RESTful usando NestJS, TypeORM y SQLite, con relación 1 a muchos entre equipos y jugadores.

## Estructura del proyecto

- **src/team.entity.ts**: Entidad Team (id, name, country)
- **src/player.entity.ts**: Entidad Player (id, name, position, teamId)
- **src/teams/**: Controlador y servicio para equipos
- **src/players/**: Controlador y servicio para jugadores
- **app.module.ts**: Configuración de TypeORM y módulos

## Instalación y ejecución

1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Ejecuta el servidor en modo desarrollo:
   ```bash
   npm run start:dev
   ```
   El servidor estará disponible en `http://localhost:3000`

## Endpoints RESTful

### Equipos (Teams)
- `GET /teams` — Listar todos los equipos
- `GET /teams/:id` — Obtener un equipo por ID
- `POST /teams` — Crear un equipo
- `PUT /teams/:id` — Actualizar un equipo
- `DELETE /teams/:id` — Eliminar un equipo
- `GET /teams/:id/players` — Listar jugadores de un equipo

### Jugadores (Players)
- `GET /players` — Listar todos los jugadores
- `GET /players/:id` — Obtener un jugador por ID
- `POST /players` — Crear un jugador
- `PUT /players/:id` — Actualizar un jugador
- `DELETE /players/:id` — Eliminar un jugador

## Ejemplos de uso (curl)

```bash
# Crear un equipo
curl -X POST http://localhost:3000/teams -H "Content-Type: application/json" -d '{"name":"Barcelona","country":"España"}'

# Crear un jugador (asociado al equipo 1)
curl -X POST http://localhost:3000/players -H "Content-Type: application/json" -d '{"name":"Messi","position":"Delantero","team":1}'

# Listar equipos
curl http://localhost:3000/teams

# Listar jugadores de un equipo
curl http://localhost:3000/teams/1/players
```

## Criterios de evaluación

- Proyecto correctamente subido al repositorio.
- Conexión a SQLite funcionando.
- Entidades y relación 1 a muchos bien definidas.
- Endpoints RESTful implementados y funcionales.
- README claro, con instrucciones y ejemplos.

---
**Recuerda:** Puedes modificar los ejemplos según los datos de tu base. Si tienes dudas, consulta con tu docente.
