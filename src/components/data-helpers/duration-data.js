import axios from 'axios';
import React, { useEffect, useState } from 'react';
import StopWatch from '../duration-helpers/stopwatch';
import { API_URL } from "../api_url/api-url"


const DurationData = (props) => {

  const [durationData, setDurationData] = useState([])

  useEffect(() => {
    axios({
      method: "get",
      url: `${API_URL}get-all-client-duration/${props.id}`,
      withCredentials: true
    })
    .then((response)=>{
      setDurationData(response.data)
    })
    .catch((error)=>{
      console.log("error in duration: ", error);
    })
    // eslint-disable-next-line
  }, [])

  const renderDurations = () => {
    return durationData.map((duration)=> {
      return(
        <div>
          <StopWatch data={duration} date={props.date} />
        </div>
      )
    })
  }

  return ( 
    <div>
      {renderDurations()}
    </div>
   );
}
 
export default DurationData;