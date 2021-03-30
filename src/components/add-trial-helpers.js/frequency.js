import axios from "axios";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { API_URL } from "../api_url/api-url";

const Frequency = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [id] = useState(props.id);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(function () {
      setIsLoading(false);
    }, 3000);
  };

  const handleSubmit = (e) => {
    handleClick();
    axios({
      method: "post",
      url: `${API_URL}add-client-frequency/${id}`,
      data: {
        name: name,
        description: description,
      },
      withCredentials: true,
    })
      .then((response) => {
        setName("");
        setDescription("");
      })
      .catch((error) => {
        console.log("error in add Frequency: ", error);
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
          value={name}
          required
        />
        <p>Description</p>
        <textarea
          type="text"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          required
          className="trial-description"
          value={description}
        />
        <button disabled={isLoading}>
          {!isLoading ? "Submit" : <FontAwesomeIcon icon={faSpinner} spin />}
        </button>
      </form>
    </div>
  );
};

export default Frequency;
