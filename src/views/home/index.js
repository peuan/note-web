import { Button, Row, Skeleton } from "antd";
import Layout from "antd/lib/layout/layout";
import { useEffect, useState } from "react";
import { NoteService } from "../../services";
import { PublicNotesService } from "../../services/public-note";
import CardHome from "./card";

const ViewHome = () => {
  const [publicNotes, setPublicNote] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userLiked, setUserLiked] = useState([]);
  const [loadingUserLiked, setLoadingUserLiked] = useState(true);
  const [meta, setMeta] = useState({ currentPage: 0, itemsPerPage: 5 });
  const [isLoadingMore, setIsLoadingMore] = useState(true);

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
      setIsLoadingMore(false);
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
  };

  return (
    <Layout>
      <Row>
        {isLoading ? (
          <Skeleton active />
        ) : (
          publicNotes.map((note) => {
            return (
              <CardHome
                note={note}
                usersLiked={usersLiked}
                updateLike={updateLike}
              />
            );
          })
        )}
        {isLoadingMore && <Skeleton active />}
        {Number(meta.currentPage) !== Number(meta.itemsPerPage) &&
          !isLoadingMore && <Button onClick={getNotes}>More...</Button>}
      </Row>
    </Layout>
  );
};

export default ViewHome;
