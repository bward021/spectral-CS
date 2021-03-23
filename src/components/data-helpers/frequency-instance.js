import React, { useState, useEffect } from "react";
import axios from "axios";

const FrequencyInstance = (props) => {
  const [date] = useState(props.date)
  const [data, setData] = useState(0);
  const [firstInstance, setFirstInstance] = useState(false);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/get-frequency-instance?id=${props.id}&date=${date}`)
      .then((response) => {
        console.log(response);
        if (response.data === "No data found") {
          setFirstInstance(true);
        } else {
          setData(response.data.frequency_instance_data);
        }
      })
      .catch((error) => {
        console.log("error in Clients: ", error);
      });
  }, [props.id, date]);


useEffect(() => {
  if (firstInstance === true) {
    axios
    .post(`http://127.0.0.1:5000/new-frequency-instance`, {
      id: props.id,
      data: data,
      date: date,
    })
    .then((response) => {
      console.log(response);
      setFirstInstance(false);
    })
    .catch((error) => {
      console.log("error in new frequency: ", error);
    });
  } else {
    axios
      .patch(`http://127.0.0.1:5000/update-frequency-instance/${props.id}`, {
        data: data,
        date: date,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("error in frequency update: ", error);
      });
  }
// eslint-disable-next-line
}, [data])

  const handleClick = (e) => {
    if (e.target.value === "+") {
      // setData(data + 1);
      setData((prevState) => (
        prevState + 1
    ), () => console.log('after', data))
    }
    if (e.target.value === "-" && data > 0) {
      setData(data - 1);
    }
  };

  return (
    <div>
      <input
        type="button"
        onClick={(e) => {
          handleClick(e);
        }}
        value="-"
      />
      <p>{props.name}</p>
      <input
        type="button"
        onClick={(e) => {
          handleClick(e);
        }}
        value="+"
      />
    </div>
  );
};

export default FrequencyInstance;
