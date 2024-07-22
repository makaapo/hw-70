import React from 'react';
import {ApiContact} from '../../types';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import ContactForm from '../../components/ContactForm/ContactForm';
import {addContact} from '../../store/contactThunks';
import {selectCreateContactLoading} from '../../store/contactSlice';

const NewDish: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectCreateContactLoading);

  const onSubmit = async (contact: ApiContact) => {
    try {
      await dispatch(addContact(contact)).unwrap();
      navigate('/');
      toast.success('Contact created');
    } catch (error) {
      toast.error('Could not create contact!');
    }
  };

  return (
    <div className="row mt-2">
      <div className="col">
        <ContactForm onSubmit={onSubmit} isLoading={isCreating} />
      </div>
    </div>
  );
};

export default NewDish;
