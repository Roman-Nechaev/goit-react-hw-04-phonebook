import { useState } from 'react';
import { nanoid } from 'nanoid';
import { Report } from 'notiflix/build/notiflix-report-aio';

import { CONTACTS_KEY } from '../Data/keyLocalStorage';
import ContactForm from './ContactForm/ContactForm';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';

import useLocalStorage from './hooks/useLocalStorage';
import contactsPhonebook from '../Data/contactsPhonebook.json';

import { Container, Title, TitleContacts } from './App.styled';

function App() {
  const [contacts, setContacts] = useLocalStorage(
    CONTACTS_KEY,
    contactsPhonebook
  );

  const [filter, setFilter] = useState('');

  const nameCheck = name => {
    return contacts.filter(contact => contact.name.includes(name));
  };

  const addContact = ({ name, number }) => {
    const check = nameCheck(name);
    if (check.length <= 0) {
      const subscriber = {
        id: nanoid(),
        name,
        number,
      };

      setContacts([subscriber, ...contacts]);

      return;
    }
    // alert(`${name} is already in contacts`);
    Report.failure('Warning!', `"${name}" is already in contacts`, 'Okay');
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = (filter, contacts) => {
    const normalizeFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const visibleContacts = getVisibleContacts(filter, contacts);
  const quantityContacts = contacts.length;

  return (
    <Container>
      <Title>PhoneBook</Title>
      <ContactForm onSubmit={addContact} />

      <TitleContacts>Contacts</TitleContacts>
      <Filter value={filter} onChange={changeFilter} />

      <ContactsList
        quantity={quantityContacts}
        contacts={visibleContacts}
        onDeleteContact={deleteContact}
      />
    </Container>
  );
}

export default App;
