import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Clients = (props) => {
  const [loggedIn] = useState(props.loggedIn);
  const [permissions] = useState(props.permissions);
  // const [clientSearch, setClientSearch] = useState("*");
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/clients")
      .then((response) => {
        console.log(response.data);
        setClients(response.data);
      })
      .catch((error) => {
        console.log("error in Clients: ", error);
      });
  }, []);

  const renderClients = () => {
    return clients.map((client) => {
      const clientId = client.client_id;
      return (
        <div className="render-clients">
          <Link  to={`/data/${clientId}`}>
            <div className="client-data-link">
              <div>{client.client_firstname}</div>
              <div>{client.client_lastname}</div>
              <div>{client.client_age}</div>
              <div>{client.client_supervisor}</div>
            </div>
          </Link>
          <Link to={`/clients/${clientId}`}>
            <div className="client-portal-link">CP</div>
          </Link>
        </div>
      );
    });
  };

  return (
    <div className="clients-container">
      <h1>This is my Clients Page</h1>
      {loggedIn && `You are logged in as a ${permissions}`}
      <hr />
      <div className="render-clients-wrapper">
        <div className="render-clients-headers">
          <div>First</div>
          <div>Last</div>
          <div>Age</div>
          <div>Supervisor</div>
          <div>Client Portal</div>
        </div>
        {renderClients()}
      </div>
    </div>
  );
};

export default Clients;
