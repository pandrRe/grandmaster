import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { TeamOnTournament } from "./TeamOnTournament";
import { UserOnTournament } from "./UserOnTournament";
import { Round } from "./Round";
import moment from "moment";

export type TournamentData = {
    name: string,
    shortening: string,
    startDate: string,
    finishDate: string,
    photoUrl: string,
}

@Entity()
export class Tournament extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({unique: true})
    name!: string;

    @Column({
        type: "varchar",
        length: 15,
        unique: true,
    })
    shortening!: string;

    @Column("date")
    startDate!: Date;

    @Column("date")
    finishDate!: Date;

    @Column()
    photoUrl!: string;

    @Column({type: "double precision", default: 100})
    startingBudget!: number;

    @OneToOne(type => Round)
    @JoinColumn()
    currentRound!: Round;

    @OneToMany(type => TeamOnTournament, teams => teams.tournament)
    teams!: TeamOnTournament[];

    @OneToMany(type => UserOnTournament, user => user.tournament)
    users!: UserOnTournament[];

    @OneToMany(type => Round, round => round.tournament)
    rounds!: Round[];

    public fromData(data: TournamentData) {
        this.name = data.name;
        this.shortening = data.shortening;
        this.startDate = moment(data.startDate, "YYYY-MM-DD").toDate();
        this.finishDate = moment(data.finishDate, "YYYY-MM-DD").toDate();
        this.photoUrl = data.photoUrl;
    }
}