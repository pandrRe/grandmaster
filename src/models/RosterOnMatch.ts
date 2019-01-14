import { Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToMany } from "typeorm";
import { Roster } from "./Roster";
import { Match } from "./Match";
import { Champion } from "./Champion";
import { RosterPerformance } from "./RosterPerformance";

@Entity()
export class RosterOnMatch extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(type => Roster, player => player.matches)
    player!: Roster;

    @ManyToOne(type => Match, match => match.players)
    match!: Match;

    @ManyToOne(type => Champion, champion => champion.matches)
    champion!: Champion;

    @OneToMany(type => RosterPerformance, performance => performance.player)
    performances!: RosterPerformance[];
}