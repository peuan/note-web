import { Spin, Card, Row, Col, Button } from "antd";
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
    <Spin style={{ width: 500, height: 500 }} />;
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
