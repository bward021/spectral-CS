import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";

const StopWatch = (props) => {
  const [counting, setCounting] = useState(false);
  const [firstClick, setFirstClick] = useState(false);
  const [overallTime, setOverallTime] = useState(0);

  useEffect(() => {
    let timerId;
    if (counting) {
      timerId = setInterval(() => {
        setOverallTime((prevCount) => (prevCount += 10));
      }, 10);
    }

    return () => clearInterval(timerId);
  });

  const displayTime = (time) => {
    if (time < 3600000) {
      return moment()
        .hour(0)
        .minute(0)
        .second(0)
        .millisecond(time)
        .format("mm : ss . SS");
    } else {
      return moment()
        .hour(0)
        .minute(0)
        .second(0)
        .millisecond(time)
        .format("HH : mm : ss . SS");
    }
  };

  const handleStart = () => {
    setCounting(!counting);
    setFirstClick(!firstClick);
  };

  const handleReset = () => {
    setCounting(false);
    setFirstClick(false);
    setOverallTime(0);
  };

  const handleSave = () => {
    axios(
      {
        method: "post",
        url: "http://127.0.0.1:5000/new-duration-instance",
        data: {
          id: props.data.duration_id,
          date: props.date,
          data: overallTime
        }
      }
    )
    .then((response) => {
      console.log(response)
      setCounting(!counting)
      setOverallTime(0)
    })
    .catch((error) => {
      console.log("error in stopwatch: ", error);
    })

  }

  return (
    <div>
      <h2>{props.data.duration_name}</h2>
      <h2>{displayTime(overallTime)}</h2>
      <div className="button-container">
        {!counting && !firstClick ? (
          <button onClick={handleStart}>Start</button>
        ) : (
          <>
            <div>
              <button onClick={() => setCounting(!counting)}>
                {!counting ? "Resume" : "Stop"}
              </button>
              <button onClick={handleReset}>Reset</button>
            </div>
            <div>
              <button onClick={() => {handleSave()}}>Save</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StopWatch;
