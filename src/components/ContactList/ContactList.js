import PropTypes from 'prop-types';
import { ContactPhonebook } from 'components/ContactPhonebook/ContactPhonebook';
import { List } from './ContactList.styled';

export const ContactList = ({ contacts, onDeleteBtn }) => {
  return (
    <List>
      {contacts.map(({ name, id, number }) => {
        return (
          <ContactPhonebook
            key={id}
            id={id}
            name={name}
            number={number}
            onDeleteBtn={onDeleteBtn}
          />
        );
      })}
    </List>
  );
};

ContactList.prototypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDeleteBtn: PropTypes.func.isRequired,
};
