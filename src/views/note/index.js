import { Comment, Row, Skeleton, Tooltip, Tabs } from "antd";
import { createElement, useEffect, useState, React } from "react";
import { NoteService } from "../../services";
import { StyleCard } from "./style";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from "@ant-design/icons";
import Layout from "antd/lib/layout/layout";

const ViewNote = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    const note = await NoteService.getNotes();
    setNotes(note);
    setIsLoading(false);
  };

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction("liked");
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction("disliked");
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {action === "liked" ? <LikeFilled /> : <LikeOutlined />}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {action === "disliked" ? <DislikeFilled /> : <DislikeOutlined />}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
  ];

  if (isLoading) {
    return <Skeleton active />;
  }
  return (
    <Layout>
      <Row>
        {notes.map((note) => {
          return (
            <StyleCard key={note.id}>
              <Comment
                actions={actions}
                content={note.note}
                author={
                  <h3>
                    {note.user.firstName} {note.user.lastName}
                  </h3>
                }
              />
            </StyleCard>
          );
        })}
      </Row>
    </Layout>
  );
};

export default ViewNote;
