import React, { useState } from "react";
import Button from "../components/Button";
import "../App.css";
import Input from "../components/Input";
import { Global } from "../Util/Global";
import MultiInput from "../components/MultiInput";
import { useNavigate } from "react-router-dom";

const CreateFaculty = () => {
  let navitate = useNavigate();

  const [faculties, setfaculties] = useState<string[]>([]);

  const handleSave = () => {
    fetch(Global.base_url + Global.faculty, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(faculties),
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
      <h2>Input Faculty Names</h2>
      <MultiInput placeHolder="Faculty" onListChange={setfaculties} />
      <br />
      <Button onClick={handleSave}>Save</Button>
    </>
  );
};

export default CreateFaculty;
