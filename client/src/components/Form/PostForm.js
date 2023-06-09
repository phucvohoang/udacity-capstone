import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getUploadUrl, uploadFile } from '../../api/posts-api';
import { useAuth0 } from '@auth0/auth0-react';
const FormPost = (props) => {
  const { onSubmit } = props;
  const { getIdTokenClaims } = useAuth0();
  const [payload, setPayload] = useState({
    title: '',
    file: null,
  });
  const onFinish = (values) => {
    console.log('Success:', values);
    const { title, file } = values;
    onSubmit({ title, image: file });
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const onFileChange = async (e) => {
    console.log(e.fileList);
    const res = await getIdTokenClaims();
    const idToken = res.__raw;
    const url = await getUploadUrl(idToken, '676e3066-3709-475c-9dc2-bad13513c92d');
    console.log('🚀 ~ file: Main.js:14 ~ fetchPost ~ listPost:', url);
    const response = await uploadFile(url, e.fileList[0]);
    setPayload({ ...payload, file: e.fileList[0] });
    // setPosts(listPost.posts);
  };
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Post's Title"
        name="title"
        rules={[
          {
            required: true,
            message: 'Please input title!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
        <Upload onChange={onFileChange} beforeUpload={() => false} listType="picture-card">
          <div>
            <PlusOutlined />
            <div
              style={{
                marginTop: 8,
              }}
            >
              Upload
            </div>
          </div>
        </Upload>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormPost;
