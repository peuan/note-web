import { Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Layout from "../../../layout";
import { path } from "../../../route";
import { PublicNotesService } from "../../../services";
import ViewNotificationNote from "../../../views/notification/card";
const NotificationPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingUserLiked, setLoadingUserLiked] = useState(true);
  const [userLikes, setUserLiked] = useState([]);
  const [note, setNote] = useState();
  const { noteId } = useParams();
  useEffect(() => {
    getNotesById();
  }, [noteId]);
  const getNotesById = async () => {
    setIsLoading(true);
    try {
      const note = await PublicNotesService.getPublicNoteById(noteId);
      console.log(note);

      setNote(note);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const updateLikeNoteId = async (isLiked) => {
    const newNote = { ...note };
    newNote.isLiked = isLiked;
    if (isLiked) {
      newNote.totalLike = newNote.totalLike + 1;
    } else {
      newNote.totalLike = newNote.totalLike - 1;
    }
    setNote(newNote);
    if (isLiked) {
      PublicNotesService.updateLike(noteId);
    } else {
      PublicNotesService.updateDislike(noteId);
    }
  };
  const usersLiked = async (noteId) => {
    setLoadingUserLiked(true);
    const users = await PublicNotesService.getUsersLike(noteId);
    console.log(users);
    setUserLiked(users);
  };
  return (
    <Layout selectedKey={path.notificationNote} defaultOpenKey="note">
      {isLoading ? (
        <Skeleton active />
      ) : (
        <ViewNotificationNote
          note={note}
          updateLikeNoteId={updateLikeNoteId}
          usersLiked={usersLiked}
        />
      )}
    </Layout>
  );
};
export default NotificationPage;
