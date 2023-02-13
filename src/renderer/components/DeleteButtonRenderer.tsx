import React from 'react';
import { Form, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { Person } from './types/types';

interface Props {
  data: Person;
  clicked: (person: Person) => void;
}

const DeleteBtnCellRenderer: React.FC<Props> = ({ data, clicked }) => {
  const btnClickedHandler = () => {
    clicked(data);
  };

  return (
    <Form.Group>
      <OverlayTrigger
        overlay={
          <Tooltip id="tooltip-disabled">
            Delete {data.Name}
            <br />
            <strong>This action cannot be undone!</strong>
          </Tooltip>
        }
      >
        <Button variant="danger" size="sm" onClick={btnClickedHandler}>
          X
        </Button>
      </OverlayTrigger>
    </Form.Group>
  );
};

export default DeleteBtnCellRenderer;
