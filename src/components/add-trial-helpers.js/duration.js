import axios from "axios";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { API_URL } from "../api_url/api-url";

const Duration = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [id] = useState(props.id);
  const [isLoading, setIsLoading] = useState(false);
  const [addAlert, setAddAlert] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
  };

  const handleSubmit = (e) => {
    handleClick();
    axios({
      method: "post",
      url: `${API_URL}add-client-duration/${id}`,
      data: {
        name: name,
        description: description,
      },
      withCredentials: true,
    })
      .then((response) => {
        setName("");
        setDescription("");
        setAddAlert(true);
        setTimeout(() => {
          setAddAlert(false);
        }, 4000);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error in add Duration: ", error);
      });

    e.preventDefault();
  };

  return (
    <div className="trial-form-wrapper">
      <form
        className="trial-form"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <p>Name</p>
        <input
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
          value={name}
        />
        <label for="description">Description</label>
        <textarea
          type="text"
          name="description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          className="trial-description"
          value={description}
        />
        <button disabled={isLoading}>
          {!isLoading ? "Submit" : <FontAwesomeIcon icon={faSpinner} spin />}
        </button>
      </form>
      <div className="added-alert">{ addAlert ? "Trial Added!" : null }</div>
    </div>
  );
};

export default Duration;

// const [addAlert, setAddAlert] = useState(false);

// setAddAlert(true)
// setTimeout(() => {setAddAlert(false)}, 4000);
// setIsLoading(false);

// <div className="added-alert">{ addAlert ? "Trial Added" : null }</div>
