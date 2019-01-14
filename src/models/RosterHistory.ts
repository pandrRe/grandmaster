import { Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToMany, Column } from "typeorm";
import { UserOnTournament } from "./UserOnTournament";
import { Round } from "./Round";
import { RoundHistory } from "./RoundHistory";
import { Roster } from "./Roster";

@Entity()
export class RosterHistory extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(type => Roster, player => player.previousPicks)
    player!: Roster;

    @ManyToOne(type => RoundHistory, roundHistory => roundHistory.roster)
    roundHistory!: RoundHistory;
}