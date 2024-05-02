import { FC, useEffect, useState } from "react";
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import {
  Button,
  FixedLayout,
  Group,
  Panel,
  PanelHeader,
} from "@vkontakte/vkui";
import { getComments, getItemById } from "../api/fetchItems";
import { IComment, IItem } from "../types";
import { CommentSection } from "../components/Comment";
import { NewsInfo } from "../components/News/NewsInfo";

export const NewsPage: FC<{ id: string }> = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  const params = useParams<"id">();
  const [story, setStory] = useState<IItem | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);

  useEffect(() => {
    if (params?.id) {
      getItemById(params.id).then((data) => {
        setStory(data);
        if (data.kids) {
          getComments(data.kids).then(setComments);
        }
      });
    }
  }, [params?.id]);

  const updateComments = () => {
    if (story) {
      getComments(story.kids).then(setComments);
    }
  };

  return (
    <Panel id={id}>
      {story ? (
        <>
          <PanelHeader>
            <Button onClick={() => routeNavigator.back()}>Back</Button>
          </PanelHeader>
          <NewsInfo story={story} />
          <Group>
            <CommentSection comments={comments} />
          </Group>
          <FixedLayout vertical="bottom" filled>
            <Button onClick={updateComments} stretched size="m">
              Обновить комментарии
            </Button>
          </FixedLayout>
        </>
      ) : null}
    </Panel>
  );
};
