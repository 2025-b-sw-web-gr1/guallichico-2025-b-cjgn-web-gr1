import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../player.entity';
import { Team } from '../team.entity';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
  ) {}

  findAll(): Promise<Player[]> {
    return this.playerRepository.find({ relations: ['team'] });
  }

  findOne(id: number): Promise<Player | null> {
    return this.playerRepository.findOne({ where: { id }, relations: ['team'] });
  }

  create(player: Partial<Player>): Promise<Player> {
    const newPlayer = this.playerRepository.create(player);
    return this.playerRepository.save(newPlayer);
  }

  update(id: number, player: Partial<Player>): Promise<Player> {
    return this.playerRepository.save({ ...player, id });
  }

  async remove(id: number): Promise<void> {
    await this.playerRepository.delete(id);
  }
}
