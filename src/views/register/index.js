import { Form, Input, Button, message, Modal } from "antd";
import { useState } from "react";
import { AuthService } from "../../services";
import { mapExceptionCode } from "../../utils";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";
import { path } from "../../route";
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 24,
      offset: 14,
    },
  },
};
const RegisterView = () => {
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState(false);
  const { success } = Modal;
  const history = useHistory();
  const showConfirm = () => {
    success({
      title: "สมัครสมาชิกสำเร็จ",
      icon: <ExclamationCircleOutlined />,
      content: "Some descriptions",
      onOk() {
        history.push(path.home);
      },
    });
  };
  const handleSummit = () => {};
  const onSummitRegister = async (values) => {
    setLoading(true);
    try {
      await AuthService.register(values);
      showConfirm();
    } catch (error) {
      const errorMessage = mapExceptionCode(error.response);
      message.error(errorMessage);
    }
    setLoading(false);
  };
  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onSummitRegister}
      scrollToFirstError
    >
      <Form.Item
        name="username"
        label="ชื่อผู้ใช้"
        rules={[
          {
            required: true,
            message: "Please input your Username",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="รหัสผ่าน"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="ยืนยันรหัสผ่าน"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(
                "The two passwords that you entered do not match!"
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="firstName"
        label="ชื่อ"
        rules={[
          {
            required: true,
            message: "Please input your firstname",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="lastName"
        label="นามสกุล"
        rules={[
          {
            required: true,
            message: "Please input your lastname",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="email" label="E-mail">
        <Input />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          onSubmit={handleSummit}
        >
          สมัครสมาชิก
        </Button>
      </Form.Item>
    </Form>
  );
};
export default RegisterView;
