import React, { useEffect, useState } from 'react';
import { getPosts } from '../api/posts-api';
import { useAuth0 } from '@auth0/auth0-react';
import { Row, Spin, Button, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import Post from '../components/Post';
import FormPost from '../components/Form/PostForm';
import { toast } from 'react-hot-toast';

const Main = (props) => {
  const { getIdTokenClaims } = useAuth0();
  const navigate = useNavigate();
  const [state, setState] = useState({
    posts: [],
    idToken: '',
  });
  const fetchPost = async () => {
    const res = await getIdTokenClaims();
    const idToken = res.__raw;
    const listPost = await getPosts(idToken);
    console.log('🚀 ~ file: Main.js:14 ~ fetchPost ~ listPost:', listPost);
    setState({
      posts: listPost.posts,
      idToken,
    });
    toast.success('Fetch post successfully');
  };
  useEffect(() => {
    fetchPost();
  }, []);

  const renderPosts = () => {
    const { posts, idToken } = state;
    if (posts.length <= 0) {
      return <Spin />;
    }
    return posts.map((p) => {
      return <Post key={p.postId} post={p} idToken={idToken} />;
    });
  };
  return (
    <Row style={{ width: '100vw' }} justify="center">
      <Col span={24}>
        <Row style={{ width: '90vw' }} justify="end">
          <Button
            onClick={() => {
              navigate('/create-post');
            }}
          >
            Create Post
          </Button>
        </Row>
      </Col>
      <Row justify="center">{renderPosts()}</Row>
    </Row>
  );
};

export default Main;
