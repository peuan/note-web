import { Col, Row, Skeleton } from "antd";
import Layout from "antd/lib/layout/layout";
import { useEffect, useState } from "react";
import { PublicNotesService } from "../../services/public-note";
import CardHome from "./card";

const ViewHome = () => {
  const [publicNotes, setPublicNote] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [like, setLike] = useState(false);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    setIsLoading(true);
    const note = await PublicNotesService.getPublicNote({ page: 1, limit: 5 });
    console.log(note);
    setPublicNote(note);
    setIsLoading(false);
  };

  const likeNote = async () => {};

  const unlinkNote = async () => {};

  return (
    <Layout>
      <Row>
        {isLoading ? (
          <Skeleton active />
        ) : (
          publicNotes.map((note) => {
            return <CardHome note={note} likeNote={likeNote} />;
          })
        )}
      </Row>
    </Layout>
  );
};

export default ViewHome;
