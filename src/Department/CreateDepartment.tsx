import { useState } from "react";
import Button from "../components/Button";
import "../App.css";
import { Global } from "../Util/Global";
import FacultySelect from "../Faculty/FacultySelect";
import MultiInput from "../components/MultiInput";
import { useNavigate } from "react-router-dom";
import { NotificationType } from "../Entities/Notification.type";
import NotificationPopup from "../components/NotificationPopup";
import Input from "../components/Input";
import axios from "axios";

const CreateDepartment = () => {
  const navigate = useNavigate();

  const [notification, setNotification] = useState("");
  const [notificationType, setNotificationType] =
    useState<NotificationType>("primary");

  const [departmentNames, setDepartmentNames] = useState<string[]>([]);
  const [facultyName, setFacultyName] = useState("");

  const [passName, setPassName] = useState("");

  const handleSave = () => {
    if (departmentNames.length === 0) {
      handleSetNotificaton("Fill up all fields", "warning");
      return;
    }
    handleSetNotificaton("Loading");

    const dto = { departmentNames, facultyName };

    axios
      .post(Global.base_url + Global.department, dto, {
        headers: {
          "Content-Type": "application/json",
          NAME: passName,
        },
      })
      .then(() => {
        console.log("Complete");
        navigate(Global.create);
      })
      .catch((error) => {
        handleSetNotificaton("An error occurred: " + error.message, "danger");
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
      <Input placeHolder={"input password"} onTextInput={setPassName} />
    </>
  );
};

export default CreateDepartment;
