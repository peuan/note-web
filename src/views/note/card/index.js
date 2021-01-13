import {
  DeleteOutlined,
  DislikeFilled,
  DislikeOutlined,
  FolderAddOutlined,
  LikeFilled,
  LikeOutlined,
  ProfileOutlined,
  PushpinFilled,
  PushpinOutlined,
  QuestionCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  Comment,
  Popconfirm,
  Row,
  Col,
  Space,
  Spin,
  Tooltip,
  Button,
} from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { path } from "../../../route";
import { StyleButton, StyleCard } from "../style";

const CardNote = ({ note, moveNote, updateOption }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);

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
        <span>{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {action === "disliked" ? <DislikeFilled /> : <DislikeOutlined />}
        <span>{dislikes}</span>
      </span>
    </Tooltip>,
  ];

  return (
    <StyleCard key={note.id}>
      <Spin spinning={Boolean(note.isLoading)}>
        {note.noteView !== "TRASH" && (
          <Row
            style={{ zIndex: 2, position: "absolute", right: 5, top: 5 }}
            justify="end"
          >
            {note.option === "ACTIVE" && (
              <PushpinOutlined
                onClick={() => updateOption(note.id, "PIN")}
                style={{ color: "grey", fontSize: 20 }}
              />
            )}
            {note.option === "PIN" && (
              <PushpinFilled
                onClick={() => updateOption(note.id, "ACTIVE")}
                style={{ color: "grey", fontSize: 20 }}
              />
            )}
          </Row>
        )}
        <Comment
          actions={actions}
          content={note.note}
          author={
            <h3>
              {note.user.firstName} {note.user.lastName}
            </h3>
          }
        ></Comment>
        <Row>
          <Space>
            {note.noteView !== "ALL" && (
              <Popconfirm
                title="Are you sure move to ALL NOTE?"
                onConfirm={() => moveNote(note.id, "ALL")}
                key={note.id}
                icon={<QuestionCircleOutlined style={{ color: "green" }} />}
              >
                <Button size="large">
                  <ProfileOutlined
                    style={{ color: "grey", fontSize: 20, borderRight: 1 }}
                  />
                  ย้ายไป All Note
                </Button>
              </Popconfirm>
            )}
            {note.noteView !== "ARCHIVE" && (
              <Popconfirm
                title="Are you sure archive this note?"
                onConfirm={() => moveNote(note.id, "ARCHIVE")}
                key={note.id}
                icon={<QuestionCircleOutlined style={{ color: "orange" }} />}
              >
                <Button size="large">
                  <FolderAddOutlined
                    style={{
                      color: "grey",
                      fontSize: 20,
                      borderRightColor: "azure",
                    }}
                  />
                  ย้ายโน๊ตไป ARCHIVE
                </Button>
              </Popconfirm>
            )}
            {note.noteView !== "TRASH" && (
              <Popconfirm
                title="Are you sure delete this note?"
                onConfirm={() => moveNote(note.id, "TRASH")}
                key={note.id}
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              >
                <Button size="large">
                  <DeleteOutlined style={{ color: "grey", fontSize: 20 }} />
                  ลบโน๊ต
                </Button>
              </Popconfirm>
            )}
            <Button size="large">
              <Link to={`${path.updateNote}/${note.id}`}>
                <EditOutlined style={{ color: "grey", fontSize: 20 }} />
                แก้ไขโน๊ต
              </Link>
            </Button>
          </Space>
        </Row>
      </Spin>
    </StyleCard>
  );
};

export default CardNote;
