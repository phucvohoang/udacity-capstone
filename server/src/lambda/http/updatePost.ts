import 'source-map-support/register';

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as middy from 'middy';
import { cors, httpErrorHandler } from 'middy/middlewares';

import { updatePost } from '../../businessLogic/post';
import { UpdatePostRequest } from '../../requests/UpdatePostRequest';
import { getUserId } from '../utils';

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // get postId from body
  const postId = event.pathParameters.postId;
  console.log('🚀 ~ file: updatePost.ts:13 ~ handler ~ postId:', postId);
  // Parse body to JSON Object
  const updatedPost: UpdatePostRequest = JSON.parse(event.body);
  console.log('🚀 ~ file: updatePost.ts:15 ~ handler ~ updatedPost:', updatedPost);
  const userId = getUserId(event);
  console.log('🚀 ~ file: updatePost.ts:17 ~ handler ~ userId:', userId);
  // calling update post
  await updatePost(postId, userId, updatedPost);

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
