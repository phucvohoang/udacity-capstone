import React, { useState } from 'react';
import { Card, Modal } from 'antd';
import moment from 'moment';
import { useAuth0 } from '@auth0/auth0-react';
import { EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import { deletePost } from '../api/posts-api';
import { toast } from 'react-hot-toast';
const { Meta } = Card;

const Post = (props) => {
  const { post, idToken } = props;
  console.log('🚀 ~ file: Post.js:11 ~ Post ~ post:', post);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    // setIsModalOpen(false);
    if (!idToken) {
      return;
    }
    try {
      await deletePost(idToken, post.postId);
      toast.success(`Post ${post.title} has been deleted`);
    } catch (error) {
      toast.error(`Could not delete: ${error.message}`);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const _onEdit = () => {
    console.log('Click edit');
  };
  if (!post.imageUrl) {
    return (
      <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    );
  }

  return (
    <>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        Delete {post.title} post. Are you sure
      </Modal>
      <Card
        hoverable
        style={{ width: '30%' }}
        actions={[<EditOutlined key="edit" onClick={_onEdit} />, <DeleteOutlined onClick={showModal} key="delete" />]}
        cover={<img alt="example" src={post.imageUrl} />}
      >
        <Meta title={post.title} description={moment(post.createdAt).format('MMMM Do YYYY, h:mm a')} />
      </Card>
    </>
  );
};

export default Post;
