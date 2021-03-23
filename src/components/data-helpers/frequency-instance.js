import React, { useState, useEffect } from "react";
import axios from "axios";

const FrequencyInstance = (props) => {
  const [date] = useState(props.date);
  const [data, setData] = useState(0);
  const [firstInstance, setFirstInstance] = useState(false);

  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:5000/get-frequency-instance?id=${props.id}&date=${date}`
      )
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

  const handleClick = (num) => {
    if (firstInstance === true) {
      axios
        .post(`http://127.0.0.1:5000/new-frequency-instance`, {
          id: props.id,
          data: data + num,
          date: date,
        })
        .then((response) => {
          console.log(response);
          setData(data + num);
          setFirstInstance(false);
        })
        .catch((error) => {
          console.log("error in new frequency: ", error);
        });
    } else {
      axios
        .patch(`http://127.0.0.1:5000/update-frequency-instance/${props.id}`, {
          data: data + num,
          date: date,
        })
        .then((response) => {
          console.log(response);
          setData(data + num);
        })
        .catch((error) => {
          console.log("error in frequency update: ", error);
        });
    }
  };

  return (
    <div>
      <input
        type="button"
        onClick={() => {
          handleClick(-1);
        }}
        value="-"
        disabled={data <= 0 ? true : false}
      />
      <p>{props.name}</p>
      <input
        type="button"
        onClick={() => {
          handleClick(1);
        }}
        value="+"
      />
    </div>
  );
};

export default FrequencyInstance;
