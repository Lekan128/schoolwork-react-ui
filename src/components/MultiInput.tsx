import { useState } from "react";

interface MultiInputProps {
  tag?: string;
  placeHolder: string;
  onListChange: (list: string[]) => void;
}

const MultiInput = ({
  tag = ">",
  placeHolder,
  onListChange,
}: MultiInputProps) => {
  const [items, setItems] = useState<string[]>([""]);

  const handleInputChange = (index: number, value: string) => {
    const updatedItems = [...items];
    updatedItems[index] = value;
    setItems(updatedItems);
    onListChange(updatedItems); // Notify parent of updated list
  };

  const addNewRow = () => {
    setItems([...items, ""]);
  };

  const removeRow = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    onListChange(updatedItems); // Notify parent of updated list
  };

  return (
    <div>
      {items.map((item, index) => (
        <div key={index} className="input-group mb-3">
          <span className="input-group-text" id={`basic-addon-${index}`}>
            {tag}
          </span>
          <input
            type="text"
            className="form-control"
            placeholder={`${placeHolder} ${index + 1}`}
            aria-label={`${placeHolder} ${index + 1}`}
            aria-describedby={`basic-addon-${index}`}
            value={item}
            onChange={(event) => handleInputChange(index, event.target.value)}
          />
          {items.length > 1 && (
            <button
              className="btn btn-danger"
              type="button"
              onClick={() => removeRow(index)}
            >
              Remove
            </button>
          )}
        </div>
      ))}
      <button
        className="btn btn-primary btn-sm"
        type="button"
        onClick={addNewRow}
      >
        Add More
      </button>
    </div>
  );
};

export default MultiInput;
