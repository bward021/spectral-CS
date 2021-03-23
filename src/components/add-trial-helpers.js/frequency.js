import axios from "axios";
import React, { useState } from "react";

const Frequency = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [id] = useState(props.id);

  const handleSubmit = (e) => {
    axios.post(
      `http://127.0.0.1:5000/add-client-frequency/${id}`,
      {
        name: name,
        description: description,
      }
    )
    .then((response) => {
      setName("");
      setDescription("");
    })
    .catch((error) => {
      console.log("error in add Frequency: ", error)
    })

    e.preventDefault()
  }


  return (
      <div className="trial-form-wrapper">
        <form className="trial-form" onSubmit={(e) => {handleSubmit(e)}}>
        <p>Name</p>
          <input
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
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

export default Frequency;