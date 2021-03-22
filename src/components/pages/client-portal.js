import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom"

import ClientInfo from "../client-portal-helpers/client-information"


const ClientPortal = () => {

  let { slug } = useParams();
  const [clientId] = useState(slug)
  const [clientInfo, setClientInfo] = useState({})

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/clients/${slug}`)
      .then((response) => {
        setClientInfo(response.data)
      })
      .catch((error) => {
        console.log("error in Clients: ", error);
      });
  }, [slug]);

  return ( 
    <div className="client-portal-container" >
      <div className="client-information-wrapper">
        <ClientInfo clientInfo={clientInfo} />
      </div>
      <div>
        <h1>This is the Client Portal Page for {clientId}</h1>
        <Link to={`/add-client-trial/${clientId}`}>Add Client Trial</Link>
      </div>
    </div>
   );
}
 
export default ClientPortal;