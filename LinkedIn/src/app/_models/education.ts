import { School } from "./school";
import { DateData } from "./dateData";

export interface Education {
  id?: number;
  school: School;
  degree?: string;
  field?: string;
  start?: DateData;
  end?: DateData;
  grade?: string;
  activities?: string;
  description?: string;
}
