import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeamsController } from './teams/teams.controller';
import { TeamsService } from './teams/teams.service';
import { PlayersController } from './players/players.controller';
import { PlayersService } from './players/players.service';
import { Team } from './team.entity';
import { Player } from './player.entity';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'sqlite',
			database: 'examen.sqlite',
			entities: [Team, Player],
			synchronize: true,
		}),
		TypeOrmModule.forFeature([Team, Player]),
	],
	controllers: [AppController, TeamsController, PlayersController],
	providers: [AppService, TeamsService, PlayersService],
})
export class AppModule {}
