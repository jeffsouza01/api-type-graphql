import { IsEmail, Length, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsEmailAlreadyExists } from "../validator/isEmailAlreadyExists";

@InputType()
class newUserInput {
    @Field()
    @Length(2,50)
    firstName: string;

    @Field()
    @Length(2,50)
    lastName: string;

    @Field({nullable: false})
    @IsEmail()
    @IsEmailAlreadyExists({message: "Email Already exists"})
    email: string;

    @Field({nullable: false})
    @MinLength(8)
    password: string;
}

export { newUserInput }