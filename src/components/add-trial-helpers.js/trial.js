import axios from "axios";
import React, { useState } from "react";

import { API_URL } from "../api_url/api-url"

const Trial = (props) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [id] = useState(props.id);

  const handleSubmit = (e) => {
    axios({
      method: "post",
      url: `${API_URL}add-client-trial/${id}`,
      data: {
        name: name,
        category: category,
        description: description,
      },
      withCredentials: true
    })
    .then((response) => {
      setName("");
      setCategory("");
      setDescription("");
    })
    .catch((error) => {
      console.log("error in add trial: ", error)
    })

    e.preventDefault()
  }


  return (
      <div className="trial-form-wrapper">
        <form className="trial-form" onSubmit={(e) => {handleSubmit(e)}}>
          <p>Name:</p>
          <input
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
          <p>Category</p>
          <select
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            value={category}
          >
            <option value="" defaultValue>
              Select Category
            </option>
            <option value="Motor Skills">Motor Skills</option>
            <option value="Fine Motor Skills">Fine Motor Skills</option>
            <option value="Critical Thinking">Critical Thinking</option>
            <option value="Educational">Educational</option>
          </select>
          <p>Description</p>
          <textarea
            type="text"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="trial-description"
            value={description}
          />
          <button>Submit</button>
        </form>
      </div>
  );
};

export default Trial;
