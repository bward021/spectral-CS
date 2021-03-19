import React from "react";

const ClientInfo = (props) => {
  const {
    // client_id,
    client_age,
    client_firstname,
    client_lastname,
    client_gender,
    client_supervisor,
  } = props.clientInfo;

  return (
    <div className="client-information-container">
      <h1>Client Information</h1>
      <div className="client-info">
        <div className="information-item">
          <p>First:</p>
          <div>{client_firstname}</div>
        </div>
        <div className="information-item">
          <p>Last:</p>
          <div>{client_lastname}</div>
        </div>
        <div className="information-item">
          <p>Age:</p>
          <div>{client_age}</div>
        </div>
        <div className="information-item">
          <p>Gender:</p>
          <div>{client_gender}</div>
        </div>
        <div className="information-item">
          <p>Supervisor:</p>
          <div>{client_supervisor}</div>
        </div>
      </div>
    </div>
  );
};

export default ClientInfo;
