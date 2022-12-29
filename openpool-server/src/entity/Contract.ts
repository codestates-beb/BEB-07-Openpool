import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Contract{
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    address : string

    @Column()
    asset_contract_type : number

    @Column()
    name : string

    @Column()
    description : string

    @Column()
    schema_name : string

    @Column()
    external_link : string

    @Column()
    owner : string
}