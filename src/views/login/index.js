import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { path } from "../../route";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { AuthService } from "../../services";
import { StyledRow, StyleForm, StyleRegisterBtn } from "./style";
import { Col } from "antd";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const success = (messageerror) => {
    message.success(messageerror);
    history.push("/home");
  };

  const alertError = (messageerror) => {
    message.error(messageerror);
  };
  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    setIsLoading(true);
    try {
      const response = await AuthService.login(values);
      console.log(response);
      success("เข้าสู่ระบบสำเร็จ");
    } catch (error) {
      // const errorMessage = mapExceptionCode(error.response);
      alertError("เกิดข้อผิดพลาด กรุณาลองใหม่");
    }
    setIsLoading(false);
  };

  return (
    <StyledRow justify="center">
      <Col md={10} lg={6} xl={6}>
        <StyleForm
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "กรุณากรอกชื่อผู้ใช้" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="ชื่อผู้ใช้" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "กรุณากรอกรหัสผ่าน" }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="รหัสผ่าน"
            />
          </Form.Item>

          <Form.Item>
            <StyleRegisterBtn
              type="link"
              htmlType="button"
              onClick={() => history.push(path.register)}
              pl="0"
            >
              สมัครสมาชิก
            </StyleRegisterBtn>

            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              style={{ float: "right" }}
            >
              เข้าสู่ระบบ
            </Button>
          </Form.Item>
        </StyleForm>
      </Col>
    </StyledRow>
  );
};

export default Login;
