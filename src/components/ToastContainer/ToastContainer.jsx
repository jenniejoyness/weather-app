import React from 'react';
import ToastNotification from '../ToastNotification/ToastNotification';
import './ToastContainer.css';

const ToastContainer = ({ notifications, onRemoveNotification }) => {
  if (!notifications || notifications.length === 0) {
    return null;
  }
    console.log('render toast container', notifications);
  return (
    <div className="toast-container">
      {notifications.map((notification, index) => (
        <div 
          key={notification.id} 
          className="toast-wrapper"
          style={{ 
            '--toast-index': index,
            zIndex: 1000 - index 
          }}
        >
          <ToastNotification
            notification={notification}
            onClose={onRemoveNotification}
            autoCloseDelay={8000}
          />
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
