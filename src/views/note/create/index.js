import { Modal } from "antd";
import { useState } from "react";
import { NoteService } from "../../../services";
import NoteForm from "../form";

const ViewCreateNote = () => {
  const [isLoading, setIsLoading] = useState(false);

  const success = () => {
    Modal.success({
      content: "Create Note Completed!",
    });
  };

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

  return <NoteForm isLoading={isLoading} onFinish={onFinish} />;
};

export default ViewCreateNote;
