import {
  Button,
  FixedLayout,
  Panel,
  PanelHeader,
  PanelSpinner,
  PullToRefresh,
} from "@vkontakte/vkui";
import { FC, useEffect, useRef, useState } from "react";
import { getStories } from "../api/fetchItems";
import axios, { CancelTokenSource } from "axios";
import { IItem } from "../types";
import { StoriesList } from "../components/Stories";

interface HomeProps {
  id: string;
}
export const Home: FC<HomeProps> = ({ id }) => {
  const [stories, setStories] = useState<IItem[]>([]);
  const cancelTokenRef = useRef<CancelTokenSource | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const updateStories = async () => {
    if (cancelTokenRef.current) {
      cancelTokenRef.current.cancel();
    }
    const cancelToken = axios.CancelToken.source();
    cancelTokenRef.current = cancelToken;
    await getStories(cancelToken.token).then(setStories);
  };

  useEffect(() => {
    setLoading(true);
    updateStories().then(() => setLoading(false));
    const timerId = setInterval(() => updateStories(), 60 * 1000);

    return () => {
      clearInterval(timerId);
      if (cancelTokenRef.current) {
        cancelTokenRef.current.cancel();
      }
    };
  }, []);

  const onRefresh = () => {
    setFetching(true);
    updateStories().then(() => setFetching(false));
  };

  return (
    <Panel id={id}>
      <PanelHeader>Hacker News</PanelHeader>
      <PullToRefresh onRefresh={onRefresh} isFetching={fetching}>
        {loading ? (
          <PanelSpinner>Статьи загружаются</PanelSpinner>
        ) : (
          <StoriesList stories={stories} />
        )}
      </PullToRefresh>
      <FixedLayout vertical="bottom" filled>
        <Button onClick={updateStories} stretched size="m">
          Обновить статьи
        </Button>
      </FixedLayout>
    </Panel>
  );
};
