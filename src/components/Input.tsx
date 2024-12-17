import React from "react";

interface Props {
  tag?: string;
  placeHolder: string;
  onTextInput: (input: string) => void;
}

const Input = ({ tag = ">", placeHolder, onTextInput }: Props) => {
  return (
    <>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          {tag}
        </span>
        <input
          type="text"
          className="form-control"
          placeholder={placeHolder}
          aria-label={placeHolder}
          aria-describedby="basic-addon1"
          onChange={(event) => onTextInput(event.target.value)}
        />
      </div>
    </>
  );
};

export default Input;
