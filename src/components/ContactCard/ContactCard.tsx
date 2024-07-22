import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Contacts} from '../../types';
import Spinner from '../Spinner/Spinner';
import Modal from '../Modal/Modal';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {SelectCardLoading, selectDeleteContactLoading} from '../../store/contactSlice';
import {deleteContact, fetchContacts} from '../../store/contactThunks';
import ButtonSpinner from '../Spinner/ButtonSpinner';
import {toast} from 'react-toastify';

interface Props {
  contact: Contacts;
}

const ContactCard: React.FC<Props> = ({contact}) => {
  const [open, setOpen] = useState(false);
  const isLoading = useAppSelector(SelectCardLoading);
  const deleteLoading = useAppSelector(selectDeleteContactLoading);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onDelete = async (id: string) => {
    try {
      await dispatch(deleteContact(id));
      setOpen(false);
      await dispatch(fetchContacts());
      toast.success('Contact deleted!');
    } catch (error) {
      toast.error('Could not delete contact!');
    }
  };

  const imageStyle = {
    background: `url(${contact.photo}) no-repeat center center / cover`,
  };

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="card p-3 mb-2 w-25"
      >
        <div className="row g-0 align-items-center">
          <div
            className="col-sm-4 rounded-start p-5"
            style={imageStyle}
          />
          <div className="col-sm-8 ps-5">
            <p>{contact.name}</p>
          </div>
        </div>
      </div>

      <Modal show={open} onClose={() => setOpen(false)}>
        {isLoading ? <Spinner/> :
          <>
            <div className="modal-body d-flex justify-content-between align-items-center">
              <div
                className="modal-image p-5"
                style={imageStyle}
              />
              <div className="ms-3">
                <h3>{contact.name}</h3>
                <p>{contact.phone}</p>
                <p>{contact.email}</p>
                <button
                  onClick={() => navigate(`/edit-contact/${contact.id}`)}
                  type="button"
                  className="btn btn-warning"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(contact.id)}
                  type="button"
                  className="ms-3 btn btn-danger"
                >Delete
                  {deleteLoading && (<ButtonSpinner />)}
                </button>
              </div>
            </div>
          </>
        }
      </Modal>
    </>
  );
};

export default ContactCard;
