import Icon from "@ant-design/icons";
import { Card, Row, Button } from "antd";
import styled from "styled-components";

export const StyleCard = styled(Card)`
  width: 100%;
  font-weight: 500;
  font-size: 20px;
  margin: 10px;
  border-radius: 8px;
  box-shadow: 2px 2px 3px #aaaaaa;
`;

export const StyleRow = styled(Row)`
  color: grey;
`;
export const StyledButton = styled(Button)`
  border: 0px;
  &:hover {
    color: palevioletred;
    border-color: red;
  }
`;
