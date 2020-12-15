import { Comment, Row, Skeleton, Tooltip, Tabs, Space, Popconfirm } from "antd";
import { useEffect, useState, React } from "react";
import { NoteService } from "../../services";
import { StyleCard } from "./style";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
  DeleteOutlined,
  FolderAddOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import Layout from "antd/lib/layout/layout";

const ViewNote = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  const [selectTab, setSelectTab] = useState("ALL");

  useEffect(() => {
    getNotes();
  }, [selectTab]);

  const { TabPane } = Tabs;

  const getNotes = async () => {
    setIsLoading(true);
    const note = await NoteService.getNotes({
      page: 1,
      limit: 10,
      noteView: selectTab,
    });
    console.log(note);
    setNotes(note);
    setIsLoading(false);
  };

  const moveNote = async (noteId, noteView) => {
    console.log(noteId);
    await NoteService.moveNote(noteId, { noteView });
    getNotes();
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

  return (
    <Layout>
      <Row>
        <Tabs
          defaultActiveKey="ALL"
          centered
          onChange={(value) => setSelectTab(value)}
          activeKey={selectTab}
        >
          <TabPane tab="ALL NOTE" key="ALL"></TabPane>
          <TabPane tab="ARCHIVE" key="ARCHIVE"></TabPane>
          <TabPane tab="TRASH" key="TRASH"></TabPane>
        </Tabs>

        {isLoading ? (
          <Skeleton active />
        ) : (
          notes.map((note) => {
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
                ></Comment>
                <Space>
                  <Popconfirm
                    title="Are you sure archive this note?"
                    onConfirm={() => moveNote(note.id, "ARCHIVE")}
                    key={note.id}
                    icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                  >
                    <FolderAddOutlined
                      style={{ color: "grey", fontSize: 20 }}
                    />
                  </Popconfirm>
                  <Popconfirm
                    title="Are you sure delete this note?"
                    onConfirm={() => moveNote(note.id, "TRASH")}
                    key={note.id}
                    icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                  >
                    <DeleteOutlined style={{ color: "grey", fontSize: 20 }} />
                  </Popconfirm>
                </Space>
              </StyleCard>
            );
          })
        )}
      </Row>
    </Layout>
  );
};

export default ViewNote;
