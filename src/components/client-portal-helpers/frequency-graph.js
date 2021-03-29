import React, { useEffect, useRef, useState } from "react";
import Chartjs from "chart.js";

const FrequencyGraph = (props) => {
  const chartContainer = useRef(null);
  // eslint-disable-next-line
  const [chartinstance, setChartInstance] = useState(null);
  
  const chartConfig = {
    type: "line",
    data: {
      //Bring in data
      labels: ["3/24", "3/25", "3/26", "3/27"],
      datasets: [
        {
          label: "Frequency",
          data: [8, 10, 6, 2],
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
    // eslint-disable-next-line
  }, [chartContainer, setChartInstance]);
  
  
  
  return (
    <div className="graph-wrapper">
      <canvas ref={chartContainer} />
    </div>
  );
};

export default FrequencyGraph;
