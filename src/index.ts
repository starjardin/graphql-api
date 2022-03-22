import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { BookResolver } from './resolvers/bookResolvers';
import { UserResolver } from './resolvers/userResolver';

(async function main () {
  await createConnection()
  const schema = await buildSchema({
    resolvers: [BookResolver, UserResolver]
  })
  const server = await new ApolloServer({ schema })
  await server.listen(4000)
  console.log("server has started")
})()
