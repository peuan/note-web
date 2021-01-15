import Layout from "../../../layout";
import { Form, Input, message, Modal, Spin, Tag, Divider } from "antd";
import { useEffect, useState } from "react";
import { TagService } from "../../../services/tag";
import { mapExceptionCode } from "../../../utils";
import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { path } from "../../../route";
import { FlexBox } from "../style";

const CreateTagPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputVisible, setInputVisible] = useState(false);
  const [tags, setTags] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isLoadingTags, setLoadingTags] = useState(false);
  const [form] = Form.useForm();
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
      title: "สร้างแทร็กสำเร็จ",
      icon: <ExclamationCircleOutlined />,
    });
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const showInput = () => {
    setInputVisible(true);
  };
  const handleClose = async (tagId) => {
    console.log(tagId);
    await TagService.deleteTag(tagId);
    getTags();
  };

  const onSummitCreateTag = async (values) => {
    setLoading(true);
    try {
      const response = await TagService.createTag(values);
      showConfirm();
      form.resetFields();
      getTags();
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
      <Divider orientation="left">
        <h1>#tag</h1>
      </Divider>
      <FlexBox>
        <Form
          onChange={handleInputChange}
          onFinish={onSummitCreateTag}
          name="global_state"
          layout="inline"
          form={form}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Spin spinning={isLoadingTags}>
            {tags.map((tag) => {
              console.log(tag);
              return (
                <Tag
                  closable
                  onClose={() => handleClose(tag.id)}
                  key={tag.id}
                  color="blue"
                >
                  {tag.tag}
                </Tag>
              );
            })}
          </Spin>

          {inputVisible && (
            <Spin spinning={isLoading}>
              <Form.Item name="tag">
                <Input
                  name="tag"
                  value={inputValue}
                  type="text"
                  style={{ width: 85, height: "24px" }}
                />
              </Form.Item>
            </Spin>
          )}
          {!inputVisible && (
            <Tag onClick={showInput}>
              <PlusOutlined /> กรอก Tag
            </Tag>
          )}
        </Form>
      </FlexBox>
    </Layout>
  );
};
export default CreateTagPage;
