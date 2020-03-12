import { School } from "./school";

export interface Education {
  id?: number;
  school: School;
  degree?: string;
  field?: string;
  start?: number;
  end?: number;
  grade?: string;
  activities?: string;
  description?: string;
}
