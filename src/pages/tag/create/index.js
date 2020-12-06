import Layout from "../../../layout";
import { Form, Input, message, Modal, Spin, Tag } from "antd";
import { useEffect, useState } from "react";
import { TagService } from "../../../services/tag";
import { mapExceptionCode } from "../../../utils";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { path } from "../../../route";

const CreateTagPage = () => {
  // const [inputValue, setInputValue] = useState("");
  const [inputVisible, setInputVisible] = useState(false);
  const [tags, setTags] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isLoadingTags, setLoadingTags] = useState(false);
  const { success } = Modal;

  useEffect(() => {
    getTags();
  }, []);

  const getTags = async () => {
    setLoadingTags(true);
    const tags = await TagService.getTags();
    console.log(tags);
    setTags(tags);
    setLoadingTags(false);
  };

  const showConfirm = () => {
    success({
      title: "สร้าง Tag สำเร็จ",
      icon: <ExclamationCircleOutlined />,
    });
  };

  const showInput = () => {
    setInputVisible(true);
  };
  const handleClose = (e) => {
    e.preventDefault();
  };

  const onSummitCreateTag = async (values) => {
    setLoading(true);
    try {
      const response = await TagService.createTag(values);
      showConfirm();
      console.log(response);
    } catch (error) {
      const errorMessage = mapExceptionCode(error.response);
      message.error(errorMessage);
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <Layout selectedKey={path.createTag} defaultOpenKey="tag">
      <Form onFinish={onSummitCreateTag} name="global_state" layout="inline">
        {isLoadingTags ? (
          <Spin />
        ) : (
          tags.map((tag) => {
            return (
              <Tag closable onClose={handleClose} key={tag.id} color="blue">
                {tag.tag}
              </Tag>
            );
          })
        )}
        {inputVisible && (
          <Form.Item name="tag">
            <Input
              name="tag"
              // value={inputValue}
              type="text"
              style={{ width: 100 }}
              // onPressEnter={onSummitCreateTag}
              loading={isLoading}
            />
          </Form.Item>
        )}
        {!inputVisible && <Tag onClick={showInput}>กรอก Tag</Tag>}
      </Form>
    </Layout>
  );
};
export default CreateTagPage;
