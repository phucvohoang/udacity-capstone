import { PostAccess } from '../data_access_layer/postAccess';
import { PostItem } from '../models/PostItem';
import { CreatePostRequest } from '../requests/CreatePostRequest';
import { PostUpdate } from '../models/PostUpdate';

const postAccess = new PostAccess();
export async function getAllPosts(userId: string): Promise<PostItem[]> {
  return await postAccess.getAllPosts(userId);
}

export async function createPost(newPost: CreatePostRequest, userId: string, postId: string): Promise<CreatePostRequest> {
  return await postAccess.createPost({
    postId: postId, // generate via uuid
    userId: userId, // generated via uuid
    title: newPost.title, // from user's post request
    imageUrl: newPost?.imageUrl || '', // from user's post request
    createdAt: new Date().toISOString(),
  });
}

export async function deletePost(postId: string, userId: string): Promise<void> {
  return await postAccess.deletePost(postId, userId);
}

export async function getGeneratedUploadURL(postId: string): Promise<string> {
  return await postAccess.generateUploadUrl(postId);
}

export async function persistAttachmentUrl(
  postId: string,
  userId: string
  //   imageId: string
): Promise<void> {
  return await postAccess.persistAttachmentUrl(postId, userId);
}

export async function getPostsForUser(userId: string): Promise<PostItem[]> {
  return await postAccess.getPostsForUser(userId);
}

export async function updatePost(postId: string, userId: string, postUpdate: PostUpdate): Promise<PostUpdate> {
  return await postAccess.updatePost(postId, userId, postUpdate);
}
