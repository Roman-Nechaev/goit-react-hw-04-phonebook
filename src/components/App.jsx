import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Report } from 'notiflix/build/notiflix-report-aio';

import ContactForm from './ContactForm/ContactForm';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';

import { Container, Title, TitleContacts } from './App.styled';

const LOCALSTORAGE_KEY = 'contacts';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(contacts));
    }
  }

  componentDidMount() {
    const contact = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

    if (contact) {
      this.setState({ contacts: contact });
    }
  }

  addContact = ({ name, number }) => {
    const check = this.nameCheck(name);

    if (check.length <= 0) {
      const subscriber = {
        id: nanoid(),
        name,
        number,
      };

      this.setState(prevState => ({
        contacts: [subscriber, ...prevState.contacts],
      }));
      return;
    }
    // alert(`${name} is already in contacts`);
    Report.failure('Warning!', `"${name}" is already in contacts`, 'Okay');
  };

  nameCheck = name => {
    const { contacts } = this.state;

    return contacts.filter(contact => contact.name.includes(name));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;

    const normaliseFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normaliseFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter, contacts } = this.state;
    const visibleContacts = this.getVisibleContacts();
    const quantity = contacts.length;

    return (
      <Container>
        <Title>Phonebook</Title>
        <ContactForm onSubmit={this.addContact} />

        <TitleContacts>Contacts</TitleContacts>
        <Filter value={filter} onChange={this.changeFilter} />

        <ContactsList
          quantity={quantity}
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </Container>
    );
  }
}

export default App;
