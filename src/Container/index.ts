import 'reflect-metadata';
import { Container } from 'inversify';
import { DependencyTypes } from './types';

// Database Repositories
import { UserRepository } from '#SqlDatabase';
import type { IUserRepository } from '#SqlDatabase/types';

// Services
import JsonWebToken from '#Services/AuthService/JsonWebToken';
import type { IJsonWebToken, ITaskService, IAuthService } from '#Services/types';

// GraphQL Resolvers
import { TaskService, AuthService } from '#Services';
import { UserQueries } from '#GraphQL/Resolvers/Query';
import { AuthMutations, TaskMutations } from '#GraphQL/Resolvers/Mutation';

const container = new Container();

// Database Repositories
container.bind<IUserRepository>(DependencyTypes.IUserRepository).to(UserRepository).inSingletonScope();

// Services
container.bind<IAuthService>(DependencyTypes.IAuthService).to(AuthService).inSingletonScope();
container.bind<ITaskService>(DependencyTypes.ITaskService).to(TaskService).inSingletonScope();
container.bind<IJsonWebToken>(DependencyTypes.IJsonWebToken).to(JsonWebToken).inSingletonScope();

// GraphQL Resolvers
container.bind<UserQueries>(UserQueries).to(UserQueries).inSingletonScope();
container.bind<AuthMutations>(AuthMutations).to(AuthMutations).inSingletonScope();
container.bind<TaskMutations>(TaskMutations).to(TaskMutations).inSingletonScope();

export default container;
