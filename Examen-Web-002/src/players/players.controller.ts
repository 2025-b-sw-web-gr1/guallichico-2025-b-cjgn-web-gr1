import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PlayersService } from './players.service';
import { Player } from '../player.entity';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  findAll(): Promise<Player[]> {
    return this.playersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Player | null> {
    return this.playersService.findOne(Number(id));
  }

  @Post()
  create(@Body() player: Partial<Player>): Promise<Player> {
    return this.playersService.create(player);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() player: Partial<Player>): Promise<Player> {
    return this.playersService.update(Number(id), player);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.playersService.remove(Number(id));
  }
}
