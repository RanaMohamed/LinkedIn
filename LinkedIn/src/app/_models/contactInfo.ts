export interface URL {
  id?: number;
  url: string;
  type: string;
}

export interface Phone {
  id?: number;
  num: number;
  type: string;
}

export interface InstantMessenger {
  id?: number;
  inMess: string;
  type: string;
}

interface BDate {
  day: number;
  month: string;
}

export interface ContactInfo {
  profileUrl: string;
  urls: URL[];
  phone: Phone;
  address: string;
  email: string;
  instantMess: InstantMessenger[];
  birthday: BDate;
}
