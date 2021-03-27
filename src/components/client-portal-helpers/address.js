import React, { useState, useEffect } from "react";
import axios from "axios";

const Address = (props) => {
  const [address, setAddress] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: `http://127.0.0.1:5000/get-client-address/${props.id}`,
      withCredentials: true 
    })
      .then((response) => {
        setAddress(response.data);
      })
      .catch((error) => {
        console.log("error in Clients: ", error);
      });
  }, [props.id]);

  return (
    <div className="client-address">
      {address && <p>{`Address: ${address.addresses_one}, ${address.addresses_city}, ${address.addresses_state} ${address.addresses_postal_code}`}</p>}
    </div>
  );
};

export default Address;
