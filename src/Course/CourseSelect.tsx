import React, { useEffect, useState } from "react";
import { Global } from "../Util/Global";
import { CourseType } from "../Entities/Course.type";

interface Props {
  defaultSelectCourseMessage: string;
  departmentId: string;
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CourseSelect = ({
  departmentId,
  defaultSelectCourseMessage,
  handleSelectChange,
}: Props) => {
  const [avalableCourses, setAvailableCourses] = useState<CourseType[]>([]);

  useEffect(() => {
    if (departmentId === "") {
      setAvailableCourses([]);
      return;
    }

    fetch(
      Global.base_url + Global.course + Global.department + "/" + departmentId
    )
      .then((response) => response.json())
      .then((response) => setAvailableCourses(response))
      .catch((err) => {
        setAvailableCourses([]);
        console.log(err);
      });
  }, [departmentId]);

  return (
    <>
      <select
        className="form-select form-select-lg mb-3"
        aria-label="Large select example"
        onChange={handleSelectChange}
      >
        <option value={""} key={""}>
          {defaultSelectCourseMessage}
        </option>
        {avalableCourses.length > 0 &&
          avalableCourses.map((course: CourseType) => (
            <option value={course.id} key={course.id}>
              {course.code + " - " + course.title}
            </option>
          ))}
      </select>
    </>
  );
};

export default CourseSelect;
