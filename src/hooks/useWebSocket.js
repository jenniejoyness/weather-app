import { useEffect, useCallback, useState } from 'react';
import websocketService from '../services/websocketService';

export const useWebSocket = () => {
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [lastMessage, setLastMessage] = useState(null);

  useEffect(() => {
    // Update connection status
    const updateStatus = () => {
      setConnectionStatus(websocketService.getConnectionStatus());
    };

    // Set up event listeners
    const handleConnected = () => {
      setConnectionStatus('connected');
    };

    const handleDisconnected = () => {
      setConnectionStatus('disconnected');
    };

    const handleError = (error) => {
      console.error('WebSocket error in hook:', error);
      setConnectionStatus('error');
    };

    const handleMessage = (data) => {
      setLastMessage(data);
    };

    // Add listeners
    websocketService.on('connected', handleConnected);
    websocketService.on('disconnected', handleDisconnected);
    websocketService.on('error', handleError);
    websocketService.on('message', handleMessage);

    // Connect if not already connected
    if (websocketService.getConnectionStatus() === 'disconnected') {
      websocketService.connect();
    }

    // Update initial status
    updateStatus();

    // Cleanup on unmount
    return () => {
      websocketService.off('connected', handleConnected);
      websocketService.off('disconnected', handleDisconnected);
      websocketService.off('error', handleError);
      websocketService.off('message', handleMessage);
    };
  }, []);

  const sendMessage = useCallback((message) => {
    websocketService.send(message);
  }, []);

  const connect = useCallback(() => {
    websocketService.connect();
  }, []);

  const disconnect = useCallback(() => {
    websocketService.disconnect();
  }, []);

  return {
    connectionStatus,
    lastMessage,
    sendMessage,
    connect,
    disconnect
  };
};

export const useAlertNotifications = (onAlertTriggered) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const handleAlertTriggered = (alertData) => {
      console.log('Alert triggered:', alertData);
      alertData = alertData.data
      // Create notification object
      const notification = {
        id: `${alertData.alertId}-${Date.now()}`,
        alertId: alertData.alertId,
        alertName: alertData.alertName,
        locationName: alertData.locationName,
        param: alertData.param,
        operator: alertData.operator,
        value: alertData.value,
        actualValue: alertData.actualValue,
        triggeredAt: alertData.triggeredAt,
        timestamp: Date.now()
      };

      // Add to notifications list
      setNotifications(prev => [...prev, notification]);

      // Call the callback if provided
      if (onAlertTriggered) {
        onAlertTriggered(notification);
      }
    };

    // Listen for alert events
    websocketService.on('alertTriggered', handleAlertTriggered);

    // Connect if not already connected
    if (websocketService.getConnectionStatus() === 'disconnected') {
      websocketService.connect();
    }

    return () => {
      websocketService.off('alertTriggered', handleAlertTriggered);
    };
  }, [onAlertTriggered]);

  const removeNotification = useCallback((notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    notifications,
    removeNotification,
    clearAllNotifications
  };
};
