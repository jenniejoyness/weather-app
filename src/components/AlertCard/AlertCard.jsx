import React from 'react';

const AlertCard = ({ alert }) => {
  const { name, triggered, locationName, rules } = alert;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500 flex flex-col space-y-4">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          triggered ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
        }`}>
          {triggered ? 'Triggered' : 'Active'}
        </span>
      </div>
      
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-600">Location:</span>
          <span className="text-sm text-gray-800">{locationName}</span>
        </div>
        
        <div className="bg-gray-50 rounded-md p-3">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Rule Details:</h4>
          <div className="flex flex-wrap gap-2 text-sm">
            <div className="flex items-center space-x-1">
              <span className="text-gray-600">Parameter:</span>
              <span className="font-medium text-gray-800">{rules.parameter}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-gray-600">Operator:</span>
              <span className="font-medium text-gray-800">{rules.operator}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-gray-600">Value:</span>
              <span className="font-medium text-gray-800">{rules.value}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-gray-600">Rule ID:</span>
              <span className="font-medium text-gray-800">{rules.rule_id}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertCard;
