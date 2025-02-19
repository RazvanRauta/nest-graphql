/* eslint-disable @typescript-eslint/require-await */
import {
  ApolloServerPlugin,
  BaseContext,
  GraphQLRequestListener,
} from '@apollo/server';
import { Plugin } from '@nestjs/apollo';
import { GraphQLSchemaHost } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import {
  fieldExtensionsEstimator,
  getComplexity,
  simpleEstimator,
} from 'graphql-query-complexity';

@Plugin()
export class ComplexityPlugin implements ApolloServerPlugin {
  constructor(private gqlSchemaHost: GraphQLSchemaHost) {}

  async requestDidStart(): Promise<GraphQLRequestListener<BaseContext>> {
    const { schema } = this.gqlSchemaHost;

    return {
      async didResolveOperation({ request, document }) {
        const body = request.http?.body;
        if (
          typeof body === 'object' &&
          body !== null &&
          'query' in body &&
          typeof body.query === 'string' &&
          body.query.includes('IntrospectionQuery')
        ) {
          return;
        }
        const complexity = getComplexity({
          schema,
          operationName: request.operationName,
          query: document,
          variables: request.variables,
          estimators: [
            fieldExtensionsEstimator(),
            simpleEstimator({ defaultComplexity: 1 }),
          ],
        });
        if (complexity >= 200) {
          throw new GraphQLError(
            `Query is too complex: ${complexity}. Maximum allowed complexity: 20`,
          );
        }
        console.log('Query Complexity:', complexity);
      },
    };
  }
}
