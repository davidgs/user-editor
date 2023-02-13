import { useEffect, useState, useRef, SyntheticEvent } from 'react';
import { Button, Form, Modal, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { Person } from './types/types';

export default function PersonForm({
  showForm,
  editPerson,
  onOptionsUpdate,
}: {
  showForm: boolean;
  editPerson: Person;
  onOptionsUpdate: (id: string, type: string) => void;
}) {
  const [chooserValue, setChooserValue] = useState('Pick one ...');
  const [show, setShow] = useState<boolean>(false);
  const [newPerson, setNewPerson] = useState<Person>();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const inputRef = useRef(null);
  // const { ref: bootstrapRef } = usePlacesWidget({
  //   apiKey: 'AIzaSyBuLSgVZY-8HyIIMsPMKgvfK6LsLCeSlJA',
  //   onPlaceSelected: (place) => console.log(place),
  // });

  useEffect(() => {
    console.log('useEffect: ', showForm);
    setShow(showForm);
    handleShow();
  }, [showForm]);

  useEffect(() => {
    console.log('useEffect: ', editPerson);
    if (editPerson) {
      setNewPerson(editPerson);
    }
  }, [editPerson]);

  const handleChange = (event: SyntheticEvent) => {
    console.log('handleChange: ', event.name, event.target.value);
    console.log('New Person: ', newPerson);
    setNewPerson((prevNewPerson) => {
      const field: string = event?.target?.name;
      const newPers = { ...prevNewPerson };
      newPers[field] = event?.target?.value;
      return newPers;
    });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {newPerson?.Name === '' || newPerson === undefined ? `Add Person` : `Edit ${newPerson?.Name}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col sm={12}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    placeholder="Full name"
                    name="Name"
                    onChange={handleChange}
                    value={newPerson?.Name}
                  />
                </Form.Group>
              </Col>
            </Row>
            <p />
            <Row>
              <Col sm={12}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    placeholder="Street Address"
                    name="address"
                    onChange={handleChange}
                    value={newPerson?.Address}
                  />
                </Form.Group>
              </Col>
            </Row>
            <p />
            <Row>
              <Col sm={6}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    placeholder="City"
                    name="city"
                    onChange={handleChange}
                    value={newPerson?.City}
                  />
                </Form.Group>
              </Col>
              <Col sm={3}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    placeholder="State"
                    name="state"
                    onChange={handleChange}
                    value={newPerson?.State}
                  />
                </Form.Group>
              </Col>
              <Col sm={3}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    placeholder="Zip code"
                    name="zipCode"
                    onChange={handleChange}
                    value={newPerson?.Zip}
                  />
                </Form.Group>
              </Col>
            </Row>
            <p />
            <Row>
              <Col sm={6}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    placeholder="Home phone"
                    name="homePhone"
                    onChange={handleChange}
                    value={newPerson?.HomePhone}
                  />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    placeholder="Cell phone"
                    name="cellPhone"
                    onChange={handleChange}
                    value={newPerson?.CellPhone}
                  />
                </Form.Group>
              </Col>
            </Row>
            <p />
            <Row>
              <Col sm={12}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    placeholder="Email Address"
                    name="email"
                    onChange={handleChange}
                    value={newPerson?.Email}
                  />
                </Form.Group>
              </Col>
            </Row>
            <p />
            <Row>
              <Col sm={12}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control as="textarea" rows={6}
                    placeholder="Notes"
                    name="notes"
                    onChange={handleChange}
                    value={newPerson?.Notes}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

PersonForm.propTypes = {
  showForm: PropTypes.bool.isRequired,
  idString: PropTypes.string.isRequired,
  typeString: PropTypes.string.isRequired,
  onOptionsUpdate: PropTypes.func.isRequired,
};
