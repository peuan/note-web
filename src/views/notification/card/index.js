import { LikeFilled, LikeOutlined, LoadingOutlined } from "@ant-design/icons";
import { Comment, Space, Tooltip, Spin } from "antd";
import { Fragment, useState } from "react";
import { PublicNotesService } from "../../../services";
import { StyleCard } from "./style";
const ViewNotificationNote = ({ note, updateLikeNoteId }) => {
  const [userLikes, setUserLikes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUserLikeLoaded, setIsUserLikeLoaded] = useState(false);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const getShowLikes = async (noteId) => {
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
          <LikeOutlined onClick={() => updateLikeNoteId(true)} />
        )}
        {Boolean(note.isLiked) === true && (
          <Fragment>
            <Tooltip
              placement="bottom"
              title={
                isLoading ? (
                  <Spin indicator={antIcon} />
                ) : (
                  userLikes.map((userLike) => {
                    return (
                      <p key={userLike.id}>
                        {userLike.user.firstName}
                        {userLike.user.lastName}
                      </p>
                    );
                  })
                )
              }
            >
              <LikeFilled
                onMouseOver={() => getShowLikes(note.id)}
                onClick={() => updateLikeNoteId(false)}
              />
            </Tooltip>
          </Fragment>
        )}
      </Space>
    </StyleCard>
  );
};
export default ViewNotificationNote;
