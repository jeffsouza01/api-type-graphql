import { RegisterResolver } from "../controllers/Register";
import { LoginResolver } from "../controllers/Login";
import { buildSchemaSync } from "type-graphql";
import { MeResolver } from "../controllers/Me";

const schema = buildSchemaSync({
  resolvers: [MeResolver, RegisterResolver, LoginResolver],
})

export default schema;