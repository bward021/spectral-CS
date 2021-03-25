import axios from "axios";
import React, { useEffect, useState } from "react";
import EmployeeForm from "../employee-helpers/employee-form";

const EmployeeManager = (props) => {
  const [employees, setEmployees] = useState([]);
  const [renderForm, setRenderForm] = useState(false)

  useEffect(() => {
    axios({
      method: "get",
      url: `http://127.0.0.1:5000/get-all-employees`,
    })
      .then((response) => {
        console.log(response);
        setEmployees(response.data);
      })
      .catch((error) => {
        console.log("error in duration: ", error);
      });
    // eslint-disable-next-line
  }, []);

  const renderEmployees = () => {
    return employees.map((employee) => {
      return (
        <div className="employees-rendered">
          <div>{employee.employees_first_name}</div>
          <div>{employee.employees_last_name}</div>
          <div>{employee.employees_email}</div>
          <div>{employee.employees_permissions}</div>
          <div>
            <button>edit</button>
          </div>
          <div>
            <button>delete</button>
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
          <hr />
          <div>{renderEmployees()}</div>
        </div>
        <div className="right-column">
          <div>
            {renderForm && <EmployeeForm />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeManager;
