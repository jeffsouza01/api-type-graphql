import { Field, ID, ObjectType, Root } from "type-graphql";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@ObjectType()
@Entity("users")
class User extends BaseEntity{

    @PrimaryGeneratedColumn("increment")
    @Field(() => ID)
    id: number;

    @Column()
    @Field()
    firstName: string;

    @Column()
    @Field()
    lastName: string;

    @Column('text', { unique: true })
    @Field()
    email: string;

    @Column()
    @Field()
    password: string;

    @Field()
    completeName(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`
  }
}


export { User }