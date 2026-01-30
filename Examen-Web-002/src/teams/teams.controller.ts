import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { Team } from '../team.entity';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  findAll(): Promise<Team[]> {
    return this.teamsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Team | null> {
    return this.teamsService.findOne(Number(id));
  }

  @Post()
  create(@Body() team: Partial<Team>): Promise<Team> {
    return this.teamsService.create(team);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() team: Partial<Team>): Promise<Team> {
    return this.teamsService.update(Number(id), team);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.teamsService.remove(Number(id));
  }

  @Get(':id/players')
  findPlayers(@Param('id') id: string) {
    return this.teamsService.findPlayersByTeamId(Number(id));
  }
}
