import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class NFT{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    tokenId: number

    @Column()
    name: string

    @Column()
    token_url: string

    @Column()
    image_url: string

    @Column()
    contract: string
    
    @Column()
    owner: string
}