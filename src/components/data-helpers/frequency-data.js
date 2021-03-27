import React, { useState, useEffect } from 'react';
import axios from "axios";
import FrequencyInstance from './frequency-instance';
import { API_URL } from "../api_url/api-url"


const FrequencyData = (props) => {

  const [frequencyData, setFrequencyData] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: `${API_URL}get-frequency/${props.id}`,
      withCredentials: true
    })
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