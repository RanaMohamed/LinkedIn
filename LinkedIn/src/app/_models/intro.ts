import { Education } from "./education";
import { ContactInfo } from "./contactInfo";

export interface Intro {
  id?: number;
  Fname?: string;
  Lname?: string;
  imageUrl?: string;
  headLine?: string;
  education?: Education[];
  country?: string;
  locationInCountry?: string;
  industry?: string;
  contactInfo?: ContactInfo;
}
