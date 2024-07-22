import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Contacts} from '../../types';
import Spinner from '../Spinner/Spinner';
import Modal from '../Modal/Modal';
import {useAppSelector} from '../../app/hooks';
import {SelectCardLoading} from '../../store/contactSlice';

interface Props {
  contact: Contacts;
}

const ContactCard: React.FC<Props> = ({contact}) => {
  const [open, setOpen] = useState(false);
  const isLoading = useAppSelector(SelectCardLoading);
  const navigate = useNavigate();

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
                  type="button"
                  className="ms-3 btn btn-danger"
                >
                  Delete
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
