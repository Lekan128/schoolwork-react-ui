import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import "../App.css";
import Input from "../components/Input";
import { Global } from "../Util/Global";
import { FacultyType } from "../Entities/Faculty.type";
import FacultySelect from "../Faculty/FacultySelect";
import MultiInput from "../components/MultiInput";
import { useNavigate } from "react-router-dom";

const CreateDepartment = () => {
  let navitate = useNavigate();

  const [departmentNames, setDepartmentNames] = useState<string[]>([]);
  const [facultyName, setFacultyName] = useState("");

  console.log(facultyName);

  const handleSave = () => {
    const dto = { departmentNames, facultyName };

    fetch(Global.base_url + Global.department, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    })
      .then(() => {
        console.log("Complete");
        navitate(Global.create);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <FacultySelect
        defaultSelectedMessage="Select Faculty"
        handleSelectChange={(e) => setFacultyName(e.target.value)}
      />

      <MultiInput
        placeHolder="Department Name"
        tag="Department"
        onListChange={setDepartmentNames}
      />

      <br />
      <Button onClick={() => handleSave()}>Save</Button>
    </>
  );
};

export default CreateDepartment;
