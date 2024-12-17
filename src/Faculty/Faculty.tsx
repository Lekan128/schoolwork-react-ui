import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { useNavigate } from "react-router";
import { api } from "../Util/api";

const Faculty = () => {
  const [faculties, setFaculties] = useState([]);
  // const [error, setStateError] = useState({});

  // const [facultyName, setFacultyName] = useState("");

  let navitate = useNavigate();

  interface Faculty {
    id: number;
    name: string;
  }

  useEffect(() => {
    fetch(api.faculty())
      .then((response) => response.json())
      .then((response) => setFaculties(response))
      .catch((error) => {
        console.log(error);
        // setStateError(error);
      });
  }, []);

  return (
    <div>
      <ul className="list-group">
        {faculties.length > 0 ? ( //if faculty is not empty
          faculties.map((faculty: Faculty) => (
            <li
              className="list-group-item"
              key={faculty.id}
              onClick={() => {
                console.log(faculty.name);
                // setFacultyName(faculty.name);
                navitate("department", { state: faculty.name });
              }}
            >
              {faculty.name}
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

export default Faculty;
