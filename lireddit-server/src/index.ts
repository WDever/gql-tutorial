import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import mikroConfig from 'mikro-orm.config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from 'resolvers/hello';
import { PostResolver } from 'resolvers/post';
import { Context } from 'types';

const main = async (): Promise<void> => {
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false,
    }),
    context: (): Context => ({ em: orm.em }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('server started on localhost:4000');
  });
};

main().catch((e) => {
  console.error(e);
});
