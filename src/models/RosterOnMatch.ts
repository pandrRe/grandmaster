import { Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToMany } from "typeorm";
import { Roster } from "./Roster";
import { Champion } from "./Champion";
import { RosterPerformance } from "./RosterPerformance";
import { TeamOnMatch } from "./TeamOnMatch";

@Entity()
export class RosterOnMatch extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(type => Roster, player => player.matches, {
        eager: true,
    })
    player!: Roster;

    @ManyToOne(type => TeamOnMatch, teamOnMatch => teamOnMatch.roster)
    teamOnMatch!: TeamOnMatch;

    @ManyToOne(type => Champion, champion => champion.matches, {
        nullable: true, eager: true,
    })
    champion!: Champion;

    @OneToMany(type => RosterPerformance, performance => performance.player)
    performances!: RosterPerformance[];
}