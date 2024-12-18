import { useState } from "react";
import Button from "../components/Button";
import "../App.css";
import { Global } from "../Util/Global";
import MultiInput from "../components/MultiInput";
import { useNavigate } from "react-router-dom";
import { NotificationType } from "../Entities/Notification.type";
import NotificationPopup from "../components/NotificationPopup";

const CreateFaculty = () => {
  let navitate = useNavigate();

  const [notification, setNotification] = useState("");
  const [notificationType, setNotificationType] =
    useState<NotificationType>("primary");

  const [faculties, setfaculties] = useState<string[]>([]);

  const handleSave = () => {
    if (faculties.length === 0) {
      handleSetNotificaton("Fill up all fields", "warning");
      return;
    }

    handleSetNotificaton("Loading");

    fetch(Global.base_url + Global.faculty, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(faculties),
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
      <h2>Input Faculty Names</h2>
      <MultiInput placeHolder="Faculty" onListChange={setfaculties} />
      <br />
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

export default CreateFaculty;
