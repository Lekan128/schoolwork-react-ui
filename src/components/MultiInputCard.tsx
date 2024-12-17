import React from "react";
import MultiInput from "./MultiInput";
import "../App.css";

interface Props {
  header?: string;
  tag?: string;
  placeHolder: string;
  onListChange: (list: string[]) => void;
}

const MultiInputCard = ({
  header = "",
  tag = ">",
  placeHolder,
  onListChange,
}: Props) => {
  return (
    <div className="card">
      {header !== "" && <div className="card-header">{header}</div>}
      <div className="card-body">
        <MultiInput
          tag={tag}
          placeHolder={placeHolder}
          onListChange={onListChange}
        />
      </div>
    </div>
  );
};

export default MultiInputCard;
