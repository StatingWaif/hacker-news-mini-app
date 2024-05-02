import { FC } from "react";
import { IComment } from "../../types";
import { Comment } from "./Comment";
interface CommentListProps {
  replies: IComment[];
}
export const CommentList: FC<CommentListProps> = ({ replies }) => {
  return (
    <>
      {replies.map((reply) => (
        <Comment key={reply.id} comment={reply} />
      ))}
    </>
  );
};
