import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class NFT_ATTRIBUTE{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nft_id: number

    @Column()
    trait_type: string

    @Column()
    value: string
}