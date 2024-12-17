import React, { useState } from "react";
import Button from "./Button";
import { Link, useNavigate } from "react-router";

const Home = () => {
  let navitate = useNavigate();
  const [facultyName, setFacultyName] = useState("");

  return (
    <div>
      <h1>Home</h1>

      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          Faculty Name
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
          onChange={(event) => setFacultyName(event.target.value)}
        />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          Signature
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>

      <Link to="/faculty">Again re</Link>
      <Button
        onClick={() => {
          navitate("/faculty", { state: { facultyName } });
        }}
      >
        Go to Faculties
      </Button>
    </div>
  );
};

export default Home;
