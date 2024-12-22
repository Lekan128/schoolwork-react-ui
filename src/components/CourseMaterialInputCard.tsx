import "../App.css";
import { CourseMaterialType } from "../Entities/CourseMaterial.type";
import CourseMaterialInput from "./CourseMaterialInput";

interface Props {
  header?: string;
  tag?: string;
  placeHolder1: string;
  placeHolder2: string;
  onListChange: (list: CourseMaterialType[]) => void;
}

const MultiInputCard = ({
  header = "",
  tag = ">",
  placeHolder1,
  placeHolder2,
  onListChange,
}: Props) => {
  return (
    <div className="card">
      {header !== "" && <div className="card-header">{header}</div>}
      <div className="card-body">
        <CourseMaterialInput
          tag={tag}
          placeHolder1={placeHolder1}
          placeHolder2={placeHolder2}
          onListChange={onListChange}
        />
      </div>
    </div>
  );
};

export default MultiInputCard;
