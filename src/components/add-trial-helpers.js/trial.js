import axios from "axios";
import React, { useState } from "react";

const Trial = (props) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [id] = useState(props.id);

  const handleSubmit = (e) => {
    axios.post(
      `http://127.0.0.1:5000/add-client-trial/${id}`,
      {
        name: name,
        category: category,
        description: description,
      }
    )
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
