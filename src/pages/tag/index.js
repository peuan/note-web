import Layout from "../../layout";
import { path } from "../../route";
import { Tag, Input } from "antd";
import { StyleInput } from "./style";
import { useState } from "react";

const TagPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputVisible, setInputVisible] = useState(false);
  const [tags, setTags] = useState([]);
  const showInput = () => {
    setInputVisible(true);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      const newTags = [...tags, inputValue];
      setTags(newTags);
    }
  };
  const handleClose = (e) => {
    e.preventDefault();
  };
  return (
    <Layout selectedKey={path.tag} defaultOpenKey="tag">
      {tags.map((tag) => {
        return (
          <Tag closable onClose={handleClose}>
            {tag}
          </Tag>
        );
      })}
      {inputVisible && (
        <StyleInput
          value={inputValue}
          type="text"
          style={{ width: 80 }}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        ></StyleInput>
      )}
      {!inputVisible && <Tag onClick={showInput}>กรอก Tag</Tag>}
    </Layout>
  );
};

export default TagPage;
