import React, { useState, useEffect } from 'react';
import axios from "axios";
import FrequencyInstance from './frequency-instance';

const FrequencyData = (props) => {

  const [frequencyData, setFrequencyData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/get-frequency/${props.id}`,
      )
      .then((response) => {
        setFrequencyData(response.data)
      })
      .catch((error) => {
        console.log("Error in Clients: ", error);
      });
  }, [props.id, props.date]);

  const renderFrequencies = () => {
    return frequencyData.map((frequency) => {
      return(
        <div key={frequency.frequency_id}>
          <FrequencyInstance id={frequency.frequency_id} name={frequency.frequency_name} date={props.date} />
        </div>
      )
    })
  }


  return ( 
    <div className="frequency-container">
      {renderFrequencies()}
    </div>
   );
}
 
export default FrequencyData;