import { Button, Calendar, DatePicker, Input, Switch, Table } from "antd";
import styled from "styled-components";

import "./App.less";

const StyledButton = styled(Button)`
  margin-top: 20px;
  &.ant-btn-primary {
    background-color: ${(props) => props.theme.primary} !important;
  }
`;

const StyledFlex = styled.div`
  display: flex;
  margin-top: 20px;
  &.test {
    background-color: red;
  }
  .one {
    background-color: green;
  }
`;

const App = () => {
  return (
    <div className="App">
      <StyledButton type="primary">Button</StyledButton>
      <Button type="primary">sssss</Button>
      <Input />
      <Switch />
      <StyledFlex className="test">
        <div className="one">lll</div>
        <div className="two">222</div>
        <div className="3">222</div>
      </StyledFlex>
      <Calendar />
      <DatePicker />
      <span>sssss</span>
    </div>
  );
};

export default App;
