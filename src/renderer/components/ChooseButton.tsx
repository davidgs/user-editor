import React, { useEffect, useState } from 'react';
import { Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';

const ChooserButton = ({
  onOptionsUpdate,
}: {
  onOptionsUpdate: (value: string) => void;
}) => {
  const [chooserValue, setChooserValue] = useState('Pick one ...');
  const handleSelect = (eventKey) => {
    console.log('handleSelect: ', eventKey);
    setChooserValue(eventKey);
    // Update the parent component with the new list of options
    onOptionsUpdate(eventKey);
  };

  return (
    <OverlayTrigger
      key="chooser-overlay"
      delay={{ show: 250, hide: 400 }}
      placement="left"
      overlay={
        <Tooltip id="chooser-tooltip">
          <strong>Choose which group to manage</strong>.
        </Tooltip>
      }
    >
      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          {chooserValue}
        </Dropdown.Toggle>
        <Dropdown.Menu className="Drop-Item">
          <Dropdown.Item
            eventKey="Drivers"
            className="Drop-Item"
            key="drivers-key"
            id="Drivers"
            value="Drivers"
          >
            Drivers
          </Dropdown.Item>
          <Dropdown.Item
            eventKey="Attendees"
            className="Drop-Item"
            key="attendees-key"
            id="Attendees"
            value="Attendees"
          >
            Attendees
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </OverlayTrigger>
  );
};

export default ChooserButton;
