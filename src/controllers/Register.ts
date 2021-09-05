import { User } from "../database/entities/User";
import { Arg, Mutation, Resolver, Query, UseMiddleware } from "type-graphql";
import { newUserInput } from "./inputs/NewUserInput";
import { hash } from "bcryptjs";
import { isAuth } from "../middleware/ensureAuthenticated";

@Resolver()
class RegisterResolver {

  @Query(()=> [User])
  @UseMiddleware(isAuth)
  async showUsers():Promise<User[]> {
    const users = await User.find();

    return users;
  }

  @Mutation(()=> User)
  async register(
    @Arg("data") { firstName, lastName, email, password }: newUserInput
  ): Promise<User> {
    const hashedPassword = await hash(password, 8);

    const newUser = User.create({
      firstName, 
      lastName, 
      email, 
      password: hashedPassword
    })
    
    await User.save(newUser);

    return newUser;

  }
}

export { RegisterResolver }