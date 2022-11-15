import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { SectionForm } from './SectionForm/SectionForm';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const id = nanoid();
    const contactItem = {
      id,
      name,
      number,
    };

    contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())
      ? alert(`${name} is already in contacts`)
      : setContacts(state => [...state, contactItem]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const filterContactList = () => {
    const normilizedValue = filter.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normilizedValue)
    );
  };

  const deleteContact = e => {
    const contactId = e.currentTarget.id;
    setContacts(state => state.filter(contact => contact.id !== contactId));
  };

  return (
    <SectionForm>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact}></ContactForm>
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />

      {contacts.length > 0 ? (
        <ContactList
          contacts={filterContactList()}
          onDeleteBtn={deleteContact}
        />
      ) : (
        <p>Your phonebook is empty.</p>
      )}
    </SectionForm>
  );
};
