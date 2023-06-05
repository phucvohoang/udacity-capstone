import 'source-map-support/register';

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';

import { getTodosForUser } from '../../businessLogic/post';
import { getUserId } from '../utils';

import { createLogger } from '../../utils/logger';
const logger = createLogger('createTodo');

// TODO: Get all TODO items for a current user
export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // Write your code here
  const userId = getUserId(event);
  logger.info(`This is userId: ${userId}`);
  const posts = await getTodosForUser(userId);
  return {
    statusCode: 200,
    body: JSON.stringify({ posts: posts }),
  };
});

handler.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
