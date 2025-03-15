import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

enum Roles{
    Admin,
    User
}


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    passwordHash: string

    
    @Column()
    title: string


    @Column()
    firstName: string


    @Column()
    lastName: string


    @Column({
        type: "enum",
        enum: Roles,
        default: Roles.User
    })
    role: Roles
}

