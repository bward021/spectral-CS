import React from "react";
import Address from '../client-portal-helpers/address';


const ClientInfo = (props) => {
  const {
    client_id,
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
        <div className="information-item-1">
          <p>First:</p>
          <div>{client_firstname}</div>
        </div>
        <div className="information-item-2">
          <p>Last:</p>
          <div>{client_lastname}</div>
        </div>
        <div className="information-item-3">
          <p>Age:</p>
          <div>{client_age}</div>
        </div>
        <div className="information-item-4">
          <p>Gender:</p>
          <div>{client_gender}</div>
        </div>
        <div className="information-item-5">
          <p>Supervisor:</p>
          <div>{client_supervisor}</div>
        </div>
        <Address id={client_id}/>
      </div>
    </div>
  );
};

export default ClientInfo;
