import { useState } from "react";
import Button from "../components/Button";
import "../App.css";
import { Global } from "../Util/Global";
import FacultySelect from "../Faculty/FacultySelect";
import MultiInput from "../components/MultiInput";
import { useNavigate } from "react-router-dom";
import { NotificationType } from "../Entities/Notification.type";
import NotificationPopup from "../components/NotificationPopup";

const CreateDepartment = () => {
  let navitate = useNavigate();

  const [notification, setNotification] = useState("");
  const [notificationType, setNotificationType] =
    useState<NotificationType>("primary");

  const [departmentNames, setDepartmentNames] = useState<string[]>([]);
  const [facultyName, setFacultyName] = useState("");

  console.log(facultyName);

  const handleSave = () => {
    if (departmentNames.length === 0) {
      handleSetNotificaton("Fill up all fields", "warning");
      return;
    }
    handleSetNotificaton("Loading");

    const dto = { departmentNames, facultyName };

    fetch(Global.base_url + Global.department, {
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
        defaultSelectedMessage="Select Faculty"
        handleSelectChange={(e) => setFacultyName(e.target.value)}
      />

      <MultiInput
        placeHolder="Department Name"
        tag="Department"
        onListChange={setDepartmentNames}
      />

      <br />
      <Button onClick={() => handleSave()}>Save</Button>

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

export default CreateDepartment;
