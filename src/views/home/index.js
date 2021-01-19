import { Col, Divider, Row, Skeleton } from "antd";
import Layout from "antd/lib/layout/layout";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PublicNotesService } from "../../services/public-note";
import CardHome from "./card";

const ViewHome = () => {
  const [publicNotes, setPublicNote] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userLiked, setUserLiked] = useState([]);
  const [loadingUserLiked, setLoadingUserLiked] = useState(true);
  const [meta, setMeta] = useState({ currentPage: 0, itemsPerPage: 4 });

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    setIsLoading(true);
    try {
      const response = await PublicNotesService.getPublicNote({
        page: Number(meta.currentPage) + 1,
        limit: meta.itemsPerPage,
      });
      console.log(response);
      setPublicNote(publicNotes.concat(response.items));
      setMeta(response.meta);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const updateLike = async (noteId, isLiked) => {
    const index = publicNotes.findIndex((note) => note.id === noteId);
    const newPublicNotes = [...publicNotes];
    const note = newPublicNotes[index];
    note.isLiked = isLiked;
    if (isLiked) {
      note.totalLike = note.totalLike + 1;
    } else {
      note.totalLike = note.totalLike - 1;
    }
    setPublicNote(newPublicNotes);
    if (isLiked) {
      await PublicNotesService.updateLike(noteId);
    } else {
      await PublicNotesService.updateDislike(noteId);
    }
  };

  const usersLiked = async (noteId) => {
    setLoadingUserLiked(true);
    const users = await PublicNotesService.getUsersLike(noteId);
    console.log(users);
    setUserLiked(users);
    console.log(userLiked);
  };

  return (
    <Layout>
      <Divider orientation="left">
        <h1 style={{ fontSize: 30 }}>หน้าแรก</h1>
      </Divider>
      <Row gutter={12}>
        {publicNotes.map((note) => {
          return (
            <Col span={12}>
              <CardHome
                key={note.id}
                note={note}
                usersLiked={usersLiked}
                updateLike={updateLike}
              />
            </Col>
          );
        })}
      </Row>
      {isLoading && <Skeleton active />}
      {Number(meta.currentPage) !== Number(meta.totalPages) && !isLoading && (
        <Link
          style={{ justifyContent: "center", display: "flex", width: "100%" }}
          onClick={getNotes}
        >
          เพิ่มเติม
        </Link>
      )}
    </Layout>
  );
};

export default ViewHome;
