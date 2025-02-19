import { Module, OnModuleInit } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MikroORM, SqliteDriver } from '@mikro-orm/sqlite';

import { upperDirectiveTransformer } from './common/directives/upper-case.directive';
import { RecipesModule } from './recipes/recipes.module';
import { ComplexityPlugin } from './common/plugins/complexity.plugin';
import { LoggingPlugin } from './common/plugins/logging.plugin';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      entities: ['dist/**/*.entity.js'],
      entitiesTs: ['src/**/*.entity.ts'],
      dbName: 'recipes.sqlite3',
      driver: SqliteDriver,
      debug: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
      installSubscriptionHandlers: true,
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
    }),
    RecipesModule,
  ],
  providers: [ComplexityPlugin, LoggingPlugin],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly orm: MikroORM) {}

  async onModuleInit(): Promise<void> {
    await this.orm.getMigrator().up();
  }
}
