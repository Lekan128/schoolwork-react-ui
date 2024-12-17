import React, { useEffect, useState } from "react";
import { Global } from "../Util/Global";
import { LevelType } from "../Entities/Level.type";

interface Props {
  defaultSelectedMessage: string;
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const LevelSelect = ({ defaultSelectedMessage, handleSelectChange }: Props) => {
  const [availableLevels, setAvailableLevels] = useState<LevelType[]>([]);

  //get all Levels for list
  useEffect(() => {
    fetch(Global.base_url + Global.level)
      .then((response) => response.json())
      .then((response) => {
        setAvailableLevels(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {availableLevels.length === 0 ? (
        <h4>Loading ...</h4>
      ) : (
        <select
          className="form-select form-select-lg mb-3"
          aria-label="Large select example"
          onChange={handleSelectChange}
        >
          <option value={""} key={""}>
            {defaultSelectedMessage}
          </option>
          {availableLevels.map((level: LevelType) => (
            <option value={level.name} key={level.id}>
              {level.name}
            </option>
          ))}
        </select>
      )}
    </>
  );
};

export default LevelSelect;
