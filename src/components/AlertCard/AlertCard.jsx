import React from 'react';
import './AlertCard.css';

const AlertCard = ({ alert }) => {
  const { name, triggered, locationName, rules } = alert;
  
  return (
    <div className="alert-container">
        <h3>{name}</h3>
      <div className="flex flex-col space-y-2">
          <span>{locationName}</span>
           <span>{`Trigger: ${rules}`}</span>
           <span className="font-medium text-gray-800"> {triggered ? 'Triggered' : 'Has not been triggered'}</span>
      </div>
    </div>
  );
};

export default AlertCard;
