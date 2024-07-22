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