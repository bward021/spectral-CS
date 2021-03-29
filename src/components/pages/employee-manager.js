import axios from "axios";
import React, { useEffect, useState } from "react";
import EmployeeForm from "../employee-helpers/employee-form";

import { API_URL } from "../api_url/api-url"

const EmployeeManager = (props) => {
  const [employees, setEmployees] = useState([]);
  const [renderForm, setRenderForm] = useState(false)
  const [employeeToEdit, setEmployeeToEdit] = useState(null)

  useEffect(() => {
    axios({
      method: "get",
      url: `${API_URL}get-all-employees`,
      withCredentials: true,
    })
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.log("error in duration: ", error);
      });
    // eslint-disable-next-line
  }, []);

  const handleDelete = (employee) => {
    axios({
      method: "delete",
      url: `${API_URL}delete-employee`,
      data: {
        id: employee.employees_id,
      },
      withCredentials: true,
    })
    .then((response) => {
      setEmployees(response.data)
    })
    .catch((error) => {
      console.log("error in E-Manager:", error);
    })
  }

  const handleEditClick = (employee) => {
    setEmployeeToEdit(employee)
    setRenderForm(true)
  }

  const renderEmployees = () => {
    return employees.map((employee) => {
      return (
        <div className="employees-rendered">
          <div>{employee.employees_first_name}</div>
          <div>{employee.employees_last_name}</div>
          <div>{employee.employees_email}</div>
          <div>{employee.employees_permissions}</div>
          <div>
            <button onClick={()=>{handleEditClick(employee)}}>edit</button>
          </div>
          <div>
            <button onClick={()=> {handleDelete(employee)}}>delete</button>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="employee-manager-container">
      <div className="new-button">
        <button onClick={()=>{setRenderForm(true)}}>Add Employee</button>
      </div>
      <div className="employee-manager-wrapper">
        <div className="left-column">
          <div className="header">
            <div>First Name</div>
            <div>Last Name</div>
            <div>Email</div>
            <div>Permissions</div>
            <div></div>
            <div></div>
          </div>
          <div className="all-employees-wrapper">{renderEmployees()}</div>
        </div>
        <div className="right-column">
            {renderForm && <EmployeeForm employee={employeeToEdit} setEmployees={setEmployees}/>}
        </div>
      </div>
    </div>
  );
};

export default EmployeeManager;
