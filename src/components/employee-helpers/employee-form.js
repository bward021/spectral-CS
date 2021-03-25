import React, { useState } from "react";

const EmployeeForm = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [permissions, setPermissions] = useState("");

  return (
    <div>
      <form>
        <input
          type="text"
          onChange={(e) => {
            setFirstname(e.target.value);
          }}
          value={firstname}
          placeholder="firstname"
        />
        <input
          type="text"
          onChange={(e) => {
            setLastname(e.target.value);
          }}
          value={lastname}
          placeholder="lastname"
        />
        <input
          type="text"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          placeholder="email"
        />
        <input
          type="text"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          placeholder="password"
        />
        <input
          type="text"
          onChange={(e) => {
            setPermissions(e.target.value);
          }}
          value={permissions}
          placeholder="permissions"
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
