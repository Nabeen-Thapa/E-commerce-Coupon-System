import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class commonModel{
    @PrimaryGeneratedColumn()
    id!:number;

   @CreateDateColumn()
    createdAt?:Date;

   @UpdateDateColumn()
   updateAt?:Date;
}