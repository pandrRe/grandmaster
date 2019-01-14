import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne } from "typeorm";
import { PerformanceParameter } from "./PerformanceParameter";
import { RosterOnMatch } from "./RosterOnMatch";

@Entity()
export class RosterPerformance extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    amount!: number;

    @ManyToOne(type => PerformanceParameter, parameter => parameter.ocurrences)
    parameter!: PerformanceParameter;

    @ManyToOne(type => RosterOnMatch, player => player.performances)
    player!: RosterOnMatch;
}