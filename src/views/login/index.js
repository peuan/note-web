import { Form, Input, Button, Checkbox, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  RedEnvelopeFilled,
} from "@ant-design/icons";
import { path } from "../../route";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AuthService } from "../../services";
import { mapExceptionCode } from "../../utils";
import { StyleBtn, StyledRow, StyleForm } from "./style";
import { Row, Col } from "antd";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    setIsLoading(true);
    try {
      const response = await AuthService.login(values);
      console.log(response);
    } catch (error) {
      const errorMessage = mapExceptionCode(error.response);
      message.error(errorMessage);
    }
    setIsLoading(false);
  };

  return (
    <StyledRow justify="center">
      <Col span={8}>
        <StyleForm
          bgcolor=""
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="ชื่อผู้ใช้" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="รหัสผ่าน"
            />
          </Form.Item>

          <StyleBtn>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              เข้าสู่ระบบ
            </Button>
            หรือ <Link to={path.register}>สมัครตอนนี้</Link>
          </StyleBtn>
        </StyleForm>
      </Col>
    </StyledRow>
  );
};

export default Login;
