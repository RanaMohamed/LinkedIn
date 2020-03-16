import { Company } from "./company";
import { DateData } from "./dateData";

export interface Experience {
  id?: number;
  title?: string;
  type?: string;
  company?: Company;
  location?: string;
  start?: DateData;
  end?: DateData;
  description?: string;
}
