import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, RelationId, Unique } from "typeorm";
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
@Unique(["player", "team"])
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

    @ManyToOne(type => Player, player => player.participations, {
        eager: true,
    })
    player!: Player;

    @ManyToOne(type => TeamOnTournament, team => team.roster)
    team!: TeamOnTournament;

    @OneToMany(type => RosterOnMatch, match => match.player)
    matches!: RosterOnMatch[];

    @OneToMany(type => RosterHistory, rosterHistory => rosterHistory.player)
    previousPicks!: RosterHistory[];
}