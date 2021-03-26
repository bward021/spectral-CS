import React, { useState, useEffect } from "react";
import axios from "axios";

const Address = (props) => {
  const [address, setAddress] = useState([]);

  useEffect(() => {
    axios
      .get(`https://bw-spectral-cs-be.herokuapp.com/get-client-address/${props.id}`)
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
