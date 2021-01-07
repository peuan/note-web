import { LikeFilled, LikeOutlined } from "@ant-design/icons";
import { Comment, Space } from "antd";
import { StyleCard } from "./style";
const ViewNotificationNote = ({ note, updateLikeNoteId, usersLiked }) => {
  return (
    <StyleCard>
      <Comment
        content={note.note}
        author={
          <h3>
            {note.user.firstName} {note.user.lastName}
          </h3>
        }
      ></Comment>
      <Space>
        {Boolean(note.isLiked) === false && (
          <LikeOutlined onClick={() => updateLikeNoteId(true)} />
        )}
        {Boolean(note.isLiked) === true && (
          <LikeFilled
            // onMouseOver={() => usersLiked(note.id)}
            onClick={() => updateLikeNoteId(false)}
          />
        )}
      </Space>
    </StyleCard>
  );
};
export default ViewNotificationNote;
