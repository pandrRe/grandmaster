import { Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToMany, Column } from "typeorm";
import { Tournament } from "./Tournament";
import { Match } from "./Match";
import { RoundHistory } from "./RoundHistory";
import moment = require("moment");

export type RoundData = {
    name: string,
    date: string,
};

@Entity()
export class Round extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column("date")
    date!: Date;

    @Column({default: false})
    started!: boolean;

    @Column({default: false})
    finished!: boolean;

    @ManyToOne(type => Tournament, tournament => tournament.rounds)
    tournament!: Tournament;

    @OneToMany(type => Match, match => match.round)
    matches!: Match[];

    @OneToMany(type => RoundHistory, history => history.round)
    history!: RoundHistory[];

    public fromData(data: RoundData) {
        this.name = data.name;
        this.date = moment(data.date, "YYYY-MM-DD").toDate();
    }
}