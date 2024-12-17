import React, { useState } from "react";

interface MultiLineInputProps {
  header: string; // Header for the input field
  rows?: number; // Number of rows the textarea will span
  placeholder?: string; // Placeholder text
  onTextChange: (text: string) => void; // Callback to pass text to the parent component
}

const MultiLineInput: React.FC<MultiLineInputProps> = ({
  header,
  rows = 3, // Default row count
  placeholder = "Enter text here...",
  onTextChange,
}) => {
  const [text, setText] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);
    onTextChange(value); // Pass text back to parent
  };

  return (
    <div>
      <h4>{header}</h4>
      <textarea
        value={text}
        onChange={handleChange}
        rows={rows}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
};

export default MultiLineInput;
