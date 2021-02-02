import { ApolloServer } from 'apollo-server-express';
import type { Container } from 'inversify';
import type { GraphQLSchema } from 'graphql';
import { buildSchema } from 'type-graphql';
import type { IExpressServer } from '#Express/types';
import type { IContext, IGraphQLServer } from './types';
import { TaskQueries } from './Resolvers/Query';
import type { IAuthService } from '#Services/types';
import { DependencyTypes } from '#Container/types';
import { AuthMutations, TaskMutations } from './Resolvers/Mutation';

class GraphQLServer extends ApolloServer implements IGraphQLServer {
  private authService: IAuthService;

  constructor(container: Container, schema: GraphQLSchema) {
    super({
      playground: true,
      debug: true,
      context: async ({ req, connection }) => {
        const token = connection ? connection.context.Authorization : req.headers.authorization;
        const user = token ? await this.authService.getUserByToken(token) : null;

        return { user };
      },
      schema,
    });

    this.authService = container.get<IAuthService>(DependencyTypes.IAuthService);
  }

  public setExpressServer({ app }: IExpressServer) {
    this.applyMiddleware({
      app,
      bodyParserConfig: {
        limit: '50mb',
      },
    });
    console.log('GraphQL server loaded...');
  }

  static async build(container: Container) {
    const schema = await buildSchema({
      container,
      resolvers: [TaskQueries, AuthMutations, TaskMutations],
      authChecker: ({ context: { user } }: { context: IContext }) => !!user,
      authMode: 'null',
    });
    return new this(container, schema);
  }
}

export default GraphQLServer;
