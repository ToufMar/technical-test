import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn("uuid")
    uuid!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @Column("text")
    name!: string;

    @Column("int")
    price!: number;
}
