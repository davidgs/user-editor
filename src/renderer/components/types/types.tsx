import { Form } from 'react-bootstrap';

export interface Person {
  Edit: React.ReactElement<typeof Form.Group>;
  Delete: React.ReactElement<typeof Form.Group>;
  Type: string;
  Name: string;
  Address: string;
  City: string;
  State: string;
  Zip: string;
  CellPhone: string;
  Email: string;
  Location: {
    lat: number;
    lng: number;
  };
  HomePhone: string;
  Notes: string;
  _id: string;
}

export const defaultPerson = {
  Edit: null,
  Delete: null,
  Type: '',
  Name: '',
  Address: '',
  City: '',
  State: '',
  Zip: '',
  CellPhone: '',
  Email: '',
  Location: {
    lat: 0.00,
    lng: 0.00,
  },
  HomePhone: '',
  Notes: '',
  _id: '',
}
