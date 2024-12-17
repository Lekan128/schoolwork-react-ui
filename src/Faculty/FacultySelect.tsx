import React, { useEffect, useState } from "react";
import { FacultyType } from "../Entities/Faculty.type";
import { api } from "../Util/api";

interface Props {
  defaultSelectedMessage: string;
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FacultySelect = ({
  defaultSelectedMessage,
  handleSelectChange,
}: Props) => {
  // const [availableFaculties, setAvailableFaculties] = useState([FacultyType]);
  const [availableFaculties, setAvailableFaculties] = useState<FacultyType[]>(
    []
  );

  //get all faculties for list
  useEffect(() => {
    fetch(api.faculty())
      .then((response) => response.json())
      .then((response) => {
        setAvailableFaculties(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {availableFaculties.length === 0 ? (
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
          {availableFaculties.map((faculty: FacultyType) => (
            <option value={faculty.name} key={faculty.id}>
              {faculty.name}
            </option>
          ))}
        </select>
      )}
    </>
  );
};

export default FacultySelect;
