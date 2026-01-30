import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Team } from './team.entity';

@Entity()
export class Player {
	@ApiProperty({ example: 1 })
	@PrimaryGeneratedColumn()
	id: number;

	@ApiProperty({ example: 'Lionel Messi' })
	@Column()
	name: string;

	@ApiProperty({ example: 'Delantero' })
	@Column()
	position: string;

	@ApiProperty({ type: () => Team, description: 'Equipo al que pertenece' })
	@ManyToOne(() => Team, (team) => team.players, { onDelete: 'CASCADE' })
	team: Team;
}
