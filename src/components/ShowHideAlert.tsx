import { useState } from "react";
import Alert from "./Alert";

interface Props {
  message: string;
}

const ShowHideAlert = ({ message }: Props) => {
  const [alertVisible, setAlertVisibility] = useState(false);

  const onClose = () => setAlertVisibility(false);

  if (message) setAlertVisibility(true);

  return (
    <div>{alertVisible && <Alert onClose={onClose}>{message}</Alert>}</div>
  );
};

export default ShowHideAlert;
