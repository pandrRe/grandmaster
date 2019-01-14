import { Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToMany, Column } from "typeorm";
import { TeamOnTournament } from "./TeamOnTournament";
import { Round } from "./Round";
import { RosterOnMatch } from "./RosterOnMatch";

export enum Sides {
    BLUE = "blue",
    RED = "red",
}

@Entity()
export class Match extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(type => TeamOnTournament, team => team.bluesideGames)
    blueTeam!: TeamOnTournament;

    @ManyToOne(type => TeamOnTournament, team => team.redsideGames)
    redTeam!: TeamOnTournament;

    @Column({
        type: "enum",
        enum: Sides,
    })
    winner!: Sides;

    @ManyToOne(type => Round, round => round.matches)
    round!: Round;

    @OneToMany(type => RosterOnMatch, player => player.match)
    players!: RosterOnMatch[];
}