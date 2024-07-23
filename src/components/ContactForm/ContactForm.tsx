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
      name: contact.name.trim(),
      phone: parseFloat(contact.phone.trim()),
    });
  };

  const placeholderImage = "https://banffventureforum.com/wp-content/uploads/2019/08/no-photo-icon-22.png";
  const photoUrl = contact.photo || placeholderImage;

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <h4 className="text-center"><i className="bi bi-person-vcard me-2"></i>{existingContact ? 'Edit contact' : 'Add new contact'}</h4>
        <div className="mb-3 w-75 mx-auto">
          <label htmlFor="name" className="form-label"> <i className="bi bi-person me-2 fs-4"></i></label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            value={contact.name}
            onChange={changeContact}
            required
            placeholder="Name*"
          />
        </div>

        <div className="mb-3 w-75 mx-auto">
          <label htmlFor="phone" className="form-label"><i className="bi bi-telephone me-2 fs-4"></i></label>
          <input
            type="tel"
            name="phone"
            id="phone"
            className="form-control"
            value={contact.phone}
            onChange={changeContact}
            required
            placeholder="Phone number*"
          />
        </div>

        <div className="mb-3 w-75 mx-auto">
          <label htmlFor="email" className="form-label"><i className="bi bi-envelope me-2 fs-4"></i></label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            value={contact.email}
            onChange={changeContact}
            required
            placeholder="E-mail*"
          />
        </div>

        <div className="mb-3 w-75 mx-auto">
          <label htmlFor="photo" className="form-label"> <i className="bi bi-image me-2 fs-4"></i></label>
          <input
            type="url"
            name="photo"
            id="photo"
            className="form-control"
            value={contact.photo}
            onChange={changeContact}
            required
            placeholder="Photo URL*"
          />
        </div>

        <div className="mb-3 w-75 mx-auto">
          <label htmlFor="photo-preview" className="form-label"> <i className="bi bi-image me-2"></i>Photo preview:</label>
          <img
            className="ms-3 border border-black"
            width="100"
            height="100"
            alt={contact.name}
            src={photoUrl}
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {existingContact ? <i className="bi bi-person-plus fst-normal">Update</i> : <i className="bi bi-person-plus fst-normal">Add</i>}
            {isLoading && <ButtonSpinner/>}
          </button>
          <button
            type="button"
            className="ms-3 btn btn-warning"
            onClick={() => navigate('/')}
          >
            <i className="bi bi-house-door-fill me-2"></i>
            Back to contacts
          </button>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
