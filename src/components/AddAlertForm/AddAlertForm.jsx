import React, { useState } from 'react';
import { createAlert } from '../../utils/api';

const AddAlertForm = ({ onClose, onAlertCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    locationName: '',
    coordinates: '',
    parameter: 'temperature',
    operator: '==',
    value: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const parameterOptions = [
    { value: 'temperature', label: 'Temperature' },
    { value: 'rain', label: 'Rain' },
    { value: 'windSpeed', label: 'Wind Speed' },
    { value: 'humidity', label: 'Humidity' },
    { value: 'cloudCover', label: 'Cloud Cover' },
    { value: 'windDirection', label: 'Wind Direction' },
    { value: 'snowAccumulation', label: 'Snow Accumulation' },
    { value: 'cloudCeiling', label: 'Cloud Ceiling' }
  ];

  const operatorOptions = [
    { value: '==', label: 'Equal To', displayLabel: 'Equal To' },
    { value: '>', label: 'Greater Than', displayLabel: 'Greater Than' },
    { value: '<', label: 'Less Than', displayLabel: 'Less Than' },
    { value: '>=', label: 'Greater Than or Equal To', displayLabel: 'Greater Than or Equal To' },
    { value: '<=', label: 'Less Than or Equal To', displayLabel: 'Less Than or Equal To' },
    // { value: 'AND', label: 'Logical AND', displayLabel: 'Logical AND' },
    // { value: 'OR', label: 'Logical OR', displayLabel: 'Logical OR' },
    // { value: 'IS NULL', label: 'Is Null', displayLabel: 'Is Null (no value)' },
    // { value: '!', label: 'NOT (Negation)', displayLabel: 'NOT (Negation)' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Parse coordinates (expecting format like "lat,lng")
      const [lat, lng] = formData.coordinates.split(',').map(coord => parseFloat(coord.trim()));
      
      if (isNaN(lat) || isNaN(lng)) {
        throw new Error('Invalid coordinates format. Please use "latitude,longitude" format.');
      }

      const alertData = {
        alertName: formData.name,
        locationName: formData.locationName,
        rules: {
          parameter: formData.parameter,
          operator: formData.operator,
          value: parseFloat(formData.value)
        },
        geometry: {
          lat,
          lng
        }
      };

      await createAlert(alertData);
      onAlertCreated();
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to create alert. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Add New Alert</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter alert name"
              />
            </div>

            <div>
              <label htmlFor="locationName" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                id="locationName"
                name="locationName"
                value={formData.locationName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter location name"
              />
            </div>

            <div>
              <label htmlFor="coordinates" className="block text-sm font-medium text-gray-700 mb-1">
                Coordinates
              </label>
              <input
                type="text"
                id="coordinates"
                name="coordinates"
                value={formData.coordinates}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter coordinates (e.g., 40.7128,-74.0060)"
              />
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-800">Rule Configuration</h3>
              <p className="text-sm text-gray-600">
                Configure when this alert should trigger based on weather conditions.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label htmlFor="parameter" className="block text-sm font-medium text-gray-700 mb-1">
                    Parameter
                  </label>
                  <select
                    id="parameter"
                    name="parameter"
                    value={formData.parameter}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {parameterOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="operator" className="block text-sm font-medium text-gray-700 mb-1">
                    Operator
                  </label>
                  <select
                    id="operator"
                    name="operator"
                    value={formData.operator}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {operatorOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.displayLabel}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-1">
                    Value
                  </label>
                  <input
                    type="number"
                    id="value"
                    name="value"
                    value={formData.value}
                    onChange={handleInputChange}
                    required
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter value"
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating...' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAlertForm;
