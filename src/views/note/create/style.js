import { Button, Col } from "antd";
import TextArea from "antd/lib/input/TextArea";

const { default: styled } = require("styled-components");

export const BorderStyle = styled.div`
  border: solid 1px #bfbfbf;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 1px 1px #bfbfbf;
`;

export const ButtonStyle = styled(Button)`
  margin: 10px;
`;

export const ColStyledButton = styled(Col)`
  text-align: center;
`;

export const TextAreaStyle = styled(TextArea)`
  width: 450px;
`;
