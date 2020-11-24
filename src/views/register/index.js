import { Form, Input, Button, message, Modal } from "antd";
import { useState } from "react";
import { AuthService } from "../../services";
import { mapExceptionCode } from "../../utils";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";
import { path } from "../../route";
import { StyleLoginBtn, StyleFormRegister } from "./style";
const formItemLayout = {
  labelCol: {
    xs: {
      span: 12,
    },
    sm: {
      span: 7,
    },
  },
  wrapperCol: {
    xs: {
      span: 12,
    },
    sm: {
      span: 12,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 12,
      offset: 12,
    },
    sm: {
      span: 12,
      offset: 7,
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
      content: "กรุณาล็อกอิน",
      onOk() {
        history.push(path.login);
      },
    });
  };
  const handleSummit = () => {
    history.push(path.login);
  };
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
    <StyleFormRegister>
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
              message: "กรุณากรอกชื่อผู้ใช้",
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
              message: "กรุณากรอกรหัสผ่าน",
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
              message: "กรอกรหัสผ่านอีกครั้ง",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject("รหัส่านไม่ถูกต้อง");
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
              message: "กรุณากรอกชื่อ",
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
              message: "กรุณากรอกนามสกุล",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "อีเมล์ไม่ถูกต้อง",
            },
            {
              required: true,
              message: "กรุณากรอกอีเมล์",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <StyleLoginBtn
            type="link"
            htmlType="button"
            onClick={handleSummit}
            pl="0"
          >
            ล็อกอิน
          </StyleLoginBtn>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            onSubmit={handleSummit}
            style={{ float: "right" }}
          >
            สมัครสมาชิก
          </Button>
        </Form.Item>
      </Form>
    </StyleFormRegister>
  );
};
export default RegisterView;
