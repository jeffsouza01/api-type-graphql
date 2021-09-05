import { User } from "../database/entities/User";
import { MyContext } from "../types/MyContext";
import { Ctx, Query, Resolver } from "type-graphql";

@Resolver()
class MeResolver {

  @Query(()=> User, {nullable: true})
  async me(
    @Ctx() ctx: MyContext
  ): Promise<User> {
    if (!ctx.req.session.userId) {
      throw new Error("User not found")
    }

    return User.findOneOrFail(ctx.req.session.userId);
  }

}

export { MeResolver}