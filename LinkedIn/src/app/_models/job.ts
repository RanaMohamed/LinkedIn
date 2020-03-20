import { Company } from "./company";

export interface Job {
  id?: number;
  company: Company;
  title: string;
  description?: string;
  location: string;
  time: string;
  connections: string[];
}
