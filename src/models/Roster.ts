import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, RelationId } from "typeorm";
import { Player } from "./Player";
import { TeamOnTournament } from "./TeamOnTournament";
import { RosterOnMatch } from "./RosterOnMatch";
import { RosterHistory } from "./RosterHistory";

export enum Roles {
    Top = "TOP",
    Jungle = "JG",
    Mid = "MID",
    Bot = "BOT",
    Support = "SUP",
}

@Entity()
export class Roster extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "double precision", default: 1})
    value!: number;

    @Column({
        type: "enum",
        enum: Roles,
    })
    role!: Roles;

    @ManyToOne(type => Player, player => player.participations)
    player!: Player;

    @ManyToOne(type => TeamOnTournament, team => team.roster)
    team!: TeamOnTournament;

    @OneToMany(type => RosterOnMatch, match => match.player)
    matches!: RosterOnMatch[];

    @OneToMany(type => RosterHistory, rosterHistory => rosterHistory.player)
    previousPicks!: RosterHistory[];
}