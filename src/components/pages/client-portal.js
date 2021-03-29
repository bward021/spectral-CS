import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from "react-router-dom"

import ClientInfo from "../client-portal-helpers/client-information"
import FrequencyGraph from '../client-portal-helpers/frequency-graph';

import { API_URL } from "../api_url/api-url"
import AuthContext from '../Context/AuthContext';

const ClientPortal = () => {

  const { permissions } = useContext(AuthContext);

  let { slug } = useParams();
  const [clientId] = useState(slug)
  const [clientInfo, setClientInfo] = useState({})

  useEffect(() => {
    axios({
      method: "get",
      url: `${API_URL}clients/${slug}`,
      withCredentials: true
    })
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
      <div className="client-portal-right-side">
        <h1>{clientInfo.client_firstname}{" "}{clientInfo.client_lastname}</h1>
        {permissions === "Admin" && <Link to={`/add-client-trial/${clientId}`}>Add Client Trial</Link>}
        <FrequencyGraph />
      </div>
    </div>
   );
}
 
export default ClientPortal;