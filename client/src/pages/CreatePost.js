import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { useAuth0 } from '@auth0/auth0-react';
import FormPost from '../components/Form/PostForm';
import { createPost, getUploadUrl, uploadFile } from '../api/posts-api';
import { toast } from 'react-hot-toast';
const CreatePost = (props) => {
  const [processing, setProcessing] = useState(false);
  const { isAuthenticated, getIdTokenClaims } = useAuth0();
  const onSubmit = async (payload) => {
    const { title, image } = payload;
    const res = await getIdTokenClaims();
    const idToken = res.__raw;
    try {
      if (image) {
        const newPost = await createPost(idToken, { title });
        console.log('🚀 ~ file: CreatePost.js:15 ~ onSubmit ~ newPost:', newPost);
        const { postId } = newPost;
        const url = await getUploadUrl(idToken, postId);
        console.log('🚀 ~ file: Main.js:14 ~ fetchPost ~ listPost:', url);
        const response = await uploadFile(url, image);
        toast.success('Create post successfully');
      } else {
        const newPost = await createPost(idToken, { title });
        toast.success('Create post successfully');
        console.log('🚀 ~ file: CreatePost.js:15 ~ onSubmit ~ newPost:', newPost);
      }
    } catch (error) {
      toast.error(`Could not create post: ${error?.message}`);
    }
  };
  return (
    <>
      <Row style={{ width: '100vw' }} justify="center">
        <Row style={{ width: '90vw' }}>
          <Col span={24}>
            <FormPost onSubmit={onSubmit} processing={processing} />
          </Col>
        </Row>
      </Row>
    </>
  );
};

export default CreatePost;
