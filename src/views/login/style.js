import styled from "styled-components";
import { Row, Form } from "antd";
import { PropertySafetyFilled } from "@ant-design/icons";

export const StyledRow = styled(Row)`
  margin-top: 100px;
`;

export const StyleForm = styled(Form)`
  background-color: ${(prop) => prop.bgcolor};
  padding: 50px 10px 50px 10px;
  border: solid 1px #9e9e9e;
  border-radius: 6px;
`;

export const StyleBtn = styled(Form.Item)`
  display: flex;
  margin-left: auto;
  margin-right: auto;
`;
