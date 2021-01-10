import { Button, Row, Skeleton } from "antd";
import Layout from "antd/lib/layout/layout";
import { useEffect, useState } from "react";
import { PublicNotesService } from "../../services/public-note";
import CardHome from "./card";

const ViewHome = () => {
  const [publicNotes, setPublicNote] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userLiked, setUserLiked] = useState([]);
  const [loadingUserLiked, setLoadingUserLiked] = useState(true);
  const [meta, setMeta] = useState({ currentPage: 0, itemsPerPage: 5 });

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
      <Row>
        {publicNotes.map((note) => {
          return (
            <CardHome
              key={note.id}
              note={note}
              usersLiked={usersLiked}
              updateLike={updateLike}
            />
          );
        })}
        {isLoading && <Skeleton active />}
        {Number(meta.currentPage) !== Number(meta.itemsPerPage) &&
          !isLoading && <Button onClick={getNotes}>More...</Button>}
      </Row>
    </Layout>
  );
};

export default ViewHome;
