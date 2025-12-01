import { useState, useEffect, useRef } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import WeatherDisplay from './components/WeatherDisplay/WeatherDisplay';
import AlertsDisplay from './components/AlertsDisplay/AlertsDisplay';
import Predictions from './components/Predictions/Predictions';
import ToastContainer from './components/ToastContainer/ToastContainer';
import { useAlertNotifications } from './hooks/useWebSocket';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('weather');
  const alertsDisplayRef = useRef(null);

  // Handle alert notifications
  const { notifications, removeNotification } = useAlertNotifications((notification) => {
    console.log('New alert notification received:', notification);
    
    // If we're on the alerts page, trigger a refresh
    if (currentView === 'alerts' && alertsDisplayRef.current?.refreshAlerts) {
      alertsDisplayRef.current.refreshAlerts();
    }
  });

  const renderContent = () => {
    switch (currentView) {
      case 'weather':
        return (
          <div className="flex flex-col items-center justify-center p-4">
             <WeatherDisplay />
          </div>
        );
      case 'alerts':
        return <AlertsDisplay ref={alertsDisplayRef} />;
      case 'predictions':
        return <Predictions />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600">
      <div>
        <div style={{ display: "flex", gap: '100px', justifyContent: 'space-evenly' }} className="flex justify-center">
          <button
            onClick={() => setCurrentView('weather')}
          >
            Weather
          </button>
          <button
            onClick={() => setCurrentView('alerts')}
          >
            Alerts
          </button>
          <button
            onClick={() => setCurrentView('predictions')}
          >
            Predictions
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div>
        {renderContent()}
      </div>

      {/* Toast Notifications */}
      <ToastContainer 
        notifications={notifications} 
        onRemoveNotification={removeNotification} 
      />
    </div>
  );
}

export default App;
