import { useState } from "react";
import { NoteService } from "../../../services";
import NoteForm from "../form";
import { Modal } from "antd";
import { useHistory } from "react-router";
import { path } from "../../../route";

const ViewUpdateNote = ({ note }) => {
  console.log(note);
  note.tagIds = note.tags.map((note) => note.id);
  console.log(note.tagIds);

  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const success = () => {
    Modal.success({
      content: "แก้ไขสำเร็จ",
    });
  };

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const response = await NoteService.updateNote(note.id, values);
      console.log(response);
      success();
      history.push(path.note);
    } catch (error) {
      throw error;
    }
    setIsLoading(false);
  };
  return <NoteForm onFinish={onFinish} isLoading={isLoading} note={note} />;
};
export default ViewUpdateNote;
