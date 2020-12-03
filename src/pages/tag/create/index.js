import Layout from "../../../layout";
import { Form, Input, Button, message, Modal } from "antd";
import { useState } from "react";
import { TagService } from "../../../services/tag";
import { mapExceptionCode } from "../../../utils";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { path } from "../../../route";

const CreateTagPage = () => {
  const [isLoading, setLoading] = useState(false);
  const { success } = Modal;
  const showConfirm = () => {
    success({
      title: "สร้าง Tag สำเร็จ",
      icon: <ExclamationCircleOutlined />,
    });
  };
  const onSummitCreateTag = async (values) => {
    setLoading(true);
    try {
      const response = await TagService.createtag(values);
      showConfirm();
      console.log(response);
    } catch (error) {
      const errorMessage = mapExceptionCode(error.response);
      message.error(errorMessage);
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <Layout selectedKey={path.createTag} defaultOpenKey="tag">
      <Form onFinish={onSummitCreateTag} name="global_state" layout="inline">
        <Form.Item
          name="tag"
          label="สร้างแท็ก"
          rules={[
            {
              required: true,
              message: "กรุณาสร้างแท็ก",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" loading={isLoading}>
            ตกลง
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};
export default CreateTagPage;
