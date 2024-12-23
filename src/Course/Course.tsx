import { useEffect, useState } from "react";
import { Global } from "../Util/Global";
import { useLocation, useNavigate } from "react-router";
import Loader from "../components/Loader";
import { CourseType } from "../Entities/Course.type";
import "../App.css";
import { NotificationType } from "../Entities/Notification.type";
import NotificationPopup from "../components/NotificationPopup";
import { api } from "../Util/api";

const Course = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [notification, setNotification] = useState("");
  const [notificationType, setNotificationType] =
    useState<NotificationType>("primary");
  const [unableToLoadError, setUnableToLoadError] = useState("");

  const departmentId = location.state.departmentId;
  const departmentName = location.state.departmentName;

  useEffect(() => {
    const getCourseByDepartment = api.coursesByDepartment(departmentId);

    fetch(getCourseByDepartment)
      .then((response) => response.json())
      .then((response) => {
        if (response.length === 0) {
          const error = "No Course availabe to load";
          handleSetNotificaton(error);
          setUnableToLoadError(error);
          return;
        }
        setCourses(response);
      })
      .catch((err) => {
        console.log(err);
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

  return (
    <div>
      <h1>{"Courses in the department: " + departmentName}</h1>

      <ul className="list-group">
        {courses.length > 0 ? ( //if faculty is not empty
          courses.map((course: CourseType) => (
            <li
              className="list-group-item"
              key={course.id}
              onClick={() =>
                navigate(Global.view + Global.course + "/" + course.id)
              }
            >
              {course.code + " : " + course.title}
            </li>
          ))
        ) : (
          //else
          <Loader errorMessage={unableToLoadError} />
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

export default Course;
