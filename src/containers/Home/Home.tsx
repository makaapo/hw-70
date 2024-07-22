import React, {useEffect} from 'react';
import {fetchContacts} from '../../store/contactThunks';
import ContactCard from '../../components/ContactCard/ContactCard';
import Spinner from '../../components/Spinner/Spinner';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {isFetchLoading, selectContacts} from '../../store/contactSlice';

const Home: React.FC = () => {
  const contacts = useAppSelector(selectContacts);
  const isLoading = useAppSelector(isFetchLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      {isLoading ? <Spinner/> :
        <>
          {contacts.length === 0 ? <h4>No contacts</h4> :
            <>
              {contacts.map((contact) => (
                <ContactCard key={contact.id} contact={contact}/>
              ))}
            </>
          }
        </>
      }
    </>
  );
};

export default Home;