/* eslint-disable @typescript-eslint/require-await */
import {
  ApolloServerPlugin,
  BaseContext,
  GraphQLRequestContext,
  GraphQLRequestContextWillSendResponse,
  GraphQLRequestListener,
} from '@apollo/server';
import { Plugin } from '@nestjs/apollo';
import { Logger } from '@nestjs/common';

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin {
  private readonly logger = new Logger(LoggingPlugin.name);

  async requestDidStart(
    requestContext: GraphQLRequestContext<BaseContext>,
  ): Promise<GraphQLRequestListener<any>> {
    const thisLogger = this.logger;
    let ignore = false;

    const query = requestContext.request.query;

    if (query && query.includes('IntrospectionQuery')) {
      ignore = true;
    }

    if (!ignore) {
      thisLogger.log('Request started:');
      thisLogger.debug(`Query: ${requestContext.request.query}`);
    }

    return {
      async willSendResponse(
        response: GraphQLRequestContextWillSendResponse<any>,
      ): Promise<any> {
        if (!ignore) {
          thisLogger.log('Will send response');
          thisLogger.debug(`Body: ${JSON.stringify(response.response?.body)}`);
        }
      },
    };
  }
}
