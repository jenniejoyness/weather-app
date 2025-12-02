import React from 'react';
import './AlertCard.css';

const AlertCard = ({ alert }) => {
  const { name, triggered, locationName, rules } = alert;
  
  return (
    <div className="alert-container">
        <h3 className={"alert-detail"}>{name} - {locationName}</h3>
        <div className={"alert-detail"}>{`Condition: ${rules}`} </div>
        <div className="trigger-display"> {triggered ? 'Has been triggered' : 'Has not been triggered'}</div>
    </div>
  );
};

export default AlertCard;
