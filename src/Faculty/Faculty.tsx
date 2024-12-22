import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { useNavigate } from "react-router";
import { api } from "../Util/api";
import NotificationPopup from "../components/NotificationPopup";
import { FacultyType } from "../Entities/Faculty.type";
import { NotificationType } from "../Entities/Notification.type";

const Faculty = () => {
  const [faculties, setFaculties] = useState<FacultyType[]>([]);
  const [notification, setNotification] = useState("");
  const [notificationType, setNotificationType] =
    useState<NotificationType>("primary");

  let navitate = useNavigate();

  useEffect(() => {
    fetch(api.faculty())
      .then((response) => response.json())
      .then((response: FacultyType[]) => {
        if (response.length === 0) {
          handleSetNotificaton("No Faculties availabe to load");
          return;
        }
        setFaculties(response);
      })
      .catch((error) => {
        console.log(error);
        handleSetNotificaton("An error occoured: " + error, "danger");
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

  return (
    <div>
      <ul className="list-group">
        {faculties.length > 0 ? ( //if faculty is not empty
          faculties.map((faculty: FacultyType) => (
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
      {notification.length > 0 && (
        <NotificationPopup
          message={notification}
          type={notificationType}
          onClose={() => handleClearNotification()}
        />
      )}
    </div>
  );
};

export default Faculty;
