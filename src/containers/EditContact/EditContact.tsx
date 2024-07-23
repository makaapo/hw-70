import {useNavigate, useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {ApiContact} from '../../types';
import {toast} from 'react-toastify';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import Spinner from '../../components/Spinner/Spinner';
import ContactForm from '../../components/ContactForm/ContactForm';
import {selectFetchOneContactLoading, selectOneContact, selectUpdateContactLoading} from '../../store/contactSlice';
import {fetchOneContact, updateContact} from '../../store/contactThunks';

const EditDish = () => {
  const navigate = useNavigate();
  const {id} = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const isFetching = useAppSelector(selectFetchOneContactLoading);
  const isUpdating = useAppSelector(selectUpdateContactLoading);
  const contact = useAppSelector(selectOneContact);

  const onSubmit = async (ApiContact: ApiContact) => {
    try {
      await dispatch(updateContact({id, ApiContact})).unwrap();
      navigate('/');
      toast.success('Contact updated!');
    } catch (e) {
      toast.error('Could not update contact!');
    }
  };

  useEffect(() => {
    dispatch(fetchOneContact(id));
  }, [dispatch, id]);

  return (
    <div className="row mt-2">
      <div className="col">
        {isFetching && <Spinner/>}
        {contact && (
          <ContactForm
            onSubmit={onSubmit}
            existingContact={contact}
            isLoading={isUpdating}
          />
        )}
      </div>
    </div>
  );
};

export default EditDish;
