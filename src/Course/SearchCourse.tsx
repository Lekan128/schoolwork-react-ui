import { useState } from "react";
import { CourseType } from "../Entities/Course.type";
import FacultySelect from "../Faculty/FacultySelect";
import DepartmentSelect from "../Department/DepartmentSelect";
import Selector from "../components/Selector";
import { Global } from "../Util/Global";
import LevelSelect from "../Level/LevelSelect";
import { api } from "../Util/api";
import { NotificationType } from "../Entities/Notification.type";
import NotificationPopup from "../components/NotificationPopup";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const SearchCourse = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [facultyName, setFacultyName] = useState("");
  const [semester, setSemester] = useState("");
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [level, setLevel] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [notification, setNotification] = useState("");
  const [notificationType, setNotificationType] =
    useState<NotificationType>("primary");

  // Handle search
  const handleSearch = () => {
    setLoading(true);
    setError("");

    const params = new URLSearchParams();
    if (searchQuery) params.append("search", searchQuery);
    if (departmentId) params.append("departmentId", departmentId);
    if (facultyName) params.append("facultyName", facultyName);
    if (semester) params.append("semester", semester);
    if (level) params.append("levelId", level);

    fetch(api.courses() + "?" + params.toString())
      .then((response) => {
        if (!response.ok) {
          handleSetNotificaton("Failed to fetch courses");
          setError("Failed to fetch courses");
          // throw new Error("Failed to fetch courses");
        }
        return response.json();
      })
      .then((data: CourseType[]) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        handleSetNotificaton("An error occoured: " + err, "danger");
        setLoading(false);
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

  return (
    <div className="container">
      <h2>Search Courses</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by course title or code..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
        {/* <button
          className="btn btn-secondary"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          Advanced
        </button> */}
      </div>
      <h6
        style={{
          ...(showAdvanced
            ? { color: "blue", textAlign: "end" }
            : { color: "grey", textAlign: "end" }),
        }}
        onClick={() => setShowAdvanced(!showAdvanced)}
      >
        Advanced search
      </h6>

      {showAdvanced && (
        <div className="card p-3 mb-3">
          <h5>Advanced Filters</h5>

          <FacultySelect
            defaultSelectedMessage="Select a Faculty"
            handleSelectChange={(e) => setFacultyName(e.target.value)}
          />
          <DepartmentSelect
            facultyName={facultyName}
            defaultSelectDptMessage={"Select a Department"}
            handleSelectChange={(e) => setDepartmentId(e.target.value)}
          />
          <label htmlFor="semester" className="form-label">
            Semester:
          </label>
          <Selector
            handleSelectChange={(event) => setSemester(event.target.value)}
            items={Global.semesters}
          />
          <LevelSelect
            defaultSelectedMessage="Select Level"
            handleSelectChange={(event) => setLevel(event.target.value)}
          />

          {/* <div className="mb-3">
            <label htmlFor="department" className="form-label">
              Department ID
            </label>
            <input
              type="text"
              className="form-control"
              id="department"
              placeholder="Enter Department ID"
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="semester" className="form-label">
              Semester
            </label>
            <select
              id="semester"
              className="form-select"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            >
              <option value="">Select Semester</option>
              <option value="FIRST">FIRST</option>
              <option value="SECOND">SECOND</option>
            </select>
          </div> */}
        </div>
      )}

      {loading && <Loader />}
      {error && <p className="text-danger">{error}</p>}

      <ul className="list-group">
        {courses.length > 0
          ? courses.map((course: CourseType) => (
              <li
                key={course.id}
                className="list-group-item"
                onClick={() =>
                  navigate(Global.view + Global.course + "/" + course.id)
                }
              >
                <strong>{course.code}</strong>: {course.title}
              </li>
            ))
          : !loading && <p>No courses found.</p>}
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

export default SearchCourse;
