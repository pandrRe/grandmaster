import { Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToMany, Column } from "typeorm";
import { Round } from "./Round";
import { RosterOnMatch } from "./RosterOnMatch";
import { TeamOnMatch } from "./TeamOnMatch";

@Entity()
export class Match extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(type => Round, round => round.matches)
    round!: Round;

    @OneToMany(type => TeamOnMatch, team => team.match)
    teams!: TeamOnMatch[];

    @OneToMany(type => RosterOnMatch, player => player.match)
    players!: RosterOnMatch[];
}