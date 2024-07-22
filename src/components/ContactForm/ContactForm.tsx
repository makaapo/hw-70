import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Contact, MutateContact} from '../../types';
import ButtonSpinner from '../Spinner/ButtonSpinner';

interface Props {
  onSubmit: (contact: Contact) => void;
  existingContact?: Contact;
  isLoading?: boolean;
}

const emptyState: MutateContact = {
  name: '',
  phone: '',
  email: '',
  photo: '',
};

const ContactForm: React.FC<Props> = ({onSubmit, existingContact, isLoading = false}) => {
  const navigate = useNavigate();
  const initialState: MutateContact = existingContact
    ? {...existingContact, phone: existingContact.phone.toString()}
    : emptyState;

  const [contact, setContact] = useState<MutateContact>(initialState);


  useEffect(() => {
    setContact(initialState);
  }, [existingContact]);

  const changeContact = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onSubmit({
      ...contact,
      phone: parseFloat(contact.phone),
    });
  };

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <h4 className="text-center">{existingContact ? 'Edit contact' : 'Add new contact'}</h4>
        <div className="mb-3 w-75 mx-auto">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            value={contact.name}
            onChange={changeContact}
          />
        </div>

        <div className="mb-3 w-75 mx-auto">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input
            type="text"
            name="phone"
            id="phone"
            className="form-control"
            value={contact.phone}
            onChange={changeContact}
          />
        </div>

        <div className="mb-3 w-75 mx-auto">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            value={contact.email}
            onChange={changeContact}
          />
        </div>

        <div className="mb-3 w-75 mx-auto">
          <label htmlFor="photo" className="form-label">Photo</label>
          <input
            type="text"
            name="photo"
            id="photo"
            className="form-control"
            value={contact.photo}
            onChange={changeContact}
          />
        </div>

        <div className="mb-3 w-75 mx-auto">
          <label htmlFor="photo-preview" className="form-label">Photo preview:</label>
          <img
            className="ms-3 border border-black"
            width="100"
            height="100"
            alt={contact.name}
            src={contact.photo}
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {existingContact ? 'Update' : 'Add'}
            {isLoading && <ButtonSpinner/>}
          </button>
          <button
            type="button"
            className="ms-3 btn btn-warning"
            onClick={() => navigate('/')}
          >
            Back to contacts
          </button>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
