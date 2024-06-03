import React, { useState } from 'react';
import axios from 'axios';
const cops = [
    {name:"IPS Vishwas Nagre", position:"SP"},
    {name:"Santosh Khade", position:"DySP"},
    {name:"Pawan Gondge", position:"DySp"}
];

const LandingPage = () => {
  const [copss, setCops] = useState(cops.map(cop => ({
    copName: cop.name,
    cityName: '',
    vehicleType: ''
  })));
  const startSearching = () => {
    const params = new URLSearchParams();
    copss.forEach((cop, index) => {
       params.append(`cops[${index}][copName]`, cop.copName);
       params.append(`cops[${index}][cityName]`, cop.cityName);
       params.append(`cops[${index}][vehicleType]`, cop.vehicleType);
    });
 
    axios.get('http://localhost:3000/simulate', { params })
       .then(response => {
          console.log(response.data);
       })
       .catch(error => {
          console.error('Error:', error);
       });
 };
 
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setCops(prevCops => {
      const updatedCops = [...prevCops];
      updatedCops[index][name] = value;
      return updatedCops;
    });
  };
console.log(copss)
  return (
    <div>
      <h1>System</h1>
      <button onClick={startSearching}>Start Searching</button>
      {
        copss.map((cop, index) => (
          <div key={index}>
            <h2>{cop.copName}</h2>
            <select name="cityName" value={cop.cityName} onChange={(e) => handleChange(e, index)}>
              <option value="">--select city--</option>
              <option value="Yapkashnagar">Yapkashnagar</option>
              <option value="Lihaspur">Lihaspur</option>
              <option value="Narmis City">Narmis City</option>
              <option value="Shekharvati">Shekharvati</option>
              <option value="Nuravgram">Nuravgram</option>
            </select>
            <select name="vehicleType" value={cop.vehicleType} onChange={(e) => handleChange(e, index)}>
              <option value="">--select Vehicle--</option>
              <option value="EV Bike">EV Bike</option>
              <option value="EV Car">EV Car</option>
              <option value="EV SUV">EV SUV</option>
            </select>
          </div>
        ))
      }
    </div>
  );
};

export default LandingPage;
