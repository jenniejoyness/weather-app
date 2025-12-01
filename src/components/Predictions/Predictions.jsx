import React, { useState, useEffect } from 'react';
import './Predictions.css';
const Predictions = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPredictions = async () => {
          try {
            setLoading(true);
            setError(null);
            const response = await fetch('http://localhost:4000/predictions');
        //         const response = {
        //     "success": true,
        //     "predictions": [
        //         {
        //             "alert_id": 1,
        //             "alert_name": "test1",
        //             "fields_used": "temperature",
        //             "prediction": {
        //                 "data": {
        //                     "timelines": [
        //                         {
        //                             "timestep": "1d",
        //                             "endTime": "2025-12-03T04:00:00Z",
        //                             "startTime": "2025-11-30T04:00:00Z",
        //                             "intervals": [
        //                                 {
        //                                     "startTime": "2025-11-30T04:00:00Z",
        //                                     "values": {
        //                                         "temperature": 20.7
        //                                     }
        //                                 },
        //                                 {
        //                                     "startTime": "2025-12-01T04:00:00Z",
        //                                     "values": {
        //                                         "temperature": 20.4
        //                                     }
        //                                 },
        //                                 {
        //                                     "startTime": "2025-12-02T04:00:00Z",
        //                                     "values": {
        //                                         "temperature": 20.9
        //                                     }
        //                                 },
        //                                 {
        //                                     "startTime": "2025-12-03T04:00:00Z",
        //                                     "values": {
        //                                         "temperature": 20.8
        //                                     }
        //                                 }
        //                             ]
        //                         }
        //                     ]
        //                 }
        //             }
        //         }
        //     ]
        // }


             const predictionsData = await response.json();
             //           const predictionsData = await response
                        setData(predictionsData.predictions);
                    } catch (err) {
                        setError('Failed to fetch predictions. Please try again.');
                        console.error('Error fetching predictions:', err);
                    } finally {
                        setLoading(false);
                    }
                };

                fetchPredictions();
            }, []);
            if (loading) {
                return (
                    <div className="w-full max-w-4xl mx-auto p-4">
                        <h2 className="text-2xl font-bold text-white mb-6">Weather Predictions</h2>
                        <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                        </div>
                    </div>
                );
            }

            if (error) {
                return (
                    <div className="w-full max-w-4xl mx-auto p-4">
                        <h2 className="text-2xl font-bold text-white mb-6">Weather Predictions</h2>
                        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                            {error}
                        </div>
                    </div>
                );
            }

  return (
    <div>
      <h2>Weather Predictions</h2>
      {data.length === 0 ? (
        <div className="text-center p-8 bg-white bg-opacity-20 rounded-lg">
          <p className="text-white text-lg">No predictions available at this time</p>
        </div>
      ) : (
      <div >
          {data.map((item, index) => (
               <div className="prediction-wrapper">
                    <h2>{`${item.alert_name} - ${item.location_name}`}</h2>
                    <div className="prediction-container">
                        <span> {item.rules}</span>
                       <div className="three-day-forecast-container">
                       {item.prediction.data.timelines[0].intervals.map((day, index) => (
                           <div className="day-container">
                               <div>{new Date(day.startTime).toLocaleDateString()}</div>
                               {Object.entries(day.values).map(([key, value]) => (
                                   <div>{`${key}: ${value}`}</div>
                               ))}
                               <div>{`The alert is predicted to ${item.willBeTriggered ? 'be triggered' : 'not be triggered'}`}</div>
                           </div>
                       ))}
                   </div>
                    </div>

              </div>
          ))}
      </div>
      )}
    </div>
  );
};

export default Predictions;
