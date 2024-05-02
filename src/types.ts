export interface IComment {
  by: string;
  id: number;
  kids: number[];
  text: string;
  time: number;
}

export interface IItem {
  id: number;
  by: string;
  descendants: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}
