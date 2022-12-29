import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({unique:true})
    address: string

    @Column()
    name: string

    @Column()
    createdAt: Date
}