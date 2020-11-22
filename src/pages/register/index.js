import { RegisterView } from "../../views";
import { Row, Col } from "antd";
import styled from "styled-components";

const StyledRegisterRow = styled(Row)`
  margin-top: 10vh;
`;

const RegisterPage = () => {
  return (
    <StyledRegisterRow justify="center">
      <Col span={12}>
        <RegisterView />;
      </Col>
    </StyledRegisterRow>
  );
};
export default RegisterPage;
