import React, { useEffect, useState } from 'react';
import './ToastNotification.css';

const ToastNotification = ({ notification, onClose, autoCloseDelay = 8000 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
    console.log('render toast notification', notification);
  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    // Auto-close timer
    const autoCloseTimer = setTimeout(() => {
      handleClose();
    }, autoCloseDelay);

    return () => {
      clearTimeout(timer);
      clearTimeout(autoCloseTimer);
    };
  }, [autoCloseDelay]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose(notification.id);
    }, 300); // Match the CSS transition duration
  };

  const formatOperator = (operator) => {
    switch (operator) {
      case '>':
        return 'greater than';
      case '<':
        return 'less than';
      case '>=':
        return 'greater than or equal to';
      case '<=':
        return 'less than or equal to';
      case '==':
        return 'equal to';
      case '!=':
        return 'not equal to';
      default:
        return operator;
    }
  };

  const getOperatorSymbol = (operator) => {
    switch (operator) {
      case '>':
        return '>';
      case '<':
        return '<';
      case '>=':
        return '≥';
      case '<=':
        return '≤';
      case '==':
        return '=';
      case '!=':
        return '≠';
      default:
        return operator;
    }
  };

  const formatParameterName = (param) => {
    switch (param) {
      case 'windSpeed':
        return 'Wind Speed';
      case 'temperature':
        return 'Temperature';
      case 'humidity':
        return 'Humidity';
      default:
        return param;
    }
  };

  const formatValue = (param, value) => {
    switch (param) {
      case 'windSpeed':
        return `${value} mph`;
      case 'temperature':
        return `${value}°`;
      case 'humidity':
        return `${value}%`;
      default:
        return value;
    }
  };

  return (
    <div 
      className={`toast-notification ${isVisible ? 'toast-visible' : ''} ${isClosing ? 'toast-closing' : ''}`}
    >
      <div className="toast-header">
        <div className="toast-title">
          {notification.alertName} – {notification.locationName}
        </div>
        <button 
          className="toast-close-button"
          onClick={handleClose}
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
      
      <div className="toast-content">
        <div className="toast-message">
          {formatParameterName(notification.param)} is expected to be{' '}
          <span className="toast-condition">
            {getOperatorSymbol(notification.operator)} {formatValue(notification.param, notification.value)}
          </span>
        </div>
        <div className="toast-actual">
          Actual: <span className="toast-actual-value">
            {formatValue(notification.param, notification.actualValue)}
          </span>
        </div>
      </div>
      
      <div className="toast-timestamp">
        {new Date(notification.triggeredAt).toLocaleTimeString()}
      </div>
    </div>
  );
};

export default ToastNotification;
