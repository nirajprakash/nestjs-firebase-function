import { Contact } from 'src/entities/contact.entities';

export default {
  submitted: (name: string, contact: string) => {
    return ` From ${name}, Contact: ${contact}`;
  },
};
