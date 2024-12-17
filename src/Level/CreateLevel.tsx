import { useState } from "react";
import Button from "../components/Button";
import "../App.css";
import { Global } from "../Util/Global";
import MultiInput from "../components/MultiInput";
import { useNavigate } from "react-router-dom";

const CreateLevel = () => {
  let navitate = useNavigate();
  const [levels, setLevels] = useState<string[]>([]);

  const handleSave = () => {
    fetch(Global.base_url + Global.level, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(levels),
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
      <h2>Input Level Names</h2>
      <MultiInput placeHolder="Level" onListChange={setLevels} />
      <br />
      <Button onClick={handleSave}>Save</Button>
    </>
  );
};

export default CreateLevel;
