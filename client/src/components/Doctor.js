import React from "react";

function Doctor({ doctor }) {
  return (
    <div className="card p-2">
      <h1 className="card-title">
        {doctor.firstName} {doctor.lastName}
      </h1>
      <p>
        <b>Phone number: </b>
        {doctor.phoneNumber}
      </p>
      <p>
        <b>Address: </b>
        {doctor.address}
      </p>
      <p>
        <b>Fee per visit: </b>
        {doctor.feePerConsultation}
      </p>
      <p>
        <b>Timings: </b>
        {doctor.timings[0]} - {doctor.timings[1]}
      </p>
    </div>
  );
}

export default Doctor;
