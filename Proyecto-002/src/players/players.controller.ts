import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PlayersService } from './players.service';
import { Player } from '../player.entity';

@ApiTags('players')
@Controller('players')
export class PlayersController {
	constructor(private readonly playersService: PlayersService) {}

	@Get()
	@ApiOperation({ summary: 'Obtener todos los jugadores' })
	@ApiResponse({ status: 200, description: 'Lista de jugadores' })
	findAll(): Promise<Player[]> {
		return this.playersService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Obtener jugador por ID' })
	@ApiResponse({ status: 200, description: 'Jugador encontrado' })
	findOne(@Param('id') id: string): Promise<Player | null> {
		return this.playersService.findOne(Number(id));
	}

	@Post()
	@ApiOperation({ summary: 'Crear jugador' })
	@ApiResponse({ status: 201, description: 'Jugador creado' })
	create(@Body() player: Partial<Player>): Promise<Player> {
		return this.playersService.create(player);
	}

	@Put(':id')
	@ApiOperation({ summary: 'Actualizar jugador' })
	@ApiResponse({ status: 200, description: 'Jugador actualizado' })
	update(@Param('id') id: string, @Body() player: Partial<Player>): Promise<Player> {
		return this.playersService.update(Number(id), player);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Eliminar jugador' })
	@ApiResponse({ status: 204, description: 'Jugador eliminado' })
	remove(@Param('id') id: string): Promise<void> {
		return this.playersService.remove(Number(id));
	}
}
