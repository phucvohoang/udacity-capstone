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
    isFetching: true,
  });
  const fetchPost = async () => {
    setState({ ...state, isFetching: true });
    const res = await getIdTokenClaims();
    const idToken = res.__raw;
    const listPost = await getPosts(idToken);
    console.log('🚀 ~ file: Main.js:14 ~ fetchPost ~ listPost:', listPost);
    setState({
      posts: listPost.posts,
      idToken,
      isFetching: false,
    });
    toast.success('Fetch post successfully');
  };
  useEffect(() => {
    fetchPost();
  }, []);

  const renderPosts = () => {
    const { posts, idToken } = state;
    if (state.isFetching) {
      return <Spin />;
    }
    if (posts.length <= 0 && !state.isFetching) {
      return <p>You have no post, but you can create it :)</p>;
    }
    return posts.map((p) => {
      return (
        <Col>
          <Post key={p.postId} post={p} idToken={idToken} />
        </Col>
      );
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
      <Row justify="center" gutter={[16, 16]}>
        {renderPosts()}
      </Row>
    </Row>
  );
};

export default Main;
