import React, { useState, useEffect } from 'react';
import AlertCard from '../AlertCard/AlertCard';
import AddAlertForm from '../AddAlertForm/AddAlertForm';
import { getAlerts } from '../../utils/api';

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

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-bold text-white mb-6">Weather Alerts</h2>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-bold text-white mb-6">Weather Alerts</h2>
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  console.log({alerts});
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Weather Alerts</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-colors"
        >
          Add New Alert
        </button>
      </div>

      {alerts.length === 0 ? (
        <div className="text-center p-8 bg-white bg-opacity-20 rounded-lg">
          <p className="text-white text-lg">No alerts at this time</p>
        </div>
      ) : (
        <div className="flex flex-col space-y-4">
          {alerts.map((alert, index) => (
            <AlertCard key={alert.rules?.rule_id || index} alert={alert} />
          ))}
        </div>
      )}

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
