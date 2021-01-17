import { Button, Card, Row } from "antd";
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
export const StyleButton = styled(Button)`
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  transition-duration: 0.1s;
  color: black;
  box-shadow: none;
  :hover {
    background-color: ${(prop) => prop.buttonColor};
    color: white;
  }
`;
