import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class NFT{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nft_contract_addr: string

    @Column()
    nft_id: number

    @Column()
    nft_name: string

    @Column()
    nft_descrition: string

    @Column()
    nft_tokenURI: string
    
    @Column()
    lastprice: number
}