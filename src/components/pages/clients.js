import React, { useState } from 'react';

const Clients = (props) => {

  const [loggedIn] = useState(props.loggedIn)

  return ( 
    <div>
      <h1>This is my Clients Page</h1>
      {loggedIn && "You are logged in"}
    </div>
   );
}
 
export default Clients;