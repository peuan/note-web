import { Form, Input, Radio, Modal, Row, Col, Select } from "antd";
import { useState } from "react";
import { NoteService, TagService } from "../../../services";
import { debounce } from "../../../utils/debounce";
import { ButtonStyle, ColStyledButton, TextAreaStyle } from "./style";

const { TextArea } = Input;
const { Option } = Select;

const ViewCreateNote = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const [tags, setTags] = useState([]);
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };

  const success = () => {
    Modal.success({
      content: "Create Note Completed!",
    });
  };

  const searchTag = debounce(async (value) => {
    setIsSearching(true);
    try {
      const response = await TagService.getTags({
        page: 1,
        limit: 30,
        search: value,
      });
      setTags(response);
    } catch (error) {
      throw error;
    }
    setIsSearching(false);
  }, 500);

  const onFinish = async (data) => {
    setIsLoading(true);
    try {
      const response = await NoteService.createNote(data);
      console.log(response);
      success();
    } catch (error) {
      throw error;
    }
    setIsLoading(false);
  };

  return (
    <Form onFinish={onFinish} form={form}>
      <Row justify="space-between">
        <Col span={8} sm={24} md={12} lg={12}>
          <Form.Item
            name="note"
            label="ชื่อ"
            rules={[{ required: true, message: "Please Insert Note" }]}
          >
            <TextAreaStyle rows={8} placeholder="Note" />
          </Form.Item>
        </Col>
        <Col span={8} sm={24} md={12} lg={12}>
          <Form.Item
            defaultValue="CALENDAR"
            name="type"
            label="ประเภทโน๊ต"
            rules={[{ required: true, message: "Please Select Type" }]}
          >
            <Radio.Group style={{ width: 600 }} placeholder="Select Type">
              <Radio value="CALENDAR">Calendar</Radio>
              <Radio value="TODO">Todo</Radio>
              <Radio value="NOTE">Note</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="privacy"
            label="ความเป็นส่วนตัว"
            defaultValue="PRIVATE"
            rules={[{ required: true, message: "Please Select Privacy" }]}
          >
            <Radio.Group placeholder="Privacy">
              <Radio value="PRIVATE">Private</Radio>
              <Radio value="PUBLIC">Public</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="tagIds" label="ค้นหาแทร็ก">
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select a person"
              optionFilterProp="children"
              mode="multiple"
              onSearch={searchTag}
              loading={isSearching}
            >
              {tags.map((tag) => {
                return (
                  <Option key={tag.id} value={tag.id}>
                    {tag.tag}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <ColStyledButton span={8} offset={8}>
        <ButtonStyle type="primary" htmlType="submit" loading={isLoading}>
          บันทึกข้อมูล
        </ButtonStyle>
        <ButtonStyle htmlType="button" onClick={onReset}>
          ล้างข้อมูล
        </ButtonStyle>
      </ColStyledButton>
    </Form>
  );
};

export default ViewCreateNote;
