import { useState } from 'react';
import { nanoid } from 'nanoid';
import { Report } from 'notiflix/build/notiflix-report-aio';

import contactsPhonebook from '../Data/contactsPhonebook.json';
import { CONTACTS_KEY } from '../Data/keyLocalStorage';

import ContactForm from './ContactForm/ContactForm';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';

import useLocalStorage from './hooks/useLocalStorage';

import { Container, Title, TitleContacts } from './App.styled';

function App() {
  const [contacts, setСontacts] = useLocalStorage(
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

      setСontacts([subscriber, ...contacts]);

      return;
    }
    // alert(`${name} is already in contacts`);
    Report.failure('Warning!', `"${name}" is already in contacts`, 'Okay');
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = (filter, contacts) => {
    const normaliseFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normaliseFilter)
    );
  };

  const deleteContact = contactId => {
    setСontacts(contacts.filter(contact => contact.id !== contactId));
  };

  const visibleContacts = getVisibleContacts(filter, contacts);
  const quantityContacts = contacts.length;

  return (
    <Container>
      <Title>Phonebook</Title>
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
