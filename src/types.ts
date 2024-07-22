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

export interface Contacts {
  id: string;
  name: string;
  phone: number;
  email: string;
  photo: string;
}

export type ApiContact = Omit<Contacts, 'id'>;

export interface ApiContacts {
  [id: string]: ApiContact;
}