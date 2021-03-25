import axios from "axios";
import React, { useState, useEffect } from "react";

const TrialInstanceData = (props) => {
  const [firstInstance, setFirstInstance] = useState(false);
  const [incorrect, setIncorrect] = useState(0);
  const [prompted, setPrompted] = useState(0);
  const [correct, setCorrect] = useState(0);

  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:5000/check-trial-instance?id=${props.trial.trial_id}&date=${props.date}`
      )
      .then((response) => {
        if (response.data === "No data found") {
          setFirstInstance(true);
          setCorrect(0)
          setIncorrect(0)
          setPrompted(0)
        } else {
          console.log(response.data);
          setCorrect(response.data.trial_instance_correct)
          setIncorrect(response.data.trial_instance_incorrect)
          setPrompted(response.data.trial_instance_prompted)
        }
      })
      .catch((error) => {
        console.log("error in Clients: ", error);
      });
  }, [props.trial.trial_id, props.date]);


  const handleIncorrect = (num) => {
    if (firstInstance === true) {
      axios.post("http://127.0.0.1:5000/new-trial-instance",
        {
          id: props.trial.trial_id,
          date: props.date,
          incorrect: (incorrect + num),
          prompted: 0,
          correct: 0,
        })
        .then(response => {
          console.log(response)
          setFirstInstance(false)
          setIncorrect((incorrect + num))
        })
        .catch(error => {
          console.log("error in incorrect: ", error)
        })
    } else {
      axios.patch("http://127.0.0.1:5000/update-trial-instance-incorrect",
      {
        id: props.trial.trial_id,
        data: (incorrect + num),
        date: props.date,
      })
      .then(response => {
        console.log(response)
        setIncorrect((incorrect + num))
      })
      .catch(error => {
        console.log("error in Incorrect: ", error)
      })
    }
  };


  const handlePrompted = (num) => {
    if (firstInstance === true) {
      axios.post("http://127.0.0.1:5000/new-trial-instance",
        {
          id: props.trial.trial_id,
          date: props.date,
          incorrect: 0,
          prompted: (prompted + num),
          correct: 0,
        })
        .then(response => {
          console.log(response)
          setFirstInstance(false)
          setPrompted((prompted + num))
        })
        .catch(error => {
          console.log("error in Prompted: ", error)
        })
    } else {
      axios.patch("http://127.0.0.1:5000/update-trial-instance-prompted",
      {
        id: props.trial.trial_id,
        data: (prompted + num),
        date: props.date,
      })
      .then(response => {
        console.log(response)
        setPrompted((prompted + num))
      })
      .catch(error => {
        console.log("error in Prompted: ", error)
      })
    }
  };


  const handleCorrect = (num) => {
    if (firstInstance === true) {
      axios.post("http://127.0.0.1:5000/new-trial-instance",
        {
          id: props.trial.trial_id,
          date: props.date,
          incorrect: 0,
          prompted: 0,
          correct: (correct + num),
        })
        .then(response => {
          console.log(response)
          setFirstInstance(false)
          setCorrect((correct + num))
        })
        .catch(error => {
          console.log("error in Correct: ", error)
        })
    } else {
      axios.patch("http://127.0.0.1:5000/update-trial-instance-correct",
      {
        id: props.trial.trial_id,
        data: (correct + num),
        date: props.date,
      })
      .then(response => {
        console.log(response)
        setCorrect((correct + num))
      })
      .catch(error => {
        console.log("error in Correct: ", error)
      })
    }
  };

  return (
    <div className="trial-instance-container">
      <h2>{props.trial.trial_name}</h2>
      <p>{props.trial.trial_description}</p>
      <div className="trial-buttons-wrapper">
        <div className="trial-button" >
          <button
            onClick={() => {
              handleIncorrect(-1);
            }}
            disabled={incorrect <= 0 ? true : false}
          >
            -
          </button>
          <p>Incorrect {incorrect}</p>
          <button
            onClick={() => {
              handleIncorrect(1);
            }}
          >
            +
          </button>
        </div >
        <div className="trial-button" >
          <button
            onClick={() => {
              handlePrompted(-1);
            }}
            disabled={prompted <= 0 ? true : false}
          >
            -
          </button>
          <p>Prompted {prompted}</p>
          <button
            onClick={() => {
              handlePrompted(1);
            }}
          >
            +
          </button>
        </div>
        <div className="trial-button" >
          <button
            onClick={() => {
              handleCorrect(-1);
            }}
            disabled={correct <= 0 ? true : false}
          >
            -
          </button>
          <p>Correct {correct}</p>
          <button
            onClick={() => {
              handleCorrect(1);
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrialInstanceData;
