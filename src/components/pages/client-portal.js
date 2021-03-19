import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"


const ClientPortal = (props) => {

  let { slug } = useParams();
  const [clientId, setclientID] = useState(slug)

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/clients/${slug}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log("error in Clients: ", error);
      });
  }, []);

  return ( 
    <div>
      <h1>This is the Client Portal Page for {clientId}</h1>
    </div>
   );
}
 
export default ClientPortal;