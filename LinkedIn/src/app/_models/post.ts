import { Intro } from "./intro";

export interface Post {
  id?: number;
  user?: Intro;
  date?: Date;
  description?: string;
  images?: string[];
  video?: string;
  likes?: number;
  comments?: Comment[];
  isLiked?: boolean;
}

export interface Comment {
  id?: number;
  user?: Intro;
  comment?: string;
  date?: Date;
}
