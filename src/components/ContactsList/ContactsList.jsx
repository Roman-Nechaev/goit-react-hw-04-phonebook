import PropTypes from 'prop-types';
import { NoContacts } from './NoContacts';

import {
  Container,
  Info,
  Item,
  Text,
  Btn,
  PersonOutline,
  CallOutline,
  IoTrashOut,
} from './ContactsList.stylid';

const ContactsList = ({ quantity, contacts, onDeleteContact }) => (
  <>
    {!quantity ? (
      <NoContacts />
    ) : (
      <>
        <Info>Quantity yours contacts: {quantity}</Info>
        <Container>
          {contacts.map(({ id, name, number }) => (
            <Item key={id}>
              <Text>
                <PersonOutline size={22} />
                {name}: <CallOutline size={22} />
                {number}
              </Text>
              <Btn type="button" onClick={() => onDeleteContact(id)}>
                <IoTrashOut size={20} />
              </Btn>
            </Item>
          ))}
        </Container>
      </>
    )}
  </>
);

export default ContactsList;

ContactsList.propTypes = {
  quantity: PropTypes.number.isRequired,
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
