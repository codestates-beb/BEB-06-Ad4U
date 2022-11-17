import React from 'react';
const ReactRotatingText = require("react-rotating-text");

const Tyanimation = () => {
  return (
    <div className='typist my-2'>
      <h2>
        You can <br/>
        <ReactRotatingText 
          items={['save brokerage fees.', 'make your imagination a reality.', 'make a trusted contract.','etc.']}
          color = "rgb(108,182,154)"
        />
      </h2>
    </div>
  );
}

export default Tyanimation;