import { Column, Entity } from "typeorm";
import { commonModel } from "./common.modals";

@Entity()
export class User extends commonModel{
    @Column()
    Name!: string;

    @Column()
    Email!:string;

    @Column()
    password!: string
}