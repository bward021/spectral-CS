import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TrialInstanceData from './trial-instance';

const TrialData = (props) => {

  const [trials, setTrials] = useState([])
  const [trialSelect, setTrialSelect] = useState(null)
  // const [instanceData, setInstanceData] = useState(null)

  useEffect(() => {
    axios.get(`https://bw-spectral-cs-be.herokuapp.com/get-all-client-trials/${props.id}`)
    .then((response) => {
      console.log(response)
      setTrials(response.data)
    })
    .catch((error) => {
      console.log("Error in get trials: ", error)
    })
  }, [props.id, props.date])

  const handleClick = (trial) => {
    setTrialSelect(trial)
  }


  const renderTrials = () => {
    return trials.map((trial) => {
      return(
        <li onClick={() => {handleClick(trial)}}>{trial.trial_name}</li>
      )
    })
  }

  return ( 
    <div className="trial-data-container" >
      <ul className="trial-list-container" >
        {renderTrials()}
      </ul>
      <div className="trial-instance-data">
        {trialSelect && <TrialInstanceData date={props.date} trial={trialSelect} />}
      </div>
    </div>
   );
}
 
export default TrialData;