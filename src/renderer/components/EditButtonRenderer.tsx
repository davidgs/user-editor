import React from 'react';
import { Form, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { Person } from './types/types';

interface Props {
  data: Person;
  clicked: (person: Person) => void;
}

const EditBtnCellRenderer: React.FC<Props> = ({ data, clicked }) => {
  const btnClickedHandler = () => {
    clicked(data);
  };

  return (
    <Form.Group>
      <OverlayTrigger
        overlay={<Tooltip id="tooltip-disabled">Edit {data.Name}</Tooltip>}
      >
        <Button variant="success" size="sm" onClick={btnClickedHandler}>
          Edit
        </Button>
      </OverlayTrigger>
    </Form.Group>
  );
};

export default EditBtnCellRenderer;
