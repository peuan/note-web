import {
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined,
  PushpinFilled,
  PushpinOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { IoIosRedo, IoMdTrash } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { BsFillFolderSymlinkFill } from "react-icons/bs";
import { Comment, Popconfirm, Row, Space, Spin, Tooltip, Divider } from "antd";
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
    <StyleCard key={note.id} bodyStyle={{ paddingBottom: "10px" }}>
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
        <Row justify="space-around" style={{ borderTop: "1px solid #f0f0f0" }}>
          <Space
            split={<Divider type="vertical" style={{ height: "1.5em" }} />}
            style={{
              justifyContent: "space-around",
              display: "flex",
              width: "100%",
            }}
          >
            {note.noteView !== "ALL" && (
              <Popconfirm
                title="Are you sure move to ALL NOTE?"
                onConfirm={() => moveNote(note.id, "ALL")}
                key={note.id}
                icon={<QuestionCircleOutlined style={{ color: "green" }} />}
              >
                <StyleButton
                  size="middle"
                  buttonColor="#85C1E9 "
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <IoIosRedo
                    style={{ color: "grey", fontSize: 20, borderRight: 1 }}
                  />
                  ย้ายไป All Note
                </StyleButton>
              </Popconfirm>
            )}
            {note.noteView !== "ARCHIVE" && (
              <Popconfirm
                title="Are you sure archive this note?"
                onConfirm={() => moveNote(note.id, "ARCHIVE")}
                key={note.id}
                icon={<QuestionCircleOutlined style={{ color: "orange" }} />}
              >
                <StyleButton
                  size="middle"
                  buttonColor="#7DCEA0"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <BsFillFolderSymlinkFill
                    style={{
                      color: "grey",
                      fontSize: 20,
                      borderRightColor: "azure",
                    }}
                  />
                  ย้ายโน๊ตไป ARCHIVE
                </StyleButton>
              </Popconfirm>
            )}
            {note.noteView !== "TRASH" && (
              <Popconfirm
                title="Are you sure delete this note?"
                onConfirm={() => moveNote(note.id, "TRASH")}
                key={note.id}
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              >
                <StyleButton
                  size="middle"
                  buttonColor="#F5B7B1 "
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <IoMdTrash style={{ color: "grey", fontSize: 20 }} />
                  ลบโน๊ต
                </StyleButton>
              </Popconfirm>
            )}
            <StyleButton
              size="middle"
              buttonColor="#F9E79F "
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Link to={`${path.updateNote}/${note.id}`}>
                <FaEdit style={{ color: "grey", fontSize: 20 }} />
                แก้ไขโน๊ต
              </Link>
            </StyleButton>
          </Space>
        </Row>
      </Spin>
    </StyleCard>
  );
};

export default CardNote;
