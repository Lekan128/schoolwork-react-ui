import { useState } from "react";
import "./Course.css";
import Button from "../components/Button";
import { Global } from "../Util/Global";
import Input from "../components/Input";
import FacultySelect from "../Faculty/FacultySelect";
import DepartmentSelect from "../Department/DepartmentSelect";
import Selector from "../components/Selector";
import LevelSelect from "../Level/LevelSelect";
import { useNavigate } from "react-router-dom";
import { NotificationType } from "../Entities/Notification.type";
import NotificationPopup from "../components/NotificationPopup";
import { CourseMaterialType } from "../Entities/CourseMaterial.type";
import CourseMaterialInputCard from "../components/CourseMaterialInputCard";

const CreateCourse = () => {
  let navitate = useNavigate();

  const [notification, setNotification] = useState("");
  const [notificationType, setNotificationType] =
    useState<NotificationType>("primary");

  const [facultyName, setFacultyName] = useState("");

  const [courseTitle, setCourseTitle] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [semester, setSemester] = useState(Global.semesters[0]);
  const [level, setLevel] = useState("");
  const [courseMaterials, setCourseMaterials] = useState<CourseMaterialType[]>(
    []
  );

  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");

  const selectDptMessage = "Plese select a Department";
  const selectFacultyMessage = "Plese select a Faculty";

  const handleFacultySelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedFacultyName = e.target.value;
    setFacultyName(selectedFacultyName);
  };

  const handleDepartmentSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedId = e.target.value;
    setSelectedDepartmentId(selectedId);
  };

  const handleSave = () => {
    const dto = {
      title: courseTitle,
      code: courseCode,
      departmentId: selectedDepartmentId,
      semester: semester,
      level: level,
      courseMaterials: courseMaterials,
    };

    if (
      courseTitle === "" ||
      courseCode === "" ||
      selectedDepartmentId === "" ||
      semester === "" ||
      level === ""
    ) {
      console.log("Fill up fields");
      handleSetNotificaton("Fill up all fields");
      return;
      //alert user
    }

    handleSetNotificaton("Loading...");

    //do checks before save

    fetch(Global.base_url + Global.course, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    })
      .then(() => {
        console.log("Complete");
        navitate(Global.create);
      })
      .catch((error) => {
        handleSetNotificaton("An error occoured: " + error, "danger");
        console.log(error);
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
    <>
      <FacultySelect
        handleSelectChange={handleFacultySelectChange}
        defaultSelectedMessage={selectFacultyMessage}
      />
      <DepartmentSelect
        facultyName={facultyName}
        defaultSelectDptMessage={selectDptMessage}
        handleSelectChange={handleDepartmentSelectChange}
      />

      <Input
        tag="Course Title"
        placeHolder="Title"
        onTextInput={setCourseTitle}
        maximumLength={64}
      />

      <Input
        tag="Course Code"
        placeHolder="Code"
        onTextInput={setCourseCode}
        maximumLength={10}
      />

      <CourseMaterialInputCard
        placeHolder1="name"
        placeHolder2="link"
        onListChange={(courseMaterials) => setCourseMaterials(courseMaterials)}
        header="Input course material name link"
      />

      {/* <Input tag="Semester" placeHolder="semester" onTextInput={setSemester} /> */}
      <label htmlFor="semester" className="form-label">
        Semester
      </label>
      <Selector
        handleSelectChange={(event) => setSemester(event.target.value)}
        items={Global.semesters}
      />

      <LevelSelect
        defaultSelectedMessage="Select Level"
        handleSelectChange={(event) => setLevel(event.target.value)}
      />

      <Button onClick={handleSave}>Save</Button>

      {/* notification */}
      {notification && (
        <NotificationPopup
          message={notification}
          type={notificationType}
          onClose={() => handleClearNotification()}
        />
      )}
    </>
  );
};

export default CreateCourse;
