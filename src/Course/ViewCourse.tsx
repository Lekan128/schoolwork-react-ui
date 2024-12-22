import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CourseType } from "../Entities/Course.type";
import { api } from "../Util/api";
import { NotificationType } from "../Entities/Notification.type";
import NotificationPopup from "../components/NotificationPopup";
import Loader from "../components/Loader";
import { Global } from "../Util/Global";

const ViewCourse = () => {
  const navigate = useNavigate();

  const { courseId } = useParams<{ courseId: string }>(); // Get the course ID from the route
  const [course, setCourse] = useState<CourseType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const [notificationType, setNotificationType] =
    useState<NotificationType>("primary");

  useEffect(() => {
    const urlGetCourseById = api.coursesById(courseId!);
    // Fetch the course details from the endpoint
    fetch(urlGetCourseById)
      .then((response) => {
        if (!response.ok) {
          console.log("Sorry, to fetch course details.");
          handleSetNotificaton(
            "Sorry, I am unable to fetch course details.",
            "danger"
          );
          setError("Sorry, I am undable to fetch course details.");
        }
        return response.json();
      })
      .then((data) => {
        setCourse(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        handleSetNotificaton("An error occoured: " + error, "danger");
      });
  }, [courseId]);

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

  if (loading) {
    return (
      <>
        <Loader />
        {notification.length > 0 && (
          <NotificationPopup
            message={notification}
            type={notificationType}
            onClose={() => handleClearNotification()}
          />
        )}
      </>
    );
  }

  if (error) {
    return (
      <>
        <div>Error: {error}</div>
        {notification.length > 0 && (
          <NotificationPopup
            message={notification}
            type={notificationType}
            onClose={() => handleClearNotification()}
          />
        )}
      </>
    );
  }

  if (!course) {
    return (
      <>
        <div>No course data available.</div>
        {notification.length > 0 && (
          <NotificationPopup
            message={notification}
            type={notificationType}
            onClose={() => handleClearNotification()}
          />
        )}
      </>
    );
  }

  return (
    <div className="container">
      <h1>{course.title}</h1>
      <p>
        <strong>Code:</strong> {course.code}
      </p>
      <p>
        <strong>Semester:</strong> {course.semester}
      </p>
      <p>
        <strong>Level:</strong> {course.level.name}
      </p>
      <p>
        <strong>Department:</strong> {course.department.name}
      </p>
      <p>
        <strong>Faculty:</strong> {course.department.faculty.name}
      </p>

      <h2>Course Materials</h2>
      {course.courseMaterials.length > 0 ? (
        <ul className="list-group">
          {course.courseMaterials.map((material) => (
            <li className="list-group-item" key={material.name}>
              <strong>{material.name}</strong>:{" "}
              <a href={material.link} target="_blank" rel="noopener noreferrer">
                {material.link}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No course materials available.</p>
      )}

      <br />

      <button
        type="button"
        className="btn btn-primary"
        onClick={() => navigate(Global.review + "/" + courseId)}
      >
        Check Reviews
      </button>

      <br />
      <br />

      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={() => navigate(Global.update + Global.course + "/" + courseId)}
      >
        Edit
      </button>

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

export default ViewCourse;
