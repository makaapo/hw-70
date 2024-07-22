export interface Contact {
  name: string;
  phone: number;
  email: string;
  photo: string;
}

export interface MutateContact {
  name: string;
  phone: string;
  email: string;
  photo: string;
}

export interface ApiContact {
  id: string;
  name: string;
  phone: number;
  email: string;
  photo: string;
}