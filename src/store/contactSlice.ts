import {createSlice} from '@reduxjs/toolkit';
import {Contacts} from '../types';
import {addContact, fetchContacts} from './contactThunks';


export interface ContactsState {
  contacts: Contacts[];
  isLoading: boolean;
  isCreating: boolean
  isCardLoading: boolean;
  isError: boolean;
}

const initialState: ContactsState = {
  contacts: [],
  isLoading: false,
  isCreating: false,
  isError: false,
  isCardLoading: false,
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
    isFetchLoading: (state) => state.isLoading,
    selectCreateContactLoading: (state) => state.isCreating,
    selectContacts: (state) => state.contacts,
    SelectCardLoading: (state) => state.isCardLoading,
  },

});
export const {
  isFetchLoading,
  selectCreateContactLoading,
  selectContacts,
  SelectCardLoading
} = contactsSlice.selectors;


export const ContactsReducer = contactsSlice.reducer;
