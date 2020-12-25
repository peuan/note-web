import { LikeFilled, LikeOutlined } from "@ant-design/icons";
import { Comment, Space } from "antd";
import { StyleCard } from "../../note/style";

const CardHome = ({ note, updateLike, usersLiked }) => {
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
          <LikeOutlined onClick={() => updateLike(note.id, true)} />
        )}
        {Boolean(note.isLiked) === true && (
          <LikeFilled onClick={() => updateLike(note.id, false)} />
        )}
        <span onMouseOver={usersLiked}>{note.totalLike}</span>
      </Space>
    </StyleCard>
  );
};

export default CardHome;
