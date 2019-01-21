import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { RosterPerformance } from "./RosterPerformance";

@Entity()
export class PerformanceParameter extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({type: "double precision"})
    value!: number;

    @Column()
    unique!: boolean;

    @OneToMany(type => RosterPerformance, ocurrence => ocurrence.parameter)
    ocurrences!: RosterPerformance[];
}