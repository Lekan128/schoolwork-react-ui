import { useEffect, useState } from "react";
import { Global } from "../Util/Global";
import { useLocation, useNavigate, useParams } from "react-router";
import Loader from "../components/Loader";
import { DepartmentType } from "../Entities/Department.type";

const Department = () => {
  const location = useLocation();
  let navigate = useNavigate();

  const [Departments, setDepartments] = useState([]);
  const [error, setStateError] = useState({});

  let facultyName = location.state;

  console.log("dpt: " + facultyName);

  useEffect(() => {
    fetch(Global.base_url + Global.department + "/" + facultyName)
      .then((response) => response.json())
      .then((response) => setDepartments(response))
      .catch((err) => {
        console.log(err);
        setStateError(err);
      });
  }, []);

  const handleOnItemSelected = (
    departmentId: string,
    departmentName: string,
    facultyName: string
  ) => {
    console.log(Departments);
    console.log(departmentId);
    navigate("course", {
      state: {
        facultyName,
        departmentName,
        departmentId,
      },
    });

    // console.log(
    //   "It is time to go from deparemt: " +
    //     departmentId +
    //     " \n with name: " +
    //     departmentName +
    //     "\n faculty: " +
    //     facultyName
    // );
  };

  return (
    <div>
      <h1>{"Faculty: " + facultyName}</h1>

      <ul className="list-group">
        {Departments.length > 0 ? ( //if faculty is not empty
          Departments.map((department: DepartmentType) => (
            <li
              className="list-group-item"
              key={department.id}
              onClick={() =>
                handleOnItemSelected(
                  department.id,
                  department.name,
                  department.faculty.name
                )
              }
            >
              {department.name}
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

export default Department;
