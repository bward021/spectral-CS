import axios from "axios";
import React, { useState, useEffect } from "react";

import { API_URL } from "../api_url/api-url"

const TrialInstanceData = (props) => {
  const [firstInstance, setFirstInstance] = useState(false);
  const [incorrect, setIncorrect] = useState(0);
  const [prompted, setPrompted] = useState(0);
  const [correct, setCorrect] = useState(0);

  useEffect(() => {
    axios({
      method: "get",
      url: `${API_URL}check-trial-instance?id=${props.trial.trial_id}&date=${props.date}`,
      withCredentials: true,
    })
      .then((response) => {
        if (response.data === "No data found") {
          setFirstInstance(true);
          setCorrect(0);
          setIncorrect(0);
          setPrompted(0);
        } else {
          console.log(response.data);
          setCorrect(response.data.trial_instance_correct);
          setIncorrect(response.data.trial_instance_incorrect);
          setPrompted(response.data.trial_instance_prompted);
        }
      })
      .catch((error) => {
        console.log("error in Clients: ", error);
      });
  }, [props.trial.trial_id, props.date]);

  const handleIncorrect = (num) => {
    if (firstInstance === true) {
      axios({
        method: "post",
        url: `${API_URL}new-trial-instance`,
        data: {
          id: props.trial.trial_id,
          date: props.date,
          incorrect: incorrect + num,
          prompted: 0,
          correct: 0,
        },
        withCredentials: true,
      })
        .then((response) => {
          console.log(response);
          setFirstInstance(false);
          setIncorrect(incorrect + num);
        })
        .catch((error) => {
          console.log("error in incorrect: ", error);
        });
    } else {
      axios({
        method: "patch",
        url: `${API_URL}update-trial-instance-incorrect`,
        data: {
          id: props.trial.trial_id,
          data: incorrect + num,
          date: props.date,
        },
        withCredentials: true,
      })
        .then((response) => {
          console.log(response);
          setIncorrect(incorrect + num);
        })
        .catch((error) => {
          console.log("error in Incorrect: ", error);
        });
    }
  };

  const handlePrompted = (num) => {
    if (firstInstance === true) {
      axios({
        method: "post",
        url: `${API_URL}new-trial-instance`,
        data: {
          id: props.trial.trial_id,
          date: props.date,
          incorrect: 0,
          prompted: prompted + num,
          correct: 0,
        },
        withCredentials: true,
      })
        .then((response) => {
          console.log(response);
          setFirstInstance(false);
          setPrompted(prompted + num);
        })
        .catch((error) => {
          console.log("error in Prompted: ", error);
        });  
    } 
    if (firstInstance === false) {
      axios({
        method: "patch",
        url: `${API_URL}update-trial-instance-prompted`,
        data: {
          id: props.trial.trial_id,
          data: prompted + num,
          date: props.date,
        },
        withCredentials: true,
      })
        .then((response) => {
          console.log(response);
          setPrompted(prompted + num);
        })
        .catch((error) => {
          console.log("error in Prompted: ", error);
        });
    }
  };

  const handleCorrect = (num) => {
    if (firstInstance === true) {
      axios({
        method: "post",
        url: `${API_URL}new-trial-instance`,
        data: {
          id: props.trial.trial_id,
          date: props.date,
          incorrect: 0,
          prompted: 0,
          correct: correct + num,
        },
        withCredentials: true,
      })
        .then((response) => {
          console.log(response);
          setFirstInstance(false);
          setCorrect(correct + num);
        })
        .catch((error) => {
          console.log("error in Correct: ", error);
        });
    } else {
      axios({
        method: "patch",
        url: `${API_URL}update-trial-instance-correct`,
        data: {
          id: props.trial.trial_id,
          data: correct + num,
          date: props.date,
        },
        withCredentials: true,
      })
        .then((response) => {
          console.log(response);
          setCorrect(correct + num);
        })
        .catch((error) => {
          console.log("error in Correct: ", error);
        });
    }
  };

  return (
    <div className="trial-instance-container">
      <h2>{props.trial.trial_name}</h2>
      <p>{props.trial.trial_description}</p>
      <div className="trial-buttons-wrapper">
        <div className="trial-button">
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
        </div>
        <div className="trial-button">
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
        <div className="trial-button">
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
