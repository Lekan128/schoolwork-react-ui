import React, { useEffect, useState } from "react";
import { Global } from "../Util/Global";
import { DepartmentType } from "../Entities/Department.type";

interface Props {
  defaultSelectDptMessage: string;
  facultyName: string;
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DepartmentSelect = ({
  facultyName,
  defaultSelectDptMessage,
  handleSelectChange,
}: Props) => {
  const [avalableDepartments, setAvailableDepartments] = useState<
    DepartmentType[]
  >([]);

  useEffect(() => {
    if (facultyName === "") {
      setAvailableDepartments([]);
      return;
    }

    fetch(Global.base_url + Global.department + "/" + facultyName)
      .then((response) => response.json())
      .then((response) => setAvailableDepartments(response))
      .catch((err) => {
        setAvailableDepartments([]);
        console.log(err);
      });
  }, [facultyName]);

  return (
    <>
      <select
        className="form-select form-select-lg mb-3"
        aria-label="Large select example"
        onChange={handleSelectChange}
      >
        <option value={""} key={""}>
          {defaultSelectDptMessage}
        </option>
        {avalableDepartments.length > 0 &&
          avalableDepartments.map((deparemt: DepartmentType) => (
            <option value={deparemt.id} key={deparemt.id}>
              {deparemt.name}
            </option>
          ))}
      </select>
    </>
  );
};

export default DepartmentSelect;
