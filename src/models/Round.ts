import { Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToMany, Column } from "typeorm";
import { Tournament } from "./Tournament";
import { Match } from "./Match";
import { RoundHistory } from "./RoundHistory";

@Entity()
export class Round extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column("date")
    date!: Date;

    @Column()
    started!: boolean;

    @Column()
    finished!: boolean;

    @ManyToOne(type => Tournament, tournament => tournament.rounds)
    tournament!: Tournament;

    @OneToMany(type => Match, match => match.round)
    matches!: Match[];

    @OneToMany(type => RoundHistory, history => history.round)
    history!: RoundHistory[];
}