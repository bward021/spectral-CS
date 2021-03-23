import React, { useState } from 'react';
import { useParams } from "react-router-dom"
import moment from 'moment';

import DurationData from "../data-helpers/duration-data";
import FrequencyData from "../data-helpers/frequency-data";
import TrialData from "../data-helpers/trial-data";

const Data = (props) => {

  let { slug } = useParams();
  const [clientId] = useState(slug)
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'))

  console.log(date);
  return (
    <div>
      <input type="date" onChange={(e) => {setDate(e.target.value)}} value={date}/>
      <div>
        <TrialData id={clientId} date={date} />
        <FrequencyData id={clientId} date={date} />
      </div>
      <div>
        <DurationData id={clientId} date={date} />
      </div>
    </div>
  );
};

export default Data;
