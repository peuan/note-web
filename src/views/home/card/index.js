import { LikeFilled, LikeOutlined, LoadingOutlined } from "@ant-design/icons";
import { Comment, Space, Tooltip, Spin } from "antd";
import { useState } from "react";
import { PublicNotesService } from "../../../services";
import { StyleCard } from "../../home/card/style";

const CardHome = ({ note, updateLike }) => {
  const [userLikes, setUserLikes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUserLikeLoaded, setIsUserLikeLoaded] = useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />;
  const getUserLikes = async (noteId) => {
    if (isUserLikeLoaded === true || isLoading === true) {
      return;
    }
    setIsLoading(true);
    try {
      const userLike = await PublicNotesService.getShowLikes(noteId);
      console.log(userLike);
      setUserLikes(userLike.items);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
    setIsUserLikeLoaded(true);
  };
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
          <Tooltip
            placement="bottom"
            title={
              isLoading ? (
                <Spin indicator={antIcon} />
              ) : (
                userLikes.map((userLike) => {
                  return (
                    <p>
                      {userLike.user.firstName}
                      {userLike.user.lastName}
                    </p>
                  );
                })
              )
            }
          >
            <LikeFilled
              onMouseOver={() => getUserLikes(note.id)}
              onClick={() => updateLike(note.id, false)}
            />
          </Tooltip>
        )}
      </Space>
    </StyleCard>
  );
};

export default CardHome;
