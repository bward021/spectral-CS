import axios from "axios";
import React, { useEffect, useState } from "react";

const EmployeeForm = (props) => {
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [permissions, setPermissions] = useState(null);

  useEffect(() => {
    if (props.employee){
    setFirstname(props.employee.employees_first_name);
    setLastname(props.employee.employees_last_name);
    setEmail(props.employee.employees_email);
    setPermissions(props.employee.employees_permissions);
    }
  }, [
    props.employee
  ]);

  const handleSubmit = (e) => {
    if (props.employee) {
      axios.patch("http://127.0.0.1:5000/edit-employee",
      {
        id: props.employee.employees_id,
        firstname,
        lastname,
        email,
        password,
        permissions,
      })
      .then((response)=>{
        props.setEmployees(response.data)
        setFirstname("");
        setLastname("");
        setEmail("");
        setPassword("");
        setPermissions("");
      })
      .catch((error) => {
        console.log("error in update employee: ", error);
      })
    } else {
      axios.post("http://127.0.0.1:5000/add-employee",
      {
        firstname,
        lastname,
        email,
        password,
        permissions,
      })
      .then((response)=>{
        props.setEmployees(response.data)
        setFirstname("");
        setLastname("");
        setEmail("");
        setPassword("");
        setPermissions("");
      })
      .catch((error) => {
        console.log("error in add employee: ", error);
      })
    }

    e.preventDefault()
  }

  return (
    <div className="employee-form-wrapper" >
      <h2>{props.employee ? "Edit Employee" : "Add New Employee"}</h2>
      <form className="employee-form" onSubmit={(e)=>handleSubmit(e)}>
        <input
          type="text"
          onChange={(e) => {
            setFirstname(e.target.value);
          }}
          value={firstname}
          placeholder="firstname"
          required
        />
        <input
          type="text"
          onChange={(e) => {
            setLastname(e.target.value);
          }}
          value={lastname}
          placeholder="lastname"
          required
        />
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          placeholder="email"
          required
        />
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          placeholder="password"
          required
        />
        <select
          type="text"
          onChange={(e) => {
            setPermissions(e.target.value);
          }}
          value={permissions}
          required
        >
          <option value="" defaultValue>Select Permissions</option>
          <option value="Admin">Admin</option>
          <option value="Employee">Employee</option>
        </select>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
