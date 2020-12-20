import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Layout from "../../../layout";
import { path } from "../../../route";
import { NoteService } from "../../../services";
import { ViewUpdateNote } from "../../../views";
const UpdateNotePage = () => {
  const param = useParams();
  const [note, setNote] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getNoteById();
  }, []);

  const getNoteById = async () => {
    const note = await NoteService.getNotesById(param.noteId);
    setNote(note);
    setIsLoading(false);
  };
  if (isLoading) {
    return <Spin />;
  }
  return (
    <Layout selectedKey={path.updateNote} defaultOpenKey="note">
      <ViewUpdateNote note={note} />
    </Layout>
  );
};
export default UpdateNotePage;
