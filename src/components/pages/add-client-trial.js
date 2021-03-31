import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Duration from "../add-trial-helpers.js/duration";
import Frequency from "../add-trial-helpers.js/frequency";
import Trial from "../add-trial-helpers.js/trial";

const AddClientTrial = (props) => {
  let history = useHistory();
  let { slug } = useParams();
  const [clientId] = useState(slug);
  const [trialType, setTrialType] = useState("");

  const renderComponent = () => {
    if (trialType === "") {
      return "";
    } else if (trialType === "Trial") {
      return <Trial id={clientId} />;
    } else if (trialType === "Frequency") {
      return <Frequency id={clientId} />;
    } else if (trialType === "Duration") {
      return <Duration id={clientId} />;
    }
  };

  return (
    <div className="add-trial-big-container">
      <div className="add-client-trial-container">
        <h2>Add Trial</h2>
        <button
          onClick={() => {
            history.push(`/data/${clientId}`);
          }}
        >
          Navigate to Client Data Page
        </button>
        <select
          className="select-trial-type"
          onChange={(e) => {
            setTrialType(e.target.value);
          }}
          value={trialType}
        >
          <option value="" defaultValue>
            Select Trial Type
          </option>
          <option value="Trial">Trial</option>
          <option value="Duration">Duration</option>
          <option value="Frequency">Frequency</option>
        </select>
        {renderComponent()}
      </div>
    </div>
  );
};

export default AddClientTrial;
