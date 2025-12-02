import React, { useState, useEffect } from 'react';
import AlertCard from '../AlertCard/AlertCard';
import AddAlertForm from '../AddAlertForm/AddAlertForm';
import { getAlerts } from '../../utils/api';
import './AlertsDisplay.css';

const AlertsDisplay = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchAlerts = async () => {
        try {
        setLoading(true);
        setError(null);
        const alertsData = await getAlerts();
        const results = alertsData.alerts;
        setAlerts(results);
      } catch (err) {
        setError('Failed to fetch alerts. Please try again.');
        console.error('Error fetching alerts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  const handleAlertCreated = () => {
    // Refresh the alerts list after creating a new alert
    const fetchAlerts = async () => {
      try {
        const alertsData = await getAlerts();
        const results = alertsData.alerts;
        setAlerts(results);
      } catch (err) {
        console.error('Error refreshing alerts:', err);
      }
    };
    fetchAlerts();
  };

  console.log({alerts});
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div >
        <h2>Weather Alerts</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-colors"
        >
          Add New Alert
        </button>
      </div>
        {!showAddForm ? alerts.length === 0 ? (
        <div className="text-center p-8 bg-white bg-opacity-20 rounded-lg">
          <p className="text-white text-lg">No alerts at this time</p>
        </div>
      ) : (
        <div className="alerts-container">
          {alerts.map((alert, index) => (
            <AlertCard key={alert.rules?.rule_id || index} alert={alert} />
          ))}
        </div>
      ): null }


      {showAddForm && (
        <AddAlertForm
          onClose={() => setShowAddForm(false)}
          onAlertCreated={handleAlertCreated}
        />
      )}
    </div>
  );
};

export default AlertsDisplay;
