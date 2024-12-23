import React from "react";

interface FormattedTextProps {
  label: string;
  text: string;
}

const FormattedText: React.FC<FormattedTextProps> = ({ label, text }) => {
  return (
    <p style={{ marginBottom: "8px" }}>
      <strong>{label}:</strong>{" "}
      {text.split("\n").map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </p>
  );
};

export default FormattedText;
