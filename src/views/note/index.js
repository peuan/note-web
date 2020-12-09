import { Spin, Row, Col, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { NoteService } from "../../services";
import { StyleCard } from "./style";

const ViewNote = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    const note = await NoteService.getNotes();
    setNotes(note);
    setIsLoading(false);
  };

  if (isLoading) {
    return <Skeleton active />;
  }
  return (
    <Row gutter={16}>
      {notes.map((note) => {
        return (
          <Col span={6}>
            <StyleCard key={note.id}>{note.note}</StyleCard>
          </Col>
        );
      })}
    </Row>
  );
};

export default ViewNote;
