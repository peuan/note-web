import { Form, Col, Row } from "antd";
import styled from "styled-components";

export const StyleFormTag = styled(Form)`
  background-color: #fdfefe;
  padding: 30px 10px 30px 10px;
  border: solid 1px #9e9e9e;
  border-radius: 6px;
`;

export const StyleTagCol = styled(Col)``;
export const StyleTagRow = styled(Row)`
  margin-top: 100px;
`;
export const FlexBox = styled.div`
  background-color: #fbfcfc;
  border-radius: 5px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
  margin: 10px;
  padding: 10px;
  border: 1px;
  display: flex;
  align-items: center;
  justify-content: start;

  > div {
    margin: 20px;
  }
`;
