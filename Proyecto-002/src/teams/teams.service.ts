import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from '../team.entity';
import { Player } from '../player.entity';

@Injectable()
export class TeamsService {
	constructor(
		@InjectRepository(Team)
		private teamRepository: Repository<Team>,
		@InjectRepository(Player)
		private playerRepository: Repository<Player>,
	) {}

	findAll(): Promise<Team[]> {
		return this.teamRepository.find();
	}

	findOne(id: number): Promise<Team | null> {
		return this.teamRepository.findOne({ where: { id } });
	}

	create(team: Partial<Team>): Promise<Team> {
		const newTeam = this.teamRepository.create(team);
		return this.teamRepository.save(newTeam);
	}

	update(id: number, team: Partial<Team>): Promise<Team> {
		return this.teamRepository.save({ ...team, id });
	}

	async remove(id: number): Promise<void> {
		await this.teamRepository.delete(id);
	}

	async findPlayersByTeamId(id: number): Promise<Player[]> {
		return this.playerRepository.find({ where: { team: { id } } });
	}
}
