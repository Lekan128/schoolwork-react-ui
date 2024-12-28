import { useEffect, useState } from "react";
import { Global } from "../Util/Global";
import { useLocation, useNavigate } from "react-router";
import Loader from "../components/Loader";
import { DepartmentType } from "../Entities/Department.type";
import { NotificationType } from "../Entities/Notification.type";
import NotificationPopup from "../components/NotificationPopup";

const Department = () => {
  const location = useLocation();
  let navigate = useNavigate();

  const [unableToLoadError, setUnableToLoadError] = useState("");
  const [Departments, setDepartments] = useState([]);
  const [notification, setNotification] = useState("");
  const [notificationType, setNotificationType] =
    useState<NotificationType>("primary");

  let facultyName = location.state;

  useEffect(() => {
    fetch(Global.base_url + Global.department + "/" + facultyName)
      .then((response) => response.json())
      .then((response) => {
        if (response.length === 0) {
          const error = "No Department availabe to load";
          handleSetNotificaton(error);
          setUnableToLoadError(error);
          return;
        }
        setDepartments(response);
      })
      .catch((err) => {
        console.log(err);
        // setStateError(err);
        handleSetNotificaton("An error occoured: " + err, "danger");
      });
  }, []);

  const handleSetNotificaton = (
    notification: string,
    notificationType: NotificationType = "primary"
  ) => {
    setNotification(notification);
    setNotificationType(notificationType);
  };

  const handleClearNotification = () => {
    setNotification("");
    setNotificationType("primary");
  };

  const handleOnItemSelected = (
    departmentId: string,
    departmentName: string,
    facultyName: string
  ) => {
    navigate("course", {
      state: {
        facultyName,
        departmentName,
        departmentId,
      },
    });
  };

  return (
    <div>
      <h1 className="list-header">
        {"Department List (" + facultyName + " faculty)"}
      </h1>

      <ul className="list-group">
        {Departments.length > 0 ? ( //if faculty is not empty
          Departments.map((department: DepartmentType) => (
            <li
              className="list-group-item list-group-item-action"
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
          <Loader errorMessage={unableToLoadError} />
        )}
      </ul>
      {notification && (
        <NotificationPopup
          message={notification}
          type={notificationType}
          onClose={() => handleClearNotification()}
        />
      )}
    </div>
  );
};

export default Department;
