import { LikeOutlined } from "@ant-design/icons";
import { Comment, Space } from "antd";
import { StyleCard } from "../../note/style";

const CardHome = ({ note, likeNote }) => {
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
      <LikeOutlined onClick={likeNote} />
      <Space></Space>
    </StyleCard>
  );
};

export default CardHome;
