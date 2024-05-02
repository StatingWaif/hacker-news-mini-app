import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import {
  Card,
  Group,
  Header,
  Headline,
  SimpleCell,
  Text,
  Title,
} from "@vkontakte/vkui";
import { FC } from "react";
import { formatDate } from "../../utils/formatDate";
import { IItem } from "../../types";
interface StoriesListProps {
  stories: IItem[];
}
export const StoriesList: FC<StoriesListProps> = ({ stories }) => {
  const routeNavigator = useRouteNavigator();

  return (
    <Group
      mode="card"
      header={<Header mode="secondary">Список новостей</Header>}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      {stories
        .sort((a, b) => a.time - b.time)
        .map((story, index) => (
          <Card key={index}>
            <SimpleCell
              onClick={() => routeNavigator.push(`/news/${story.id}`)}
            >
              <Title>
                {index + 1}) {story.title}
              </Title>
              <Headline>Автор: {story.by}</Headline>
              <Text>Рейтинг: {story.score}</Text>
              <Text>Дата: {formatDate(story.time)}</Text>
              <Text>Кол-во комментариев: {story.descendants}</Text>
            </SimpleCell>
          </Card>
        ))}
    </Group>
  );
};
