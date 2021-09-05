import { User } from "../database/entities/User";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { compare } from "bcryptjs";
import { MyContext } from "../types/MyContext";

@Resolver()
class LoginResolver {

  @Mutation(()=> User, {nullable: true})
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    
    const user = await User.findOne({where: {email}});

    if(!user) {
      throw new Error("Incorrect User or Password");
    }

    const checkPassword = await compare(password, user.password);

    if(!checkPassword) {
      throw new Error("Incorrect User or Password");
    }
    
    ctx.req.session!.userId = user.id;
    
    console.log(ctx.req.session.userId);
    return user;

  }
}

export { LoginResolver }