const { Button } = require("antd");

const CancelButton = ({ children, ...props }) => {
  return (
    <Button type="primary" danger {...props}>
      {children}
    </Button>
  );
};

export default CancelButton;
