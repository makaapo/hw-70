import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiContact, ApiContacts, Contacts} from '../types';
import axiosApi from '../axiosApi';
import {AppDispatch, RootState} from '../app/store';

export const fetchContacts = createAsyncThunk<
  Contacts[],
  undefined,
  { dispatch: AppDispatch }
>('contacts/fetchContacts', async () => {
  const contactsResponse = await axiosApi.get<ApiContacts | null>('/contacts.json');
  const contacts = contactsResponse.data;

  let newContacts: Contacts[] = [];

  if (contacts) {
    newContacts = Object.keys(contacts).map((key: string) => {
      const contact = contacts[key];
      return {
        id: key,
        ...contact,
      };
    });
  }

  return newContacts;
});

export const addContact = createAsyncThunk<void, ApiContact, { state: RootState }>(
  'contacts/add',
  async (contact: ApiContact) => {
    await axiosApi.post('/contacts.json', contact);
  }
);

export const fetchOneContact = createAsyncThunk<ApiContact, string, {state: RootState}>(
  'contacts/fetchOne',
  async (id) => {
    const { data: dish } = await axiosApi.get<ApiContact | null>(
      `/contacts/${id}.json`,
    );

    if (dish === null) {
      throw new Error('Not found');
    }

    return dish;
  },
);

export interface UpdateContactArg {
  id: string;
  ApiContact: ApiContact;
}

export const updateContact = createAsyncThunk<void, UpdateContactArg, {state: RootState}>(
  'contact/update',
  async ({ id, ApiContact }) => {
    await axiosApi.put(`/contacts/${id}.json`, ApiContact);
  },
);