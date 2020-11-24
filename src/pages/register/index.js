import { RegisterView } from "../../views";
import { Row, Col } from "antd";
import styled from "styled-components";

const StyledRegisterRow = styled(Row)`
  margin-top: 100px;
`;

const RegisterPage = () => {
  return (
    <StyledRegisterRow justify="center">
      <Col md={12} lg={12} xl={12}>
        <RegisterView />
      </Col>
    </StyledRegisterRow>
  );
};
export default RegisterPage;
