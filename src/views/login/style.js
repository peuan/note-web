import styled from "styled-components";
import { Row, Form } from "antd";
import { PropertySafetyFilled } from "@ant-design/icons";

export const StyledRow = styled(Row)`
  margin-top: 100px;
`;

export const StyleForm = styled(Form)`
  background-color: ${(prop) => prop.bgcolor};
  padding: 15px;
`;

export const StyleBtn = styled(Form.Item)`
  margin-left: auto;
  margin-right: auto;
`;
