import {createSlice} from '@reduxjs/toolkit';
import {ApiContact} from '../types';
import {addContact, fetchContacts} from './contactThunks';


export interface ContactsState {
  contacts: ApiContact[];
  isLoading: boolean;
  isCreating: boolean
  isError: boolean;
}

const initialState: ContactsState = {
  contacts: [],
  isLoading: false,
  isCreating: false,
  isError: false,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchContacts.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchContacts.fulfilled, (state, { payload: items } ) => {


      state.isLoading = false;
      state.contacts = items;
    });
    builder.addCase(fetchContacts.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(addContact.pending, (state) => {
      state.isCreating = true;
      state.isError = false;
    });
    builder.addCase(addContact.fulfilled, (state ) => {
      state.isCreating = false;
    });
    builder.addCase(addContact.rejected, (state) => {
      state.isCreating = false;
      state.isError = true;
    });

  },

  selectors: {
    isLoading: (state) => state.isLoading,
    selectCreateContactLoading: (state) => state.isCreating,
  },

});
export const {
  isLoading,
  selectCreateContactLoading,
} = contactsSlice.selectors;


export const ContactsReducer = contactsSlice.reducer;
