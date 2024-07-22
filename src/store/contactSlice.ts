import {createSlice} from '@reduxjs/toolkit';
import {ApiContact, Contacts} from '../types';
import {addContact, fetchContacts, fetchOneContact, updateContact} from './contactThunks';


export interface ContactsState {
  contacts: Contacts[];
  isLoading: boolean;
  isCreating: boolean
  isCardLoading: boolean;
  isError: boolean;
  fetchOneLoading: boolean;
  oneContact: null | ApiContact;
  updateLoading: boolean,
}

const initialState: ContactsState = {
  contacts: [],
  isLoading: false,
  isCreating: false,
  isError: false,
  isCardLoading: false,
  oneContact: null,
  fetchOneLoading: false,
  updateLoading: false
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
    builder
      .addCase(fetchOneContact.pending, (state) => {
        state.oneContact = null;
        state.fetchOneLoading = true;
      })
      .addCase(fetchOneContact.fulfilled, (state, { payload: apiContact }) => {
        state.oneContact = apiContact;
        state.fetchOneLoading = false;
      })
      .addCase(fetchOneContact.rejected, (state) => {
        state.fetchOneLoading = false;
      });

    builder
      .addCase(updateContact.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateContact.fulfilled, (state) => {
        state.updateLoading = false;
      })
      .addCase(updateContact.rejected, (state) => {
        state.updateLoading = false;
      });
  },

  selectors: {
    isFetchLoading: (state) => state.isLoading,
    selectCreateContactLoading: (state) => state.isCreating,
    selectContacts: (state) => state.contacts,
    SelectCardLoading: (state) => state.isCardLoading,
    selectFetchOneContactLoading: (state) => state.fetchOneLoading,
    selectUpdateContactLoading: (state) => state.updateLoading,
    selectOneContact: (state) => state.oneContact,
  },

});
export const {
  isFetchLoading,
  selectCreateContactLoading,
  selectContacts,
  SelectCardLoading,
  selectFetchOneContactLoading,
  selectUpdateContactLoading,
  selectOneContact
} = contactsSlice.selectors;


export const ContactsReducer = contactsSlice.reducer;
