export interface Post {
  id?: number;
  user?: User;
  date?: Date;
  description?: string;
  images?: string[];
  video?: string;
  likes?: number;
  comments?: Comment[];
  isLiked?: boolean;
}

export interface User {
  name?: string;
  headline?: string;
  image?: string;
}

export interface Comment {
  id?: number;
  user?: User;
  comment?: string;
  date?: Date;
}
