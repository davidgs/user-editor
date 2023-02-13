import React, { useState, useEffect } from 'react';
import { GoogleApiWrapper, Autocomplete } from 'google-maps-react';

function AutocompleteInput() {
  let location = null;
  const locationInput = React.createRef();
  const [input, setInput] = useState(' ');
  const [arrayInput, setArrayInput] = useState([]);

  const handleChange = (e) => {
    //console.log(e.target.value);
    setInput(e.target.value);
  };

  const setData = (place) => {
    //setInput('');
    const updated = [...arrayInput];
    console.log('test', arrayInput);
    updated.push(place.formatted_address);
    setArrayInput([...updated]);
    console.log('tes3', arrayInput);
  };

  return (
    <>
      <div>
        {arrayInput.map((data, idx) => (
          <p key={idx}>{data}</p>
        ))}
      </div>
      <input
        className="border  border-gray700 mt-4 w-1/2 rounded"
        ref={locationInput}
        value={input}
        onChange={handleChange}
        placeholder="Enter your address"
      />
      <div>
        <p id="selected" />
        <p id="lng" />
        <p id="lat" />
        <p id="all" />
        <p id="other" />
      </div>
    </>
  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBuLSgVZY-8HyIIMsPMKgvfK6LsLCeSlJA',
  libraries: ['places', 'autocomplete', 'geocoder'],
})(AutocompleteInput);
