import "reflect-metadata";

import {ApolloServer } from "apollo-server-express";
import Express from "express";
import cors from "cors";

import "./database";

import schema from "./schema";
import session from "express-session";
import { redis } from "./redis";
import connectRedis from "connect-redis";       


const main = async () => {
  
  const server = new ApolloServer({
    schema,
    context: ({req}: any) => ({req})
  });
  
  const app = Express();

  await server.start();

  
  const RedisStore = connectRedis(session); 
  
  app.use(cors({
    credentials: true,
  }));
  
  app.use(
    session({
      store: new RedisStore({
        client: redis
      }),
      name: "SessionQID",
      secret: "3b719389a338ddb6c0c76aa59229b5fe",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365,
      },
    })
  );

  server.applyMiddleware({app, cors: false})

  app.listen(4000, ()=> console.log(`Server is Running on http://localhost:4000/graphql`));
}

main();


