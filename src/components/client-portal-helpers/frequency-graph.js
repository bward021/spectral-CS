import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import Chartjs from "chart.js";
import { API_URL } from "../api_url/api-url";

const FrequencyGraph = (props) => {
  const chartContainer = useRef(null);
  // eslint-disable-next-line
  const [chartinstance, setChartInstance] = useState(null);
  const [dates, setDates] = useState([])
  const [data, setData] = useState([])
  const [update, setUpdate] = useState(0)

  
  
  const chartConfig = {
    type: "line",
    data: {
      //Bring in data
      labels: dates.reverse(),
      datasets: [
        {
          label: "Frequencies",
          data: data.reverse(),
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      //Customize chart options
    },
  };
  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
    axios({
      method: "get",
      url: `${API_URL}client/frequency-graph/${props.id}`,
      withCredentials: true,
    }) 
    .then((response) => {
      let dateArray = response.data.map((set) => {
        return(set.frequency_instance_date)
      })
      setDates(dateArray.reverse())
      let dataArray = response.data.map((set) => {
        return(set.frequency_instance_data)
      })
      setData(dataArray.reverse())
      setUpdate(2)
    })
    .catch((error)=> {
      console.log("error in graph: ", error)
    })
    // eslint-disable-next-line
  }, [chartContainer, setChartInstance, update]);
  
  
  
  return (
    <div className="graph-wrapper">
      <canvas ref={chartContainer} />
    </div>
  );
};

export default FrequencyGraph;
