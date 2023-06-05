import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { createLogger } from '../utils/logger';
import { PostItem } from '../models/PostItem';
import { PostUpdate } from '../models/PostUpdate';
// Used to prevent problem - Property 'DocumentClient' does not exist on type 'PatchedAWSClientConstructor
const AWSXRay = require('aws-xray-sdk');
const XAWS = AWSXRay.captureAWS(AWS);
const logger = createLogger('PostAccess');

// TODO: Implement the dataLayer logic
export class PostAccess {
  constructor(
    private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly postTable = process.env.POST_TABLE,
    private readonly userIdIndex = process.env.USER_ID_INDEX,
    private readonly bucketName = process.env.ATTACHMENT_S3_BUCKET,
    private readonly urlExpiration = Number(process.env?.SIGNED_URL_EXPIRATION || 400)
  ) {}

  async getAllPosts(userId: string): Promise<PostItem[]> {
    logger.info('Getting all todos');
    const result = await this.docClient
      .query({
        TableName: this.postTable,
        IndexName: this.userIdIndex,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId,
        },
      })
      .promise();
    const items = result.Items;
    return items as PostItem[];
  }

  async createPost(todoItem: PostItem): Promise<PostItem> {
    logger.info('Creating a new todo');
    await this.docClient
      .put({
        TableName: this.postTable,
        Item: todoItem,
      })
      .promise();
    return todoItem;
  }

  async updatePost(postId: string, userId: string, postUpdate: PostUpdate): Promise<PostUpdate> {
    logger.info('Updating a todo');
    await this.docClient
      .update({
        TableName: this.postTable,
        Key: {
          postId,
          userId,
        },
        UpdateExpression: 'set #title = :t, imageUrl = :i',
        ExpressionAttributeValues: {
          ':t': postUpdate.title,
          ':i': postUpdate.imageUrl,
          // ':done': postUpdate.done,
        },
        ExpressionAttributeNames: {
          '#name': 'name',
          //   '#dueDate': 'dueDate',
          //   '#done': 'done',
        },
      })
      .promise();
    return postUpdate;
  }

  async deletePost(postId: string, userId: string): Promise<void> {
    logger.info('Deleting a todo');
    await this.docClient
      .delete({
        TableName: this.postTable,
        Key: {
          postId,
          userId,
        },
      })
      .promise();
  }

  async persistAttachmentUrl(
    todoId: string,
    userId: string
    // imageId: string
  ): Promise<void> {
    logger.info('Persisting an attachment url');
    console.log(
      '🚀 ~ file: todosAccess.ts:88 ~ PostAccess ~ persistAttachmentUrl ~ attachmentURl:',
      `https://${this.bucketName}.s3.amazonaws.com/${todoId}`,
      todoId,
      userId
    );
    await this.docClient
      .update({
        TableName: this.postTable,
        Key: {
          todoId,
          userId,
        },
        UpdateExpression: 'set attachmentUrl = :a',
        ExpressionAttributeValues: {
          ':a': `https://${this.bucketName}.s3.amazonaws.com/${todoId}`,
        },
      })
      .promise();
  }

  async generateUploadUrl(postId: string): Promise<string> {
    logger.info('Generating an upload url');
    const s3 = new XAWS.S3({
      signatureVersion: 'v4',
    });
    return s3.getSignedUrl('putObject', {
      Bucket: this.bucketName,
      Key: postId,
      Expires: this.urlExpiration,
    });
  }

  async getPostsForUser(userId: string): Promise<PostItem[]> {
    logger.info('Getting all todos for user');
    const result = await this.docClient
      .query({
        TableName: this.postTable,
        IndexName: this.userIdIndex,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId,
        },
      })
      .promise();
    const items = result.Items;
    return items as PostItem[];
  }
}
