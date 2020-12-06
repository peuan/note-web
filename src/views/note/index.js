import { Button, Radio, Spin, Input, Card } from "antd";
import Form from "antd/lib/form/Form";
import Modal from "antd/lib/modal/Modal";
import { useEffect, useState } from "react";
import { NoteService } from "../../services";

const { TextArea } = Input;

const ViewNote = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadningNotes, setIsLoadingNotes] = useState(false);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    setIsLoadingNotes(true);
    const note = await NoteService.getNotes();
    setNotes(note);
    setIsLoadingNotes(false);
  };

  const success = () => {
    Modal.success({
      content: "Create Note Completed!",
    });
  };

  const errorr = () => {
    Modal.success({
      content: "Create Note Fail!",
    });
  };

  const onFinish = async (data) => {
    setIsLoading(true);
    try {
      const response = await NoteService.createNote(data);
      console.log(response);
      success();
    } catch (error) {
      errorr();
    }
    setIsLoading(false);
  };

  if (isLoading) {
    <div className="example">
      <Spin />
    </div>;
  }
  return (
    <Form onFinish={onFinish}>
      <Form.Item
        name="note"
        label="Note"
        rules={[{ required: true, message: "Please Insert Note" }]}
      >
        <TextArea rows={8} style={{ width: 500 }} placeholder="Note" />
      </Form.Item>

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

      <Button type="primary" htmlType="submit" loading={isLoading}>
        บันทึกข้อมูล
      </Button>
      <Button htmlType="button">ล้างข้อมูล</Button>

      {isLoadningNotes ? (
        <Spin />
      ) : (
        notes.map((note) => {
          return <Card note={note.note} key={note.id} />;
        })
      )}
    </Form>
  );
};

export default ViewNote;
