import axios, { CancelToken } from "axios";
import { IComment, IItem } from "../types";

export const fetchItemsId = async () => {
  const items = await axios.get(
    "https://hacker-news.firebaseio.com//v0/newstories.json?print=pretty"
  );
  const data: number[] = items.data;
  return data.slice(0, 100);
};

export const getStories = async (cancelToken: CancelToken) => {
  const itemIds = await fetchItemsId();
  const result = itemIds.map((id) =>
    axios
      .get(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`,
        { cancelToken: cancelToken }
      )
      .then((data) => data.data)
  );

  return await Promise.all(result);
};

export const getItemById = async (id: string): Promise<IItem> => {
  const data = await axios
    .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
    .then((data) => data.data);
  return data;
};

export const getComments = async (kids: number[]): Promise<IComment[]> => {
  const data = kids.map((kid) =>
    axios
      .get(
        `https://hacker-news.firebaseio.com/v0/item/${kid}.json?print=pretty`
      )
      .then((data) => data.data)
  );
  return await Promise.all(data);
};
