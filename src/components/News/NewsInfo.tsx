import { Group, Headline, Link, Text, Title } from "@vkontakte/vkui";
import { FC } from "react";
import { formatDate } from "../../utils/formatDate";
import { IItem } from "../../types";
interface NewsInfoProps {
  story: IItem;
}
export const NewsInfo: FC<NewsInfoProps> = ({ story }) => {
  return (
    <Group>
      <Title>{story.title}</Title>
      <Headline>Автор: {story.by}</Headline>
      <Text>
        Ссылка: <Link href={story.url}>{story.url}</Link>
      </Text>
      <Text>Рейтинг: {story.score}</Text>
      <Text>Дата: {formatDate(story.time)}</Text>
      <Text>Кол-во комментариев: {story.descendants}</Text>
    </Group>
  );
};
