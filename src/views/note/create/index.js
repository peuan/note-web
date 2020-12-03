import { Button, Form, Input, message, Select } from "antd";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { path } from "../../../route";
import { NoteService } from "../../../services";

const { Option } = Select;

const ViewCreateNote = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const success = (messageerror) => {
    message.success(messageerror);
  };

  const alertError = (messageerror) => {
    message.error(messageerror);
  };

  const onFinish = async (data) => {
    setIsLoading(true);
    try {
      const response = await NoteService.createNote(data);
      console.log(response);
      success("สร้างบันทึกเสร็จเรียบร้อยแล้ว");
    } catch (error) {
      alertError("มีข้อผิดพลาด กรุณาลองใหม่");
    }
    setIsLoading(false);
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item
        name="note"
        label="Note"
        rules={[{ required: true, message: "กรุณากรอก" }]}
      >
        <Input placeholder="บันทึกข้อความ" />
      </Form.Item>

      <Form.Item
        name="type"
        rules={[{ required: true, message: "กรุณาเลือกประเภท" }]}
      >
        <Select style={{ width: 200 }} placeholder="Please Select Type">
          <Option value="CALENDAR">Calendar</Option>
          <Option value="TODO">Todo</Option>
          <Option value="NOTE">Note</Option>
        </Select>
      </Form.Item>

      <Form.Item
        style={{ width: 200 }}
        name="privacy"
        rules={[{ required: true, message: "กรุณาเลือกประเภท" }]}
      >
        <Select placeholder="Please Select Privacy">
          <Option value="PUBLIC">Public</Option>
          <Option value="PRIVATE">Private</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          บันทึกข้อมูล
        </Button>
        <Button htmlType="button">ล้างข้อมูล</Button>
      </Form.Item>
    </Form>
  );
};

export default ViewCreateNote;
