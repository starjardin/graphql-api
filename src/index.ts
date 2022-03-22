import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { BookResolver } from "./resolvers/bookResolvers";
import { UserResolver } from "./resolvers/userResolver";

(async function main() {
  await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "tantely",
    password: "admin123",
    database: "testdatabase",
    entities: ["src/**/*.*"],
  });
  const schema = await buildSchema({
    resolvers: [BookResolver, UserResolver],
  });
  const server = await new ApolloServer({ schema, introspection: true });
  const port = process.env.PORT || 4000

  await server.listen(4000);

  console.log(`server has started on port ${port}`);
  
})();
