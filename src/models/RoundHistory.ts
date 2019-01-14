import { Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToMany, Column } from "typeorm";
import { UserOnTournament } from "./UserOnTournament";
import { Round } from "./Round";
import { RosterHistory } from "./RosterHistory";

@Entity()
export class RoundHistory extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "double precision"})
    score!: number;

    @ManyToOne(type => UserOnTournament, user => user.history)
    user!: UserOnTournament;

    @ManyToOne(type => Round, round => round.history)
    round!: Round;

    @OneToMany(type => RosterHistory, roster => roster.roundHistory)
    roster!: RosterHistory[];
}