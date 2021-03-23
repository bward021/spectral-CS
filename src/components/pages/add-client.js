import React, { useState } from 'react';
import axios from "axios";

const AddClient = (props) => {

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [supervisor, setSupervisor] = useState("")
  const [addressOne, setAddressOne] = useState("")
  const [addressTwo, setAddressTwo] = useState("")
  const [city, setCity] = useState("")
  const [st, setSt] = useState("")
  const [postalCode, setPostalCode] = useState("")

  const handleSubmit = (e) => {
    axios.post(
      "http://127.0.0.1:5000/add-client",
      {
        firstName: firstName,
        lastName: lastName,
        age: age,
        gender: gender,
        supervisor: supervisor,
        addressOne: addressOne,
        addressTwo: addressTwo,
        city: city,
        st: st,
        postalCode: postalCode,
        },
    )
    .then(response => {
      setFirstName("")
      setLastName("")
      setAge("")
      setGender("")
      setSupervisor("")
      setAddressOne("")
      setAddressTwo("")
      setCity("")
      setSt("")
      setPostalCode("")
    })
    .catch(error => {
      console.log("error:", error)
    })
    e.preventDefault()
  }

  return ( 
    <div className="add-client-container">
      <div className="add-client-wrapper">
        <form className="add-client-form" onSubmit={(e)=>{handleSubmit(e)}}>
          <div>
            <p>First Name</p>
            <input type="text" onChange={(e)=>{setFirstName(e.target.value)}} value={firstName} />
          </div>
          <div>
            <p>Last Name</p>
            <input type="text" onChange={(e)=>{setLastName(e.target.value)}} value={lastName}/>
          </div>
          <div>
            <p>Age</p>
            <input type="int" onChange={(e)=>{setAge(e.target.value)}} value={age}/>
          </div>
          <div>
            <p>Gender</p>
            <select
              required
              type="text"
              name="gender"
              onChange={(e)=>{setGender(e.target.value)}}
              value={gender}
            >
              <option value="">Select Gender</option>
              <option value="Male" >Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <p>Supervisor</p>
            <input type="text" onChange={(e)=>{setSupervisor(e.target.value)}} value={supervisor} />
          </div>
          <div>
            <p>Address 1</p>
            <input type="text" onChange={(e)=>{setAddressOne(e.target.value)}} value={addressOne} />
          </div>
          <div>
            <p>Address 2</p>
            <input type="text" onChange={(e)=>{setAddressTwo(e.target.value)}} value={addressTwo} />
          </div>
          <div>
            <p>City</p>
            <input type="text" onChange={(e)=>{setCity(e.target.value)}} value={city} />
          </div>
          <div>
            <p>State</p>
            <select
              type="text"
              name="state"
              onChange={(e)=>{setSt(e.target.value)}}
              value={st}
            >
              <option value="" defaultValue>Select State</option>
              <option value="UT">UT</option>
            </select>
          </div>
          <div>
            <p>Postal Code</p>
            <input type="text" onChange={(e)=>{setPostalCode(e.target.value)}} value={postalCode} />
          </div>
          <button>Submit</button>
        </form>
      </div>
    </div>
   );
}
 
export default AddClient;