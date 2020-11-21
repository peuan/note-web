import { RegisterView } from "../../views";
import { Row, Col } from "antd";
import styled from "styled-components";

const StyledRow = styled(Row)`
  margin-top: 10vh;
`;

const RegisterPage = () => {
  return (
    <StyledRow justify="center">
      <Col span={12}>
        <RegisterView />;
      </Col>
    </StyledRow>
  );
};
export default RegisterPage;
