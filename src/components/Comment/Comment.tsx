import { Button, SimpleCell } from "@vkontakte/vkui";
import { FC, useEffect, useState } from "react";
import { getComments } from "../../api/fetchItems";
import { IComment } from "../../types";
import { CommentList } from "./CommentList";
import { CommentInfo } from "./CommentInfo";

interface CommentProps {
  comment: IComment;
}

export const Comment: FC<CommentProps> = ({ comment }) => {
  const [replies, setReplies] = useState<IComment[]>([]);
  const [expanded, setExpanded] = useState<boolean>(false);
  useEffect(() => {
    if (comment?.kids) {
      getComments(comment.kids).then(setReplies);
    }
  }, [expanded, comment]);
  return (
    <SimpleCell style={{ display: "flex" }}>
      <CommentInfo comment={comment} />
      {replies.length ? (
        <Button onClick={() => setExpanded(!expanded)}>
          {expanded ? "Скрыть ответы" : `Посмотреть ответы (${replies.length})`}
        </Button>
      ) : null}
      {expanded ? (
        <SimpleCell style={{ marginLeft: "2rem" }}>
          <CommentList replies={replies} />
        </SimpleCell>
      ) : null}
    </SimpleCell>
  );
};
