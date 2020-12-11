import { Form, Input, Radio, Modal, Row, Col } from "antd";
import { useState } from "react";
import { NoteService } from "../../../services";
import { ButtonStyle, ColStyledButton, TextAreaStyle } from "./style";

const { TextArea } = Input;

const ViewCreateNote = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };

  const success = () => {
    Modal.success({
      content: "Create Note Completed!",
    });
  };

  const errorr = () => {
    Modal.error({
      content: "Create Note Fail!",
    });
  };

  const onFinish = async (data) => {
    setIsLoading(true);
    try {
      const response = await NoteService.createNote(data);
      console.log(response);
      setNotes(response);
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
            label="Note"
            rules={[{ required: true, message: "Please Insert Note" }]}
          >
            <TextAreaStyle rows={8} placeholder="Note" />
          </Form.Item>
        </Col>
        <Col span={8} sm={24} md={12} lg={12}>
          <Form.Item
            defaultValue="CALENDAR"
            name="type"
            label="Type"
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
            label="Privacy"
            defaultValue="PRIVATE"
            rules={[{ required: true, message: "Please Select Privacy" }]}
          >
            <Radio.Group placeholder="Privacy">
              <Radio value="PRIVATE">Private</Radio>
              <Radio value="PUBLIC">Public</Radio>
            </Radio.Group>
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
