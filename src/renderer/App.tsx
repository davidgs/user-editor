import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import './App.css';
import { Row, Col, Button } from 'react-bootstrap';
import Table from './Table';
import MainHeader from './MainHeader';
import ChooserButton from './components/ChooseButton';
import PersonForm from './components/PersonForm';
import { defaultPerson } from './components/types/types';

const Hello = () => {
  const [tableType, setTableType] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [idString, setIdString] = useState('');

  const personCallback = (id: string, tType: string) => {
    console.log('personCallback: ', id, tType);
    setIdString(id);
    setTableType(tType);
    setShowForm(true);
  };

  return (
    <div>
      <MainHeader />
      <div>
        <Row>
          <Col sm={3} />
          <Col sm={2}>
            <ChooserButton onOptionsUpdate={setTableType} />
          </Col>
          <Col sm={1} />
          <Col sm={3}>
            {' '}
            <Button variant="success" onClick={() => setShowForm(true)}>
              Add Person
            </Button>
            <PersonForm
              show={showForm}
              editPerson={defaultPerson}
              onOptionsUpdate={personCallback}
            />
          </Col>
          <Col sm={3} />
        </Row>
      </div>
      <p />
      <Table tableType={tableType} />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
