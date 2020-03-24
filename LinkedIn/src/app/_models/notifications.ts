export interface Notifications {
  id?: number;
  user?: User;
  date?: Date;
  title?: string;
  description?: string;
  Reactions?: number;
  noComments?: number;
  unRead?: boolean;
  actionBtn?: string;
}

export interface User {
  Fname?: string;
  Lname?: string;
  imageUrl?: string;
}
