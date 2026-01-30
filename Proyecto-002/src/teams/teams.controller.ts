import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TeamsService } from './teams.service';
import { Team } from '../team.entity';

@ApiTags('teams')
@Controller('teams')
export class TeamsController {
	constructor(private readonly teamsService: TeamsService) {}

	@Get()
	@ApiOperation({ summary: 'Obtener todos los equipos' })
	@ApiResponse({ status: 200, description: 'Lista de equipos' })
	findAll(): Promise<Team[]> {
		return this.teamsService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Obtener equipo por ID' })
	@ApiResponse({ status: 200, description: 'Equipo encontrado' })
	findOne(@Param('id') id: string): Promise<Team | null> {
		return this.teamsService.findOne(Number(id));
	}

	@Post()
	@ApiOperation({ summary: 'Crear equipo' })
	@ApiResponse({ status: 201, description: 'Equipo creado' })
	create(@Body() team: Partial<Team>): Promise<Team> {
		return this.teamsService.create(team);
	}

	@Put(':id')
	@ApiOperation({ summary: 'Actualizar equipo' })
	@ApiResponse({ status: 200, description: 'Equipo actualizado' })
	update(@Param('id') id: string, @Body() team: Partial<Team>): Promise<Team> {
		return this.teamsService.update(Number(id), team);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Eliminar equipo' })
	@ApiResponse({ status: 204, description: 'Equipo eliminado' })
	remove(@Param('id') id: string): Promise<void> {
		return this.teamsService.remove(Number(id));
	}

	@Get(':id/players')
	@ApiOperation({ summary: 'Obtener jugadores de un equipo' })
	@ApiResponse({ status: 200, description: 'Lista de jugadores del equipo' })
	findPlayers(@Param('id') id: string) {
		return this.teamsService.findPlayersByTeamId(Number(id));
	}
}
