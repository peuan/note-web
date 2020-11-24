import styled from "styled-components";
import { Button, Form, Row } from "antd";

export const StyleLoginBtn = styled(Button)`
  padding-left: ${(prop) => prop.pl};
`;
export const StyleFormRegister = styled(Form.Item)`
  background-color: ${(prop) => prop.bgcolor};
  padding: 70px 10px 70px 10px;
  border: solid 1px #9e9e9e;
  border-radius: 6px;
`;
export const StyledRow = styled(Row)`
  margin-top: 100px;
`;
