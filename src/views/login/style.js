import styled from "styled-components";
import { Row, Form, Button } from "antd";

export const StyledRow = styled(Row)`
  margin-top: 100px;
`;

export const StyleForm = styled(Form)`
  background-color: ${(prop) => prop.bgcolor};
  padding: 30px 10px 30px 10px;
  border: solid 1px #9e9e9e;
  border-radius: 6px;
`;

export const StyleBtn = styled(Form.Item)``;

export const StyleRegisterBtn = styled(Button)`
  padding-left: ${(prop) => prop.pl};
`;

export const StyleHeader = styled.div`
  text-align: center;
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #2b2b2b;
`;
