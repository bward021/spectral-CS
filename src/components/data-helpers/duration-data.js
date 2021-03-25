import axios from 'axios';
import React, { useEffect, useState } from 'react';
import StopWatch from '../duration-helpers/stopwatch';

const DurationData = (props) => {

  const [durationData, setDurationData] = useState([])

  useEffect(() => {
    axios({
      method: "get",
      url: `http://127.0.0.1:5000/get-all-client-duration/${props.id}`
    })
    .then((response)=>{
      console.log(response)
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