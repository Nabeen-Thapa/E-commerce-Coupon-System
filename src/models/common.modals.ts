import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export class commonModel{
    @PrimaryGeneratedColumn()
    id!:number;

   @CreateDateColumn()
    createdAt!:Date;

   @UpdateDateColumn()
   updateAt!:Date;
}