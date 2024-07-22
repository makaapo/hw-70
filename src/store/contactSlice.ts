import {createSlice} from '@reduxjs/toolkit';
import {ApiContact, Contacts} from '../types';
import {addContact, deleteContact, fetchContacts, fetchOneContact, updateContact} from './contactThunks';


export interface ContactsState {
  contacts: Contacts[];
  isLoading: boolean;
  isCreating: boolean;
  isCardLoading: boolean;
  fetchOneLoading: boolean;
  oneContact: null | ApiContact;
  updateLoading: boolean;
  deleteLoading: false | string;
}

const initialState: ContactsState = {
  contacts: [],
  isLoading: false,
  isCreating: false,
  isCardLoading: false,
  oneContact: null,
  fetchOneLoading: false,
  updateLoading: false,
  deleteLoading: false
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchContacts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchContacts.fulfilled, (state, { payload: items } ) => {


      state.isLoading = false;
      state.contacts = items;
    });
    builder.addCase(fetchContacts.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(addContact.pending, (state) => {
      state.isCreating = true;
    });
    builder.addCase(addContact.fulfilled, (state ) => {
      state.isCreating = false;
    });
    builder.addCase(addContact.rejected, (state) => {
      state.isCreating = false;
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

    builder
      .addCase(deleteContact.pending, (state, { meta: { arg: contactId } }) => {
        state.deleteLoading = contactId;
      })
      .addCase(deleteContact.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteContact.rejected, (state) => {
        state.deleteLoading = false;
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
    selectDeleteContactLoading: (state) => state.deleteLoading,
  },

});
export const {
  isFetchLoading,
  selectCreateContactLoading,
  selectContacts,
  SelectCardLoading,
  selectFetchOneContactLoading,
  selectUpdateContactLoading,
  selectOneContact,
  selectDeleteContactLoading
} = contactsSlice.selectors;


export const ContactsReducer = contactsSlice.reducer;
