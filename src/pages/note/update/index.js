import { Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Layout from "../../../layout";
import { path } from "../../../route";
import { NoteService } from "../../../services";
import { ViewUpdateNote } from "../../../views";
const UpdateNotePage = () => {
  const { noteId } = useParams();
  const [note, setNote] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getNoteById();
  }, []);

  const getNoteById = async () => {
    const note = await NoteService.getNotesById(noteId);
    setNote(note);
    setIsLoading(false);
  };
  return (
    <Layout selectedKey={path.updateNote} defaultOpenKey="note">
      {isLoading ? <Skeleton active /> : <ViewUpdateNote note={note} />}
    </Layout>
  );
};
export default UpdateNotePage;
