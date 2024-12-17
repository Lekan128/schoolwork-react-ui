import { useEffect, useState } from "react";
import { Global } from "../Util/Global";
import { useLocation, useNavigate } from "react-router";
import Loader from "../components/Loader";
import { CourseType } from "../Entities/Course.type";
import "../App.css";

const Course = () => {
  const location = useLocation();
  let navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  // const [error, setStateError] = useState({});

  console.log(location.state);
  console.log("course: " + location.state.facultyName);
  console.log("course: " + location.state);

  const departmentId = location.state.departmentId;
  const departmentName = location.state.departmentName;

  useEffect(() => {
    console.log(Global.base_url + Global.course + "/" + departmentId);
    fetch(Global.base_url + Global.course + "/" + departmentId)
      .then((response) => response.json())
      .then((response) => setCourses(response))
      .catch((err) => {
        console.log(err);
        // setStateError(err);
      });
  }, []);

  const handleOnItemSelected = (
    departmentId: string,
    departmentName: string,
    facultyName: string
  ) => {
    navigate(Global.review + "/" + departmentId);
    console.log(
      "It is time to go from deparemt: " +
        departmentId +
        " \n with name: " +
        departmentName +
        "\n faculty: " +
        facultyName
    );
  };

  return (
    <div>
      <h1>{"Department: " + departmentName}</h1>

      <ul className="list-group">
        {courses.length > 0 ? ( //if faculty is not empty
          courses.map((course: CourseType) => (
            <li
              className="list-group-item"
              key={course.id}
              onClick={() =>
                handleOnItemSelected(
                  course.id,
                  course.title,
                  course.department.name
                )
              }
            >
              {course.code + " : " + course.title}
            </li>
          ))
        ) : (
          //else
          <Loader />
        )}
      </ul>
    </div>
  );
};

export default Course;
