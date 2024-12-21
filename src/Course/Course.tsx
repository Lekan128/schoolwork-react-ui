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
  let navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [notification, setNotification] = useState("");
  const [notificationType, setNotificationType] =
    useState<NotificationType>("primary");
  const [unableToLoadError, setUnableToLoadError] = useState("");

  const departmentId = location.state.departmentId;
  const departmentName = location.state.departmentName;

  useEffect(() => {
    const getCourseByDepartment = api.coursesByDepartment(departmentId);
    console.log(getCourseByDepartment);

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
    console.log("Suppose clear am na");
    setNotification("");
    setNotificationType("primary");
  };

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
