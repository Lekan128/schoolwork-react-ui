import React, { useEffect } from "react";
import "../App.css";
import { NotificationType } from "../Entities/Notification.type";

interface NotificationPopupProps {
  message: string;
  onClose: () => void; // Callback to close the popup
  type?: NotificationType;
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({
  message,
  onClose,
  type = "primary",
}) => {
  useEffect(() => {
    // Automatically close the popup after 4 seconds
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [onClose]);

  return (
    <div className={"custom-alert alert alert-" + type} role="alert">
      {message}
    </div>
  );
};

export default NotificationPopup;
