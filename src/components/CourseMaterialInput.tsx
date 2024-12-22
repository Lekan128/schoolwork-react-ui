import { useState } from "react";
import { CourseMaterialType } from "../Entities/CourseMaterial.type";

interface CourseMaterialInputProps {
  tag?: string;
  placeHolder1: string;
  placeHolder2: string;
  onListChange: (list: CourseMaterialType[]) => void;
}

const CourseMaterialInput = ({
  tag = ">",
  placeHolder1,
  placeHolder2,
  onListChange,
}: CourseMaterialInputProps) => {
  const [items, setItems] = useState<CourseMaterialType[]>([
    { name: "", link: "" },
  ]);

  const handleInputChange = (
    index: number,
    field: keyof CourseMaterialType,
    value: string
  ) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
    onListChange(updatedItems); // Notify parent of updated list
  };

  const addNewRow = () => {
    setItems([...items, { name: "", link: "" }]);
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
            placeholder={`${placeHolder1} ${index + 1}`}
            aria-label={`${placeHolder1} ${index + 1}`}
            aria-describedby={`basic-addon-${index}`}
            value={item.name}
            maxLength={64}
            onChange={(event) =>
              handleInputChange(index, "name", event.target.value)
            }
          />
          <input
            type="text"
            className="form-control"
            placeholder={`${placeHolder2} ${index + 1}`}
            aria-label={`${placeHolder2} ${index + 1}`}
            aria-describedby={`basic-addon-${index}`}
            value={item.link}
            maxLength={225}
            onChange={(event) =>
              handleInputChange(index, "link", event.target.value)
            }
          />
          {items.length > 1 && (
            <button
              className="btn btn-danger"
              type="button"
              onClick={() => removeRow(index)}
            >
              X
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

export default CourseMaterialInput;
