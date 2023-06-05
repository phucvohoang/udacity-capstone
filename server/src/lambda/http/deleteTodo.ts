import 'source-map-support/register';

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as middy from 'middy';
import { cors, httpErrorHandler } from 'middy/middlewares';

import { deleteTodo } from '../../businessLogic/post';
import { getUserId } from '../utils';

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // Get id from request
  const postId = event.pathParameters.postId;
  const userId = getUserId(event);
  await deleteTodo(postId, userId);

  return {
    statusCode: 204,
    body: JSON.stringify(true),
  };
});

handler.use(httpErrorHandler()).use(
  cors({
    credentials: true,
  })
);
