import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { CourseType } from "../Entities/Course.type";
import { CourseMaterialType } from "../Entities/CourseMaterial.type";
import { api } from "../Util/api";
import Selector from "../components/Selector";
import { Global } from "../Util/Global";
import CourseMaterialInputCard from "../components/CourseMaterialInputCard";
import { NotificationType } from "../Entities/Notification.type";
import NotificationPopup from "../components/NotificationPopup";
import Loader from "../components/Loader";

const UpdateCourse = () => {
  const { courseId } = useParams<{ courseId: string }>(); // Get the course ID from the route
  const navigate = useNavigate();
  const [course, setCourse] = useState<CourseType | null>(null);
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [semester, setSemester] = useState("FIRST");
  const [level, setLevel] = useState("");
  const [courseMaterials, setCourseMaterials] = useState<CourseMaterialType[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [notification, setNotification] = useState("");
  const [notificationType, setNotificationType] =
    useState<NotificationType>("primary");

  const [passName, setPassName] = useState("");

  // Fetch the existing course details
  useEffect(() => {
    const urlGetCourseById = api.coursesById(courseId!);

    fetch(urlGetCourseById)
      .then((response) => {
        if (!response.ok) {
          console.log("An error");
          handleSetNotificaton("Failed to fetch course details.", "danger");
        }
        return response.json();
      })
      .then((data) => {
        setCourse(data);
        setTitle(data.title);
        setCode(data.code);
        setDepartmentId(data.department.id);
        setSemester(data.semester);
        setLevel(data.level.name);
        setCourseMaterials(data.courseMaterials);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [courseId]);

  // Handle form submission
  const handleUpdate = () => {
    const updatedCourse = {
      title,
      code,
      departmentId,
      semester,
      level,
      courseMaterials,
    };
    const urlGetCourseById = api.coursesById(courseId!);

    fetch(urlGetCourseById, {
      method: "PUT",
      headers: { "Content-Type": "application/json", NAME: passName },
      body: JSON.stringify(updatedCourse),
    })
      .then((response) => {
        if (!response.ok) {
          handleSetNotificaton("Failed to update course.", "danger");
        }
        return response.json();
      })
      .then(() => {
        navigate(Global.view + Global.course + "/" + courseId); // Redirect to the course details page
      })
      .catch((err) => {
        handleSetNotificaton("Error: " + err, "danger");
        setError(err.message);
      });
  };

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
        {notification && (
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
        {notification && (
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
        {notification && (
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
      <h2>Update Course</h2>
      <Input
        tag="Title"
        placeHolder="Title"
        onTextInput={setTitle}
        initialValue={title}
        maximumLength={64}
      />
      <Input
        tag="Code"
        placeHolder="Code"
        onTextInput={setCode}
        initialValue={code}
        maximumLength={10}
      />

      <label htmlFor="semester" className="form-label">
        Semester
      </label>
      <Selector
        handleSelectChange={(event) => setSemester(event.target.value)}
        items={Global.semesters}
        initialSelectionKey={Global.semesters.indexOf(semester)}
      />

      <CourseMaterialInputCard
        header="Course Materials"
        preloadedCourseMaterials={courseMaterials}
        onListChange={setCourseMaterials}
      />
      {/* <div className="mb-3 card">
        <label htmlFor="materials" className="form-label card-header">
          Course Materials
        </label>
        <div className="card-body">
          <CourseMaterialInput
            preloadedCourseMaterials={courseMaterials}
            onListChange={setCourseMaterials}
          />
        </div>
      </div>
       */}
      <button className="btn btn-primary" onClick={handleUpdate}>
        Update Course
      </button>
      {/* notification */}
      {notification && (
        <NotificationPopup
          message={notification}
          type={notificationType}
          onClose={() => handleClearNotification()}
        />
      )}
      <Input placeHolder={"input password"} onTextInput={setPassName} />
    </div>
  );
};

export default UpdateCourse;
