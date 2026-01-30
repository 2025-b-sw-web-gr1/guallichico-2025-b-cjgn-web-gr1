import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Player } from './player.entity';

@Entity()
export class Team {
	@ApiProperty({ example: 1 })
	@PrimaryGeneratedColumn()
	id: number;

	@ApiProperty({ example: 'Barcelona FC' })
	@Column()
	name: string;

	@ApiProperty({ example: 'España' })
	@Column()
	country: string;

	@ApiProperty({ type: () => [Player], description: 'Jugadores del equipo' })
	@OneToMany(() => Player, (player) => player.team)
	players: Player[];
}
