import { Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToMany, Column, OneToOne, JoinColumn, Unique } from "typeorm";
import { Round } from "./Round";
import { TeamOnMatch } from "./TeamOnMatch";

@Entity()
export class Match extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: true })
    duration!: string;

    @Column({ default: false })
    finished!: boolean;

    @OneToOne(type => TeamOnMatch)
    @JoinColumn()
    blueTeam!: TeamOnMatch;

    @OneToOne(type => TeamOnMatch)
    @JoinColumn()
    redTeam!: TeamOnMatch;

    @ManyToOne(type => Round, round => round.matches)
    round!: Round;
}