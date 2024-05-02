import { Title } from "@vkontakte/vkui";
import { FC } from "react";
import { IComment } from "../../types";
import { Comment } from "./Comment";
interface CommentSectionProps {
  comments: IComment[];
}
export const CommentSection: FC<CommentSectionProps> = ({ comments }) => {
  return (
    <>
      <Title>Комментарии</Title>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </>
  );
};
