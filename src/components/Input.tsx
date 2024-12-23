import { useState } from "react";

interface Props {
  tag?: string;
  placeHolder: string;
  onTextInput: (input: string) => void;
  maximumLength?: number;
  initialValue?: string;
}

const Input = ({
  tag = ">",
  placeHolder,
  onTextInput,
  maximumLength = 0,
  initialValue = "",
}: Props) => {
  const [textValue, setTextValue] = useState(initialValue);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
    onTextInput(e.target.value);
  };

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
          {...(maximumLength > 0 ? { maxLength: maximumLength } : {})}
          value={textValue}
          // {...(initialValue.length > 0 ? { value: initialValue } : {})}
          onChange={handleTextChange}
        />
      </div>
    </>
  );
};

export default Input;
