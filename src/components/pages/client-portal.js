import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom"

import ClientInfo from "../client-portal-helpers/client-information"
import FrequencyGraph from '../client-portal-helpers/frequency-graph';


const ClientPortal = () => {

  let { slug } = useParams();
  const [clientId] = useState(slug)
  const [clientInfo, setClientInfo] = useState({})

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/clients/${slug}`)
      .then((response) => {
        setClientInfo(response.data)
        console.log(response.data)
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
      <div className="client-portal-right-side">
        <h1>{clientInfo.client_firstname}{" "}{clientInfo.client_lastname}</h1>
        <Link to={`/add-client-trial/${clientId}`}>Add Client Trial</Link>
        <FrequencyGraph />
      </div>
    </div>
   );
}
 
export default ClientPortal;