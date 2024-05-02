import { Icon56UserCircleOutline } from "@vkontakte/icons";
import { Div, Text, Title } from "@vkontakte/vkui";
import { FC } from "react";
import { IComment } from "../../types";
import { formatDate } from "../../utils/formatDate";

interface CommentInfoProps {
  comment: IComment;
}
export const CommentInfo: FC<CommentInfoProps> = ({ comment }) => {
  return (
    <Div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Title style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
        <Icon56UserCircleOutline width={30} />
        {comment.by}
      </Title>
      <Text>Дата: {formatDate(comment.time)}</Text>
      <Text dangerouslySetInnerHTML={{ __html: comment.text }}></Text>
    </Div>
  );
};
