import React from "react";

interface Props {
  children: String;
  colour?: "primary" | "secondary" | "success"; //optional property, it only takes one of those 3 inputs
  onClick: () => void;
}

const Button = ({ children, colour = "primary", onClick }: Props) => {
  return (
    <button type="button" className={"btn btn-" + colour} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
